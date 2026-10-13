import { NextRequest, NextResponse } from "next/server"; import { db } from "@/db"; import { events } from "@/db/schema";
export async function POST(req:NextRequest){ try{ const b=await req.json(); await db.insert(events).values({type:b.type||"view",revenue:b.revenue||0}); }catch{} return NextResponse.json({ok:true}); }
