import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MarkdownComponent } from 'ngx-markdown';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

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

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadMarkdownContent();
  }

  loadMarkdownContent() {
    const markdownUrl = 'https://raw.githubusercontent.com/codesectarian/codigologia-blog/refs/heads/main/blog/2025/06/tu-personalidad-segun-tu-distro.md';
    
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
