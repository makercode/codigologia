import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PostComponent } from './post.component';
import { CommonModule } from '@angular/common';
import { SafeResourcePipe } from '../../pipes/safe-resource-pipe';
import { MarkdownComponent, MarkdownModule, MarkdownService } from 'ngx-markdown';
import { provideRouter } from '@angular/router';
import { BlogService } from '../../services/data/blog.service';

// Mock de BlogService
class MockBlogService {
  getStoredBlogPost = jasmine.createSpy('getStoredBlogPost')
    .and.returnValue(Promise.resolve({
      markdown: 'assets/markdown/sample.md',
      title: 'Test Post'
    }));
}

// Mock de MarkdownService
class MockMarkdownService {
  compile = jasmine.createSpy('compile').and.returnValue('compiled markdown');
}

describe('PostComponent', () => {
  let component: PostComponent;
  let fixture: ComponentFixture<PostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        PostComponent, // Componente standalone
        CommonModule,
        SafeResourcePipe,
        MarkdownComponent,
      ],
      providers: [
        provideRouter([]),
        { provide: BlogService, useClass: MockBlogService },
        { provide: MarkdownService, useClass: MockMarkdownService } // Mock del servicio
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
