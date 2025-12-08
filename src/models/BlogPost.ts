import mongoose, { Schema, Document } from 'mongoose';

export interface IBlogPost extends Document {
  title: string;
  slug: string;
  excerpt: string;
  shortDescription?: string;
  content: string;
  thumbnail?: string;
  coverImage?: string;
  galleryImages?: string[];
  category?: string;
  tags?: string[];
  isFeatured: boolean;
  status: 'draft' | 'published';
  publishedAt?: Date;
  seoTitle?: string;
  seoDescription?: string;
  createdAt: Date;
  updatedAt: Date;
}

const BlogPostSchema = new Schema<IBlogPost>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    excerpt: { type: String, required: true },
    shortDescription: { type: String },
    content: { type: String, required: true },
    coverImage: { type: String },
    // Backward compatibility with old field "thumbnail"
    thumbnail: { type: String },
    galleryImages: { type: [String], default: [] },
    category: { type: String },
    tags: { type: [String], default: [] },
    isFeatured: { type: Boolean, default: false },
    status: { type: String, enum: ['draft', 'published'], default: 'draft' },
    publishedAt: { type: Date },
    seoTitle: { type: String },
    seoDescription: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model<IBlogPost>('BlogPost', BlogPostSchema);
