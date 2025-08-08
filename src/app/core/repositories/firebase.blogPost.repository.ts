// src/app/core/repositories/firebase/firebase-blog-post.repository.ts
import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { firstValueFrom, map } from 'rxjs';
import { BlogPost } from '../domain/blogPost.model';
import { BlogPostRepository } from './blogPost.repository';

@Injectable({
  providedIn: 'root'
})
export class FirebaseBlogPostRepository extends BlogPostRepository {
  constructor(private firestore: Firestore) {
    super();
  }

  async getBlogPosts(): Promise<BlogPost[]> {
    const blogCollection = collection(this.firestore, 'blog');
    
    try {
      const blogPosts: BlogPost[] = await firstValueFrom(
        collectionData(blogCollection, { idField: 'id' }).pipe(
          map(data => {
            if (!data) return [];
            return (Array.isArray(data) ? data : [data]).map(this.mapToBlogPost);
          })
        )
      );
      return blogPosts as BlogPost[];
    } catch (error) {
      console.error("Error fetching blog posts:", error);
      return []; // Retorna array vacío en caso de error
    }
  }

  async getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
    const posts = await this.getBlogPosts();
    return posts.find(post => post.slug === slug) || null;
  }

  private mapToBlogPost(data: any): BlogPost {
    return new BlogPost(
      data.id,
      data.slug,
      data.title,
      data.author,
      data.date,
      data.extract,
      data.image,
      data.markdown,
      data.tags,
      data.videos,
      data.content,
      data.published,
      data.featured
    );
  }
}