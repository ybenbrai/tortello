import type {
  OptionItem,
  FeaturedDish,
  Review,
  DeliveryArea,
  Faq,
  OrderRecord,
} from './types'

export const DELIVERY_FEE_DEFAULT = 20 // MAD
export const FREE_DELIVERY_THRESHOLD = 250

export const fillings: OptionItem[] = [
  {
    id: 'cheese',
    name: { en: 'Cheese', fr: 'Fromage', ar: 'جبن' },
    price: 65,
    image: '/images/dish-cheese.png',
    desc: {
      en: 'A blend of ricotta, parmesan and mozzarella.',
      fr: 'Un mélange de ricotta, parmesan et mozzarella.',
      ar: 'مزيج من الريكوتا والبارميزان والموزاريلا.',
    },
  },
  {
    id: 'beef',
    name: { en: 'Beef', fr: 'Bœuf', ar: 'لحم بقري' },
    price: 78,
    image: '/images/dish-beef.png',
    desc: {
      en: 'Slow-braised seasoned beef.',
      fr: 'Bœuf assaisonné braisé lentement.',
      ar: 'لحم بقري متبّل مطهو ببطء.',
    },
  },
  {
    id: 'chicken',
    name: { en: 'Chicken', fr: 'Poulet', ar: 'دجاج' },
    price: 72,
    image: '/images/dish-chicken.png',
    desc: {
      en: 'Tender herbed chicken filling.',
      fr: 'Garniture de poulet tendre aux herbes.',
      ar: 'حشوة دجاج طري بالأعشاب.',
    },
  },
  {
    id: 'spinach',
    name: {
      en: 'Spinach & Ricotta',
      fr: 'Épinards & Ricotta',
      ar: 'سبانخ وريكوتا',
    },
    price: 68,
    image: '/images/dish-spinach.png',
    desc: {
      en: 'Fresh spinach with creamy ricotta.',
      fr: 'Épinards frais et ricotta crémeuse.',
      ar: 'سبانخ طازجة مع ريكوتا كريمية.',
    },
  },
]

export const cookingStyles: OptionItem[] = [
  { id: 'boiled', name: { en: 'Boiled', fr: 'Bouilli', ar: 'مسلوق' }, price: 0 },
  {
    id: 'crispy',
    name: {
      en: 'Crispy Pan-Seared',
      fr: 'Poêlé Croustillant',
      ar: 'مقلي مقرمش',
    },
    price: 12,
  },
  { id: 'fried', name: { en: 'Fried', fr: 'Frit', ar: 'مقلي' }, price: 15 },
  {
    id: 'gratin',
    name: { en: 'Oven Baked Gratin', fr: 'Gratiné au Four', ar: 'غراتان بالفرن' },
    price: 18,
  },
]

export const sauces: OptionItem[] = [
  {
    id: 'tomato',
    name: { en: 'Tomato Basil', fr: 'Tomate Basilic', ar: 'طماطم وريحان' },
    price: 0,
  },
  { id: 'alfredo', name: { en: 'Alfredo', fr: 'Alfredo', ar: 'ألفريدو' }, price: 10 },
  { id: 'pesto', name: { en: 'Pesto', fr: 'Pesto', ar: 'بيستو' }, price: 12 },
  {
    id: 'mushroom',
    name: {
      en: 'Mushroom Cream',
      fr: 'Crème de Champignons',
      ar: 'كريمة الفطر',
    },
    price: 14,
  },
  {
    id: 'truffle',
    name: {
      en: 'Truffle Mushroom',
      fr: 'Truffe & Champignons',
      ar: 'كمأة وفطر',
    },
    price: 35,
  },
]

export const extras: OptionItem[] = [
  { id: 'parmesan', name: { en: 'Parmesan', fr: 'Parmesan', ar: 'بارميزان' }, price: 8 },
  {
    id: 'mozzarella',
    name: { en: 'Mozzarella', fr: 'Mozzarella', ar: 'موزاريلا' },
    price: 10,
  },
  {
    id: 'extra-sauce',
    name: { en: 'Extra Sauce', fr: 'Sauce Supplémentaire', ar: 'صلصة إضافية' },
    price: 9,
  },
  {
    id: 'chili',
    name: { en: 'Chili Flakes', fr: 'Flocons de Piment', ar: 'رقائق الفلفل الحار' },
    price: 4,
  },
]

