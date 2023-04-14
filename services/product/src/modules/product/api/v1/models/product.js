import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    product_Name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    measurement_unit: {
      type: String,
      required: true,
    },
    ageLimit: {
      type: String,
      required: true,
    },
    markupPrice: {
      type: Number,
      required: true,
    },
    exp_date: {
      type: Date,
      required: true,
    },
    manu_date: {
      type: Date,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    seller_Name: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    sell_price: {
      type: Number,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  },
);

const Product = mongoose.model('Product', productSchema);

export default Product;
