import { IBlogPost } from '../models/BlogPost';

export const sampleBlogPosts: Partial<IBlogPost>[] = [
  {
    title: 'Cách chọn ghẹ tươi sống ngon chuẩn chợ biển',
    slug: 'cach-chon-ghe-tuoi-song-ngon',
    excerpt: 'Bật mí 5 dấu hiệu để chọn ghẹ tươi sống: vỏ sáng, yếm chắc, chân khoẻ, gạch đỏ và mùi biển đặc trưng.',
    content: `<p>Để chọn ghẹ tươi, hãy quan sát lớp vỏ sáng, cầm chắc tay, phần yếm khít và khi bấm nhẹ thấy đàn hồi.</p>
      <p>Ghẹ đực có nhiều thịt, ghẹ cái nhiều gạch. Mùa ghẹ ngon nhất từ tháng 2-7 âm lịch.</p>
      <ul><li>Ưu tiên ghẹ còn sống, di chuyển linh hoạt.</li><li>Tránh ghẹ bị nứt mai, chân rụng nhiều.</li><li>Bảo quản ghẹ với đá lạnh 0-4°C và chế biến trong 4-6 giờ.</li></ul>`,
    coverImage: 'https://images.pexels.com/photos/5409016/pexels-photo-5409016.jpeg',
    category: 'Mẹo chọn hải sản',
    tags: ['ghẹ', 'mẹo chọn', 'tươi sống'],
    isFeatured: true,
    status: 'published',
    publishedAt: new Date(),
  },
  {
    title: '3 công thức ghẹ rang me chua ngọt chuẩn nhà hàng',
    slug: '3-cong-thuc-ghe-rang-me',
    excerpt: 'Ghẹ rang me là món khoái khẩu với vị chua ngọt, hương me thơm dịu. Thử ngay 3 biến tấu dễ làm.',
    content: `<p>Chọn ghẹ tươi, sơ chế sạch, chần nhanh trước khi rang với sốt me.</p>
      <p>Sốt me: me chua, nước mắm, đường thốt nốt, tỏi phi, ớt, sả băm.</p>
      <p>Rang ghẹ lửa vừa 10-12 phút, áo đều sốt. Trang trí ngò rí, tiêu xay.</p>`,
    coverImage: 'https://images.pexels.com/photos/3296279/pexels-photo-3296279.jpeg',
    category: 'Công thức',
    tags: ['ghẹ rang me', 'công thức', 'món nhậu'],
    isFeatured: false,
    status: 'published',
    publishedAt: new Date(),
  },
  {
    title: 'Bí quyết bảo quản tôm hùm sống trong 24 giờ',
    slug: 'bi-quyet-bao-quan-tom-hum-song',
    excerpt: 'Giữ tôm hùm sống khoẻ mạnh trước khi chế biến: đá gel, oxy và nhiệt độ ổn định.',
    content: `<p>Tôm hùm cần môi trường mát 8-12°C, độ ẩm cao. Dùng đá gel, khăn ướt phủ nhẹ.</p>
      <ul><li>Không nhúng tôm trực tiếp vào nước ngọt.</li><li>Hạn chế va chạm mạnh làm gãy râu.</li><li>Chế biến trong 12-24h để giữ độ ngọt.</li></ul>`,
    coverImage: 'https://images.pexels.com/photos/3756523/pexels-photo-3756523.jpeg',
    category: 'Bảo quản',
    tags: ['tôm hùm', 'bảo quản', 'kinh nghiệm'],
    isFeatured: false,
    status: 'published',
    publishedAt: new Date(),
  },
  {
    title: 'Lẩu hải sản chua cay cho tiệc gia đình 6 người',
    slug: 'lau-hai-san-chua-cay-6-nguoi',
    excerpt: 'Combo lẩu ghẹ, tôm sú, mực, nghêu với nước lẩu tomyum chua cay đậm vị.',
    content: `<p>Nước lẩu: sả, lá chanh, riềng, ớt, tomyum paste, nước dừa.</p>
      <p>Hải sản: ghẹ xanh, tôm sú, mực lá, nghêu. Nhúng nhanh để giữ độ ngọt.</p>
      <p>Ăn kèm: rau muống, nấm kim châm, mì trứng.</p>`,
    coverImage: 'https://images.pexels.com/photos/5409024/pexels-photo-5409024.jpeg',
    category: 'Công thức',
    tags: ['lẩu hải sản', 'tomyum', 'gia đình'],
    isFeatured: false,
    status: 'published',
    publishedAt: new Date(),
  },
  {
    title: 'Top 5 món hải sản giàu Omega-3 tốt cho tim mạch',
    slug: 'top-5-hai-san-giau-omega-3',
    excerpt: 'Cá hồi, cá ngừ, hàu, tôm hùm và ghẹ là nguồn Omega-3 tự nhiên, hỗ trợ tim mạch.',
    content: `<ul>
      <li>Cá hồi Nauy: Omega-3 cao, ít mỡ bão hòa.</li>
      <li>Cá ngừ đại dương: giàu EPA/DHA, phù hợp áp chảo.</li>
      <li>Hàu sữa: giàu kẽm, tốt cho sức khỏe sinh lý.</li>
      <li>Tôm hùm: đạm cao, ít béo, nướng bơ tỏi rất ngon.</li>
      <li>Ghẹ xanh: giàu protein, ít cholesterol.</li>
    </ul>`,
    coverImage: 'https://images.pexels.com/photos/3296273/pexels-photo-3296273.jpeg',
    category: 'Dinh dưỡng',
    tags: ['omega-3', 'sức khỏe'],
    isFeatured: false,
    status: 'published',
    publishedAt: new Date(),
  },
  {
    title: 'Hướng dẫn làm hàu nướng phô mai béo ngậy',
    slug: 'hau-nuong-pho-mai',
    excerpt: 'Hàu sữa tươi, phô mai mozzarella, bơ lạt và tỏi băm – công thức 15 phút.',
    content: `<p>Trộn bơ lạt, tỏi băm, ít tiêu. Rải phô mai lên hàu, phết bơ, nướng 180°C trong 8-10 phút.</p>
      <p>Dùng nóng với sốt chanh ớt. Hàu giàu kẽm, tốt cho sức khỏe.</p>`,
    coverImage: 'https://images.pexels.com/photos/5409020/pexels-photo-5409020.jpeg',
    category: 'Công thức',
    tags: ['hàu nướng', 'phô mai'],
    isFeatured: true,
    status: 'published',
    publishedAt: new Date(),
  },
  {
    title: 'Mẹo sơ chế mực lá không tanh',
    slug: 'meo-so-che-muc-khong-tanh',
    excerpt: 'Loại bỏ túi mực, màng đen, ngâm sữa tươi 10 phút để khử mùi tanh.',
    content: `<p>Rút xương sống, bỏ túi mực, lột màng đen. Ngâm sữa tươi 10 phút rồi rửa lại nước lạnh.</p>
      <p>Ướp gừng, sả, ớt 15 phút trước khi nướng/hấp giúp dậy mùi thơm.</p>`,
    coverImage: 'https://images.pexels.com/photos/3296275/pexels-photo-3296275.jpeg',
    category: 'Bảo quản',
    tags: ['mực', 'sơ chế'],
    isFeatured: false,
    status: 'published',
    publishedAt: new Date(),
  },
  {
    title: 'BBQ hải sản: chọn than và nhiệt độ chuẩn',
    slug: 'bbq-hai-san-chon-than-nhiet-do',
    excerpt: 'Nhiệt độ than 180-200°C, dùng than hoa hoặc than không khói để giữ hương vị hải sản.',
    content: `<p>Ướp nhẹ hải sản với muối, tiêu, dầu olive. Nhiệt độ than 180-200°C để không cháy bề mặt.</p>
      <p>Dùng than hoa hoặc than không khói. Trở đều tay, quét sốt bơ tỏi để tăng hương vị.</p>`,
    coverImage: 'https://images.pexels.com/photos/3490388/pexels-photo-3490388.jpeg',
    category: 'Kinh nghiệm nấu',
    tags: ['BBQ', 'nướng hải sản'],
    isFeatured: false,
    status: 'published',
    publishedAt: new Date(),
  },
  {
    title: '5 bước luộc tôm sú giữ màu đỏ đẹp',
    slug: '5-buoc-luoc-tom-su',
    excerpt: 'Luộc tôm sú ngon: nước sôi mới cho tôm, thêm gừng sả, không luộc quá 3-4 phút.',
    content: `<ol>
      <li>Đun nước với gừng, sả, chút muối.</li>
      <li>Nước sôi lớn mới cho tôm vào.</li>
      <li>Luộc 3-4 phút đến khi tôm đỏ đều.</li>
      <li>Vớt ra ngâm nước đá để giữ độ giòn.</li>
    </ol>`,
    coverImage: 'https://images.pexels.com/photos/1640773/pexels-photo-1640773.jpeg',
    category: 'Công thức',
    tags: ['tôm sú', 'luộc tôm'],
    isFeatured: false,
    status: 'published',
    publishedAt: new Date(),
  },
  {
    title: 'Gợi ý menu hải sản Noel 6 người',
    slug: 'menu-hai-san-noel-6-nguoi',
    excerpt: 'Ghẹ hấp bia, tôm hùm nướng phô mai, hàu nướng, lẩu hải sản – đầy đủ cho tiệc Noel.',
    content: `<p>Menu gồm: ghẹ hấp bia, tôm hùm nướng phô mai, hàu nướng bơ tỏi, lẩu hải sản tomyum.</p>
      <p>Chuẩn bị trước sốt, cắt sẵn rau củ để tiết kiệm thời gian. Trang trí bàn tiệc với tông đỏ xanh Noel.</p>`,
    coverImage: 'https://images.pexels.com/photos/56007/pexels-photo-56007.jpeg',
    category: 'Gợi ý tiệc',
    tags: ['Noel', 'menu tiệc'],
    isFeatured: true,
    status: 'published',
    publishedAt: new Date(),
  },
];
