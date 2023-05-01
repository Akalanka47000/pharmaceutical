import mongoose from 'mongoose';

export const getSystemTotals = async () => {
  const db = mongoose.connection.db;
  const users = await db.collection('users').find().count();
  return {
    users,
  };
};
