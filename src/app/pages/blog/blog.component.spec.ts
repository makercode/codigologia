import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BlogComponent } from './blog.component';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { FormsModule } from '@angular/forms';
import { BlogService } from '../../services/data/blog.service';
import { Firestore } from '@angular/fire/firestore';
import { of } from 'rxjs';
import { provideRouter, RouterModule } from '@angular/router';
// import { provideRouter } from '@angular/router';

// Mock de Firestore
const firestoreMock = {
  collection: jasmine.createSpy('collection').and.returnValue({
    // Simula collectionData que retorna un Observable
    collectionData: jasmine.createSpy('collectionData').and.returnValue(of([]))
  })
};

// Mock de BlogService
class MockBlogService {
  getStoredBlogPosts = jasmine.createSpy('getStoredBlogPosts').and.returnValue(Promise.resolve([]));
}

describe('BlogComponent', () => {
  let component: BlogComponent;
  let fixture: ComponentFixture<BlogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BlogComponent,
        CommonModule, 
        MatCardModule,
        MatButtonModule,
        MatChipsModule,
        FormsModule,
        RouterModule,
      ],
      providers: [
        provideRouter([]),
        { provide: Firestore, useValue: firestoreMock },
        { provide: BlogService, useClass: MockBlogService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with empty posts', async () => {
    await fixture.whenStable();
    expect(component.posts$).toEqual([]);
  });

  
  
});
