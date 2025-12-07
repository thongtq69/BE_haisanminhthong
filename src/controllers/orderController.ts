import { Request, Response } from 'express';
import Order, { IOrder, OrderSource, PaymentMethod } from '../models/Order';
import Product from '../models/Product';

const generateOrderCode = () => `HS${Date.now()}`;

const validateGuestOrder = (body: any) => {
  const errors: string[] = [];
  if (!body?.customer?.name) errors.push('customer.name is required');
  if (!body?.customer?.phone) errors.push('customer.phone is required');
  if (!body?.customer?.address?.province) errors.push('customer.address.province is required');
  if (!body?.customer?.address?.district) errors.push('customer.address.district is required');
  if (!body?.customer?.address?.ward) errors.push('customer.address.ward is required');
  if (!body?.customer?.address?.detail) errors.push('customer.address.detail is required');
  if (!Array.isArray(body?.items) || body.items.length === 0) errors.push('items must have at least 1 item');
  if (!['COD', 'BANK_TRANSFER'].includes(body?.paymentMethod)) errors.push('paymentMethod is invalid');
  return errors;
};

export const createGuestOrder = async (req: Request, res: Response) => {
  try {
    const errors = validateGuestOrder(req.body);
    if (errors.length) {
      return res.status(400).json({ success: false, message: 'Validation error', errors });
    }

    const { customer, items, paymentMethod, source = 'cart' } = req.body as {
      customer: IOrder['customer'];
      items: Array<{ product: string; quantity: number; price?: number; name?: string; thumbnail?: string }>;
      paymentMethod: PaymentMethod;
      source?: OrderSource;
    };

    // Enrich items with current product data
    const populatedItems = await Promise.all(
      items.map(async (item) => {
        const product = await Product.findById(item.product);
        if (!product) throw new Error(`Product not found: ${item.product}`);
        const unitPrice = item.price ?? product.price;
        const subtotal = unitPrice * (item.quantity || 1);
        return {
          product: product._id,
          name: item.name || product.name,
          thumbnail: item.thumbnail || product.images?.[0],
          quantity: item.quantity || 1,
          unitPrice,
          subtotal,
        };
      })
    );

    const subtotal = populatedItems.reduce((sum, it) => sum + it.subtotal, 0);
    const shippingFee = 0; // TODO: config shipping
    const discountAmount = 0; // TODO: apply coupon
    const total = subtotal - discountAmount + shippingFee;

    const order = await Order.create({
      code: generateOrderCode(),
      customer,
      items: populatedItems,
      subtotal,
      shippingFee,
      discountAmount,
      total,
      paymentMethod,
      status: 'pending',
      source,
    });

    return res.status(201).json({
      success: true,
      message: 'Order created successfully',
      order,
    });
  } catch (error: any) {
    console.error('createGuestOrder error:', error);
    return res.status(500).json({ success: false, message: error.message || 'Server error' });
  }
};

export const getOrders = async (req: Request, res: Response) => {
  try {
    const page = parseInt((req.query.page as string) || '1', 10);
    const limit = parseInt((req.query.limit as string) || '20', 10);
    const skip = (page - 1) * limit;

    const [orders, total] = await Promise.all([
      Order.find().sort({ createdAt: -1 }).skip(skip).limit(limit),
      Order.countDocuments(),
    ]);

    return res.json({
      success: true,
      data: orders,
      pagination: { page, limit, total },
    });
  } catch (error: any) {
    console.error('getOrders error:', error);
    return res.status(500).json({ success: false, message: error.message || 'Server error' });
  }
};

export const getOrderById = async (req: Request, res: Response) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }
    return res.json({ success: true, data: order });
  } catch (error: any) {
    console.error('getOrderById error:', error);
    return res.status(500).json({ success: false, message: error.message || 'Server error' });
  }
};
