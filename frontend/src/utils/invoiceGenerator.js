import logo from '../assets/logo.jpeg';

export const generateInvoice = async (order) => {
  // Dynamic imports for heavy PDF libraries
  const { jsPDF } = await import('jspdf');
  const autoTable = (await import('jspdf-autotable')).default;

  const doc = jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const primaryColor = [255, 77, 141]; // #FF4D8D
  const darkGray = [45, 52, 54]; // #2D3436

  // Helper for price formatting (using dots as separators)
  const formatPrice = (price) => {
    return new Intl.NumberFormat('de-DE').format(price) + ' FCFA';
  };

  // Helper for text alignment
  const centerText = (text, y, size = 10, color = darkGray, style = 'normal') => {
    doc.setFont('helvetica', style);
    doc.setFontSize(size);
    doc.setTextColor(color[0], color[1], color[2]);
    const textWidth = doc.getTextWidth(text);
    const x = (doc.internal.pageSize.getWidth() - textWidth) / 2;
    doc.text(text, x, y);
  };

  // 1. Header Info (NINEA, RC)
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
  centerText('NINEA. 23450 5V2 | RC SN DKR 2158', 15, 8);

  // 2. Logo and Brand Name
  const centerY = 35;
  
  // Add the actual logo image
  const imgWidth = 40; // Increased width since it contains text
  const imgHeight = 40;
  const imgX = (doc.internal.pageSize.getWidth() - imgWidth) / 2;
  doc.addImage(logo, 'JPEG', imgX, centerY - 15, imgWidth, imgHeight);

  // 3. Address
  centerText('Sacré Cœur 3, en face Immeuble Ferdinand COLY', centerY + 28, 9);

  // 4. INVOICE Title
  doc.setFontSize(28);
  doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
  centerText('INVOICE', centerY + 45, 28, darkGray, 'bold');

  // 5. Customer Details (Briefly)
  doc.setFontSize(10);
  doc.text(`Client: ${order.customer?.name || 'Client'}`, 20, centerY + 55);
  doc.text(`Email: ${order.customer?.email || 'N/A'}`, 20, centerY + 60);
  doc.text(`Date: ${new Date(order.createdAt || Date.now()).toLocaleDateString()}`, 150, centerY + 55);
  doc.text(`Invoice #: ${order._id?.slice(-6).toUpperCase() || 'TEMP'}`, 150, centerY + 60);

  // 6. Table
  const tableData = order.items.map(item => [
    item.productId?.name || item.name || 'Produit',
    item.quantity,
    formatPrice(item.price),
    formatPrice(item.price * item.quantity)
  ]);

  autoTable(doc, {
    startY: centerY + 65,
    head: [['ITEM DESCRIPTION', 'QUANTITY', 'UNIT', 'TOTAL']],
    body: tableData,
    theme: 'grid',
    headStyles: {
      fillColor: primaryColor,
      textColor: [255, 255, 255],
      fontSize: 10,
      halign: 'center',
      fontStyle: 'bold'
    },
    columnStyles: {
      0: { cellWidth: 'auto' },
      1: { halign: 'center', cellWidth: 30 },
      2: { halign: 'right', cellWidth: 35 },
      3: { halign: 'right', cellWidth: 35 }
    },
    styles: {
      fontSize: 9,
      cellPadding: 4,
      lineColor: [200, 200, 200],
      lineWidth: 0.1,
      font: 'helvetica'
    },
    margin: { left: 20, right: 20 }
  });

  const finalY = doc.lastAutoTable.finalY + 10;

  // 7. Totals
  const totalVal = order.totalAmount || order.total || 0;
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text('SUBTOTAL', 130, finalY);
  doc.setFont('helvetica', 'normal');
  doc.text(formatPrice(totalVal), 190, finalY, { align: 'right' });

  doc.setDrawColor(200, 200, 200);
  doc.line(130, finalY + 2, 190, finalY + 2);

  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('TOTAL', 130, finalY + 10);
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text(formatPrice(totalVal), 190, finalY + 10, { align: 'right' });

  // 8. Footer decoration (Fingerprint/Stamp and Line)
  const pageHeight = doc.internal.pageSize.getHeight();
  
  doc.setDrawColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.setLineWidth(0.5);
  doc.line(20, pageHeight - 20, 190, pageHeight - 20);

  const stampX = 35;
  const stampY = pageHeight - 35;
  doc.setDrawColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  for(let i=0; i<5; i++) {
    doc.ellipse(stampX, stampY, 5 - i, 7 - i);
  }

  doc.save(`Facture-Rahima-${order._id?.slice(-6) || 'Order'}.pdf`);
};
