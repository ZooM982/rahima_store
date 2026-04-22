const User = require('../models/User');
const Order = require('../models/Order');

const getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getCustomerDetails = async (req, res) => {
  try {
    const { email } = req.params;
    
    // 1. Get User data if they have an account
    const user = await User.findOne({ email }).select('-password').lean();
    
    // 2. Get all orders for this email
    const orders = await Order.find({ 'customer.email': email }).sort({ createdAt: -1 }).populate('items.productId');
    
    if (orders.length === 0 && !user) {
      return res.status(404).json({ message: "Client non trouvé" });
    }

    // 3. Consolidate info (use order info if user doesn't have an account)
    const latestOrder = orders[0];
    const customerInfo = user || {
      name: latestOrder?.customer?.name,
      email: latestOrder?.customer?.email,
      phone: latestOrder?.customer?.phone,
      address: latestOrder?.customer?.address,
      isGuest: true
    };

    res.json({
      customer: customerInfo,
      orders,
      stats: {
        totalSpent: orders.reduce((acc, o) => acc + o.totalAmount, 0),
        orderCount: orders.length
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user.role === 'admin') return res.status(403).json({ message: "Impossible de supprimer un administrateur." });
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "Utilisateur supprimé" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getUsers, deleteUser, getCustomerDetails };
