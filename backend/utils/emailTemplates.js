/**
 * Templates d'emails premium pour Rahima Store
 */

const header = `
  <div style="background-color: #000000; padding: 30px 20px; text-align: center; border-radius: 20px 20px 0 0;">
    <div style="margin-bottom: 20px;">
      <img src="https://rahima.store/logo.png" alt="Rahima Store" style="width: 100px; height: 100px; border-radius: 50%; border: 2px solid #D4AF37; padding: 5px; object-fit: contain; background-color: #000;">
    </div>
    <h1 style="color: #D4AF37; font-family: 'Playfair Display', serif; margin: 0; font-size: 32px; font-style: italic; font-weight: normal;">Rahima Store</h1>
    <p style="color: #ffffff; font-family: 'Arial', sans-serif; letter-spacing: 4px; text-transform: uppercase; font-size: 10px; margin-top: 10px; font-weight: 300;">L'excellence de la beauté africaine</p>
  </div>
`;

const footer = `
  <div style="background-color: #000000; padding: 40px 30px; text-align: center; border-radius: 0 0 20px 20px; border-top: 1px solid #333333;">
    <p style="color: #666666; font-family: 'Arial', sans-serif; font-size: 11px; line-height: 1.8; letter-spacing: 0.5px;">
      Cet email a été envoyé par Rahima Store.<br>
      Besoin d'assistance ? Notre équipe vous répond à <a href="mailto:contact@rahima.store" style="color: #D4AF37; text-decoration: none; font-weight: bold;">contact@rahima.store</a>
    </p>
    
    <div style="margin-top: 30px; margin-bottom: 30px;">
      <a href="https://rahima.store/products" style="color: #ffffff; text-decoration: none; font-size: 11px; font-weight: bold; margin: 0 15px; text-transform: uppercase; letter-spacing: 1px;">La Boutique</a>
      <a href="https://rahima.store/dashboard" style="color: #ffffff; text-decoration: none; font-size: 11px; font-weight: bold; margin: 0 15px; text-transform: uppercase; letter-spacing: 1px;">Mon Compte</a>
      <a href="https://rahima.store/faq" style="color: #ffffff; text-decoration: none; font-size: 11px; font-weight: bold; margin: 0 15px; text-transform: uppercase; letter-spacing: 1px;">Aide</a>
    </div>

    <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #1a1a1a;">
      <p style="color: #333333; font-family: 'Arial', sans-serif; font-size: 9px; text-transform: uppercase; letter-spacing: 2px;">
        © ${new Date().getFullYear()} RAHIMA STORE — L'EXCELLENCE DE LA BEAUTÉ AFRICAINE
      </p>
    </div>
  </div>
`;

const baseLayout = (content) => `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Rahima Store</title>
</head>
<body style="font-family: 'Arial', sans-serif; color: #333333; background-color: #ffffff; margin: 0; padding: 0; -webkit-font-smoothing: antialiased;">
  <div style="max-width: 600px; margin: 0 auto; overflow: hidden;">
    ${header}
    <div style="padding: 10px 0; line-height: 1.6;">
      ${content}
    </div>
    ${footer}
  </div>
</body>
</html>
`;

