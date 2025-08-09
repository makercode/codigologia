import { Injectable } from '@angular/core';
import { BlogPost } from '../../domain/blogPost.model';
import { BlogPostRepository } from '../../repositories/blogPost.repository';

@Injectable({
  providedIn: 'root'
})
export class BlogPostService {
  // Firebase repository is configured in app.config.ts injected by BlogPostRepository
  constructor(private blogPostRepository: BlogPostRepository) {}

  storedBlogPosts:BlogPost[] = [];

  // public

  public async getStoredBlogPosts() {
    if( !this.isBlogPostLocalStorageSetted() ) {
      await this.setLocalStorageBlogPosts()
      return this.getLocalStorageBlogPosts()
    }
    return this.getLocalStorageBlogPosts()
  }

  public async getStoredBlogPost(slug:string) {
    if( !this.isBlogPostLocalStorageSetted( )) {
      await this.setLocalStorageBlogPosts()
    }
    let posts = await this.getStoredBlogPosts()
    let post = posts.find((post: BlogPost) => post.slug === slug)
    return post
  }

  // Private

  private async getBlogPosts(): Promise<BlogPost[]> {
    
    try {
      const data = await this.blogPostRepository.getBlogPosts();
      return data as BlogPost[];

    } catch (error) {
      console.error("Error fetching blog posts:", error);
      return []; // Retorna array vacío en caso de error
    }
  }

  private async setLocalStorageBlogPosts() {
    if( !this.isBlogPostLocalStorageSetted() ) {
      let blogPosts = await this.getBlogPosts();
      localStorage.setItem('storedBlogPosts', JSON.stringify(blogPosts))
    }
  }

  private getLocalStorageBlogPosts() {
    let storedData = localStorage.getItem('storedBlogPosts');
    if(storedData){
      return JSON.parse(storedData);
    } else {
      return []
    }
  }

  private isBlogPostLocalStorageSetted():Boolean {
    if(localStorage.getItem('storedBlogPosts')) {
      return true
    }
    return false
  }

}
