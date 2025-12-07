import { IReview } from '../models/Review';

export interface SeedReview extends Partial<IReview> {
  productSlug: string;
}

export const sampleReviews: SeedReview[] = [
  {
    productSlug: 'ghe-xanh-song-4-6',
    authorName: 'Anh Minh',
    rating: 5,
    comment: 'Ghẹ tươi, giao nhanh, thịt chắc. Hấp sả rất ngọt.',
  },
  {
    productSlug: 'ghe-xanh-song-4-6',
    authorName: 'Chị Lan',
    rating: 4,
    comment: 'Ghẹ sống khoẻ, đóng gói kỹ. Sẽ mua lại.',
  },
  {
    productSlug: 'tom-hum-bong-1-1-2',
    authorName: 'Tuấn Hải',
    rating: 5,
    comment: 'Tôm hùm nhiều gạch, nướng phô mai tuyệt vời.',
  },
  {
    productSlug: 'phi-le-ca-hoi-500g',
    authorName: 'Mai Vy',
    rating: 5,
    comment: 'Cá hồi tươi, sashimi ngon, không tanh.',
  },
  {
    productSlug: 'hau-sua-nha-trang',
    authorName: 'Quốc Huy',
    rating: 4,
    comment: 'Hàu béo, sạch cát. Nướng phô mai rất ổn.',
  },
  {
    productSlug: 'combo-bbq-ngoai-troi',
    authorName: 'Gia Huy',
    rating: 5,
    comment: 'Combo BBQ đủ cho 6 người, hải sản tươi, tiện lợi.',
  },
  {
    productSlug: 'combo-lau-4-nguoi',
    authorName: 'Thanh Phương',
    rating: 4,
    comment: 'Combo lẩu ngon, nước lẩu tomyum vừa miệng.',
  },
  {
    productSlug: 'ghe-do-song-size-dai',
    authorName: 'Thảo Nhi',
    rating: 5,
    comment: 'Ghẹ đỏ nhiều gạch, thịt ngọt. Đóng gói đá gel tốt.',
  },
  {
    productSlug: 'luon-ca-hoi-1kg',
    authorName: 'Minh Quân',
    rating: 4,
    comment: 'Lườn cá hồi béo, chiên giòn rất hợp.',
  },
  {
    productSlug: 'ca-thu-mot-nang-500g',
    authorName: 'Bích Ngọc',
    rating: 5,
    comment: 'Cá thu một nắng thơm, không quá mặn, kho tiêu ngon.',
  },
];
