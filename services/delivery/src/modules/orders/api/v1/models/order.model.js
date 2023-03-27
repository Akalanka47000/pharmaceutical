import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import { statuses } from '../../../constants';

const { Schema } = mongoose;

const SchemaTypes = mongoose.Schema.Types;

const OrderSchema = new Schema(
  {
    waybill_number: {
      type: SchemaTypes.String,
      required: true,
    },
    merchant_id: {
      type: SchemaTypes.String,
      required: true,
    },
    invoice_id: {
      type: SchemaTypes.String,
      required: true,
    },
    origin: {
      type: SchemaTypes.String,
      required: true,
    },
    destination: {
      type: SchemaTypes.String,
      required: true,
    },
    customer_details: {
      email: SchemaTypes.String,
      phone: {
        type: SchemaTypes.String,
        required: true,
      },
    },
    status: {
      type: SchemaTypes.String,
      default: statuses.ready_for_pickup,
    },
  },
  {
    versionKey: false,
    minimize: false,
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  },
);

OrderSchema.index({ createdAt: 1 });

OrderSchema.plugin(mongoosePaginate);

const Order = mongoose.model('Order', OrderSchema);

Order.syncIndexes();

export { Order };
