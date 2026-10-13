import { db } from "@/db";
import { products, collections, promoCodes, reviews, orders, events, pricingRules, users } from "@/db/schema";
import { seedProducts, seedCollections, PROMOS } from "./data";
import { sql } from "drizzle-orm";
let seeded=false;
export async function ensureSeed(){
 if(seeded) return;
 try{
  const c:any = await db.execute(sql`select count(*)::int as c from products`);
  const count = c.rows?.[0]?.c ?? 0;
  if(count>0){ seeded=true; return; }
  for(const p of seedProducts) await db.insert(products).values(p as any).onConflictDoNothing();
  for(const col of seedCollections) await db.insert(collections).values(col).onConflictDoNothing();
  for(const pr of PROMOS) await db.insert(promoCodes).values({...pr, expiresAt:"2027-12-31"}).onConflictDoNothing();
  // users - simple demo hash stored plain with prefix (demo only, bcrypt note in README)
  const demoUsers=[{name:"Admin Nova",email:"admin@novacart.demo",password:"demo-hash-admin123",role:"admin"},{name:"Alex Carter",email:"demo@novacart.demo",password:"demo-hash-demo1234",role:"customer"},{name:"Maya Chen",email:"maya@novacart.demo",password:"demo-hash-demo1234",role:"customer"}];
  for(const u of demoUsers) await db.insert(users).values(u).onConflictDoNothing();
  const all:any[] = await db.select().from(products);
  const reviewTexts=[["Exceeded expectations","Build quality feels 3x the price. Shipping took 7 days, tracked the whole way."],["My desk finally feels finished","Easy setup, looks premium, would gift this."],["Great value, honest delivery","Arrived day 8 as promised. Works exactly as shown."],["Bought a second one","First was for me, second for my sister. Both perfect."],["Solid, not perfect","Does the job well. Wish cable was longer, support replied fast."]];
  for(const p of all.slice(0,30)){ for(let i=0;i<3;i++){ const [t,b]=reviewTexts[(p.id+i)%reviewTexts.length]; await db.insert(reviews).values({productId:p.id,author:["Alex C.","Maya R.","Jordan T.","Sam K.","Priya N."][(p.id+i)%5],rating: i===2?4:5,title:t,body:b,photo:i===0?p.images[0]:null,verified:true}); } }
  const statuses=["Paid","Sent to supplier","Shipped","In transit","Delivered","Delivered","Delivered"];
  for(let i=0;i<14;i++){ const p=all[i%all.length]; const qty=1+(i%2); const total=Math.round(p.price*qty*100)/100; await db.insert(orders).values({orderNumber:`NC-${2600+i}`,email:i%3===2?"maya@novacart.demo":"demo@novacart.demo",customerName:i%3===2?"Maya Chen":"Alex Carter",address:{line:"742 Aurora Ave",city:"Austin",zip:"78701",country:"United States"},items:[{id:p.id,title:p.title,price:p.price,qty,image:p.images[0],variant:"Midnight / Standard"}],subtotal:total,shipping: total>50?0:4.99,discount:0,total:total+(total>50?0:4.99),profit:Math.round((total*0.42)*100)/100,status:statuses[i%statuses.length],supplierOrderId:`SUP-ORD-${8800+i}`,trackingNumber:i<2?null:`1Z${774000+i}US`,carrier:"DHL eCommerce",paymentMethod:"Stripe Test •••• 4242"}).onConflictDoNothing(); }
  const cats=[...new Set(seedProducts.map(p=>p.category))]; for(const cat of cats) await db.insert(pricingRules).values({category:cat,markupType:"percent",markupValue:110,minMargin:25}).onConflictDoNothing();
  // analytics events over 28 days
  for(let d=28;d>=0;d--){ const base=80+Math.round(Math.sin(d)*20)+ (28-d)*3; for(const [type,count] of [["view",base],["cart",Math.round(base*0.32)],["checkout",Math.round(base*0.18)],["paid",Math.round(base*0.11)]] as const){ await db.insert(events).values({type,revenue: type==="paid"? count*54:0, createdAt:new Date(Date.now()-d*86400000)}); } }
  seeded=true;
 }catch(e){ console.error("seed",e); }
}
