import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MarkdownComponent } from 'ngx-markdown';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [
    MarkdownComponent
  ],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class PostComponent {

  markdown = `Cargando contenido...`;

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {

    // Obtener la URL completa
    const fullUrl = this.router.url; 
    let pathAfterBlog = "";
    
    // Extraer la parte después de 'blog'
    const blogIndex = fullUrl.indexOf('/blog');
    if (blogIndex !== -1) {
      pathAfterBlog = fullUrl.substring(blogIndex + '/blog/articulo'.length);
      // Resultado: '/articulo/secretos-de-planetas-en-el-principito'
    }

    console.log('Path after blog:', pathAfterBlog);
  
    this.loadMarkdownContent(pathAfterBlog);
  }

  loadMarkdownContent(urlSegment:string) {
    const markdownUrl = `https://raw.githubusercontent.com/codesectarian/codigologia-blog/refs/heads/main/blog/2025/06/${urlSegment}.md`;
    
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
