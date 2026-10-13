// NovaCart worker (run separately: npx tsx worker/index.ts) — node-cron jobs in production.
// Jobs: 1) Supplier sync (price/stock) every 6h  2) Abandoned-cart mock emails hourly.
// This demo logs instead of sending real email. Install node-cron to enable scheduling.
export function syncSupplier(){ console.log(`[sync ${new Date().toISOString()}] DemoSupplierAdapter: checked prices/stock, simulated latency 300ms, no drift beyond threshold.`); }
export function abandonedCart(){ console.log(`[abandoned-cart ${new Date().toISOString()}] Mock sender: would email carts idle >1h with WELCOME10 reminder (console only in demo).`); }
if (typeof require !== "undefined" && require.main === module) { syncSupplier(); abandonedCart(); console.log("Worker demo run complete. In production, schedule with node-cron: sync '0 */6 * * *', abandoned '15 * * * *'."); }
