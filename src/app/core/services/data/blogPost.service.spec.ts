import { TestBed } from '@angular/core/testing';
import { BlogService } from './blogPost.service';
import { Firestore } from '@angular/fire/firestore';
import { of } from 'rxjs';
import { FirebaseTimestamp, BlogPost } from '../../../interfaces/blog-post';

// Mock de FirebaseTimestamp
const mockTimestamp: FirebaseTimestamp = {
  seconds: 1672531200,
  nanoseconds: 0
};

// Mock de datos de Firestore
const mockBlogPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'post-1',
    title: 'Primer Post',
    author: 'Autor 1',
    date: mockTimestamp,
    extract: 'Extracto del primer post',
    image: 'image1.jpg',
    markdown: 'assets/markdown/post1.md',
    tags: ['angular', 'firebase'],
    published: true,
    featured: true
  },
  {
    id: '2',
    slug: 'post-2',
    title: 'Segundo Post',
    author: 'Autor 2',
    date: mockTimestamp,
    extract: 'Extracto del segundo post',
    image: 'image2.jpg',
    markdown: 'assets/markdown/post2.md',
    tags: ['testing', 'typescript'],
    videos: [
      {
        type: 'youtube',
        url: 'https://youtube.com/watch?v=123'
      }
    ],
    published: true
  }
];

// Mock de Firestore con datos completos
const mockFirestore = {
  collection: jasmine.createSpy('collection').and.returnValue({
    collectionData: jasmine.createSpy('collectionData').and.returnValue(of(mockBlogPosts))
  })
};

// Mock de localStorage mejorado
class MockLocalStorage {
  private storage: { [key: string]: string } = {};

  getItem(key: string): string | null {
    return this.storage[key] || null;
  }

  setItem(key: string, value: string): void {
    this.storage[key] = value;
  }

  removeItem(key: string): void {
    delete this.storage[key];
  }

  clear(): void {
    this.storage = {};
  }
}

describe('BlogService', () => {
  let service: BlogService;
  let localStorageMock: MockLocalStorage;

  beforeEach(() => {
    localStorageMock = new MockLocalStorage();
    
    TestBed.configureTestingModule({
      providers: [
        BlogService,
        { provide: Firestore, useValue: mockFirestore },
        { provide: localStorage, useValue: localStorageMock }
      ]
    });

    service = TestBed.inject(BlogService);
  });

  afterEach(() => {
    localStorageMock.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getBlogPosts()', () => {
    it('should return complete blog posts structure', async () => {
      const posts = await service.getBlogPosts();
      
      expect(posts.length).toBe(2);
      expect(posts[0].id).toBe('1');
      expect(posts[0].title).toBe('Primer Post');
      expect(posts[0].date).toEqual(mockTimestamp);
      expect(posts[0].tags).toContain('angular');
      expect(posts[0].published).toBeTrue();
      expect(posts[0].featured).toBeTrue();
      
      expect(posts[1].videos?.length).toBe(1);
      expect(posts[1].videos?.[0].type).toBe('youtube');
    });

    it('should handle empty response from Firestore', async () => {
      mockFirestore.collection().collectionData.and.returnValue(of([]));
      const posts = await service.getBlogPosts();
      expect(posts.length).toBe(0);
    });
  });

  /*
  describe('storeBlogPosts()', () => {
    it('should store complete post structure in localStorage', async () => {
      await service.storeBlogPosts();
      const storedData = localStorageMock.getItem('storedBlogPosts');
      const parsedData: BlogPost[] = JSON.parse(storedData || '[]');
      
      expect(parsedData[0].slug).toBe('post-1');
      expect(parsedData[0].date).toEqual(mockTimestamp);
      expect(parsedData[1].videos?.length).toBe(1);
    });
  });

  describe('getStoredBlogPost()', () => {
    beforeEach(async () => {
      await service.storeBlogPosts();
    });

    it('should return complete post by slug', async () => {
      const post = await service.getStoredBlogPost('post-1');
      
      expect(post?.id).toBe('1');
      expect(post?.title).toBe('Primer Post');
      expect(post?.date).toEqual(mockTimestamp);
      expect(post?.tags).toEqual(jasmine.arrayContaining(['angular']));
      expect(post?.published).toBeTrue();
    });

    it('should return post with videos', async () => {
      const post = await service.getStoredBlogPost('post-2');
      
      expect(post?.videos?.length).toBe(1);
      expect(post?.videos?.[0].url).toContain('youtube.com');
    });

    it('should return undefined for unpublished posts', async () => {
      // Agregamos un post no publicado al mock
      const unpublishedPost: BlogPost = {
        id: '3',
        slug: 'unpublished',
        title: 'Borrador',
        author: 'Autor',
        date: mockTimestamp,
        extract: 'Extracto',
        image: 'image.jpg',
        markdown: 'content.md',
        tags: [],
        published: false
      };
      
      localStorageMock.setItem('storedBlogPosts', JSON.stringify([...mockBlogPosts, unpublishedPost]));
      
      const post = await service.getStoredBlogPost('unpublished');
      expect(post).toBeUndefined();
    });
  });

  describe('filtering functionality', () => {
    beforeEach(async () => {
      await service.storeBlogPosts();
    });

    it('should only return published posts', async () => {
      // Agregamos un post no publicado
      const postsWithDraft = [
        ...mockBlogPosts,
        {
          id: '3',
          slug: 'draft',
          title: 'Borrador',
          author: 'Autor',
          date: mockTimestamp,
          extract: 'Extracto',
          image: 'image.jpg',
          markdown: 'content.md',
          tags: [],
          published: false
        }
      ];
      
      localStorageMock.setItem('storedBlogPosts', JSON.stringify(postsWithDraft));
      
      const storedPosts = await service.getStoredBlogPosts();
      expect(storedPosts.length).toBe(2); // Solo los 2 publicados
    });

  });
  */
});