const orderConfirmationTemplate = (order) => baseLayout(`
  <h2 style="color: #000000; font-family: 'Playfair Display', serif; margin-bottom: 20px;">Merci pour votre commande, ${order.customer.name} !</h2>
  <p>Nous avons bien reçu votre commande <strong>#${order._id.toString().slice(-6).toUpperCase()}</strong> et nous préparons vos produits avec le plus grand soin.</p>
  
  <div style="background-color: #fdfaf0; border: 1px solid #f1e4bc; padding: 20px; border-radius: 15px; margin: 30px 0;">
    <h3 style="margin-top: 0; color: #D4AF37; font-size: 16px;">Résumé de la commande</h3>
    <table style="width: 100%; border-collapse: collapse;">
      ${order.items.map(item => `
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #eeeeee;">
            <span style="font-weight: bold;">${item.name}</span><br>
            <span style="font-size: 12px; color: #888;">Qté: ${item.quantity} ${item.selectedColor ? `| Couleur: ${item.selectedColor}` : ''}</span>
          </td>
          <td style="text-align: right; padding: 10px 0; border-bottom: 1px solid #eeeeee; font-weight: bold;">
            ${(item.price * item.quantity).toLocaleString()} FCFA
          </td>
        </tr>
      `).join('')}
      <tr>
        <td style="padding: 20px 0 0 0; font-size: 18px; font-weight: bold;">Total</td>
        <td style="padding: 20px 0 0 0; text-align: right; font-size: 18px; font-weight: bold; color: #D4AF37;">
          ${order.totalAmount.toLocaleString()} FCFA
        </td>
      </tr>
    </table>
  </div>

  <div style="margin-bottom: 30px;">
    <h3 style="font-size: 16px; margin-bottom: 10px;">Adresse de livraison</h3>
    <p style="margin: 0; color: #666; font-size: 14px;">
      ${order.customer.address}<br>
      ${order.customer.city || 'Dakar'}, Sénégal<br>
      Tél: ${order.customer.phone}
    </p>
  </div>

  <div style="text-align: center; margin-top: 40px;">
    <a href="https://rahima.store/dashboard" style="background-color: #D4AF37; color: #ffffff; padding: 15px 30px; text-decoration: none; border-radius: 50px; font-weight: bold; display: inline-block;">Suivre ma commande</a>
  </div>
`);

const paymentSuccessTemplate = (order) => baseLayout(`
  <div style="text-align: center; margin-bottom: 30px;">
    <div style="width: 60px; height: 60px; background-color: #4CAF50; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; margin-bottom: 20px;">
      <span style="color: white; font-size: 30px;">✓</span>
    </div>
    <h2 style="color: #000000; font-family: 'Playfair Display', serif; margin: 0;">Paiement Confirmé</h2>
  </div>
  
  <p>Cher(e) ${order.customer.name},</p>
  <p>Votre paiement pour la commande <strong>#${order._id.toString().slice(-6).toUpperCase()}</strong> a été validé avec succès via PayTech.</p>
  <p>Votre commande est désormais en cours de traitement et sera expédiée dans les plus brefs délais.</p>
  
  <div style="background-color: #f9f9f9; padding: 20px; border-radius: 15px; margin: 30px 0; border-left: 4px solid #4CAF50;">
    <p style="margin: 0; font-size: 14px;"><strong>Montant réglé :</strong> ${order.totalAmount.toLocaleString()} FCFA</p>
    <p style="margin: 5px 0 0 0; font-size: 14px;"><strong>Statut :</strong> Payé</p>
  </div>

  <p>Merci de votre confiance et à très bientôt sur Rahima Store.</p>
`);

const orderStatusUpdateTemplate = (order, status, message) => baseLayout(`
  <h2 style="color: #000000; font-family: 'Playfair Display', serif; margin-bottom: 20px;">Votre commande évolue !</h2>
  <p>Le statut de votre commande <strong>#${order._id.toString().slice(-6).toUpperCase()}</strong> a été mis à jour :</p>
  
  <div style="background-color: #fdfaf0; border: 1px solid #f1e4bc; padding: 20px; border-radius: 15px; margin: 30px 0; text-align: center;">
    <span style="display: inline-block; padding: 5px 15px; background-color: #D4AF37; color: white; border-radius: 20px; font-weight: bold; font-size: 12px; margin-bottom: 10px; text-transform: uppercase;">
      ${status}
    </span>
    <p style="margin: 10px 0 0 0; font-weight: bold; color: #333;">${message}</p>
  </div>

  <p>Vous recevrez une nouvelle notification dès que votre colis sera entre les mains de notre livreur.</p>
`);

