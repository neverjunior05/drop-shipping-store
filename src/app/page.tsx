import Link from "next/link"; import { db } from "@/db"; import { products, collections } from "@/db/schema"; import { ensureSeed } from "@/lib/db-helpers"; import { ProductCard } from "@/components/ui"; import { ArrowRight, ShieldCheck, Truck, RefreshCcw, Sparkles, TrendingUp } from "lucide-react";
export const dynamic="force-dynamic";
export default async function Home(){
 await ensureSeed(); const all:any[]=await db.select().from(products); const cols:any[]=await db.select().from(collections);
 const trending=[...all].sort((a,b)=>b.sold-a.sold).slice(0,8); const fresh=[...all].sort((a,b)=>b.id-a.id).slice(0,4);
 return <div>
  {/* HERO */}
  <section className="relative overflow-hidden">
   <div className="absolute inset-0 aurora opacity-20 blur-3xl scale-110 pointer-events-none"/>
   <div className="max-w-7xl mx-auto px-4 pt-12 pb-10 md:pt-20 md:pb-16 grid lg:grid-cols-2 gap-10 items-center relative">
    <div>
     <span className="inline-flex items-center gap-2 bg-[var(--surface)] border px-3 py-1.5 rounded-full text-xs font-extrabold"><Sparkles className="w-3.5 h-3.5 text-[#5B3DF5]"/> NEW DROPS EVERY FRIDAY · NO INVENTORY, JUST HITS</span>
     <h1 className="font-display font-extrabold leading-[0.95] mt-5" style={{fontSize:"clamp(2.6rem,6vw,4.8rem)"}}>Trending gadgets.<br/><span className="aurora bg-clip-text text-transparent" style={{WebkitBackgroundClip:"text"}}>Honest delivery.</span><br/>Zero fluff.</h1>
     <p className="mt-5 text-base md:text-lg max-w-lg" style={{color:"var(--muted)"}}>We hunt supplier catalogs so you don&apos;t have to. Every product is vetted, fairly marked up, and shipped tracked to your door in <strong className="text-[var(--ink)]">5–10 business days</strong> — no fake &quot;ships in 24h&quot; promises.</p>
     <div className="flex flex-wrap gap-3 mt-7"><Link href="/shop" className="bg-[#0B0B1E] dark:bg-white dark:text-black text-white px-7 py-4 rounded-full font-extrabold hover:scale-[1.03] transition min-h-[52px]">Shop trending →</Link><Link href="/collections/under-20" className="glass px-7 py-4 rounded-full font-extrabold min-h-[52px]">Under $20 gems</Link></div>
     <div className="grid grid-cols-3 gap-3 mt-9 max-w-md">{[["12,400+","orders shipped"],["38","countries"],["4.8★","avg rating"]].map(([n,l])=><div key={l} className="glass rounded-2xl p-3 text-center"><p className="font-mono2 font-bold text-lg md:text-xl">{n}</p><p className="text-[11px] font-semibold" style={{color:"var(--muted)"}}>{l}</p></div>)}</div>
    </div>
    <div className="relative">
     <div className="rounded-[28px] overflow-hidden shadow-2xl rotate-1 hover:rotate-0 transition duration-500"><img src={trending[0]?.images[0]} alt={trending[0]?.title||"Featured gadget"} className="w-full h-[420px] object-cover"/></div>
     <div className="floaty absolute -left-3 md:-left-8 top-6 glass rounded-2xl p-3 shadow-xl flex gap-3 items-center max-w-[240px]"><img src={trending[1]?.images[0]} alt="" className="w-12 h-12 rounded-xl object-cover"/><div><p className="text-xs font-extrabold line-clamp-1">{trending[1]?.title}</p><p className="font-mono2 text-sm font-bold text-[#5B3DF5]">${trending[1]?.price} <span className="text-emerald-600 text-[10px]">● IN STOCK</span></p></div></div>
     <div className="floaty absolute -right-2 bottom-8 glass rounded-2xl px-4 py-3 shadow-xl" style={{animationDelay:"1.2s"}}><p className="text-xs font-bold flex items-center gap-1.5"><Truck className="w-4 h-4 text-[#00A99F]"/> Order today → arrives</p><p className="font-mono2 font-bold">in 5–10 business days</p></div>
    </div>
   </div>
   <div className="bg-[#0B0B1E] text-white py-3 overflow-hidden whitespace-nowrap"><div className="marquee inline-flex gap-10 text-sm font-bold">{Array(2).fill(["✓ Tracked delivery","✓ 30-day returns","✓ Secure Stripe checkout","✓ Vetted suppliers","✓ No fake discounts","✓ Real support, real humans"]).flat().map((t,i)=><span key={i}>{t} <span className="text-[#00D4C8] ml-6">✦</span></span>)}</div></div>
  </section>

  {/* BENTO COLLECTIONS */}
  <section className="max-w-7xl mx-auto px-4 py-14"><div className="flex justify-between items-end mb-6"><h2 className="font-display font-extrabold text-3xl md:text-4xl">Shop by vibe</h2><Link href="/shop" className="font-bold text-[#5B3DF5] flex items-center gap-1 text-sm">All products <ArrowRight className="w-4 h-4"/></Link></div>
   <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">{cols.map((c:any,i:number)=><Link key={c.id} href={`/collections/${c.slug}`} className={`group relative rounded-[24px] overflow-hidden min-h-[180px] ${i===0?"col-span-2":""}`}><img src={c.image} alt={c.title} loading="lazy" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-700"/><span className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent"/><span className="absolute bottom-0 p-5 text-white"><span className="text-2xl">{c.emoji}</span><span className="block font-display font-extrabold text-xl md:text-2xl mt-1">{c.title}</span><span className="text-white/70 text-sm line-clamp-1">{c.description}</span></span></Link>)}</div>
  </section>

  <section className="max-w-7xl mx-auto px-4 py-6"><div className="flex items-center gap-2 mb-6"><TrendingUp className="text-[#FF3D81]"/><h2 className="font-display font-extrabold text-3xl md:text-4xl">Trending now</h2><span className="bg-[#FFE45C] text-black text-xs font-extrabold px-3 py-1 rounded-full ml-2">UPDATED TODAY</span></div>
   <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">{trending.map((p:any,i:number)=><ProductCard key={p.id} p={p} index={i}/>)}</div></section>

  {/* WHY - pinned storytelling as bento */}
  <section className="max-w-7xl mx-auto px-4 py-14"><div className="bg-[#0B0B1E] text-white rounded-[32px] p-6 md:p-12 relative overflow-hidden"><div className="absolute -top-24 -right-24 w-96 h-96 aurora opacity-30 blur-3xl rounded-full"/><h2 className="font-display font-extrabold text-3xl md:text-5xl relative">Why NovaCart?</h2><p className="text-white/60 mt-3 max-w-xl relative">Most dropship stores hide the trade-offs. We put them on the label.</p>
   <div className="grid md:grid-cols-3 gap-4 mt-8 relative">{[[Truck,"Honest timelines","5–10 business days, tracked end-to-end. If a supplier is slow, we tell you before you pay — not after."],[ShieldCheck,"Buyer protection","30-day returns, partial refunds if something arrives wrong, and secure Stripe payments. We never store card data."],[RefreshCcw,"Vetted suppliers","Every SKU is sample-tested. Cost, markup and margin are managed in our pricing engine — no 10x markups."]].map(([Icon,t,b]:any)=><div key={t} className="bg-white/5 border border-white/10 rounded-[24px] p-6 backdrop-blur"><Icon className="w-8 h-8 text-[#00D4C8]"/><h3 className="font-display font-bold text-xl mt-4">{t}</h3><p className="text-white/60 text-sm mt-2 leading-relaxed">{b}</p></div>)}</div></div></section>

  <section className="max-w-7xl mx-auto px-4 py-6 pb-4"><h2 className="font-display font-extrabold text-3xl md:text-4xl mb-6">Just landed ✨</h2><div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">{fresh.map((p:any,i:number)=><ProductCard key={p.id} p={p} index={i}/>)}</div>
   <div className="text-center mt-10"><Link href="/shop" className="inline-block bg-[#5B3DF5] text-white px-8 py-4 rounded-full font-extrabold shadow-lg shadow-indigo-500/30">Browse all {all.length} products →</Link></div></section>
 </div>
}
