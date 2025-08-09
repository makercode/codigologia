import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PostComponent } from './post.component';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { BlogPostService } from '../../core/services/data/blogPost.service';
import { MarkdownComponent, MarkdownModule, MarkdownService, SECURITY_CONTEXT } from 'ngx-markdown';
import { SafeResourcePipe } from '../../pipes/safe-resource-pipe';
import { Observable, of } from 'rxjs';

// Mock completo de BlogService
          
          
class MockBlogService {
  getStoredBlogPost = jasmine.createSpy('getStoredBlogPost')
    .and.returnValue(Promise.resolve({
      markdown: 'assets/markdown/sample.md',
      title: 'Test Post'
    }));
}
describe('PostComponent', () => {
  let component: PostComponent;
  let fixture: ComponentFixture<PostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        PostComponent,
        MarkdownComponent,
        SafeResourcePipe,
        // Importamos el módulo de markdown para configuraciones adicionales
        MarkdownModule.forRoot()
      ],
      providers: [
        provideRouter([]),
        // Configuración completa de HttpClient para testing
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        { provide: BlogPostService, useClass: MockBlogService },
        // Necesario para ngx-markdown
        { provide: SECURITY_CONTEXT, useValue: 0 }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });


  // Agrega más pruebas según sea necesario
});