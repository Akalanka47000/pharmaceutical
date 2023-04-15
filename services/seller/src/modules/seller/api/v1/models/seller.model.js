import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const SellerSchema = new mongoose.Schema(
  {
    business_name: {
      type: String,
      required: true,
      unique: true,
    },
    license_number: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
      unique: true,
    },
    address: {
      type: String,
      required: true,
    },
    nic_owner: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    versionKey: false,
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  },
);

SellerSchema.index({ createdAt: 1 });

SellerSchema.plugin(mongoosePaginate);

const Seller = mongoose.model('Seller', SellerSchema);

Seller.syncIndexes();

export { Seller };
