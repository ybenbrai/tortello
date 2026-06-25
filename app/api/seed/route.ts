// ============================================================
// POST /api/seed — seed database with default data (admin)
// Supports partial seeding via { seed: 'menu' | 'featured' | ... }
// ============================================================

import { getDb } from '@/lib/db'
import { menuItems, featuredDishes, reviews, faqs, coupons, siteSettings } from '@/lib/db/schema'
import { checkAdmin } from '@/lib/api-auth'
import { ok, err, UNAUTHORIZED } from '@/lib/api-response'

export async function POST(req: Request) {
  try {
    if (!(await checkAdmin())) return UNAUTHORIZED

    const body = await req.json().catch(() => ({}))
    const { seed = 'all' } = body

    if (seed === 'all' || seed === 'menu') {
      await getDb().insert(menuItems).values([
        { id: 'cheese', type: 'filling', nameEn: 'Cheese', nameFr: 'Fromage', nameAr: 'جبن', price: 65, image: '/images/dish-cheese.png', descEn: 'A blend of ricotta, parmesan and mozzarella.', descFr: 'Un mélange de ricotta, parmesan et mozzarella.', descAr: 'مزيج من الريكوتا والبارميزان والموزاريلا.', sortOrder: 1 },
        { id: 'beef', type: 'filling', nameEn: 'Beef', nameFr: 'Bœuf', nameAr: 'لحم بقري', price: 78, image: '/images/dish-beef.png', descEn: 'Slow-braised seasoned beef.', descFr: 'Bœuf assaisonné braisé lentement.', descAr: 'لحم بقري متبّل مطهو ببطء.', sortOrder: 2 },
        { id: 'chicken', type: 'filling', nameEn: 'Chicken', nameFr: 'Poulet', nameAr: 'دجاج', price: 72, image: '/images/dish-chicken.png', descEn: 'Tender herbed chicken filling.', descFr: 'Garniture de poulet tendre aux herbes.', descAr: 'حشوة دجاج طري بالأعشاب.', sortOrder: 3 },
        { id: 'spinach', type: 'filling', nameEn: 'Spinach & Ricotta', nameFr: 'Épinards & Ricotta', nameAr: 'سبانخ وريكوتا', price: 68, image: '/images/dish-spinach.png', descEn: 'Fresh spinach with creamy ricotta.', descFr: 'Épinards frais et ricotta crémeuse.', descAr: 'سبانخ طازجة مع ريكوتا كريمية.', sortOrder: 4 },
        { id: 'boiled', type: 'style', nameEn: 'Boiled', nameFr: 'Bouilli', nameAr: 'مسلوق', price: 0, sortOrder: 1 },
        { id: 'crispy', type: 'style', nameEn: 'Crispy Pan-Seared', nameFr: 'Poêlé Croustillant', nameAr: 'مقلي مقرمش', price: 12, sortOrder: 2 },
        { id: 'fried', type: 'style', nameEn: 'Fried', nameFr: 'Frit', nameAr: 'مقلي', price: 15, sortOrder: 3 },
        { id: 'gratin', type: 'style', nameEn: 'Oven Baked Gratin', nameFr: 'Gratiné au Four', nameAr: 'غراتان بالفرن', price: 18, sortOrder: 4 },
        { id: 'tomato', type: 'sauce', nameEn: 'Tomato Basil', nameFr: 'Tomate Basilic', nameAr: 'طماطم وريحان', price: 0, sortOrder: 1 },
        { id: 'alfredo', type: 'sauce', nameEn: 'Alfredo', nameFr: 'Alfredo', nameAr: 'ألفريدو', price: 10, sortOrder: 2 },
        { id: 'pesto', type: 'sauce', nameEn: 'Pesto', nameFr: 'Pesto', nameAr: 'بيستو', price: 12, sortOrder: 3 },
        { id: 'mushroom', type: 'sauce', nameEn: 'Mushroom Cream', nameFr: 'Crème de Champignons', nameAr: 'كريمة الفطر', price: 14, sortOrder: 4 },
        { id: 'truffle', type: 'sauce', nameEn: 'Truffle Mushroom', nameFr: 'Truffe & Champignons', nameAr: 'كمأة وفطر', price: 35, sortOrder: 5 },
        { id: 'parmesan', type: 'extra', nameEn: 'Parmesan', nameFr: 'Parmesan', nameAr: 'بارميزان', price: 8, sortOrder: 1 },
        { id: 'mozzarella', type: 'extra', nameEn: 'Mozzarella', nameFr: 'Mozzarella', nameAr: 'موزاريلا', price: 10, sortOrder: 2 },
        { id: 'extra-sauce', type: 'extra', nameEn: 'Extra Sauce', nameFr: 'Sauce Supplémentaire', nameAr: 'صلصة إضافية', price: 9, sortOrder: 3 },
        { id: 'chili', type: 'extra', nameEn: 'Chili Flakes', nameFr: 'Flocons de Piment', nameAr: 'رقائق الفلفل الحار', price: 4, sortOrder: 4 },
      ]).onConflictDoNothing()
    }

    if (seed === 'all' || seed === 'featured') {
      await getDb().insert(featuredDishes).values([
        { id: 'truffle-signature', nameEn: 'Truffle Signature', nameFr: 'Signature Truffe', nameAr: 'توقيع الكمأة', descEn: 'Cheese tortelloni, oven gratin, truffle mushroom sauce.', descFr: 'Tortelloni au fromage, gratiné, sauce truffe.', descAr: 'تورتيلوني بالجبن، غراتان، صلصة الكمأة.', price: 118, image: '/images/dish-truffle.png', tagEn: 'Bestseller', tagFr: 'Top vente', tagAr: 'الأكثر مبيعاً', sortOrder: 1 },
        { id: 'classic-cheese', nameEn: 'Classic Cheese', nameFr: 'Fromage Classique', nameAr: 'جبن كلاسيكي', descEn: 'Cheese tortelloni, boiled, alfredo sauce.', descFr: 'Tortelloni au fromage, bouilli, sauce alfredo.', descAr: 'تورتيلوني بالجبن، مسلوق، صلصة ألفريدو.', price: 75, image: '/images/dish-cheese.png', sortOrder: 2 },
        { id: 'beef-pomodoro', nameEn: 'Beef Pomodoro', nameFr: 'Bœuf Pomodoro', nameAr: 'لحم بومودورو', descEn: 'Beef tortelloni, boiled, tomato basil sauce.', descFr: 'Tortelloni au bœuf, bouilli, sauce tomate basilic.', descAr: 'تورتيلوني باللحم، مسلوق، صلصة الطماطم والريحان.', price: 78, image: '/images/dish-beef.png', tagEn: 'Popular', tagFr: 'Populaire', tagAr: 'رائج', sortOrder: 3 },
        { id: 'crispy-chicken', nameEn: 'Crispy Chicken', nameFr: 'Poulet Croustillant', nameAr: 'دجاج مقرمش', descEn: 'Chicken tortelloni, pan-seared, mushroom cream.', descFr: 'Tortelloni au poulet, poêlé, crème de champignons.', descAr: 'تورتيلوني بالدجاج، مقلي، كريمة الفطر.', price: 96, image: '/images/dish-chicken.png', sortOrder: 4 },
        { id: 'green-pesto', nameEn: 'Green Pesto', nameFr: 'Pesto Vert', nameAr: 'بيستو أخضر', descEn: 'Spinach & ricotta tortelloni, boiled, pesto.', descFr: 'Tortelloni épinards & ricotta, bouilli, pesto.', descAr: 'تورتيلوني سبانخ وريكوتا، مسلوق، بيستو.', price: 80, image: '/images/dish-spinach.png', sortOrder: 5 },
        { id: 'gold-hero', nameEn: "Chef's Bowl", nameFr: 'Bol du Chef', nameAr: 'طبق الشيف', descEn: 'Cheese tortelloni, gratin, mushroom cream, parmesan.', descFr: 'Tortelloni au fromage, gratiné, crème de champignons, parmesan.', descAr: 'تورتيلوني بالجبن، غراتان، كريمة الفطر، بارميزان.', price: 105, image: '/images/hero-tortelloni.png', tagEn: "Chef's pick", tagFr: 'Choix du chef', tagAr: 'اختيار الشيف', sortOrder: 6 },
      ]).onConflictDoNothing()
    }

    if (seed === 'all' || seed === 'reviews') {
      await getDb().insert(reviews).values([
        { id: 'r1', name: 'Sofia A.', cityEn: 'Casablanca', cityFr: 'Casablanca', cityAr: 'الدار البيضاء', rating: 5, textEn: 'The truffle tortelloni arrived hot and perfectly cooked. Best delivery pasta in Morocco.', textFr: 'Les tortelloni à la truffe sont arrivés chauds et parfaitement cuits. La meilleure livraison de pâtes au Maroc.', textAr: 'وصلت التورتيلوني بالكمأة ساخنة ومطبوخة بإتقان. أفضل توصيل للمعكرونة في المغرب.' },
        { id: 'r2', name: 'Youssef B.', cityEn: 'Casablanca', cityFr: 'Casablanca', cityAr: 'الدار البيضاء', rating: 5, textEn: 'Customizing my own bowl felt premium. The crispy pan-seared style is a must.', textFr: 'Composer mon propre bol était une expérience premium. Le style poêlé croustillant est incontournable.', textAr: 'تخصيص طبقي الخاص كان تجربة فاخرة. أسلوب القلي المقرمش لا بد منه.' },
        { id: 'r3', name: 'Lina M.', cityEn: 'Casablanca', cityFr: 'Casablanca', cityAr: 'الدار البيضاء', rating: 5, textEn: 'Fresh, fast and beautifully packaged. Tortello is now our weekend ritual.', textFr: 'Frais, rapide et joliment emballé. Tortello est devenu notre rituel du week-end.', textAr: 'طازج وسريع ومعبأ بأناقة. أصبح تورتيلو طقسنا في عطلة نهاية الأسبوع.' },
      ]).onConflictDoNothing()
    }

    if (seed === 'all' || seed === 'faqs') {
      await getDb().insert(faqs).values([
        { id: 'f1', qEn: 'How does Tortello delivery work?', qFr: 'Comment fonctionne la livraison Tortello ?', qAr: 'كيف يعمل توصيل تورتيلو؟', aEn: 'Choose your filling, cooking style and sauce, add extras, then checkout. We prepare your tortelloni fresh and deliver to your door.', aFr: 'Choisissez votre garniture, mode de cuisson et sauce, ajoutez des extras, puis commandez. Nous préparons vos tortelloni frais et les livrons à votre porte.', aAr: 'اختر الحشوة وأسلوب الطهي والصلصة، أضف الإضافات، ثم أكمل الطلب. نحضّر التورتيلوني طازجاً ونوصله إلى بابك.', sortOrder: 1 },
        { id: 'f2', qEn: 'Which cities do you deliver to?', qFr: 'Dans quelles villes livrez-vous ?', qAr: 'إلى أي مدن توصلون؟', aEn: 'We currently deliver in Casablanca.', aFr: 'Nous livrons actuellement à Casablanca.', aAr: 'نوصل حالياً إلى الدار البيضاء.', sortOrder: 2 },
        { id: 'f3', qEn: 'Is the pasta made fresh?', qFr: 'Les pâtes sont-elles fraîches ?', qAr: 'هل المعكرونة طازجة؟', aEn: 'Yes. Every batch of tortelloni is prepared daily using fresh ingredients, never frozen.', aFr: 'Oui. Chaque fournée de tortelloni est préparée quotidiennement avec des ingrédients frais, jamais congelés.', aAr: 'نعم. تُحضّر كل دفعة من التورتيلوني يومياً باستخدام مكونات طازجة وغير مجمدة أبداً.', sortOrder: 3 },
        { id: 'f4', qEn: 'What payment methods do you accept?', qFr: 'Quels moyens de paiement acceptez-vous ?', qAr: 'ما طرق الدفع التي تقبلونها؟', aEn: 'Cash on delivery and major credit cards are accepted at checkout.', aFr: 'Le paiement à la livraison et les principales cartes de crédit sont acceptés.', aAr: 'نقبل الدفع عند الاستلام والبطاقات الائتمانية الرئيسية عند الدفع.', sortOrder: 4 },
      ]).onConflictDoNothing()
    }

    if (seed === 'all' || seed === 'coupons') {
      await getDb().insert(coupons).values([
        { code: 'TORTELLO10', discount: 0.1, active: true, maxUses: 100, usedCount: 0 },
        { code: 'WELCOME15', discount: 0.15, active: true, maxUses: 50, usedCount: 0 },
        { code: 'FRESH20', discount: 0.2, active: true, maxUses: 25, usedCount: 0 },
      ]).onConflictDoNothing()
    }

    if (seed === 'all' || seed === 'settings') {
      const defaults = [
        { key: 'hero_image', value: '/images/hero-tortelloni.png' },
        { key: 'hero_card_title', value: 'Fresh daily' },
        { key: 'hero_card_subtitle', value: 'Made to order' },
        { key: 'hero_rating_text', value: '4.9 · 2,400+ happy deliveries' },
        { key: 'hero_avatar_images', value: '/images/avatar-1.svg,/images/avatar-2.svg,/images/avatar-3.svg,/images/avatar-4.svg' },
      ]
      for (const s of defaults) {
        await getDb().insert(siteSettings).values(s).onConflictDoUpdate({ target: siteSettings.key, set: { value: s.value } })
      }
    }

    return ok({ seeded: true })
  } catch {
    return err('Failed to seed database', 500)
  }
}
