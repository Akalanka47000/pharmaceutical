import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: ['supplements and herbs', 'Sports and nutrition', 'Beauty', 'Bath'],
    },
    measurement_unit: {
      type: String,
      required: true,
    },
    age_limit: {
      type: String,
      required: true,
    },
    markup_price: {
      type: Number,
      required: true,
    },
    exp_date: {
      type: Date,
      required: true,
    },
    manufactured_date: {
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
    seller: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: 'User',
    },
    selling_price: {
      type: Number,
      required: true,
    },
    sold_amount: {
      type: Number,
      default: 0,
    },
    images: {
      type: Array,
    },
    ratings: {
      star: Number,
      postedby: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    },
  },
  {
    versionKey: false,
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  },
);

ProductSchema.index({ createdAt: 1 });

ProductSchema.plugin(mongoosePaginate);

const Product = mongoose.model('Product', ProductSchema);

Product.syncIndexes();

export { Product };
