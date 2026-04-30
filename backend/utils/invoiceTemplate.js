const invoiceTemplate = (order) => {
  const date = new Date(order.createdAt).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const logoUrl = 'https://rahima.store/logo.png'; // URL absolue pour les factures

  return `
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Facture Rahima Store #${order._id.toString().slice(-6).toUpperCase()}</title>
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Inter:wght@300;400;600&display=swap" rel="stylesheet">
    <style>
        body {
            font-family: 'Inter', sans-serif;
            margin: 0;
            padding: 0;
            color: #000;
            line-height: 1.5;
            background-color: #fff;
        }
        .container {
            width: 100%;
            max-width: 800px;
            margin: 0 auto;
            position: relative;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
        }
        .header {
            padding: 40px 50px;
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
        }
        .logo-section {
            width: 200px;
        }
        .logo-section img {
            width: 100%;
            object-contain: contain;
        }
        .contact-section {
            text-align: right;
            font-size: 11px;
            color: #333;
        }
        .contact-item {
            display: flex;
            align-items: center;
            justify-content: flex-end;
            margin-bottom: 5px;
        }
        .contact-icon {
            width: 16px;
            height: 16px;
            background: #000;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-left: 8px;
        }
        .contact-icon img {
            width: 10px;
        }
        .gold-divider {
            height: 4px;
            background: linear-gradient(90deg, #D4AF37 0%, #F1E4BC 50%, #D4AF37 100%);
            width: 100%;
        }
        .content {
            padding: 50px;
            flex-grow: 1;
            position: relative;
            z-index: 1;
        }
        .watermark {
            position: absolute;
            top: 55%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 70%;
            opacity: 0.04;
            z-index: 0;
            pointer-events: none;
        }
        .invoice-info {
            display: flex;
            justify-content: space-between;
            margin-bottom: 40px;
        }
        .info-block h2 {
            font-family: 'Playfair Display', serif;
            font-size: 24px;
            margin: 0 0 10px 0;
            color: #D4AF37;
        }
        .info-label {
            font-size: 10px;
            text-transform: uppercase;
            letter-spacing: 2px;
            color: #888;
            margin-bottom: 5px;
        }
        .info-value {
            font-weight: 600;
            font-size: 14px;
        }
        .table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 30px;
        }
        .table th {
            text-align: left;
            font-size: 10px;
            text-transform: uppercase;
            letter-spacing: 2px;
            color: #888;
            border-bottom: 1px solid #eee;
            padding: 10px 0;
        }
        .table td {
            padding: 15px 0;
            border-bottom: 1px solid #f9f9f9;
            font-size: 14px;
        }
        .total-section {
            margin-top: 30px;
            text-align: right;
        }
        .total-row {
            display: flex;
            justify-content: flex-end;
            margin-bottom: 10px;
        }
        .total-label {
            width: 150px;
            color: #888;
        }
        .total-amount {
            width: 150px;
            font-weight: 600;
        }
        .grand-total {
            font-size: 20px;
            color: #D4AF37;
            font-family: 'Playfair Display', serif;
            margin-top: 10px;
            border-top: 1px solid #eee;
            padding-top: 10px;
        }
        .footer {
            background-color: #000;
            padding: 30px;
            text-align: center;
            margin-top: auto;
        }
        .footer-logo {
            width: 40px;
            filter: brightness(0) saturate(100%) invert(84%) sepia(50%) font-size(100%) hue-rotate(5deg) brightness(95%) contrast(85%);
        }
    </style>
</head>
<body>
    <div class="container">
        <img src="${logoUrl}" class="watermark" alt="">
        
        <div class="header">
            <div class="logo-section">
                <img src="${logoUrl}" alt="Rahima Store">
            </div>
            <div class="contact-section">
                <div class="contact-item">
                    <span>Liberté 6 extension Dakar, Sénégal</span>
                    <div class="contact-icon">📍</div>
                </div>
                <div class="contact-item">
                    <span>+221 78 639 70 70</span>
                    <div class="contact-icon">📞</div>
                </div>
                <div class="contact-item">
                    <span>rahimadiakhate96@gmail.com</span>
                    <div class="contact-icon">✉️</div>
                </div>
                <div class="contact-item">
                    <span>www.rahimastore.com</span>
                    <div class="contact-icon">🌐</div>
                </div>
            </div>
        </div>

        <div class="gold-divider"></div>

        <div class="content">
            <div class="invoice-info">
                <div class="info-block">
                    <h2>Facture</h2>
                    <div class="info-label">Numéro</div>
                    <div class="info-value">#${order._id.toString().slice(-6).toUpperCase()}</div>
                    <div class="info-label" style="margin-top: 15px;">Date</div>
                    <div class="info-value">${date}</div>
                </div>
                <div class="info-block" style="text-align: right;">
                    <div class="info-label">Destinataire</div>
                    <div class="info-value">${order.customer.name}</div>
                    <div class="info-value" style="font-weight: 400; font-size: 12px; color: #666; margin-top: 5px;">
                        ${order.customer.phone}<br>
                        ${order.customer.address}
                    </div>
                </div>
            </div>

            <table class="table">
                <thead>
                    <tr>
                        <th style="width: 50%;">Article</th>
                        <th style="text-align: center;">Prix Unitaire</th>
                        <th style="text-align: center;">Qté</th>
                        <th style="text-align: right;">Total</th>
                    </tr>
                </thead>
                <tbody>
                    ${order.items.map(item => `
                        <tr>
                            <td>
                                <div style="font-weight: 600;">${item.name || 'Produit'}</div>
                                ${item.selectedColor ? `<div style="font-size: 11px; color: #888;">Couleur: ${item.selectedColor}</div>` : ''}
                            </td>
                            <td style="text-align: center;">${item.price.toLocaleString()} FCFA</td>
                            <td style="text-align: center;">${item.quantity}</td>
                            <td style="text-align: right; font-weight: 600;">${(item.price * item.quantity).toLocaleString()} FCFA</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>

            <div class="total-section">
                <div class="total-row">
                    <div class="total-label">Sous-total</div>
                    <div class="total-amount">${order.totalAmount.toLocaleString()} FCFA</div>
                </div>
                <div class="total-row">
                    <div class="total-label">Livraison</div>
                    <div class="total-amount">À la charge du client</div>
                </div>
                <div class="total-row grand-total">
                    <div class="total-label">TOTAL</div>
                    <div class="total-amount">${order.totalAmount.toLocaleString()} FCFA</div>
                </div>
            </div>
            
            <div style="margin-top: 60px; font-size: 12px; color: #666; text-align: center; font-style: italic;">
                Merci de votre confiance et à bientôt chez Rahima Store.
            </div>
        </div>

        <div class="footer">
            <img src="${logoUrl}" class="footer-logo" alt="" style="filter: brightness(0) invert(1) contrast(0.5) sepia(1) hue-rotate(15deg) saturate(5);">
        </div>
    </div>
</body>
</html>
  `;
};

module.exports = invoiceTemplate;
