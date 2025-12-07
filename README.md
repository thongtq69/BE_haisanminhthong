# Backend API - Seafood Crab Shop

Backend Node.js + TypeScript + Express + Mongoose cho web thương mại điện tử bán hải sản/ghẹ.

## Cấu trúc thư mục

```
backend/
├── src/
│   ├── config/          # Cấu hình (env, database)
│   ├── models/          # Mongoose models
│   ├── controllers/     # Controllers xử lý logic
│   ├── routes/          # API routes
│   ├── seed/            # Seed data
│   ├── app.ts           # Express app setup
│   └── server.ts        # Server entry point
├── .env                 # Environment variables
├── tsconfig.json        # TypeScript config
└── package.json
```

## Cài đặt

1. Cài đặt dependencies:
```bash
npm install
```

2. Tạo file `.env` (hoặc copy từ `.env.example`):
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/seafood_crab_shop
FRONTEND_URL=http://localhost:5173
```

3. Đảm bảo MongoDB đang chạy:
```bash
# Nếu dùng MongoDB local
mongod

# Hoặc sử dụng MongoDB Atlas (cloud)
# Cập nhật MONGODB_URI trong .env
```

4. Seed dữ liệu mẫu:
```bash
npm run seed
```

5. Chạy server development:
```bash
npm run dev
```

Server sẽ chạy tại: `http://localhost:5000`

## API Endpoints

### Categories
- `GET /api/categories` - Lấy danh sách categories
- `GET /api/categories/:slug` - Lấy chi tiết category

### Products
- `GET /api/products` - Lấy danh sách sản phẩm (có query params: category, search, minPrice, maxPrice, sort, limit, page)
- `GET /api/products/featured` - Lấy sản phẩm nổi bật
- `GET /api/products/:slug` - Lấy chi tiết sản phẩm

### Reviews
- `GET /api/products/:productId/reviews` - Lấy reviews của sản phẩm
- `POST /api/products/:productId/reviews` - Tạo review mới

### Combos
- `GET /api/combos` - Lấy danh sách combos
- `GET /api/combos/:slug` - Lấy chi tiết combo

### Blog
- `GET /api/blog` - Lấy danh sách blog posts
- `GET /api/blog/:slug` - Lấy chi tiết blog post

## Scripts

- `npm run dev` - Chạy development server với hot reload
- `npm run build` - Build TypeScript sang JavaScript
- `npm run start` - Chạy production server
- `npm run seed` - Seed dữ liệu mẫu vào database

## Models

### Category
- name, slug, description, icon

### Product
- name, slug, category, type, price, originalPrice, isOnSale, tags, images, description, origin, sizeOptions, weightOptions, status, avgRating, reviewCount

### Review
- product, authorName, rating, comment

### Combo
- name, slug, products[], price, originalPrice, description, images, tags

### BlogPost
- title, slug, excerpt, content, thumbnail, tags, publishedAt

