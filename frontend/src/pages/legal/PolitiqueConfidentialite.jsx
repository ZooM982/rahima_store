import React from 'react';
import { LegalLayout, Section } from '../../components/legal/LegalLayout';

const PolitiqueConfidentialite = () => (
  <LegalLayout title="Politique de Confidentialité" lastUpdated="22 Avril 2025">
    <Section title="Article 1 – Responsable du traitement">
      <p><strong>Rahima Store</strong>, entreprise individuelle sise au Plateau, Rue Félix Faure, Dakar (Sénégal) est responsable du traitement de vos données personnelles.</p>
      <p>Contact DPO : contact@rahima.store | +221 78 820 12 12 / 78 820 18 18</p>
    </Section>

    <Section title="Article 2 – Base légale">
      <p>Le traitement de vos données personnelles est effectué en conformité avec :</p>
      <ul className="list-disc pl-5 space-y-1">
        <li>La <strong>Loi n° 2008-12 du 25 janvier 2008</strong> sur la Protection des Données à Caractère Personnel au Sénégal</li>
        <li>La <strong>Loi n° 2008-08 du 25 janvier 2008</strong> sur les transactions électroniques</li>
        <li>Les décisions et recommandations de la <strong>Commission de Protection des Données Personnelles (CDP)</strong> du Sénégal</li>
      </ul>
    </Section>

    <Section title="Article 3 – Données collectées">
      <p>Lors de votre utilisation du site et de vos commandes, nous collectons les données suivantes :</p>
      <ul className="list-disc pl-5 space-y-1">
        <li><strong>Données d&rsquo;identification</strong> : nom et prénom</li>
        <li><strong>Coordonnées</strong> : adresse email, numéro de téléphone, adresse de livraison</li>
        <li><strong>Données de commande</strong> : articles commandés, montants, historique d&rsquo;achats</li>
        <li><strong>Données de navigation</strong> : adresse IP, type de navigateur, pages visitées (via cookies)</li>
      </ul>
    </Section>

    <Section title="Article 4 – Finalités du traitement">
      <p>Vos données sont collectées et traitées pour les finalités suivantes :</p>
      <ul className="list-disc pl-5 space-y-1">
        <li>Traitement et suivi de vos commandes</li>
        <li>Gestion de votre compte client</li>
        <li>Communication relative à vos achats (confirmations, factures)</li>
        <li>Amélioration de nos services et personnalisation de l&rsquo;expérience utilisateur</li>
        <li>Respect de nos obligations légales et comptables</li>
      </ul>
    </Section>

    <Section title="Article 5 – Durée de conservation">
      <p>Conformément à l&rsquo;article 24 de la Loi n° 2008-12, vos données sont conservées pour les durées suivantes :</p>
      <ul className="list-disc pl-5 space-y-1">
        <li><strong>Données de compte</strong> : durée de vie du compte + 3 ans après la dernière activité</li>
        <li><strong>Données de commande</strong> : 10 ans (obligations comptables et fiscales)</li>
        <li><strong>Données de navigation</strong> : 13 mois maximum</li>
      </ul>
    </Section>

    <Section title="Article 6 – Partage des données">
      <p>Rahima Store ne vend ni ne loue vos données personnelles à des tiers. Vos données peuvent être partagées uniquement avec :</p>
      <ul className="list-disc pl-5 space-y-1">
        <li>Nos prestataires de livraison, dans le strict cadre de l&rsquo;exécution de vos commandes</li>
        <li>Les autorités compétentes sénégalaises, sur réquisition légale</li>
      </ul>
    </Section>

    <Section title="Article 7 – Vos droits">
      <p>Conformément aux articles 38 à 44 de la Loi n° 2008-12, vous disposez des droits suivants :</p>
      <ul className="list-disc pl-5 space-y-1">
        <li><strong>Droit d&rsquo;accès</strong> : obtenir une copie de vos données personnelles</li>
        <li><strong>Droit de rectification</strong> : corriger des données inexactes ou incomplètes</li>
        <li><strong>Droit à l&rsquo;effacement</strong> : demander la suppression de vos données</li>
        <li><strong>Droit d&rsquo;opposition</strong> : s&rsquo;opposer au traitement de vos données à des fins marketing</li>
        <li><strong>Droit à la portabilité</strong> : recevoir vos données dans un format structuré</li>
      </ul>
      <p className="mt-2">Pour exercer ces droits, contactez-nous à : <strong>contact@rahima.store</strong>. Vous pouvez également introduire une réclamation auprès de la <strong>Commission de Protection des Données Personnelles (CDP)</strong> du Sénégal.</p>
    </Section>

    <Section title="Article 8 – Cookies">
      <p>Notre site utilise des cookies fonctionnels essentiels au bon fonctionnement de la boutique (panier, session). Aucun cookie publicitaire tiers n&rsquo;est utilisé sans votre consentement explicite, conformément aux recommandations de la CDP.</p>
    </Section>

    <Section title="Article 9 – Sécurité">
      <p>Rahima Store met en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données contre tout accès non autorisé, perte ou divulgation, conformément à l&rsquo;article 25 de la Loi n° 2008-12.</p>
    </Section>
  </LegalLayout>
);

export default PolitiqueConfidentialite;
