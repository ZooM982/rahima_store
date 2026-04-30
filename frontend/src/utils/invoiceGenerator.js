import logo from '../assets/logo.png';

export const generateInvoice = async (order) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${import.meta.env.VITE_API_URL}/orders/${order._id}/invoice`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      throw new Error('Impossible de générer la facture');
    }

    const html = await response.text();
    
    // Create a blob and open it in a new window
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const win = window.open(url, '_blank');
    
    // Fallback if window.open is blocked or blob fails
    if (!win) {
      const newWin = window.open();
      newWin.document.write(html);
      newWin.document.close();
    }
  } catch (error) {
    console.error('Invoice generation error:', error);
    alert('Erreur lors de la génération de la facture.');
  }
};
