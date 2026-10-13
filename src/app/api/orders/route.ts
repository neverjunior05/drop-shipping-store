import { NextRequest, NextResponse } from "next/server"; import { db } from "@/db"; import { orders, promoCodes, products, events } from "@/db/schema"; import { ensureSeed } from "@/lib/db-helpers"; import { eq, sql } from "drizzle-orm";
export async function GET(req:NextRequest){ await ensureSeed(); const u=new URL(req.url); const email=u.searchParams.get("email"); const num=u.searchParams.get("number"); let rows:any[]=await db.select().from(orders).orderBy(sql`id desc`); if(email) rows=rows.filter(o=>o.email.toLowerCase()===email.toLowerCase()); if(num) rows=rows.filter(o=>o.orderNumber.toLowerCase()===num.toLowerCase()); return NextResponse.json({orders:rows}); }
export async function POST(req:NextRequest){
 await ensureSeed(); const b=await req.json();
 if(!b.email?.includes("@")||!b.customerName||!b.address?.line||!b.items?.length) return NextResponse.json({error:"Valid email, name, address and items are required"},{status:400});
 // server-side price verification (never trust client prices)
 let subtotal=0, profit=0; const verified=[];
 for(const it of b.items){ const [p]:any[]=await db.select().from(products).where(eq(products.id,it.id)); if(!p) return NextResponse.json({error:`Product ${it.id} not found`},{status:400}); if(p.stock < it.qty) return NextResponse.json({error:`${p.title} only has ${p.stock} left`},{status:400}); subtotal+=p.price*it.qty; profit+= (p.price-p.cost-p.shippingCost-(p.price*0.029+0.3))*it.qty; verified.push({id:p.id,title:p.title,price:p.price,qty:it.qty,image:p.images[0],variant:it.variant||"Standard"}); await db.update(products).set({stock:p.stock-it.qty, sold:p.sold+it.qty}).where(eq(products.id,p.id)); }
 let discount=0, shipping = subtotal>=50?0:4.99; if(b.shippingMethod==="express") shipping=12.99;
 if(b.promoCode){ const [promo]:any[]=await db.select().from(promoCodes).where(eq(promoCodes.code,b.promoCode.toUpperCase())); if(promo&&promo.active){ if(promo.type==="percent") discount=Math.round(subtotal*promo.value/100*100)/100; if(promo.type==="fixed") discount=promo.value; if(promo.type==="freeship") shipping=0; await db.update(promoCodes).set({usage:promo.usage+1}).where(eq(promoCodes.id,promo.id)); } else return NextResponse.json({error:"Promo code is invalid or expired"},{status:400}); }
 const total=Math.round((subtotal+shipping-discount)*100)/100; const orderNumber=`NC-${2700+Math.floor(Math.random()*800)+100}`;
 const [order]=await db.insert(orders).values({orderNumber,email:b.email,customerName:b.customerName,address:b.address,items:verified,subtotal:Math.round(subtotal*100)/100,shipping,discount,total,profit:Math.round(profit*100)/100,status:"Paid",promoCode:b.promoCode||null,paymentMethod: b.paymentMethod||"Simulated Gateway •••• 4242 (no Stripe key)"}).returning();
 await db.insert(events).values({type:"paid",revenue:total});
 return NextResponse.json({order});
}
export async function PATCH(req:NextRequest){ const b=await req.json(); const [o]:any[]=await db.select().from(orders).where(eq(orders.id,b.id)); if(!o) return NextResponse.json({error:"Not found"},{status:404});
 if(b.action==="forward"){ // mock supplier API call with simulated latency/failure handling
   if(Math.random()<0.08) { await db.update(orders).set({status:"Forward failed"}).where(eq(orders.id,b.id)); return NextResponse.json({error:"Supplier timed out — flagged for retry", order:{...o,status:"Forward failed"}}); }
   const supId=`SUP-ORD-${9000+o.id}`; const track=`1Z${100000+o.id*137}US`; const [updated]=await db.update(orders).set({status:"Sent to supplier",supplierOrderId:supId,trackingNumber:track}).where(eq(orders.id,b.id)).returning(); return NextResponse.json({order:updated}); }
 if(b.action==="refund"){ const [updated]=await db.update(orders).set({status:"Refunded"}).where(eq(orders.id,b.id)).returning(); return NextResponse.json({order:updated}); }
 const [updated]=await db.update(orders).set({status:b.status||o.status, trackingNumber:b.trackingNumber||o.trackingNumber, carrier:b.carrier||o.carrier}).where(eq(orders.id,b.id)).returning(); return NextResponse.json({order:updated}); }
