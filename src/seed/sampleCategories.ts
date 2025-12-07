import { ICategory } from '../models/Category';

export interface SeedCategory extends Partial<ICategory> {
  slug: string;
  name: string;
  description?: string;
  icon?: string;
  image?: string;
  images?: string[];
}

export const sampleCategories: SeedCategory[] = [
  {
    name: 'Ghẹ sống',
    slug: 'ghe-song',
    description: 'Ghẹ xanh, ghẹ đỏ tươi sống, giao nhanh trong ngày.',
    icon: '🦀',
    image:
      'https://images.pexels.com/photos/3296113/pexels-photo-3296113.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&dpr=1',
    images: [
      'https://images.pexels.com/photos/3296113/pexels-photo-3296113.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&dpr=1',
      'https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&dpr=1',
    ],
  },
  {
    name: 'Tôm hùm',
    slug: 'tom-hum',
    description: 'Tôm hùm bông, tôm hùm xanh size lớn, thịt chắc, ngọt.',
    icon: '🦞',
    image:
      'https://images.pexels.com/photos/5409024/pexels-photo-5409024.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&dpr=1',
    images: [
      'https://images.pexels.com/photos/5409024/pexels-photo-5409024.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&dpr=1',
      'https://images.pexels.com/photos/1407309/pexels-photo-1407309.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&dpr=1',
    ],
  },
  {
    name: 'Tôm sú',
    slug: 'tom-su',
    description: 'Tôm sú tươi, size đại, thích hợp nướng, hấp bia.',
    icon: '🍤',
    image:
      'https://images.pexels.com/photos/769290/pexels-photo-769290.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&dpr=1',
    images: [
      'https://images.pexels.com/photos/769290/pexels-photo-769290.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&dpr=1',
      'https://images.pexels.com/photos/9099/food-dinner-lunch-seafood.jpg?auto=compress&cs=tinysrgb&w=1200&h=800&dpr=1',
    ],
  },
  {
    name: 'Cua biển',
    slug: 'cua-bien',
    description: 'Cua gạch, cua thịt Cà Mau, đậm vị biển.',
    icon: '🦀',
    image:
      'https://images.pexels.com/photos/1407309/pexels-photo-1407309.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&dpr=1',
    images: [
      'https://images.pexels.com/photos/1407309/pexels-photo-1407309.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&dpr=1',
      'https://images.pexels.com/photos/2102934/pexels-photo-2102934.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&dpr=1',
    ],
  },
  {
    name: 'Hàu tươi',
    slug: 'hau-tuoi',
    description: 'Hàu sữa, hàu nướng phô mai, giàu kẽm, tốt cho sức khỏe.',
    icon: '🦪',
    image:
      'https://images.pexels.com/photos/1096062/pexels-photo-1096062.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&dpr=1',
    images: [
      'https://images.pexels.com/photos/1096062/pexels-photo-1096062.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&dpr=1',
      'https://images.pexels.com/photos/248413/pexels-photo-248413.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&dpr=1',
    ],
  },
  {
    name: 'Ngao - Nghêu - Sò',
    slug: 'ngao-ngheu-so',
    description: 'Ngao, nghêu, sò huyết, sò điệp, thích hợp cho lẩu hải sản.',
    icon: '🐚',
    image:
      'https://images.pexels.com/photos/158070/pexels-photo-158070.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&dpr=1',
    images: [
      'https://images.pexels.com/photos/158070/pexels-photo-158070.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&dpr=1',
      'https://images.pexels.com/photos/209293/pexels-photo-209293.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&dpr=1',
    ],
  },
  {
    name: 'Cá hồi',
    slug: 'ca-hoi',
    description: 'Phi lê cá hồi Nauy, lườn cá hồi giàu Omega-3.',
    icon: '🐟',
    image:
      'https://images.pexels.com/photos/3296273/pexels-photo-3296273.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&dpr=1',
    images: [
      'https://images.pexels.com/photos/3296273/pexels-photo-3296273.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&dpr=1',
      'https://images.pexels.com/photos/2772527/pexels-photo-2772527.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&dpr=1',
    ],
  },
  {
    name: 'Cá biển cao cấp',
    slug: 'ca-bien-cao-cap',
    description: 'Cá thu, cá chim, cá ngừ đại dương, tươi ngon mỗi ngày.',
    icon: '🐠',
    image:
      'https://images.pexels.com/photos/1404653/pexels-photo-1404653.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&dpr=1',
    images: [
      'https://images.pexels.com/photos/1404653/pexels-photo-1404653.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&dpr=1',
      'https://images.pexels.com/photos/2383071/pexels-photo-2383071.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&dpr=1',
    ],
  },
  {
    name: 'Combo gia đình',
    slug: 'combo-gia-dinh',
    description: 'Combo lẩu hải sản, combo BBQ cho gia đình 4-6 người.',
    icon: '🎁',
    image:
      'https://images.pexels.com/photos/2113556/pexels-photo-2113556.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&dpr=1',
    images: [
      'https://images.pexels.com/photos/2113556/pexels-photo-2113556.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&dpr=1',
      'https://images.pexels.com/photos/410648/pexels-photo-410648.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&dpr=1',
    ],
  },
  {
    name: 'Khuyến mãi Noel',
    slug: 'khuyen-mai-noel',
    description: 'Ưu đãi mùa lễ hội cho ghẹ, tôm, cá, combo tiệc.',
    icon: '🎄',
    image:
      'https://images.pexels.com/photos/3186654/pexels-photo-3186654.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&dpr=1',
    images: [
      'https://images.pexels.com/photos/3186654/pexels-photo-3186654.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&dpr=1',
      'https://images.pexels.com/photos/1667432/pexels-photo-1667432.jpeg?auto=compress&cs=tinysrgb&w=1200&h=800&dpr=1',
    ],
  },
];
