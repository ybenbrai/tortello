import { LegalPage, type LegalSection } from '@/components/legal-page'

const sections: LegalSection[] = [
  {
    heading: {
      en: 'Information We Collect',
      fr: 'Informations Que Nous Collectons',
      ar: 'المعلومات التي نجمعها',
    },
    body: {
      en: 'We collect the details you provide when placing an order, such as your name, phone number, email and delivery address, to prepare and deliver your tortelloni.',
      fr: 'Nous collectons les informations que vous fournissez lors d’une commande, telles que votre nom, téléphone, e-mail et adresse de livraison, afin de préparer et livrer vos tortelloni.',
      ar: 'نجمع التفاصيل التي تقدمها عند الطلب، مثل اسمك ورقم هاتفك وبريدك الإلكتروني وعنوان التوصيل، لتحضير وتوصيل التورتيلوني.',
    },
  },
  {
    heading: {
      en: 'How We Use Your Data',
      fr: 'Utilisation de Vos Données',
      ar: 'كيف نستخدم بياناتك',
    },
    body: {
      en: 'Your data is used solely to fulfil orders, improve our service and keep you informed about your delivery. We never sell your personal information.',
      fr: 'Vos données servent uniquement à traiter les commandes, améliorer notre service et vous informer sur votre livraison. Nous ne vendons jamais vos informations personnelles.',
      ar: 'تُستخدم بياناتك فقط لتنفيذ الطلبات وتحسين خدمتنا وإبقائك على اطلاع بتوصيلك. لا نبيع معلوماتك الشخصية أبداً.',
    },
  },
  {
    heading: {
      en: 'Your Rights',
      fr: 'Vos Droits',
      ar: 'حقوقك',
    },
    body: {
      en: 'You may request access to, correction of, or deletion of your personal data at any time by contacting us at hello@tortello.ma.',
      fr: 'Vous pouvez demander l’accès, la correction ou la suppression de vos données personnelles à tout moment en nous contactant à hello@tortello.ma.',
      ar: 'يمكنك طلب الوصول إلى بياناتك الشخصية أو تصحيحها أو حذفها في أي وقت عبر التواصل معنا على hello@tortello.ma.',
    },
  },
]

export default function PrivacyPage() {
  return <LegalPage titleKey="privacy" sections={sections} />
}
