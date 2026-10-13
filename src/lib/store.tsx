"use client";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
export type CartItem={id:number;slug:string;title:string;price:number;image:string;variant:string;qty:number;stock:number};
type Ctx={cart:CartItem[];add:(i:Omit<CartItem,"qty">,q?:number)=>void;remove:(id:number,v:string)=>void;setQty:(id:number,v:string,q:number)=>void;clear:()=>void;cartOpen:boolean;setCartOpen:(b:boolean)=>void;wishlist:number[];toggleWish:(id:number)=>void;user:any;setUser:(u:any)=>void;toast:string;showToast:(t:string)=>void;currency:string;setCurrency:(c:string)=>void;lastAdded:number;spinUsed:boolean;setSpinUsed:(b:boolean)=>void};
const C=createContext<Ctx>(null as any); export const useStore=()=>useContext(C);
export function Providers({children}:{children:ReactNode}){
 const [cart,setCart]=useState<CartItem[]>([]); const [cartOpen,setCartOpen]=useState(false); const [wishlist,setWishlist]=useState<number[]>([]); const [user,setUser]=useState<any>(null); const [toast,setToast]=useState(""); const [currency,setCurrency]=useState("USD"); const [lastAdded,setLastAdded]=useState(0); const [spinUsed,setSpinUsed]=useState(false); const [hydrated,setHydrated]=useState(false);
 useEffect(()=>{ try{ setCart(JSON.parse(localStorage.getItem("nc-cart")||"[]")); setWishlist(JSON.parse(localStorage.getItem("nc-wish")||"[]")); setUser(JSON.parse(localStorage.getItem("nc-user")||"null")); setSpinUsed(localStorage.getItem("nc-spin")==="1"); }catch{} setHydrated(true); },[]);
 useEffect(()=>{ if(hydrated) localStorage.setItem("nc-cart",JSON.stringify(cart)); },[cart,hydrated]);
 useEffect(()=>{ if(hydrated) localStorage.setItem("nc-wish",JSON.stringify(wishlist)); },[wishlist,hydrated]);
 useEffect(()=>{ if(user) localStorage.setItem("nc-user",JSON.stringify(user)); else localStorage.removeItem("nc-user"); },[user]);
 const showToast=(t:string)=>{ setToast(t); setTimeout(()=>setToast(""),3200); };
 const add=(item:Omit<CartItem,"qty">,q=1)=>{ setCart(prev=>{ const ex=prev.find(x=>x.id===item.id&&x.variant===item.variant); if(ex) return prev.map(x=>x===ex?{...x,qty:Math.min(x.stock,x.qty+q)}:x); return [...prev,{...item,qty:q}]; }); setLastAdded(Date.now()); showToast(`Added ${item.title} to cart`); fetch("/api/events",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({type:"cart"})}).catch(()=>{}); };
 const remove=(id:number,v:string)=>setCart(p=>p.filter(x=>!(x.id===id&&x.variant===v)));
 const setQty=(id:number,v:string,q:number)=>setCart(p=>q<=0?p.filter(x=>!(x.id===id&&x.variant===v)):p.map(x=>x.id===id&&x.variant===v?{...x,qty:Math.min(x.stock,q)}:x));
 const clear=()=>setCart([]); const toggleWish=(id:number)=>{ setWishlist(p=>p.includes(id)?p.filter(x=>x!==id):[...p,id]); };
 return <C.Provider value={{cart,add,remove,setQty,clear,cartOpen,setCartOpen,wishlist,toggleWish,user,setUser,toast,showToast,currency,setCurrency,lastAdded,spinUsed,setSpinUsed}}>{children}
 {toast&&<div role="status" aria-live="polite" className="fixed bottom-24 md:bottom-6 left-1/2 -translate-x-1/2 z-[120] bg-[#0B0B1E] text-white px-5 py-3 rounded-full shadow-2xl flex items-center gap-2 text-sm font-semibold"><span className="w-2 h-2 rounded-full bg-[#00D4C8] animate-pulse"/>{toast}</div>}
 </C.Provider>;
}
export const fmt=(n:number,c="USD")=> c==="EUR"?`€${(n*0.92).toFixed(2)}`:c==="GBP"?`£${(n*0.79).toFixed(2)}`:`$${n.toFixed(2)}`;
export const FREE_SHIP=50;
