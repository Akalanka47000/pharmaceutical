import mongoose from 'mongoose';

export const getTransactionDetails = () => {
  const db = mongoose.connection.db;
  return db.collection('orders').find();
};
