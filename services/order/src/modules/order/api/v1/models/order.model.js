import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import { orderStatuses } from '@app/constants';

const OrderSchema = new mongoose.Schema(
  {
    products: [
      {
        _id: {
          type: mongoose.SchemaTypes.ObjectId,
          required: true,
          ref: 'Product',
        },
        quantity: Number,
      },
    ],
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: 'User',
    },
    total: {
      type: Number,
      required: true,
    },
    commission: {
      type: Number,
      required: true,
    },
    net_total: {
      type: Number,
      required: true,
    },
    status: {
      type: mongoose.SchemaTypes.String,
      enum: Object.values(orderStatuses),
      default: orderStatuses.pending,
    },
    delivery_id: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Delivery',
    },
  },
  {
    versionKey: false,
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  },
);

OrderSchema.index({ createdAt: 1 });

OrderSchema.plugin(mongoosePaginate);

const Order = mongoose.model('Order', OrderSchema);

Order.syncIndexes();

export { Order };