export const featuredDishes: FeaturedDish[] = [
  {
    id: 'truffle-signature',
    name: {
      en: 'Truffle Signature',
      fr: 'Signature Truffe',
      ar: 'توقيع الكمأة',
    },
    desc: {
      en: 'Cheese tortelloni, oven gratin, truffle mushroom sauce.',
      fr: 'Tortelloni au fromage, gratiné, sauce truffe.',
      ar: 'تورتيلوني بالجبن، غراتان، صلصة الكمأة.',
    },
    price: 118,
    image: '/images/dish-truffle.png',
    tag: { en: 'Bestseller', fr: 'Top vente', ar: 'الأكثر مبيعاً' },
  },
  {
    id: 'classic-cheese',
    name: { en: 'Classic Cheese', fr: 'Fromage Classique', ar: 'جبن كلاسيكي' },
    desc: {
      en: 'Cheese tortelloni, boiled, alfredo sauce.',
      fr: 'Tortelloni au fromage, bouilli, sauce alfredo.',
      ar: 'تورتيلوني بالجبن، مسلوق، صلصة ألفريدو.',
    },
    price: 75,
    image: '/images/dish-cheese.png',
  },
  {
    id: 'beef-pomodoro',
    name: { en: 'Beef Pomodoro', fr: 'Bœuf Pomodoro', ar: 'لحم بومودورو' },
    desc: {
      en: 'Beef tortelloni, boiled, tomato basil sauce.',
      fr: 'Tortelloni au bœuf, bouilli, sauce tomate basilic.',
      ar: 'تورتيلوني باللحم، مسلوق، صلصة الطماطم والريحان.',
    },
    price: 78,
    image: '/images/dish-beef.png',
    tag: { en: 'Popular', fr: 'Populaire', ar: 'رائج' },
  },
  {
    id: 'crispy-chicken',
    name: { en: 'Crispy Chicken', fr: 'Poulet Croustillant', ar: 'دجاج مقرمش' },
    desc: {
      en: 'Chicken tortelloni, pan-seared, mushroom cream.',
      fr: 'Tortelloni au poulet, poêlé, crème de champignons.',
      ar: 'تورتيلوني بالدجاج، مقلي، كريمة الفطر.',
    },
    price: 96,
    image: '/images/dish-chicken.png',
  },
  {
    id: 'green-pesto',
    name: { en: 'Green Pesto', fr: 'Pesto Vert', ar: 'بيستو أخضر' },
    desc: {
      en: 'Spinach & ricotta tortelloni, boiled, pesto.',
      fr: 'Tortelloni épinards & ricotta, bouilli, pesto.',
      ar: 'تورتيلوني سبانخ وريكوتا، مسلوق، بيستو.',
    },
    price: 80,
    image: '/images/dish-spinach.png',
  },
  {
    id: 'gold-hero',
    name: { en: "Chef's Bowl", fr: 'Bol du Chef', ar: 'طبق الشيف' },
    desc: {
      en: 'Cheese tortelloni, gratin, mushroom cream, parmesan.',
      fr: 'Tortelloni au fromage, gratiné, crème de champignons, parmesan.',
      ar: 'تورتيلوني بالجبن، غراتان، كريمة الفطر، بارميزان.',
    },
    price: 105,
    image: '/images/hero-tortelloni.png',
    tag: { en: "Chef's pick", fr: 'Choix du chef', ar: 'اختيار الشيف' },
  },
]

export const reviews: Review[] = [
  {
    id: 'r1',
    name: 'Sofia A.',
    city: { en: 'Casablanca', fr: 'Casablanca', ar: 'الدار البيضاء' },
    rating: 5,
    text: {
      en: 'The truffle tortelloni arrived hot and perfectly cooked. Best delivery pasta in Morocco.',
      fr: 'Les tortelloni à la truffe sont arrivés chauds et parfaitement cuits. La meilleure livraison de pâtes au Maroc.',
      ar: 'وصلت التورتيلوني بالكمأة ساخنة ومطبوخة بإتقان. أفضل توصيل للمعكرونة في المغرب.',
    },
  },
  {
    id: 'r2',
    name: 'Youssef B.',
    city: { en: 'Rabat', fr: 'Rabat', ar: 'الرباط' },
    rating: 5,
    text: {
      en: 'Customizing my own bowl felt premium. The crispy pan-seared style is a must.',
      fr: 'Composer mon propre bol était une expérience premium. Le style poêlé croustillant est incontournable.',
      ar: 'تخصيص طبقي الخاص كان تجربة فاخرة. أسلوب القلي المقرمش لا بد منه.',
    },
  },
  {
    id: 'r3',
    name: 'Lina M.',
    city: { en: 'Marrakech', fr: 'Marrakech', ar: 'مراكش' },
    rating: 5,
    text: {
      en: 'Fresh, fast and beautifully packaged. Tortello is now our weekend ritual.',
      fr: 'Frais, rapide et joliment emballé. Tortello est devenu notre rituel du week-end.',
      ar: 'طازج وسريع ومعبأ بأناقة. أصبح تورتيلو طقسنا في عطلة نهاية الأسبوع.',
    },
  },
]

