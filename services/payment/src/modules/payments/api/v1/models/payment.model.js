import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import { paymentStatuses } from '@app/constants';

const PaymentSchema = new mongoose.Schema(
  {
    // required
    order: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: 'Order',
    },
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: 'User',
    },
    amount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(paymentStatuses),
      required: true,
      default: paymentStatuses.raw,
    },

    // optional
    events: {
      initiated: {
        type: Date,
        required: false,
        default: null,
      },
      cancelled: {
        type: Date,
        required: false,
        default: null,
      },
      attempted: [
        {
          type: Date,
          required: false,
          default: null,
        },
      ],
    },

    // stripe related data
    stripe_pay_intent: {
      type: String,
      required: false,
      default: null,
    },
    stripe_charges: [
      {
        type: String,
        required: false,
      },
    ],
  },
  {
    versionKey: false,
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  },
);

PaymentSchema.index({ createdAt: 1 });

PaymentSchema.plugin(mongoosePaginate);

const Payment = mongoose.model('Payment', PaymentSchema);

Payment.syncIndexes();

export { Payment as Order };
