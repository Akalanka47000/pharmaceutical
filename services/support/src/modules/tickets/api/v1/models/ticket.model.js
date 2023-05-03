import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import { statuses } from '../../../constants';

const { Schema } = mongoose;

const SchemaTypes = mongoose.Schema.Types;

const TicketSchema = new Schema(
  {
    user: {
      type: SchemaTypes.ObjectId,
      required: true,
    },
    title: {
      type: SchemaTypes.String,
      required: true,
    },
    description: {
      type: SchemaTypes.String,
      required: true,
    },
    discussion: [
      {
        message: {
          type: SchemaTypes.String,
          required: true,
        },
        user: {
          type: SchemaTypes.ObjectId,
          required: true,
        },
      },
    ],
    status: {
      type: SchemaTypes.String,
      default: statuses.open,
    },
  },
  {
    versionKey: false,
    minimize: false,
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  },
);

TicketSchema.index({ createdAt: 1 });

TicketSchema.plugin(mongoosePaginate);

const Ticket = mongoose.model('Ticket', TicketSchema);

Ticket.syncIndexes();

export { Ticket };
