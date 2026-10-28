import {
  boolean,
  integer,
  jsonb,
  numeric,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

export type ProductImage = {
  url: string;
  alt: string;
  verified: boolean;
  source: "generated" | "stock" | "upload";
};

export type ProductVariant = {
  label: string;
  priceDelta: number;
  stock: number;
};

// Pet categories (Cats, Dogs, Small Pets, Fish) and their sub-categories
export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  nameAr: text("name_ar").notNull(),
  nameEn: text("name_en").notNull(),
  petType: text("pet_type").notNull(), // cats | dogs | small-pets | fish | general
  description: text("description"),
  image: text("image"),
  sortOrder: integer("sort_order").notNull().default(0),
  visible: boolean("visible").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// Store-owned private label product lines (honest substitute for real third-party brands)
export const brands = pgTable("brands", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  description: text("description"),
  visible: boolean("visible").notNull().default(true),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  nameAr: text("name_ar").notNull(),
  nameEn: text("name_en").notNull(),
  brandId: integer("brand_id").references(() => brands.id),
  categoryId: integer("category_id")
    .notNull()
    .references(() => categories.id),
  petType: text("pet_type").notNull(), // cats | dogs | small-pets | fish | general
  description: text("description").notNull(),
  details: jsonb("details").$type<string[]>().notNull().default([]),
  price: numeric("price", { precision: 10, scale: 2 }).notNull(),
  compareAtPrice: numeric("compare_at_price", { precision: 10, scale: 2 }),
  currency: text("currency").notNull().default("SAR"),
  stock: integer("stock").notNull().default(0),
  weight: text("weight"),
  images: jsonb("images").$type<ProductImage[]>().notNull().default([]),
  variants: jsonb("variants").$type<ProductVariant[]>().notNull().default([]),
  rating: numeric("rating", { precision: 2, scale: 1 }),
  reviewCount: integer("review_count").notNull().default(0),
  isBestseller: boolean("is_bestseller").notNull().default(false),
  isNew: boolean("is_new").notNull().default(false),
  isFeatured: boolean("is_featured").notNull().default(false),
  isOffer: boolean("is_offer").notNull().default(false),
  visible: boolean("visible").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export type OrderItem = {
  productId: number;
  nameAr: string;
  image: string;
  price: number;
  quantity: number;
  variant?: string;
};

export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  customerName: text("customer_name").notNull(),
  phone: text("phone").notNull(),
  email: text("email"),
  country: text("country").notNull(),
  city: text("city").notNull(),
  address: text("address").notNull(),
  notes: text("notes"),
  shippingMethod: text("shipping_method").notNull(),
  paymentMethod: text("payment_method").notNull(),
  subtotal: numeric("subtotal", { precision: 10, scale: 2 }).notNull(),
  shippingFee: numeric("shipping_fee", { precision: 10, scale: 2 }).notNull().default("0"),
  total: numeric("total", { precision: 10, scale: 2 }).notNull(),
  status: text("status").notNull().default("pending"),
  items: jsonb("items").$type<OrderItem[]>().notNull().default([]),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const newsletterSubscribers = pgTable("newsletter_subscribers", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const storeSettings = pgTable("store_settings", {
  id: serial("id").primaryKey(),
  key: text("key").notNull().unique(),
  value: jsonb("value").notNull(),
});
