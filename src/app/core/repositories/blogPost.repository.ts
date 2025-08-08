// src/app/core/repositories/blog-post.repository.ts
import { BlogPost } from '../domain/blogPost.model';

export abstract class BlogPostRepository {
  abstract getBlogPosts(): Promise<BlogPost[]>;
  abstract getBlogPostBySlug(slug: string): Promise<BlogPost | null>;
  // Agregar otros métodos según necesidad:
  // createBlogPost(post: BlogPost): Promise<BlogPost>;
  // updateBlogPost(id: string, post: Partial<BlogPost>): Promise<BlogPost>;
  // deleteBlogPost(id: string): Promise<void>;
}