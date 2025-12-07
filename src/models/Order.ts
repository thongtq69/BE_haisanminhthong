import mongoose, { Schema, Document } from 'mongoose';

export type PaymentMethod = 'COD' | 'BANK_TRANSFER';
export type OrderStatus = 'pending' | 'processing' | 'completed' | 'cancelled';
export type OrderSource = 'cart' | 'buy_now';

export interface IOrderItem {
  product: mongoose.Types.ObjectId;
  name: string;
  thumbnail?: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

export interface IOrder extends Document {
  code: string;
  customer: {
    name: string;
    email?: string;
    phone: string;
    address: {
      province: string;
      district: string;
      ward: string;
      detail: string;
    };
    note?: string;
  };
  items: IOrderItem[];
  subtotal: number;
  shippingFee: number;
  discountAmount: number;
  total: number;
  paymentMethod: PaymentMethod;
  status: OrderStatus;
  source: OrderSource;
  createdAt: Date;
  updatedAt: Date;
}

const OrderItemSchema = new Schema<IOrderItem>(
  {
    product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    name: { type: String, required: true },
    thumbnail: { type: String },
    quantity: { type: Number, required: true, min: 1 },
    unitPrice: { type: Number, required: true, min: 0 },
    subtotal: { type: Number, required: true, min: 0 },
  },
  { _id: false }
);

const OrderSchema = new Schema<IOrder>(
  {
    code: { type: String, required: true, unique: true },
    customer: {
      name: { type: String, required: true },
      email: { type: String },
      phone: { type: String, required: true },
      address: {
        province: { type: String, required: true },
        district: { type: String, required: true },
        ward: { type: String, required: true },
        detail: { type: String, required: true },
      },
      note: { type: String },
    },
    items: { type: [OrderItemSchema], required: true },
    subtotal: { type: Number, required: true, min: 0 },
    shippingFee: { type: Number, required: true, min: 0, default: 0 },
    discountAmount: { type: Number, required: true, min: 0, default: 0 },
    total: { type: Number, required: true, min: 0 },
    paymentMethod: {
      type: String,
      enum: ['COD', 'BANK_TRANSFER'],
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'processing', 'completed', 'cancelled'],
      default: 'pending',
    },
    source: {
      type: String,
      enum: ['cart', 'buy_now'],
      default: 'cart',
    },
  },
  { timestamps: true }
);

export default mongoose.model<IOrder>('Order', OrderSchema);