export const deliveryAreas: DeliveryArea[] = [
  {
    id: 'casablanca',
    name: { en: 'Casablanca', fr: 'Casablanca', ar: 'الدار البيضاء' },
    eta: '25-35 min',
    fee: 20,
    x: 33,
    y: 40,
  },
  {
    id: 'rabat',
    name: { en: 'Rabat', fr: 'Rabat', ar: 'الرباط' },
    eta: '30-40 min',
    fee: 22,
    x: 42,
    y: 32,
  },
  {
    id: 'marrakech',
    name: { en: 'Marrakech', fr: 'Marrakech', ar: 'مراكش' },
    eta: '30-45 min',
    fee: 25,
    x: 38,
    y: 58,
  },
  {
    id: 'tangier',
    name: { en: 'Tangier', fr: 'Tanger', ar: 'طنجة' },
    eta: '35-50 min',
    fee: 28,
    x: 46,
    y: 14,
  },
  {
    id: 'agadir',
    name: { en: 'Agadir', fr: 'Agadir', ar: 'أكادير' },
    eta: '40-55 min',
    fee: 30,
    x: 26,
    y: 68,
  },
]

export const faqs: Faq[] = [
  {
    q: {
      en: 'How does Tortello delivery work?',
      fr: 'Comment fonctionne la livraison Tortello ?',
      ar: 'كيف يعمل توصيل تورتيلو؟',
    },
    a: {
      en: 'Choose your filling, cooking style and sauce, add extras, then checkout. We prepare your tortelloni fresh and deliver to your door.',
      fr: 'Choisissez votre garniture, mode de cuisson et sauce, ajoutez des extras, puis commandez. Nous préparons vos tortelloni frais et les livrons à votre porte.',
      ar: 'اختر الحشوة وأسلوب الطهي والصلصة، أضف الإضافات، ثم أكمل الطلب. نحضّر التورتيلوني طازجاً ونوصله إلى بابك.',
    },
  },
  {
    q: {
      en: 'Which cities do you deliver to?',
      fr: 'Dans quelles villes livrez-vous ?',
      ar: 'إلى أي مدن توصلون؟',
    },
    a: {
      en: 'We currently deliver in Casablanca, Rabat, Marrakech, Tangier and Agadir.',
      fr: 'Nous livrons actuellement à Casablanca, Rabat, Marrakech, Tanger et Agadir.',
      ar: 'نوصل حالياً إلى الدار البيضاء والرباط ومراكش وطنجة وأكادير.',
    },
  },
  {
    q: {
      en: 'Is the pasta made fresh?',
      fr: 'Les pâtes sont-elles fraîches ?',
      ar: 'هل المعكرونة طازجة؟',
    },
    a: {
      en: 'Yes. Every batch of tortelloni is prepared daily using fresh ingredients, never frozen.',
      fr: 'Oui. Chaque fournée de tortelloni est préparée quotidiennement avec des ingrédients frais, jamais congelés.',
      ar: 'نعم. تُحضّر كل دفعة من التورتيلوني يومياً باستخدام مكونات طازجة وغير مجمدة أبداً.',
    },
  },
  {
    q: {
      en: 'What payment methods do you accept?',
      fr: 'Quels moyens de paiement acceptez-vous ?',
      ar: 'ما طرق الدفع التي تقبلونها؟',
    },
    a: {
      en: 'Cash on delivery and major credit cards are accepted at checkout.',
      fr: 'Le paiement à la livraison et les principales cartes de crédit sont acceptés.',
      ar: 'نقبل الدفع عند الاستلام والبطاقات الائتمانية الرئيسية عند الدفع.',
    },
  },
]

export const sampleOrders: OrderRecord[] = [
  {
    id: 'TRT-10482',
    date: '2026-06-21',
    total: 162,
    status: 'on-the-way',
    city: { en: 'Casablanca', fr: 'Casablanca', ar: 'الدار البيضاء' },
    items: [
      {
        label: {
          en: 'Truffle Signature x1',
          fr: 'Signature Truffe x1',
          ar: 'توقيع الكمأة x1',
        },
        quantity: 1,
      },
      {
        label: {
          en: 'Classic Cheese x1',
          fr: 'Fromage Classique x1',
          ar: 'جبن كلاسيكي x1',
        },
        quantity: 1,
      },
    ],
  },
  {
    id: 'TRT-10391',
    date: '2026-06-14',
    total: 98,
    status: 'delivered',
    city: { en: 'Rabat', fr: 'Rabat', ar: 'الرباط' },
    items: [
      {
        label: {
          en: 'Crispy Chicken x1',
          fr: 'Poulet Croustillant x1',
          ar: 'دجاج مقرمش x1',
        },
        quantity: 1,
      },
    ],
  },
  {
    id: 'TRT-10277',
    date: '2026-06-02',
    total: 235,
    status: 'delivered',
    city: { en: 'Marrakech', fr: 'Marrakech', ar: 'مراكش' },
    items: [
      {
        label: {
          en: 'Beef Pomodoro x2',
          fr: 'Bœuf Pomodoro x2',
          ar: 'لحم بومودورو x2',
        },
        quantity: 2,
      },
      {
        label: {
          en: 'Green Pesto x1',
          fr: 'Pesto Vert x1',
          ar: 'بيستو أخضر x1',
        },
        quantity: 1,
      },
    ],
  },
]

export const COUPONS: Record<string, number> = {
  TORTELLO10: 0.1,
  WELCOME15: 0.15,
  FRESH20: 0.2,
}
