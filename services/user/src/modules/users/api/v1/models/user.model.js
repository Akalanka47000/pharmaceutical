import mongoose from 'mongoose';
import { roles } from '../../../constants';

const { Schema } = mongoose;

const SchemaTypes = mongoose.Schema.Types;

const UserSchema = new Schema(
    {
        name: {
            type: SchemaTypes.String,
            required: true,
        },
        email: {
            type: SchemaTypes.String,
            unique: true,
        },
        password: {
            type: SchemaTypes.String,
            unique: true,
        },
        role: {
            type: SchemaTypes.String,
            enum: Object.values(roles),
            default: roles.buyer,
        },
        is_active: {
            type: SchemaTypes.Boolean,
            default: true,
        }
    },
    {
        versionKey: false,
        minimize: false,
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
    },
);

UserSchema.index({ createdAt: 1 });

const User = mongoose.model('User', UserSchema);

User.syncIndexes();

export { User };