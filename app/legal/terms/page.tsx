import { LegalPage, type LegalSection } from '@/components/legal-page'

const sections: LegalSection[] = [
  {
    heading: {
      en: 'Orders & Pricing',
      fr: 'Commandes & Tarifs',
      ar: 'الطلبات والأسعار',
    },
    body: {
      en: 'All prices are listed in Moroccan Dirham (MAD) and include applicable taxes. Orders are confirmed once payment or cash-on-delivery is selected at checkout.',
      fr: 'Tous les prix sont en dirham marocain (MAD) et incluent les taxes applicables. Les commandes sont confirmées dès que le paiement ou le paiement à la livraison est sélectionné.',
      ar: 'جميع الأسعار بالدرهم المغربي (درهم) وتشمل الضرائب المطبقة. تُؤكَّد الطلبات بمجرد اختيار الدفع أو الدفع عند الاستلام.',
    },
  },
  {
    heading: {
      en: 'Cancellations',
      fr: 'Annulations',
      ar: 'الإلغاءات',
    },
    body: {
      en: 'Because every order is freshly prepared, cancellations are only possible before preparation begins. Contact us immediately if you need to change an order.',
      fr: 'Comme chaque commande est préparée fraîchement, les annulations ne sont possibles qu’avant le début de la préparation. Contactez-nous immédiatement pour modifier une commande.',
      ar: 'لأن كل طلب يُحضَّر طازجاً، يمكن الإلغاء فقط قبل بدء التحضير. تواصل معنا فوراً إذا احتجت لتغيير الطلب.',
    },
  },
  {
    heading: {
      en: 'Liability',
      fr: 'Responsabilité',
      ar: 'المسؤولية',
    },
    body: {
      en: 'Tortello is committed to food safety and quality. Please inform us of any allergies before ordering, as our dishes may contain gluten, dairy and other allergens.',
      fr: 'Tortello s’engage pour la sécurité et la qualité alimentaire. Informez-nous de toute allergie avant de commander, car nos plats peuvent contenir du gluten, des produits laitiers et d’autres allergènes.',
      ar: 'تلتزم تورتيلو بسلامة الطعام وجودته. يرجى إبلاغنا بأي حساسية قبل الطلب، فقد تحتوي أطباقنا على الغلوتين ومنتجات الألبان ومسببات حساسية أخرى.',
    },
  },
]

export default function TermsPage() {
  return <LegalPage titleKey="terms" sections={sections} />
}
