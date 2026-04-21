const Subscription = require('../models/Subscription');
const Notification = require('../models/Notification');
const webpush = require('web-push');

// Config web-push
webpush.setVapidDetails(
  'mailto:admin@rahimastore.com',
  process.env.VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
);

exports.subscribe = async (req, res) => {
  try {
    const { subscription, isAdmin } = req.body;
    
    // Check if subscription already exists
    let existingSub = await Subscription.findOne({ endpoint: subscription.endpoint });
    
    if (existingSub) {
      existingSub.user = req.user.id;
      existingSub.isAdmin = isAdmin || req.user.role === 'admin';
      await existingSub.save();
    } else {
      await Subscription.create({
        user: req.user.id,
        endpoint: subscription.endpoint,
        keys: subscription.keys,
        isAdmin: isAdmin || req.user.role === 'admin'
      });
    }

    res.status(201).json({ message: 'Subscription saved successfully' });
  } catch (error) {
    console.error('Push subscription error:', error);
    res.status(500).json({ message: 'Error saving subscription' });
  }
};

exports.getPreferences = async (req, res) => {
  try {
    const subscription = await Subscription.findOne({ user: req.user.id });
    if (!subscription) {
      return res.status(200).json({
        emailOnSale: true,
        lowStockAlert: true,
        newCustomerAlert: true
      });
    }
    res.json(subscription.preferences);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updatePreferences = async (req, res) => {
  try {
    const { emailOnSale, lowStockAlert, newCustomerAlert } = req.body;
    await Subscription.updateMany(
      { user: req.user.id },
      { 
        $set: { 
          'preferences.emailOnSale': emailOnSale,
          'preferences.lowStockAlert': lowStockAlert,
          'preferences.newCustomerAlert': newCustomerAlert
        } 
      }
    );
    res.json({ message: 'Preferences updated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Internal helper to get in-app notifications
exports.getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find().sort({ createdAt: -1 }).limit(20);
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.markAsRead = async (req, res) => {
  try {
    const notification = await Notification.findByIdAndUpdate(req.params.id, { isRead: true }, { new: true });
    res.json(notification);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.markAllAsRead = async (req, res) => {
  try {
    await Notification.updateMany({ isRead: false }, { isRead: true });
    res.json({ message: 'All notifications marked as read' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.sendNotificationToAdmins = async (payload, type = 'emailOnSale') => {
  try {
    // 1. Save to In-App Notifications DB
    await Notification.create({
      title: payload.title,
      message: payload.body,
      type: type === 'lowStockAlert' ? 'SYSTEM' : 'ORDER',
      relatedId: payload.data?.url?.split('/').pop()
    });

    // 2. Send Push Notifications
    const adminSubscriptions = await Subscription.find({ isAdmin: true });
    
    const notificationPromises = adminSubscriptions.map(sub => {
      // Check if user wants this type of notification
      if (sub.preferences && sub.preferences[type] === false) {
        return Promise.resolve();
      }

      const pushSubscription = {
        endpoint: sub.endpoint,
        keys: {
          p256dh: sub.keys.p256dh,
          auth: sub.keys.auth
        }
      };
      
      return webpush.sendNotification(pushSubscription, JSON.stringify(payload))
        .catch(err => {
          if (err.statusCode === 404 || err.statusCode === 410) {
            console.log('Subscription expired or removed');
            return Subscription.deleteOne({ _id: sub._id });
          }
          throw err;
        });
    });

    await Promise.all(notificationPromises);
  } catch (error) {
    console.error('Error sending push notifications:', error);
  }
};
