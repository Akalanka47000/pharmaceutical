import mongoose from 'mongoose';

export const getTransactionDetails = () => {
  const db = mongoose.connection.db;
  return db
    .collection('orders')
    .aggregate([
      {
        $lookup: {
          from: 'users',
          localField: 'user',
          foreignField: '_id',
          as: 'user',
        },
      },
      {
        $unwind: '$user',
      },
    ])
    .toArray();
};
