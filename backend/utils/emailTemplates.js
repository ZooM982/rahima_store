/**
 * Templates d'emails premium pour Rahima Store
 */

const header = `
  <div style="background-color: #000000; padding: 40px 20px; text-align: center; border-radius: 20px 20px 0 0;">
    <img src="https://rahima.store/logo.png" alt="Rahima Store" style="width: 80px; height: 80px; margin-bottom: 20px;">
    <h1 style="color: #D4AF37; font-family: 'Playfair Display', serif; margin: 0; font-size: 28px; font-style: italic;">Rahima Store</h1>
    <p style="color: #ffffff; font-family: Arial, sans-serif; letter-spacing: 2px; text-transform: uppercase; font-size: 10px; margin-top: 10px;">L'excellence de la beauté africaine</p>
  </div>
`;

const footer = `
  <div style="background-color: #f9f9f9; padding: 30px; text-align: center; border-radius: 0 0 20px 20px; border-top: 1px solid #eeeeee;">
    <p style="color: #999999; font-family: Arial, sans-serif; font-size: 12px; line-height: 1.5;">
      Vous recevez cet email suite à votre commande sur rahima.store.<br>
      Besoin d'aide ? Contactez-nous à <a href="mailto:contact@rahima.store" style="color: #D4AF37; text-decoration: none;">contact@rahima.store</a>
    </p>
    <div style="margin-top: 20px;">
      <a href="https://rahima.store" style="color: #D4AF37; text-decoration: none; font-weight: bold; font-size: 12px; margin: 0 10px;">Boutique</a>
      <a href="https://rahima.store/dashboard" style="color: #D4AF37; text-decoration: none; font-weight: bold; font-size: 12px; margin: 0 10px;">Mon Compte</a>
    </div>
    <p style="color: #cccccc; font-family: Arial, sans-serif; font-size: 10px; margin-top: 20px;">
      © ${new Date().getFullYear()} Rahima Store. Tous droits réservés.
    </p>
  </div>
`;

const baseLayout = (content) => `
  <div style="background-color: #f3f3f3; padding: 20px; font-family: Arial, sans-serif;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 20px; shadow: 0 10px 30px rgba(0,0,0,0.1);">
      ${header}
      <div style="padding: 40px 30px; color: #333333; line-height: 1.6;">
        ${content}
      </div>
      ${footer}
    </div>
  </div>
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

module.exports = {
  orderConfirmationTemplate,
  paymentSuccessTemplate,
  orderStatusUpdateTemplate
};
