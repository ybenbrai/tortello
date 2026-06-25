CREATE TABLE "coupons" (
	"code" text PRIMARY KEY NOT NULL,
	"discount" double precision NOT NULL,
	"active" boolean DEFAULT true,
	"max_uses" integer DEFAULT 0,
	"used_count" integer DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE "faqs" (
	"id" text PRIMARY KEY NOT NULL,
	"q_en" text NOT NULL,
	"q_fr" text NOT NULL,
	"q_ar" text NOT NULL,
	"a_en" text NOT NULL,
	"a_fr" text NOT NULL,
	"a_ar" text NOT NULL,
	"sort_order" integer DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE "featured_dishes" (
	"id" text PRIMARY KEY NOT NULL,
	"name_en" text NOT NULL,
	"name_fr" text NOT NULL,
	"name_ar" text NOT NULL,
	"desc_en" text NOT NULL,
	"desc_fr" text NOT NULL,
	"desc_ar" text NOT NULL,
	"price" double precision NOT NULL,
	"image" text NOT NULL,
	"tag_en" text,
	"tag_fr" text,
	"tag_ar" text,
	"sort_order" integer DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE "menu_items" (
	"id" text PRIMARY KEY NOT NULL,
	"type" text NOT NULL,
	"name_en" text NOT NULL,
	"name_fr" text NOT NULL,
	"name_ar" text NOT NULL,
	"price" double precision DEFAULT 0 NOT NULL,
	"image" text,
	"desc_en" text,
	"desc_fr" text,
	"desc_ar" text,
	"sort_order" integer DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE "order_items" (
	"id" serial PRIMARY KEY NOT NULL,
	"order_id" text NOT NULL,
	"filling" text NOT NULL,
	"style" text NOT NULL,
	"sauce" text NOT NULL,
	"extras" text NOT NULL,
	"quantity" integer NOT NULL,
	"unit_price" double precision NOT NULL,
	"label_en" text NOT NULL,
	"label_fr" text NOT NULL,
	"label_ar" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "orders" (
	"id" text PRIMARY KEY NOT NULL,
	"date" text NOT NULL,
	"total" double precision NOT NULL,
	"status" text DEFAULT 'preparing' NOT NULL,
	"name" text NOT NULL,
	"phone" text NOT NULL,
	"address" text NOT NULL,
	"notes" text,
	"payment" text NOT NULL,
	"coupon" text,
	"discount" double precision DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE "reviews" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"city_en" text NOT NULL,
	"city_fr" text NOT NULL,
	"city_ar" text NOT NULL,
	"rating" integer DEFAULT 5 NOT NULL,
	"text_en" text NOT NULL,
	"text_fr" text NOT NULL,
	"text_ar" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "site_settings" (
	"key" text PRIMARY KEY NOT NULL,
	"value" text DEFAULT '' NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"phone" text NOT NULL,
	"created_at" text DEFAULT '' NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_order_id_orders_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."orders"("id") ON DELETE cascade ON UPDATE no action;