import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MarkdownComponent } from 'ngx-markdown';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { BlogPost } from '../../interfaces/blogPost';
import { BlogPostService } from '../../core/services/data/blogPost.service';
import { CommonModule } from '@angular/common';
import { SafeResourcePipe } from '../../pipes/safe-resource-pipe';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [
    CommonModule,
    SafeResourcePipe,
    MarkdownComponent
  ],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class PostComponent {

  markdown = `Cargando contenido...`;
  post$?: BlogPost ;

  constructor(
    private http: HttpClient, 
    private router: Router,
    private blogPostService: BlogPostService
  ) {}

  async ngOnInit() {
    // Obtener la URL completa
    const fullUrl = this.router.url; 
    let pathAfterBlog = "";
    
    // Extraer la parte después de 'blog'
    const blogIndex = fullUrl.indexOf('/blog');
    if (blogIndex !== -1) {
      pathAfterBlog = fullUrl.substring(blogIndex + '/blog/articulo/'.length);
      // Resultado: '/secretos-de-planetas-en-el-principito'
    }
    console.log('Path after blog:', pathAfterBlog);
    this.post$ = await this.blogPostService.getStoredBlogPost(pathAfterBlog);
    console.log(this.post$)

  
    this.loadMarkdownContent(this.post$);
  }

  loadMarkdownContent(post?:BlogPost) {
    const markdownUrl = `${post?.markdown}`;
    
    this.http.get(markdownUrl, { responseType: 'text' })
      .pipe(
        catchError(error => {
          console.error('Error al cargar el archivo Markdown:', error);
          return of(`# Error al cargar el contenido\nNo se pudo cargar el archivo Markdown desde ${markdownUrl}`);
        })
      )
      .subscribe(content => {
        this.markdown = content;
      });
  }

}
