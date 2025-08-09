// src/app/core/repositories/blog-post.repository.ts
import { BlogPost } from '../domain/blogPost.model';

export abstract class BlogPostRepository {
  abstract getBlogPosts(): Promise<BlogPost[]>;
  // abstract getBlogPostBySlug(slug: string): Promise<BlogPost | null>;
}