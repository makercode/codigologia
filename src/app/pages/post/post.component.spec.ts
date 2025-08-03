import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostComponent } from './post.component';
import { CommonModule } from '@angular/common';
import { SafeResourcePipe } from '../../pipes/safe-resource-pipe';
import { MarkdownComponent } from 'ngx-markdown';
import { provideRouter } from '@angular/router';

describe('PostComponent', () => {
  let component: PostComponent;
  let fixture: ComponentFixture<PostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        PostComponent,
        CommonModule,
        SafeResourcePipe,
        MarkdownComponent
      ],
      providers: [
        provideRouter([])
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
