import { ICombo } from '../models/Combo';

export interface SeedCombo {
  name: string;
  slug: string;
  description: string;
  price: number;
  originalPrice?: number;
  tags?: string[];
  images?: string[];
  items: { productSlug: string; quantity: number }[];
}

const img = (text: string) =>
  `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500"><defs><linearGradient id="g" x1="0" x2="1" y1="0" y2="1"><stop stop-color="%231565C0" offset="0%"/><stop stop-color="%23E53935" offset="100%"/></linearGradient></defs><rect width="800" height="500" fill="url(%23g)"/><text x="50%" y="50%" fill="white" font-size="32" font-family="Arial" text-anchor="middle" dominant-baseline="middle">${encodeURIComponent(text)}</text></svg>`;

export const sampleCombos: SeedCombo[] = [
  {
    name: 'Combo Lẩu Hải Sản 4 Người',
    slug: 'combo-lau-4-nguoi',
    description: 'Ghẹ xanh, tôm sú, mực lá, nghêu, nước lẩu tomyum, đủ cho 4 người.',
    price: 890000,
    originalPrice: 990000,
    tags: ['combo', 'lẩu', 'gia đình'],
    images: [img('Combo Lẩu 4 Người')],
    items: [
      { productSlug: 'ghe-xanh-song-4-6', quantity: 1 },
      { productSlug: 'tom-su-20-25', quantity: 1 },
      { productSlug: 'ngheu-trang-1kg', quantity: 1 },
      { productSlug: 'phi-le-ca-hoi-500g', quantity: 1 },
    ],
  },
  {
    name: 'Combo BBQ Ngoài Trời',
    slug: 'combo-bbq-ngoai-troi',
    description: 'Tôm hùm, sò điệp, hàu, cá hồi, sốt bơ tỏi, phù hợp tiệc BBQ.',
    price: 1290000,
    originalPrice: 1450000,
    tags: ['combo', 'BBQ'],
    images: [img('Combo BBQ')],
    items: [
      { productSlug: 'tom-hum-xanh-0-8-1', quantity: 1 },
      { productSlug: 'so-diep-nhat-500g', quantity: 1 },
      { productSlug: 'hau-sua-nha-trang', quantity: 1 },
      { productSlug: 'phi-le-ca-hoi-500g', quantity: 1 },
    ],
  },
  {
    name: 'Combo Ghẹ – Tôm – Hàu Cuối Tuần',
    slug: 'combo-ghe-tom-hau-cuoi-tuan',
    description: 'Ghẹ xanh, tôm sú, hàu sữa cho bữa tiệc cuối tuần 4–6 người.',
    price: 980000,
    originalPrice: 1100000,
    tags: ['combo', 'cuối tuần'],
    images: [img('Combo Ghẹ Tôm Hàu')],
    items: [
      { productSlug: 'ghe-xanh-song-4-6', quantity: 1 },
      { productSlug: 'tom-su-10-12', quantity: 1 },
      { productSlug: 'hau-sua-nha-trang', quantity: 1 },
    ],
  },
  {
    name: 'Combo Noel Hải Sản Cao Cấp',
    slug: 'combo-noel-cao-cap',
    description: 'Ưu đãi mùa Noel: ghẹ xanh, tôm hùm bông, hàu nướng phô mai.',
    price: 1590000,
    originalPrice: 1750000,
    tags: ['combo', 'Noel'],
    images: [img('Combo Noel Cao Cấp')],
    items: [
      { productSlug: 'ghe-xanh-noel', quantity: 1 },
      { productSlug: 'tom-hum-bong-1-1-2', quantity: 1 },
      { productSlug: 'hau-nuong-pho-mai-20', quantity: 1 },
    ],
  },
  {
    name: 'Combo Lẩu Ghẹ Chua Cay',
    slug: 'combo-lau-ghe-chua-cay',
    description: 'Ghẹ gạch, ghẹ xanh, nghêu, nước lẩu chua cay, đủ cho 3–4 người.',
    price: 820000,
    tags: ['combo', 'lẩu ghẹ'],
    images: [img('Combo Lẩu Ghẹ')],
    items: [
      { productSlug: 'ghe-gach-ca-mau', quantity: 1 },
      { productSlug: 'ghe-xanh-song-4-6', quantity: 1 },
      { productSlug: 'ngheu-trang-1kg', quantity: 1 },
    ],
  },
];
