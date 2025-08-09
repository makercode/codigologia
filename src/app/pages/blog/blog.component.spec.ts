import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BlogComponent } from './blog.component';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { FormsModule } from '@angular/forms';
import { BlogPostService } from '../../core/services/data/blogPost.service';
import { of } from 'rxjs';
import { provideRouter, RouterModule } from '@angular/router';
import { Renderer2 } from '@angular/core';

// Mock de BlogService
class MockBlogPostService {
  getStoredBlogPosts = jasmine.createSpy('getStoredBlogPosts').and.returnValue(Promise.resolve([]));
}

class MockRenderer2 {
  setStyle = jasmine.createSpy('setStyle');
  // Añade otros métodos que uses de Renderer2
  removeStyle = jasmine.createSpy('removeStyle');
  addClass = jasmine.createSpy('addClass');
  removeClass = jasmine.createSpy('removeClass');
  // ... etc
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
        { provide: BlogPostService, useClass: MockBlogPostService },
        { provide: Renderer2, useClass: MockRenderer2 }
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
