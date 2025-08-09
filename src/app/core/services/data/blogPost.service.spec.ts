import { TestBed } from '@angular/core/testing';
import { BlogPostService } from './blogPost.service';
import { BlogPostRepository } from '../../repositories/blogPost.repository';
import { BlogPost } from '../../domain/blogPost.model';
import { FirebaseTimestamp } from '../../../shared/interfaces/firebaseTimestamp.interface';

// Mock del Repositorio
class MockBlogPostRepository implements Partial<BlogPostRepository> {
  getBlogPosts = jasmine.createSpy('getBlogPosts').and.returnValue(Promise.resolve([]));
}

// Mock de localStorage
class MockLocalStorage {
  private storage: Record<string, string> = {};

  getItem(key: string): string | null {
    return this.storage[key] || null;
  }

  setItem(key: string, value: string): void {
    this.storage[key] = value;
  }

  clear(): void {
    this.storage = {};
  }
}

describe('BlogService', () => {
  let service: BlogPostService;
  let repository: MockBlogPostRepository;
  let localStorageMock: MockLocalStorage;

  // Datos de prueba
  const mockTimestamp: FirebaseTimestamp = {
    seconds: 1672531200,
    nanoseconds: 0
  };

  const mockBlogPosts: BlogPost[] = [
    new BlogPost(
      '1',
      'first-post',
      'First Post',
      'Author 1',
      mockTimestamp,
      'Extract 1',
      'image1.jpg',
      'content1.md',
      ['angular', 'firebase'],
      [{ type: 'youtube', url: 'http://youtube.com/1' }],
      'Full content 1',
      true,
      true
    ),
    new BlogPost(
      '2',
      'second-post',
      'Second Post',
      'Author 2',
      mockTimestamp,
      'Extract 2',
      'image2.jpg',
      'content2.md',
      ['testing'],
      undefined,
      undefined,
      true,
      false
    )
  ];

  beforeEach(() => {
    localStorageMock = new MockLocalStorage();
    
    TestBed.configureTestingModule({
      providers: [
        BlogPostService,
        { provide: BlogPostRepository, useClass: MockBlogPostRepository },
        { provide: localStorage, useValue: localStorageMock }
      ]
    });

    service = TestBed.inject(BlogPostService);
    repository = TestBed.inject(BlogPostRepository) as unknown as MockBlogPostRepository;
  });

  afterEach(() => {
    localStorageMock.clear();
  });

  describe('getStoredBlogPosts()', () => {
    it('should return empty array when no data exists', async () => {
      const result = await service.getStoredBlogPosts();
      expect(result).toEqual([]);
      expect(repository.getBlogPosts).toHaveBeenCalled();
    });

    it('should return cached data from localStorage', async () => {
      localStorageMock.setItem('storedBlogPosts', JSON.stringify(mockBlogPosts));
      
      const result = await service.getStoredBlogPosts();
      expect(result.length).toBe(2);
      expect(result[0].title).toBe('First Post');
      expect(repository.getBlogPosts).not.toHaveBeenCalled();
    });

    it('should fetch from repository when no cache exists', async () => {
      repository.getBlogPosts.and.returnValue(Promise.resolve(mockBlogPosts));
      
      const result = await service.getStoredBlogPosts();
      expect(result.length).toBe(2);
      expect(localStorageMock.getItem('storedBlogPosts')).toBe(JSON.stringify(mockBlogPosts));
    });

    it('should handle repository errors gracefully', async () => {
      repository.getBlogPosts.and.returnValue(Promise.reject('API Error'));
      
      const result = await service.getStoredBlogPosts();
      expect(result).toEqual([]);
    });
  });

  describe('getStoredBlogPost()', () => {
    it('should return null when post not found', async () => {
      repository.getBlogPosts.and.returnValue(Promise.resolve(mockBlogPosts));
      const result = await service.getStoredBlogPost('non-existent');
      expect(result).toBeNull();
    });

    it('should return correct post by slug', async () => {
      repository.getBlogPosts.and.returnValue(Promise.resolve(mockBlogPosts));
      
      const result = await service.getStoredBlogPost('second-post');
      expect(result?.title).toBe('Second Post');
      expect(result?.featured).toBeFalse();
    });

    it('should fetch data if not cached', async () => {
      repository.getBlogPosts.and.returnValue(Promise.resolve(mockBlogPosts));
      
      const result = await service.getStoredBlogPost('first-post');
      expect(result?.title).toBe('First Post');
      expect(repository.getBlogPosts).toHaveBeenCalled();
    });
  });

  describe('private methods', () => {
    describe('getBlogPosts()', () => {
      it('should return BlogPost array from repository', async () => {
        repository.getBlogPosts.and.returnValue(Promise.resolve(mockBlogPosts));
        const result = await (service as any).getBlogPosts();
        expect(result[0]).toBeInstanceOf(BlogPost);
        expect(result[0].videos?.length).toBe(1);
      });
    });

    describe('setLocalStorageBlogPosts()', () => {
      it('should store serialized BlogPost objects', async () => {
        repository.getBlogPosts.and.returnValue(Promise.resolve(mockBlogPosts));
        await (service as any).setLocalStorageBlogPosts();
        
        const storedData = localStorageMock.getItem('storedBlogPosts');
        expect(JSON.parse(storedData || '')[0].title).toBe('First Post');
      });
    });

    describe('getLocalStorageBlogPosts()', () => {
      it('should parse stored BlogPost objects', () => {
        localStorageMock.setItem('storedBlogPosts', JSON.stringify(mockBlogPosts));
        const result = (service as any).getLocalStorageBlogPosts();
        expect(result[0].date.seconds).toBe(mockTimestamp.seconds);
      });
    });
  });
});
