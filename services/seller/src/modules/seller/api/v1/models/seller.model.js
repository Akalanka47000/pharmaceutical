import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const SellerSchema = new mongoose.Schema(
  {
    business_name: {
      type: String,
      required: true,
      unique: true,
    },
    business_email: {
      type: String,
      required: true,
    },
    license_number: {
      type: String,
      required: true,
    },
    owner_nic: {
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
