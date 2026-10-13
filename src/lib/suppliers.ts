/**
 * SupplierAdapter — implement this interface for a real supplier (CJ Dropshipping, Spocket, CSV import).
 * DemoSupplierAdapter simulates latency + status progression. Never scrape AliExpress/Amazon.
 */
export interface SupplierProduct { sku:string; title:string; cost:number; stock:number; images:string[] }
export interface SupplierAdapter { id:string; listProducts():Promise<SupplierProduct[]>; getStock(sku:string):Promise<number>; createOrder(input:{sku:string;qty:number;address:Record<string,string>}):Promise<{supplierOrderId:string;trackingNumber:string;carrier:string}>; getTracking(supplierOrderId:string):Promise<string> }
export const demoSupplier: SupplierAdapter = {
 id:"demo-supplier-v2",
 async listProducts(){ await new Promise(r=>setTimeout(r,300)); return []; },
 async getStock(){ return 42; },
 async createOrder(){ await new Promise(r=>setTimeout(r,400)); return { supplierOrderId:`SUP-ORD-${Date.now().toString().slice(-6)}`, trackingNumber:`1Z${Math.floor(Math.random()*9e8)}US`, carrier:"DHL eCommerce" }; },
 async getTracking(){ return "In transit"; },
};
export const MEDIA_CREDITS = ["Unsplash (product/lifestyle)", "Pexels", "DiceBear avatars", "DummyJSON / FakeStore (demo catalog inspiration)", "Lucide icons", "Google Fonts (Sora, Plus Jakarta Sans, IBM Plex Mono)"];
