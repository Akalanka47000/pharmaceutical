import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const { Schema } = mongoose;

const SchemaTypes = mongoose.Schema.Types;

const ReviewSchema = new Schema(
  {
    rating: {
      type: SchemaTypes.Number,
      required: true,
    },
    user: {
      type: SchemaTypes.ObjectId,
      required: true,
      ref: 'User',
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
