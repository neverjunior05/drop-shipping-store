import { NextRequest, NextResponse } from "next/server"; import { db } from "@/db"; import { products } from "@/db/schema"; import { ensureSeed } from "@/lib/db-helpers"; import { ilike, desc, asc, and, gte, lte, eq } from "drizzle-orm";
export async function GET(req:NextRequest){
 await ensureSeed(); const u=new URL(req.url); const q=u.searchParams.get("q")||""; const cat=u.searchParams.get("category")||""; const sort=u.searchParams.get("sort")||"trending"; const max=Number(u.searchParams.get("max")||9999); const minRating=Number(u.searchParams.get("rating")||0); const inStock=u.searchParams.get("instock")==="1"; const fast=u.searchParams.get("fast")==="1";
 let rows:any[] = await db.select().from(products);
 if(q) rows=rows.filter(p=> (p.title+" "+p.category+" "+p.description).toLowerCase().includes(q.toLowerCase()));
 if(cat) rows=rows.filter(p=>p.category===cat);
 rows=rows.filter(p=>p.price<=max && p.rating>=minRating && (!inStock||p.stock>0) && (!fast||p.deliveryMax<=7));
 if(sort==="price-low") rows.sort((a,b)=>a.price-b.price); else if(sort==="price-high") rows.sort((a,b)=>b.price-a.price); else if(sort==="rating") rows.sort((a,b)=>b.rating-a.rating); else if(sort==="newest") rows.sort((a,b)=>b.id-a.id); else rows.sort((a,b)=>b.sold-a.sold);
 return NextResponse.json({products:rows,total:rows.length});
}
export async function POST(req:NextRequest){ const b=await req.json(); if(!b.title||!b.price) return NextResponse.json({error:"Title and price required"},{status:400}); const slug=b.slug||b.title.toLowerCase().replace(/[^a-z0-9]+/g,"-"); const [row]=await db.insert(products).values({...b,slug,images:b.images?.length?b.images:["https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=900&q=80"],variants:b.variants||[],colors:b.colors||[],badges:b.badges||[]}).returning(); return NextResponse.json({product:row}); }
