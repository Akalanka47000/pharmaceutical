import mongoose from 'mongoose';

const BuyerSchema = new mongoose.Schema(
  {
    buyer_name: {
      type: String,
      required: true,
    },
    nic: {
      type: String,
      require: true,
      unique: true,
    },
    email_address: {
      type: String,
      require: true,
      unique: true,
    },
    mobileNumber: {
      required: true,
      type: String,
    },
    address: {
      type: String,
      required: true,
    },
    address_district: {
      type: String,
      required: true,
    },
    credentialID: {
      //   type: mongoose.Schema.Types.ObjectId,
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  },
);

const Buyer = mongoose.model('buyer', BuyerSchema);
export default Buyer;
