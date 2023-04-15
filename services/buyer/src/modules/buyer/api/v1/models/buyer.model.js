import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const BuyerSchema = new mongoose.Schema(
  {
    nic: {
      type: String,
      require: true,
      unique: true,
    },
    credential_id: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  },
);

BuyerSchema.index({ createdAt: 1 });

BuyerSchema.plugin(mongoosePaginate);

const Buyer = mongoose.model('Buyer', BuyerSchema);

Buyer.syncIndexes();

export { Buyer };
