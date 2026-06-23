import { LegalPage, type LegalSection } from '@/components/legal-page'

const sections: LegalSection[] = [
  {
    heading: {
      en: 'Delivery Zones',
      fr: 'Zones de Livraison',
      ar: 'مناطق التوصيل',
    },
    body: {
      en: 'We currently deliver across Casablanca, Rabat, Marrakech, Tangier and Agadir. Delivery fees and estimated times vary by city and are shown at checkout.',
      fr: 'Nous livrons actuellement à Casablanca, Rabat, Marrakech, Tanger et Agadir. Les frais et délais de livraison varient selon la ville et sont indiqués au paiement.',
      ar: 'نوصل حالياً إلى الدار البيضاء والرباط ومراكش وطنجة وأكادير. تختلف رسوم وأوقات التوصيل حسب المدينة وتظهر عند الدفع.',
    },
  },
  {
    heading: {
      en: 'Delivery Times',
      fr: 'Délais de Livraison',
      ar: 'أوقات التوصيل',
    },
    body: {
      en: 'Most orders arrive within 25 to 55 minutes depending on your location. You can track your order status in real time from your account.',
      fr: 'La plupart des commandes arrivent en 25 à 55 minutes selon votre emplacement. Vous pouvez suivre l’état de votre commande en temps réel depuis votre compte.',
      ar: 'تصل معظم الطلبات خلال 25 إلى 55 دقيقة حسب موقعك. يمكنك تتبع حالة طلبك مباشرةً من حسابك.',
    },
  },
  {
    heading: {
      en: 'Free Delivery',
      fr: 'Livraison Gratuite',
      ar: 'توصيل مجاني',
    },
    body: {
      en: 'Enjoy free delivery on all orders over 250 MAD. The discount is applied automatically in your cart.',
      fr: 'Profitez de la livraison gratuite pour toute commande supérieure à 250 MAD. La remise est appliquée automatiquement dans votre panier.',
      ar: 'استمتع بتوصيل مجاني لكل الطلبات التي تتجاوز 250 درهماً. يُطبَّق الخصم تلقائياً في سلتك.',
    },
  },
]

export default function DeliveryInfoPage() {
  return <LegalPage titleKey="delivery_info" sections={sections} />
}
