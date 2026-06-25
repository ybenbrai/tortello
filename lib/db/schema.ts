import { boolean, doublePrecision, integer, pgTable, serial, text } from 'drizzle-orm/pg-core'

export const menuItems = pgTable('menu_items', {
  id: text('id').primaryKey(),
  type: text('type', { enum: ['filling', 'style', 'sauce', 'extra'] }).notNull(),
  nameEn: text('name_en').notNull(),
  nameFr: text('name_fr').notNull(),
  nameAr: text('name_ar').notNull(),
  price: doublePrecision('price').notNull().default(0),
  image: text('image'),
  descEn: text('desc_en'),
  descFr: text('desc_fr'),
  descAr: text('desc_ar'),
  sortOrder: integer('sort_order').default(0),
})

export const featuredDishes = pgTable('featured_dishes', {
  id: text('id').primaryKey(),
  nameEn: text('name_en').notNull(),
  nameFr: text('name_fr').notNull(),
  nameAr: text('name_ar').notNull(),
  descEn: text('desc_en').notNull(),
  descFr: text('desc_fr').notNull(),
  descAr: text('desc_ar').notNull(),
  price: doublePrecision('price').notNull(),
  image: text('image').notNull(),
  tagEn: text('tag_en'),
  tagFr: text('tag_fr'),
  tagAr: text('tag_ar'),
  sortOrder: integer('sort_order').default(0),
})

export const reviews = pgTable('reviews', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  cityEn: text('city_en').notNull(),
  cityFr: text('city_fr').notNull(),
  cityAr: text('city_ar').notNull(),
  rating: integer('rating').notNull().default(5),
  textEn: text('text_en').notNull(),
  textFr: text('text_fr').notNull(),
  textAr: text('text_ar').notNull(),
})

export const faqs = pgTable('faqs', {
  id: text('id').primaryKey(),
  qEn: text('q_en').notNull(),
  qFr: text('q_fr').notNull(),
  qAr: text('q_ar').notNull(),
  aEn: text('a_en').notNull(),
  aFr: text('a_fr').notNull(),
  aAr: text('a_ar').notNull(),
  sortOrder: integer('sort_order').default(0),
})

export const coupons = pgTable('coupons', {
  code: text('code').primaryKey(),
  discount: doublePrecision('discount').notNull(),
  active: boolean('active').default(true),
  maxUses: integer('max_uses').default(0),
  usedCount: integer('used_count').default(0),
})

export const users = pgTable('users', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  phone: text('phone').notNull(),
  createdAt: text('created_at').notNull().default(''),
})

export const orders = pgTable('orders', {
  id: text('id').primaryKey(),
  date: text('date').notNull(),
  total: doublePrecision('total').notNull(),
  status: text('status', { enum: ['preparing', 'on-the-way', 'delivered'] })
    .notNull()
    .default('preparing'),
  name: text('name').notNull(),
  phone: text('phone').notNull(),
  address: text('address').notNull(),
  notes: text('notes'),
  payment: text('payment', { enum: ['cod', 'card'] }).notNull(),
  coupon: text('coupon'),
  discount: doublePrecision('discount').default(0),
})

export const siteSettings = pgTable('site_settings', {
  key: text('key').primaryKey(),
  value: text('value').notNull().default(''),
})

export const orderItems = pgTable('order_items', {
  id: serial('id').primaryKey(),
  orderId: text('order_id')
    .notNull()
    .references(() => orders.id, { onDelete: 'cascade' }),
  filling: text('filling').notNull(),
  style: text('style').notNull(),
  sauce: text('sauce').notNull(),
  extras: text('extras').notNull(),
  quantity: integer('quantity').notNull(),
  unitPrice: doublePrecision('unit_price').notNull(),
  labelEn: text('label_en').notNull(),
  labelFr: text('label_fr').notNull(),
  labelAr: text('label_ar').notNull(),
})
