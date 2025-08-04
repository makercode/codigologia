import { TestBed } from '@angular/core/testing';
import { BlogService } from './blog.service';
import { Firestore } from '@angular/fire/firestore';
import { of } from 'rxjs';
import { FirebaseTimestamp, BlogPost } from '../../interfaces/blog-post';

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

});