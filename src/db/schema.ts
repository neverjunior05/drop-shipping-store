import { pgTable, serial, text, integer, real, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  role: text("role").notNull().default("customer"), // customer | admin
  createdAt: timestamp("created_at").defaultNow(),
});

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(),
  price: real("price").notNull(),
  compareAt: real("compare_at").notNull().default(0),
  cost: real("cost").notNull().default(0),
  shippingCost: real("shipping_cost").notNull().default(0),
  images: jsonb("images").notNull().$type<string[]>(),
  rating: real("rating").notNull().default(4.5),
  reviewsCount: integer("reviews_count").notNull().default(0),
  stock: integer("stock").notNull().default(20),
  supplier: text("supplier").notNull().default("DemoSupplier"),
  supplierSku: text("supplier_sku").notNull().default(""),
  badges: jsonb("badges").notNull().$type<string[]>(),
  deliveryMin: integer("delivery_min").notNull().default(5),
  deliveryMax: integer("delivery_max").notNull().default(10),
  variants: jsonb("variants").notNull().$type<{name:string; options:string[]}[]>(),
  colors: jsonb("colors").notNull().$type<string[]>(),
  sold: integer("sold").notNull().default(0),
  featured: boolean("featured").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const collections = pgTable("collections", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  image: text("image").notNull(),
  emoji: text("emoji").notNull().default("✨"),
  rule: text("rule").notNull(), // under20 | gift | desk | fitness | new | trending
});

export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  orderNumber: text("order_number").notNull().unique(),
  email: text("email").notNull(),
  customerName: text("customer_name").notNull(),
  address: jsonb("address").notNull().$type<Record<string,string>>(),
  items: jsonb("items").notNull().$type<any[]>(),
  subtotal: real("subtotal").notNull(),
  shipping: real("shipping").notNull().default(0),
  discount: real("discount").notNull().default(0),
  total: real("total").notNull(),
  profit: real("profit").notNull().default(0),
  status: text("status").notNull().default("Paid"), // Paid, Sent to supplier, Shipped, In transit, Delivered, Refunded, Forward failed
  supplierOrderId: text("supplier_order_id"),
  trackingNumber: text("tracking_number"),
  carrier: text("carrier").default("DHL eCommerce"),
  promoCode: text("promo_code"),
  paymentMethod: text("payment_method").default("Stripe Test •••• 4242"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const reviews = pgTable("reviews", {
  id: serial("id").primaryKey(),
  productId: integer("product_id").notNull(),
  author: text("author").notNull(),
  rating: integer("rating").notNull(),
  title: text("title").notNull(),
  body: text("body").notNull(),
  photo: text("photo"),
  verified: boolean("verified").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

export const promoCodes = pgTable("promo_codes", {
  id: serial("id").primaryKey(),
  code: text("code").notNull().unique(),
  type: text("type").notNull(), // percent | fixed | freeship
  value: real("value").notNull(),
  active: boolean("active").notNull().default(true),
  expiresAt: text("expires_at"),
  usage: integer("usage").notNull().default(0),
});

export const wishlist = pgTable("wishlist", {
  id: serial("id").primaryKey(),
  email: text("email").notNull(),
  productId: integer("product_id").notNull(),
});

export const addresses = pgTable("addresses", {
  id: serial("id").primaryKey(),
  email: text("email").notNull(),
  label: text("label").notNull(),
  line: text("line").notNull(),
  city: text("city").notNull(),
  zip: text("zip").notNull(),
  country: text("country").notNull(),
});

export const events = pgTable("events", {
  id: serial("id").primaryKey(),
  type: text("type").notNull(), // view | cart | checkout | paid
  revenue: real("revenue").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

export const pricingRules = pgTable("pricing_rules", {
  id: serial("id").primaryKey(),
  category: text("category").notNull().unique(),
  markupType: text("markup_type").notNull().default("percent"),
  markupValue: real("markup_value").notNull().default(120),
  minMargin: real("min_margin").notNull().default(25),
});
