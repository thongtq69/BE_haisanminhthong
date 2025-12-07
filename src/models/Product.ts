import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  slug: string;
  category: mongoose.Types.ObjectId;
  type: 'crab' | 'seafood' | 'combo' | 'other';
  price: number;
  originalPrice?: number;
  isOnSale: boolean;
  salePercent?: number;
  tags: string[];
  images: string[];
  shortDescription: string;
  description: string;
  origin?: string;
  sizeOptions?: { label: string; value: string }[];
  weightOptions?: { label: string; value: number }[];
  status: 'available' | 'out_of_stock';
  avgRating: number;
  reviewCount: number;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<IProduct>(
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
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    type: {
      type: String,
      enum: ['crab', 'seafood', 'combo', 'other'],
      default: 'crab',
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
    isOnSale: {
      type: Boolean,
      default: false,
    },
    salePercent: {
      type: Number,
      min: 0,
      max: 100,
    },
    tags: {
      type: [String],
      default: [],
    },
    images: {
      type: [String],
      default: [],
    },
    shortDescription: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    origin: {
      type: String,
    },
    sizeOptions: {
      type: [
        {
          label: String,
          value: String,
        },
      ],
      default: [],
    },
    weightOptions: {
      type: [
        {
          label: String,
          value: Number,
        },
      ],
      default: [],
    },
    status: {
      type: String,
      enum: ['available', 'out_of_stock'],
      default: 'available',
    },
    avgRating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    reviewCount: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Calculate salePercent before saving
ProductSchema.pre('save', async function () {
  if (this.originalPrice && this.price < this.originalPrice) {
    this.isOnSale = true;
    this.salePercent = Math.round(
      ((this.originalPrice - this.price) / this.originalPrice) * 100
    );
  }
});

export default mongoose.model<IProduct>('Product', ProductSchema);

