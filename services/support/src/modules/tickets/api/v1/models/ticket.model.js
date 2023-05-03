import mongoose from 'mongoose';
import aggregatePaginate from 'mongoose-aggregate-paginate-v2';
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
    replies: [
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

TicketSchema.plugin(aggregatePaginate);

const Ticket = mongoose.model('Ticket', TicketSchema);

Ticket.syncIndexes();

export { Ticket };
