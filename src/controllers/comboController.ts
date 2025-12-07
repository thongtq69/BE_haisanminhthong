import { Request, Response } from 'express';
import Combo from '../models/Combo';

export const getCombos = async (req: Request, res: Response) => {
  try {
    const combos = await Combo.find()
      .populate('products.product', 'name price images')
      .sort({ createdAt: -1 });

    res.json({
      data: combos,
      meta: {
        total: combos.length,
      },
      error: null,
    });
  } catch (error: any) {
    res.status(500).json({
      data: null,
      error: error.message || 'Failed to fetch combos',
    });
  }
};

export const getComboBySlug = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const combo = await Combo.findOne({ slug }).populate(
      'products.product',
      'name price images shortDescription'
    );

    if (!combo) {
      return res.status(404).json({
        data: null,
        error: 'Combo not found',
      });
    }

    res.json({
      data: combo,
      error: null,
    });
  } catch (error: any) {
    res.status(500).json({
      data: null,
      error: error.message || 'Failed to fetch combo',
    });
  }
};