const newAccountTemplate = (user, tempPassword) => baseLayout(`
  <h2 style="color: #000000; font-family: 'Playfair Display', serif; margin-bottom: 20px;">Bienvenue chez Rahima Store, ${user.name} !</h2>
  <p>Votre compte a été créé automatiquement suite à votre commande. Vous pouvez désormais suivre vos colis et gérer vos informations en toute simplicité.</p>
  
  <div style="background-color: #000000; color: #ffffff; padding: 30px; border-radius: 15px; margin: 30px 0; text-align: center; border: 1px solid #D4AF37;">
    <p style="margin: 0 0 10px 0; font-size: 14px; color: #D4AF37; font-weight: bold; text-transform: uppercase;">Vos identifiants de connexion</p>
    <p style="margin: 5px 0; font-size: 16px;"><strong>Email :</strong> ${user.email}</p>
    <p style="margin: 5px 0; font-size: 16px;"><strong>Mot de passe :</strong> <span style="background-color: #D4AF37; color: #000; padding: 2px 8px; border-radius: 4px;">${tempPassword}</span></p>
  </div>

  <p style="font-size: 14px; color: #666; font-style: italic;">Note : Pour votre sécurité, nous vous conseillons de changer votre mot de passe dès votre première connexion dans votre espace client.</p>

  <div style="text-align: center; margin-top: 40px;">
    <a href="https://rahima.store/login" style="background-color: #D4AF37; color: #000000; padding: 15px 30px; text-decoration: none; border-radius: 50px; font-weight: bold; display: inline-block;">Me connecter à mon espace</a>
  </div>
`);

const welcomeEmailTemplate = (user) => baseLayout(`
  <h2 style="color: #000000; font-family: 'Playfair Display', serif; margin-bottom: 20px;">Bienvenue dans l'univers Rahima Store, ${user.name} !</h2>
  <p>Nous sommes ravis de vous compter parmi nos clients privilégiés. Votre compte a été créé avec succès.</p>
  
  <p>Vous pouvez désormais :</p>
  <ul style="color: #333; line-height: 2; margin: 20px 0;">
    <li>Suivre vos commandes en temps réel</li>
    <li>Gérer vos adresses de livraison</li>
    <li>Accéder à des offres exclusives</li>
  </ul>

  <div style="text-align: center; margin-top: 40px;">
    <a href="https://rahima.store/dashboard" style="background-color: #D4AF37; color: #000000; padding: 15px 30px; text-decoration: none; border-radius: 50px; font-weight: bold; display: inline-block;">Explorer mon tableau de bord</a>
  </div>
`);

const forgotPasswordTemplate = (user, resetUrl) => baseLayout(`
  <h2 style="color: #000000; font-family: 'Playfair Display', serif; margin-bottom: 20px;">Réinitialisation de votre mot de passe</h2>
  <p>Bonjour ${user.name},</p>
  <p>Vous avez demandé la réinitialisation du mot de passe de votre compte Rahima Store. Cliquez sur le bouton ci-dessous pour procéder au changement :</p>
  
  <div style="text-align: center; margin: 40px 0;">
    <a href="${resetUrl}" style="background-color: #D4AF37; color: #000000; padding: 15px 30px; text-decoration: none; border-radius: 50px; font-weight: bold; display: inline-block; box-shadow: 0 4px 15px rgba(212, 175, 55, 0.3);">Réinitialiser mon mot de passe</a>
  </div>

  <p style="font-size: 13px; color: #888;">Si vous n'avez pas demandé ce changement, vous pouvez ignorer cet email en toute sécurité. Ce lien est valable pendant 1 heure.</p>
  <p style="font-size: 11px; color: #aaa; margin-top: 20px;">Si le bouton ne fonctionne pas, copiez et collez ce lien dans votre navigateur :<br>${resetUrl}</p>
`);

module.exports = {
  orderConfirmationTemplate,
  paymentSuccessTemplate,
  orderStatusUpdateTemplate,
  newAccountTemplate,
  welcomeEmailTemplate,
  forgotPasswordTemplate
};
