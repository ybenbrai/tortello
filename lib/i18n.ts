// ============================================================
// Internationalization (i18n)
// Translation dictionary + locale config + translate helper
// ============================================================

import type { Locale } from './types'

// ── Locale Config ─────────────────────────────

export const LOCALES: { code: Locale; label: string; dir: 'ltr' | 'rtl' }[] = [
  { code: 'en', label: 'EN', dir: 'ltr' },
  { code: 'fr', label: 'FR', dir: 'ltr' },
  { code: 'ar', label: 'ع', dir: 'rtl' },
]

// ── Translation Dictionary ────────────────────

export const dict = {
  // ── Navigation ──
  nav_home: { en: 'Home', fr: 'Accueil', ar: 'الرئيسية' },
  nav_menu: { en: 'Menu', fr: 'Menu', ar: 'القائمة' },
  nav_about: { en: 'About', fr: 'À Propos', ar: 'من نحن' },
  nav_contact: { en: 'Contact', fr: 'Contact', ar: 'تواصل' },
  nav_account: { en: 'Account', fr: 'Compte', ar: 'الحساب' },

  // ── Common / Cart ──
  order_now: { en: 'Order Now', fr: 'Commander', ar: 'اطلب الآن' },
  view_menu: { en: 'View Menu', fr: 'Voir le Menu', ar: 'عرض القائمة' },
  add_to_cart: { en: 'Add to Cart', fr: 'Ajouter au Panier', ar: 'أضف إلى السلة' },
  your_cart: { en: 'Your Cart', fr: 'Votre Panier', ar: 'سلتك' },
  cart_empty: {
    en: 'Your cart is empty',
    fr: 'Votre panier est vide',
    ar: 'سلتك فارغة',
  },
  subtotal: { en: 'Subtotal', fr: 'Sous-total', ar: 'المجموع الفرعي' },
  delivery_fee: { en: 'Delivery Fee', fr: 'Frais de Livraison', ar: 'رسوم التوصيل' },
  discount: { en: 'Discount', fr: 'Remise', ar: 'الخصم' },
  total: { en: 'Total', fr: 'Total', ar: 'الإجمالي' },
  checkout: { en: 'Checkout', fr: 'Paiement', ar: 'الدفع' },
  free: { en: 'Free', fr: 'Gratuit', ar: 'مجاني' },
  currency: { en: 'MAD', fr: 'MAD', ar: 'درهم' },
  continue_shopping: {
    en: 'Browse the menu',
    fr: 'Parcourir le menu',
    ar: 'تصفح القائمة',
  },

  // ── Hero ──
  hero_title: {
    en: 'Fresh Tortelloni Delivered To Your Door',
    fr: 'Tortelloni Frais Livrés à Votre Porte',
    ar: 'تورتيلوني طازج يُوصَّل إلى بابك',
  },
  hero_sub: {
    en: 'Choose your tortelloni, cooking style, and sauce.',
    fr: 'Choisissez vos tortelloni, mode de cuisson et sauce.',
    ar: 'اختر التورتيلوني وأسلوب الطهي والصلصة.',
  },
  hero_badge: {
    en: 'Premium Italian comfort food, delivery-first',
    fr: 'Cuisine réconfortante italienne premium, livraison avant tout',
    ar: 'طعام إيطالي فاخر، التوصيل أولاً',
  },

  // ── How It Works ──
  how_title: { en: 'How It Works', fr: 'Comment Ça Marche', ar: 'كيف يعمل' },
  how_1_t: { en: 'Build Your Bowl', fr: 'Composez Votre Bol', ar: 'كوّن طبقك' },
  how_1_d: {
    en: 'Pick your filling, cooking style, sauce and extras.',
    fr: 'Choisissez garniture, cuisson, sauce et extras.',
    ar: 'اختر الحشوة وأسلوب الطهي والصلصة والإضافات.',
  },
  how_2_t: { en: 'We Cook Fresh', fr: 'Nous Cuisinons Frais', ar: 'نطبخ طازجاً' },
  how_2_d: {
    en: 'Your tortelloni is prepared to order, never frozen.',
    fr: 'Vos tortelloni sont préparés à la commande, jamais congelés.',
    ar: 'يُحضَّر التورتيلوني عند الطلب، وغير مجمد أبداً.',
  },
  how_3_t: { en: 'Fast Delivery', fr: 'Livraison Rapide', ar: 'توصيل سريع' },
  how_3_d: {
    en: 'Hot and beautifully packaged, straight to your door.',
    fr: 'Chaud et joliment emballé, directement chez vous.',
    ar: 'ساخن ومعبأ بأناقة، مباشرة إلى بابك.',
  },

  // ── Sections (featured, reviews, faq) ──
  featured_title: { en: 'Featured Dishes', fr: 'Plats Vedettes', ar: 'أطباق مميزة' },
  featured_sub: {
    en: 'Signature combinations, ready in one tap.',
    fr: 'Combinaisons signature, en un seul clic.',
    ar: 'تركيبات مميزة، بنقرة واحدة.',
  },
  reviews_title: {
    en: 'What Our Customers Say',
    fr: 'Ce Que Disent Nos Clients',
    ar: 'ماذا يقول عملاؤنا',
  },
  faq_title: {
    en: 'Frequently Asked Questions',
    fr: 'Questions Fréquentes',
    ar: 'الأسئلة الشائعة',
  },
  est_delivery: {
    en: 'Estimated delivery',
    fr: 'Livraison estimée',
    ar: 'التوصيل المقدّر',
  },

  // ── Menu Builder ──
  menu_title: { en: 'Build Your Tortelloni', fr: 'Composez Vos Tortelloni', ar: 'كوّن التورتيلوني' },
  menu_sub: {
    en: 'Four steps to your perfect bowl.',
    fr: 'Quatre étapes vers votre bol parfait.',
    ar: 'أربع خطوات نحو طبقك المثالي.',
  },
  step: { en: 'Step', fr: 'Étape', ar: 'خطوة' },
  step_filling: { en: 'Choose Tortelloni', fr: 'Choisir les Tortelloni', ar: 'اختر التورتيلوني' },
  step_style: { en: 'Cooking Style', fr: 'Mode de Cuisson', ar: 'أسلوب الطهي' },
  step_sauce: { en: 'Choose Sauce', fr: 'Choisir la Sauce', ar: 'اختر الصلصة' },
  step_extras: { en: 'Extras', fr: 'Extras', ar: 'إضافات' },
  your_selection: { en: 'Your Selection', fr: 'Votre Sélection', ar: 'اختيارك' },
  quantity: { en: 'Quantity', fr: 'Quantité', ar: 'الكمية' },
  included: { en: 'Included', fr: 'Inclus', ar: 'مشمول' },

  // ── About Page ──
  about_title: { en: 'Our Story', fr: 'Notre Histoire', ar: 'قصتنا' },
  about_lead: {
    en: 'Tortello was created to bring fresh Italian comfort food to Morocco through a delivery-first experience.',
    fr: 'Tortello a été créé pour apporter une cuisine réconfortante italienne fraîche au Maroc grâce à une expérience axée sur la livraison.',
    ar: 'أُنشئ تورتيلو لتقديم الطعام الإيطالي الطازج إلى المغرب عبر تجربة تعتمد على التوصيل أولاً.',
  },
  mission_t: { en: 'Mission', fr: 'Mission', ar: 'مهمتنا' },
  mission_d: {
    en: 'Make authentic, fresh tortelloni accessible across Morocco, delivered with care.',
    fr: 'Rendre les tortelloni authentiques et frais accessibles partout au Maroc, livrés avec soin.',
    ar: 'جعل التورتيلوني الأصيل الطازج متاحاً في جميع أنحاء المغرب، مع توصيل بعناية.',
  },
  values_t: { en: 'Values', fr: 'Valeurs', ar: 'قيمنا' },
  values_d: {
    en: 'Quality without compromise, honest ingredients and warm hospitality.',
    fr: 'Qualité sans compromis, ingrédients honnêtes et hospitalité chaleureuse.',
    ar: 'جودة بلا تنازلات، مكونات صادقة وضيافة دافئة.',
  },
  quality_t: { en: 'Quality Ingredients', fr: 'Ingrédients de Qualité', ar: 'مكونات عالية الجودة' },
  quality_d: {
    en: 'Imported Italian flour and locally sourced produce.',
    fr: 'Farine italienne importée et produits locaux.',
    ar: 'دقيق إيطالي مستورد ومنتجات محلية.',
  },
  fresh_t: { en: 'Fresh Daily Preparation', fr: 'Préparation Fraîche Quotidienne', ar: 'تحضير طازج يومي' },
  fresh_d: {
    en: 'Every order is made from scratch the day it ships.',
    fr: 'Chaque commande est préparée le jour même.',
    ar: 'كل طلب يُحضَّر طازجاً في يوم إرساله.',
  },

  // ── Contact ──
  contact_title: { en: 'Get In Touch', fr: 'Contactez-Nous', ar: 'تواصل معنا' },
  contact_sub: {
    en: 'Questions, feedback or catering — we would love to hear from you.',
    fr: 'Questions, retours ou traiteur — nous serions ravis de vous entendre.',
    ar: 'أسئلة أو ملاحظات أو خدمات — يسعدنا تواصلك معنا.',
  },
  name: { en: 'Name', fr: 'Nom', ar: 'الاسم' },
  phone: { en: 'Phone', fr: 'Téléphone', ar: 'الهاتف' },
  email: { en: 'Email', fr: 'E-mail', ar: 'البريد الإلكتروني' },
  message: { en: 'Message', fr: 'Message', ar: 'الرسالة' },
  send_message: { en: 'Send Message', fr: 'Envoyer', ar: 'إرسال' },
  message_sent: {
    en: 'Thanks! We will get back to you shortly.',
    fr: 'Merci ! Nous vous répondrons rapidement.',
    ar: 'شكراً! سنعاود التواصل معك قريباً.',
  },
  chat_whatsapp: { en: 'Chat on WhatsApp', fr: 'Discuter sur WhatsApp', ar: 'تواصل عبر واتساب' },

  // ── Checkout ──
  checkout_title: { en: 'Checkout', fr: 'Paiement', ar: 'إتمام الطلب' },
  delivery_details: { en: 'Delivery Details', fr: 'Détails de Livraison', ar: 'تفاصيل التوصيل' },
  address: { en: 'Address', fr: 'Adresse', ar: 'العنوان' },
  city: { en: 'City', fr: 'Ville', ar: 'المدينة' },
  notes: { en: 'Delivery notes', fr: 'Notes de livraison', ar: 'ملاحظات التوصيل' },
  payment: { en: 'Payment', fr: 'Paiement', ar: 'الدفع' },
  cod: { en: 'Cash on Delivery', fr: 'Paiement à la livraison', ar: 'الدفع عند الاستلام' },
  card: { en: 'Credit Card', fr: 'Carte de Crédit', ar: 'بطاقة ائتمان' },
  coupon: { en: 'Coupon code', fr: 'Code promo', ar: 'رمز الخصم' },
  apply: { en: 'Apply', fr: 'Appliquer', ar: 'تطبيق' },
  place_order: { en: 'Place Order', fr: 'Valider la Commande', ar: 'تأكيد الطلب' },
  placing_order: { en: 'Placing Order…', fr: 'Commande en cours…', ar: 'جاري تأكيد الطلب…' },
  order_summary: { en: 'Order Summary', fr: 'Résumé de Commande', ar: 'ملخص الطلب' },
  order_placed: { en: 'Order Placed!', fr: 'Commande Validée !', ar: 'تم تأكيد الطلب!' },
  order_placed_d: {
    en: 'Your tortelloni is being prepared fresh. Track it from your account.',
    fr: 'Vos tortelloni sont en préparation. Suivez-les depuis votre compte.',
    ar: 'يجري تحضير التورتيلوني طازجاً. تابعه من حسابك.',
  },
  track_order: { en: 'Track Order', fr: 'Suivre la Commande', ar: 'تتبع الطلب' },
  order_not_found: { en: 'Order not found', fr: 'Commande introuvable', ar: 'الطلب غير موجود' },
  coupon_applied: { en: 'Coupon applied', fr: 'Code appliqué', ar: 'تم تطبيق الرمز' },
  coupon_invalid: { en: 'Invalid coupon', fr: 'Code invalide', ar: 'رمز غير صالح' },

  // ── Auth ──
  login_title: { en: 'Sign In', fr: 'Connexion', ar: 'تسجيل الدخول' },
  login_sub: { en: 'Sign in to your account to track orders and more.', fr: 'Connectez-vous pour suivre vos commandes.', ar: 'سجل الدخول لتتبع طلباتك.' },
  login: { en: 'Sign In', fr: 'Se Connecter', ar: 'تسجيل الدخول' },
  register_title: { en: 'Create Account', fr: 'Créer un Compte', ar: 'إنشاء حساب' },
  register_sub: { en: 'Create an account to save favorites and track orders.', fr: 'Créez un compte pour sauvegarder vos favoris.', ar: 'أنشئ حساباً لحفظ المفضلة وتتبع الطلبات.' },
  register: { en: 'Sign Up', fr: 'S\'inscrire', ar: 'التسجيل' },
  create_account: { en: 'Create Account', fr: 'Créer un Compte', ar: 'إنشاء حساب' },
  no_account: { en: 'Don\'t have an account?', fr: 'Pas de compte ?', ar: 'ليس لديك حساب؟' },
  have_account: { en: 'Already have an account?', fr: 'Déjà un compte ?', ar: 'لديك حساب بالفعل؟' },
  passwords_mismatch: { en: 'Passwords do not match', fr: 'Les mots de passe ne correspondent pas', ar: 'كلمات المرور غير متطابقة' },
  password: { en: 'Password', fr: 'Mot de passe', ar: 'كلمة المرور' },
  confirm_password: { en: 'Confirm Password', fr: 'Confirmer le mot de passe', ar: 'تأكيد كلمة المرور' },
  logout: { en: 'Sign Out', fr: 'Se Déconnecter', ar: 'تسجيل الخروج' },
  // ── Account ──
  account_title: { en: 'My Account', fr: 'Mon Compte', ar: 'حسابي' },
  account_orders: { en: 'My Orders', fr: 'Mes Commandes', ar: 'طلباتي' },
  account_favorites: { en: 'Favorite Orders', fr: 'Commandes Favorites', ar: 'الطلبات المفضلة' },
  account_loyalty: { en: 'Loyalty Points', fr: 'Points de Fidélité', ar: 'نقاط الولاء' },
  account_profile: { en: 'Profile', fr: 'Profil', ar: 'الملف الشخصي' },
  reorder: { en: 'Reorder', fr: 'Recommander', ar: 'أعد الطلب' },
  view_order: { en: 'View', fr: 'Voir', ar: 'عرض' },
  no_orders: { en: 'No orders yet.', fr: 'Aucune commande pour le moment.', ar: 'لا توجد طلبات بعد.' },
  orders_load_error: { en: 'Failed to load orders.', fr: 'Échec du chargement des commandes.', ar: 'فشل تحميل الطلبات.' },
  no_favorites: {
    en: 'No favorites yet. Heart a dish to save it here.',
    fr: 'Aucun favori. Aimez un plat pour le sauvegarder ici.',
    ar: 'لا مفضلات بعد. أضف طبقاً إلى المفضلة لحفظه هنا.',
  },
  points_balance: { en: 'Points Balance', fr: 'Solde de Points', ar: 'رصيد النقاط' },
  points_hint: {
    en: 'Earn 1 point per 10 MAD spent. Redeem for free dishes.',
    fr: 'Gagnez 1 point par 10 MAD dépensés. Échangez contre des plats gratuits.',
    ar: 'اكسب نقطة لكل 10 دراهم. استبدلها بأطباق مجانية.',
  },
  redeem: { en: 'Redeem', fr: 'Échanger', ar: 'استبدال' },

  // ── Cart Drawer ──
  free_delivery_progress: {
    en: 'away from free delivery',
    fr: 'pour la livraison gratuite',
    ar: 'للتوصيل المجاني',
  },
  free_delivery_unlocked: {
    en: 'Free delivery unlocked!',
    fr: 'Livraison gratuite débloquée !',
    ar: 'تم تفعيل التوصيل المجاني!',
  },

  // ── Order Tracking ──
  status_preparing: { en: 'Preparing', fr: 'En préparation', ar: 'قيد التحضير' },
  status_on_the_way: { en: 'On the way', fr: 'En route', ar: 'في الطريق' },
  status_delivered: { en: 'Delivered', fr: 'Livré', ar: 'تم التوصيل' },
  order_received: { en: 'Order received', fr: 'Commande reçue', ar: 'تم استلام الطلب' },

  // ── Legal Pages ──
  last_updated: {
    en: 'Last updated: June 2026',
    fr: 'Dernière mise à jour : juin 2026',
    ar: 'آخر تحديث: يونيو 2026',
  },

  // ── Footer ──
  footer_tagline: {
    en: 'Premium tortelloni, delivered fresh across Morocco.',
    fr: 'Tortelloni premium, livrés frais partout au Maroc.',
    ar: 'تورتيلوني فاخر، يُوصَّل طازجاً في كل المغرب.',
  },
  footer_legal: { en: 'Legal', fr: 'Légal', ar: 'قانوني' },
  footer_explore: { en: 'Explore', fr: 'Explorer', ar: 'استكشف' },
  privacy: { en: 'Privacy Policy', fr: 'Politique de Confidentialité', ar: 'سياسة الخصوصية' },
  terms: { en: 'Terms & Conditions', fr: 'Conditions Générales', ar: 'الشروط والأحكام' },
  rights: {
    en: 'All rights reserved.',
    fr: 'Tous droits réservés.',
    ar: 'جميع الحقوق محفوظة.',
  },
  remove: { en: 'Remove', fr: 'Retirer', ar: 'إزالة' },
} as const

export type DictKey = keyof typeof dict

export function translate(key: DictKey, locale: Locale): string {
  const entry = dict[key]
  return entry ? entry[locale] : (key as string)
}
