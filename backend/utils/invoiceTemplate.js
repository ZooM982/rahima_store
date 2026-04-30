const invoiceTemplate = (order) => {
  const date = new Date(order.createdAt).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const logoUrl = 'https://rahima.store/logo.png';
  const pictogramSvg = `<svg id="Calque_2" data-name="Calque 2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 84 95.72"><defs><style>.cls-1 { fill: #000000; }</style></defs><g id="Calque_1-2" data-name="Calque 1"><g><path class="cls-1" d="M43.99,35.8c6.95.7,10.86,7.07,8.98,13.67-1.05,3.69-3.75,5.58-7.19,6.9,3.98,6.31,7.48,12.91,11.31,19.31,2.42,4.04,4.92,8.46,7.62,12.29,2.06,2.93,4.41,5.7,7.37,7.75-5.23-.36-8.57-4.5-11.42-8.39-7.04-9.58-12.44-20.27-18.89-30.24-.28-.6-2.51-1.07-2.56-1.29-.16-.73,2.07-.42,2.53-.47,2.88-.29,5.06-.96,6.46-3.68,2.17-4.24,1.53-12.23-3.63-13.98-2.22-.75-4.45-.05-6.67-.56.06.19-.19.4-.19.47v33.44c0,.84.62,2.11,1.37,2.57.48.3,1.51.32,1.45.9h-8.83c-.06-.58.97-.6,1.45-.9.89-.55,1.05-1.21,1.18-2.2-.53-10.24.72-21.22.01-31.38-.15-2.19-.39-2.98-2.41-3.79-.28-.12-.51.11-.41-.42h12.49Z"/><path class="cls-1" d="M62.9,25.63c.05.07.52.15.71.32,1.94,1.61,2.13,4.46-.08,5.91-3.52,2.3-7.8-2.56-4.14-5.83.36-.32.97-.31,1.03-.84.02-6.09.72-11.68-3.47-16.63C49.26-.53,31.69.31,25.3,10.53c-2.92,4.67-1.78,9.46-2.18,14.67,2.35,1.37,3.36,5.02.71,6.59-4.6,2.72-8.04-4.43-3.02-6.44-.04-6.44-.77-11.72,3.3-17.14C34.45-5.63,61.63-1.51,62.88,17.1c.08,1.21-.21,8.17.02,8.53ZM21.31,26.26c-3.19.55-2.63,5.58.87,5.21s2.87-5.85-.87-5.21ZM63.56,27.04c-3.19-3.16-6.88,2.97-3.04,4.27,2.97,1.01,4.92-2.41,3.04-4.27Z"/><path class="cls-1" d="M66.44,88.02h7.04c3.84,0,8.14-3.63,8.17-7.61-1.91-17.6-4.63-35.15-6.81-52.74-.17-1.61-2.49-3.33-3.99-3.33h-6.67v-2.25h6.67c2.55,0,6,2.29,6.21,5.06,1.94,16.79,4.94,33.5,6.82,50.28,1.09,9.76-6.33,14.02-15.3,12.85-.96-.13-1.59-1.57-2.15-2.26Z"/><path class="cls-1" d="M9.43,90.28c-3.53-.29-7.4-1.99-8.83-5.45-1.24-3.01-.22-5.79-.06-8.88.17-.59,1.91-.91,2.5-1.07-.03,3.92-2.08,8,1.32,11.08,1.69,1.53,3.99,1.89,6.18,2.08l48.49-.02.55.2,1.41,2.06H9.43Z"/><polygon class="cls-1" points="59.12 24.34 24.36 24.34 24.54 22.17 58.65 22.09 59.09 22.4 59.12 24.34"/><path class="cls-1" d="M19.29,24.34h-6.67c-1.17,0-3.12,1.12-3.51,2.31l-2.21,16.54-2.35.69,2.02-17.14c1.49-5.55,8.05-4.71,12.55-4.57l.18,2.17Z"/><polygon class="cls-1" points="19.48 42.57 3.7 49.33 4.3 45.23 19.48 42.57"/><path class="cls-1" d="M16.47,67.36l-15.59,6.57c-.14-.16.22-3.48.47-3.76l.22-.15,14.9-2.66Z"/><path class="cls-1" d="M17.6,59.1l-15.97,6.57c.36-.59.21-3.43.56-3.67l15.41-2.9Z"/><path class="cls-1" d="M18.35,50.83l-15.78,6.76c.3-.67.26-3.67.68-3.96l15.1-2.8Z"/></g></g></svg>`;
  const pictogramDataUri = `data:image/svg+xml;base64,${Buffer.from(pictogramSvg).toString('base64')}`;

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
        <img src="${pictogramDataUri}" class="watermark" alt="">
        
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
            <img src="${pictogramDataUri}" class="footer-logo" alt="" style="filter: brightness(0) saturate(100%) invert(84%) sepia(50%) hue-rotate(5deg) brightness(95%) contrast(85%);">
        </div>
    </div>
</body>
</html>
  `;
};

module.exports = invoiceTemplate;
