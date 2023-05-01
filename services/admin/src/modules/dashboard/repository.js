import mongoose from 'mongoose';

export const getSystemTotals = async () => {
  const db = mongoose.connection.db;
  const [users, orders, succeededPayments, failedPayments, reviews] = await Promise.all([
    db.collection('users').estimatedDocumentCount(),
    db.collection('orders').estimatedDocumentCount(),
    db.collection('orders').countDocuments({ status: 'paid' }),
    db.collection('orders').countDocuments({ status: 'confirmed', payment_id: { $exists: true } }),
    db.collection('reviews').estimatedDocumentCount(),
  ]);
  return {
    users,
    orders,
    payments: {
      suceeded: succeededPayments,
      failed: failedPayments,
    },
    reviews,
  };
};
