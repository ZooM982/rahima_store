import React, { useState } from 'react';
import { LegalLayout } from "../../components/legal/LegalLayout";
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    category: 'Commandes',
    items: [
      {
        q: 'Comment passer une commande ?',
        a: "Ajoutez vos produits au panier, puis rendez-vous sur la page Panier. Remplissez vos informations de livraison et validez. Vous recevrez une confirmation. Si vous avez un compte, vos informations seront pré-remplies automatiquement."
      },
      {
        q: 'Puis-je modifier ou annuler ma commande ?',
        a: "Vous pouvez modifier ou annuler votre commande tant qu&rsquo;elle n&rsquo;a pas encore été préparée pour la livraison. Contactez-nous rapidement par email ou téléphone avec votre numéro de commande."
      },
      {
        q: 'Comment créer un compte client ?',
        a: "Vous pouvez créer un compte en cliquant sur l&rsquo;icône utilisateur dans la barre de navigation, puis sur « S&rsquo;inscrire ». Vous pouvez aussi cocher « Créer un compte automatiquement » lors de votre première commande."
      },
      {
        q: 'Est-ce que mes informations sont sauvegardées pour les prochaines commandes ?',
        a: "Oui ! Si vous avez un compte et êtes connecté(e), vos informations (nom, téléphone, adresse de livraison) seront automatiquement pré-remplies lors de vos prochaines commandes. Vous pouvez les modifier dans votre tableau de bord."
      },
    ]
  },
  {
    category: 'Livraison',
    items: [
      {
        q: 'Quels sont les délais de livraison ?',
        a: "Pour Dakar Centre : 24h. Pour la banlieue : 24 à 48h. Pour les autres régions du Sénégal : 2 à 5 jours ouvrables. Un livreur vous contactera avant la livraison."
      },
      {
        q: 'La livraison est-elle gratuite ?',
        a: "La livraison est gratuite pour toute commande à Dakar Centre. Des frais de livraison de 2 000 FCFA s'appliquent pour la banlieue dakaroise. Pour les autres régions, les frais sont calculés sur devis."
      },
      {
        q: 'Livrez-vous partout au Sénégal ?',
        a: "Oui, nous livrons sur l'ensemble du territoire sénégalais. Pour les régions éloignées (Ziguinchor, Tambacounda, Kolda, etc.), contactez-nous pour un devis personnalisé."
      },
      {
        q: 'Que faire si je suis absent(e) lors de la livraison ?',
        a: "Notre livreur vous contactera par téléphone avant de passer. Si vous êtes absent(e), un nouveau créneau sera convenu avec vous. Après deux tentatives infructueuses, la commande sera retournée et vous serez contacté(e) pour convenir d'une nouvelle livraison."
      },
    ]
  },
  {
    category: 'Produits',
    items: [
      {
        q: 'Les produits sont-ils authentiques ?',
        a: "Absolument. Rahima Store s&rsquo;engage à ne proposer que des produits authentiques, sélectionnés auprès de fournisseurs certifiés. Chaque produit est vérifié avant expédition."
      },
      {
        q: 'Les produits sont-ils adaptés à tous les types de peau ?',
        a: "Nos produits sont soigneusement sélectionnés pour convenir aux peaux africaines et métissées. Chaque fiche produit indique le type de peau recommandé. En cas de doute, contactez-nous pour un conseil personnalisé."
      },
      {
        q: 'Un produit que je cherche n&rsquo;est pas disponible, que faire ?',
        a: "Contactez-nous par email ou WhatsApp en nous indiquant le produit souhaité. Si nous pouvons nous le procurer, nous vous ferons une offre dans les meilleurs délais."
      },
    ]
  },
  {
    category: 'Retours & Remboursements',
    items: [
      {
        q: 'Quel est le délai pour retourner un produit ?',
        a: "Vous avez 14 jours calendaires à compter de la réception pour nous retourner un produit non ouvert et non utilisé. Pour les produits défectueux, contactez-nous dès la réception."
      },
      {
        q: 'Comment obtenir un remboursement ?',
        a: "Après validation du retour par notre équipe, le remboursement est effectué sous 5 à 10 jours ouvrables. Nous pouvons également proposer un avoir ou un échange selon votre préférence."
      },
      {
        q: 'Que faire si je reçois un produit endommagé ?',
        a: "Prenez des photos du produit et de l&rsquo;emballage et contactez-nous immédiatement par email à contact@rahima.store. Nous vous enverrons un produit de remplacement ou vous rembourserons dans les meilleurs délais."
      },
    ]
  },
];

const FaqItem = ({ q, a }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={`border border-white/10 rounded-2xl overflow-hidden transition-all ${open ? 'shadow-md bg-white/5' : ''}`}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 text-left font-medium text-white hover:bg-white/5 transition-colors"
      >
        <span>{q}</span>
        <ChevronDown
          size={18}
          className={`text-primary flex-shrink-0 ml-4 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {open && (
        <div className="px-5 pb-5 text-sm text-gray-400 leading-relaxed border-t border-white/5">
          <p className="pt-4">{a}</p>
        </div>
      )}
    </div>
  );
};

const FAQ = () => (
  <LegalLayout title="Questions Fréquentes (FAQ)" lastUpdated="22 Avril 2025">
    <div className="not-prose space-y-10">
      {faqs.map((cat) => (
        <div key={cat.category}>
          <h2 className="text-xl font-serif text-white mb-4 pb-2 border-b border-white/5">{cat.category}</h2>
          <div className="space-y-3">
            {cat.items.map((item) => (
              <FaqItem key={item.q} q={item.q} a={item.a} />
            ))}
          </div>
        </div>
      ))}

      {/* Contact CTA */}
      <div className="bg-white/5 border border-white/10 rounded-3xl p-8 text-center">
        <h3 className="text-xl font-serif mb-2 text-white">Vous n&rsquo;avez pas trouvé votre réponse ?</h3>
        <p className="text-sm text-gray-500 mb-6">Notre équipe est disponible du lundi au samedi, de 9h à 19h.</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="mailto:contact@rahima.store"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-2xl text-sm font-bold hover:bg-primary/90 transition-colors"
          >
            Envoyer un email
          </a>
          <a
            href="tel:+221788201212"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-transparent border border-white/10 text-white rounded-2xl text-sm font-bold hover:border-primary hover:text-primary transition-colors"
          >
            Appeler le service client
          </a>
        </div>
      </div>
    </div>
  </LegalLayout>
);

export default FAQ;
