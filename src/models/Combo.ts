import mongoose, { Schema, Document } from 'mongoose';

export interface ICombo extends Document {
  name: string;
  slug: string;
  products: { product: mongoose.Types.ObjectId; quantity: number }[];
  price: number;
  originalPrice?: number;
  description: string;
  images: string[];
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

const ComboSchema = new Schema<ICombo>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    products: {
      type: [
        {
          product: {
            type: Schema.Types.ObjectId,
            ref: 'Product',
            required: true,
          },
          quantity: {
            type: Number,
            required: true,
            min: 1,
          },
        },
      ],
      default: [],
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    originalPrice: {
      type: Number,
      min: 0,
    },
    description: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
      default: [],
    },
    tags: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ICombo>('Combo', ComboSchema);

