import React from 'react';
import { LegalLayout, Section } from '../../components/legal/LegalLayout';
import { Package, RefreshCw, AlertTriangle, CheckCircle } from 'lucide-react';

const LivraisonRetours = () => (
  <LegalLayout title="Livraison & Retours" lastUpdated="22 Avril 2025">

    {/* Delivery zones visual */}
    <div className="grid sm:grid-cols-3 gap-4 not-prose mb-8">
      {[
        { zone: 'Dakar Centre', delai: '24h', prix: 'Gratuite', color: 'green' },
        { zone: 'Banlieue Dakar', delai: '24-48h', prix: '2 000 FCFA', color: 'blue' },
        { zone: 'Autres régions', delai: '2-5 jours', prix: 'Sur devis', color: 'orange' },
      ].map((z) => (
        <div key={z.zone} className={`p-5 rounded-2xl border text-center
          ${z.color === 'green' ? 'bg-green-50 border-green-100' : ''}
          ${z.color === 'blue' ? 'bg-blue-50 border-blue-100' : ''}
          ${z.color === 'orange' ? 'bg-orange-50 border-orange-100' : ''}
        `}>
          <p className="font-bold text-gray-800 text-sm mb-1">{z.zone}</p>
          <p className={`text-2xl font-serif mb-1
            ${z.color === 'green' ? 'text-green-600' : ''}
            ${z.color === 'blue' ? 'text-blue-600' : ''}
            ${z.color === 'orange' ? 'text-orange-600' : ''}
          `}>{z.prix}</p>
          <p className="text-xs text-gray-400">Délai : {z.delai}</p>
        </div>
      ))}
    </div>

    <Section title="1. Zones et délais de livraison">
      <p>Rahima Store livre exclusivement sur le territoire de la République du Sénégal. Les délais indiqués sont des moyennes constatées et ne constituent pas une garantie contractuelle, sauf engagement exprès de notre part.</p>
      <p>En cas de force majeure (événements climatiques, grèves, restrictions sanitaires, etc.), les délais de livraison pourront être prolongés sans que cela ne constitue un manquement de notre part, conformément aux dispositions des articles 155 et suivants du COCC.</p>
    </Section>

    <Section title="2. Modalités de livraison">
      <p>La livraison est effectuée à l'adresse indiquée lors de la commande. Il est de la responsabilité du client de fournir une adresse exacte et complète. Rahima Store ne saurait être tenue responsable d'un retard ou d'une non-livraison due à une adresse incorrecte ou incomplète.</p>
      <p>Un livreur vous contactera par téléphone avant la livraison pour confirmer le créneau horaire. Veuillez vous assurer d'être joignable au numéro fourni lors de la commande.</p>
    </Section>

    <Section title="3. Vérification à la réception">
      <p>Le client est invité à vérifier l'état des produits au moment de la réception en présence du livreur. En cas de produit endommagé, incomplet ou non conforme :</p>
      <ul className="list-disc pl-5 space-y-1">
        <li>Refuser la livraison et le signaler immédiatement au livreur</li>
        <li>Contacter notre service client dans les <strong>24 heures</strong> suivant la réception</li>
        <li>Prendre des photos des produits défectueux et les envoyer par email</li>
      </ul>
    </Section>

    <Section title="4. Politique de retour – 14 jours">
      <p>Conformément à nos engagements de satisfaction client et aux usages commerciaux sénégalais, vous disposez de <strong>14 jours calendaires</strong> à compter de la réception pour retourner un produit.</p>

      <div className="not-prose grid sm:grid-cols-2 gap-4 mt-4">
        <div className="p-4 bg-green-50 rounded-2xl border border-green-100">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle size={18} className="text-green-600" />
            <p className="font-bold text-green-800 text-sm">Retours acceptés si :</p>
          </div>
          <ul className="text-xs text-green-700 space-y-1">
            <li>• Produit non ouvert et non utilisé</li>
            <li>• Emballage d'origine intact</li>
            <li>• Retour dans les 14 jours</li>
            <li>• Produit défectueux ou non conforme</li>
            <li>• Erreur de notre part</li>
          </ul>
        </div>
        <div className="p-4 bg-red-50 rounded-2xl border border-red-100">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle size={18} className="text-red-500" />
            <p className="font-bold text-red-800 text-sm">Retours non acceptés si :</p>
          </div>
          <ul className="text-xs text-red-700 space-y-1">
            <li>• Produit ouvert ou utilisé</li>
            <li>• Produit d'hygiène (cosmétiques ouverts)</li>
            <li>• Délai de 14 jours dépassé</li>
            <li>• Emballage abîmé par le client</li>
          </ul>
        </div>
      </div>
    </Section>

    <Section title="5. Procédure de retour">
      <p>Pour initier un retour, veuillez :</p>
      <ol className="list-decimal pl-5 space-y-1">
        <li>Contacter notre service client par email à <strong>contact@rahima-store.com</strong> ou par téléphone</li>
        <li>Indiquer votre numéro de commande et le motif du retour</li>
        <li>Attendre la confirmation et les instructions de retour de notre équipe</li>
        <li>Renvoyer le produit à l'adresse indiquée, bien emballé</li>
      </ol>
    </Section>

    <Section title="6. Remboursements">
      <p>Une fois le retour reçu et validé par notre équipe, le remboursement sera effectué dans un délai de <strong>5 à 10 jours ouvrables</strong> par le même moyen de paiement utilisé lors de la commande. Rahima Store se réserve le droit de proposer un avoir ou un échange à la place d'un remboursement.</p>
    </Section>
  </LegalLayout>
);

export default LivraisonRetours;
