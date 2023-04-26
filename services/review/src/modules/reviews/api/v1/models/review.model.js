import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const { Schema } = mongoose;

const SchemaTypes = mongoose.Schema.Types;

const ReviewSchema = new Schema(
  {
    review_id: {
      type: SchemaTypes.String,
      required: true,
    },
    user_id: {
      type: SchemaTypes.String,
      required: true,
    },
    product_id: {
      type: SchemaTypes.String,
      required: true,
    },
    content: {
      type: SchemaTypes.String,
      required: true,
    },
    timeStamp: {
      type: SchemaTypes.String,
      required: true,
    },
  },
  {
    versionKey: false,
    minimize: false,
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  },
);

ReviewSchema.index({ createdAt: 1 });

ReviewSchema.plugin(mongoosePaginate);

const Review = mongoose.model('Review', ReviewSchema);

Review.syncIndexes();

export { Review };
