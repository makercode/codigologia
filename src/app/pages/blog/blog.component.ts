import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Renderer2 } from '@angular/core';


import { BlogService } from './../../services/data/blog.service';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [
    CommonModule, 
    MatCardModule,
    MatButtonModule,
    MatChipsModule,
    FormsModule,
    RouterModule,
  ],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss',
})
export class BlogComponent implements OnInit {
  @ViewChild('svgElement') svgElement!: ElementRef<SVGSVGElement>;
  @ViewChild('circleRef') circleRef!: ElementRef<SVGCircleElement>;
  initialX: number = 0; // Ajusta según el viewBox (0 está en el centro aquí)
  initialY: number = 0;
  
  posts$:any;
  constructor(private blogService: BlogService, private renderer: Renderer2) {}

  async ngOnInit() {
    this.posts$ = await this.blogService.getStoredBlogPosts();
    console.log(this.posts$)
    /*
    this.blogService.getBlogPosts().subscribe({
      next: (data) => {
        console.log('Datos recibidos:', data);
        this.posts$ = data;
      },
      error: (err) => console.error('Error:', err)
    });*/
  }
  circleX: number = 0;  // Posición X inicial del círculo
  circleY: number = 0;  // Posición Y inicial del círculo

  onMouseMove(event: MouseEvent) {

    const target = event.target as SVGSVGElement;
    const circle = target.querySelector('.movingCircle') as SVGCircleElement;

    const svgElement = event.currentTarget as SVGSVGElement;
    
    // Obtiene las coordenadas relativas al SVG
    const point = svgElement.createSVGPoint();
    point.x = event.clientX;
    point.y = event.clientY;
    
    // Convierte las coordenadas del mouse al sistema de coordenadas del SVG
    const svgPoint = point.matrixTransform(svgElement.getScreenCTM()?.inverse());
    
    // Actualiza las posiciones del círculo
    circle.setAttribute('cx', svgPoint.x.toString())
    circle.setAttribute('cy', svgPoint.y.toString())
  
  }

  onMouseLeave(event: MouseEvent) {
    const target = event.target as SVGSVGElement;
    const circle = target.querySelector('.movingCircle') as SVGCircleElement;
  
    // Activa la transición suave
    this.renderer.setStyle(
      circle,
      'transition',
      'cx 0.25s cubic-bezier(0.25, 0.1, 0.25, 1), cy 0.25s cubic-bezier(0.25, 0.1, 0.25, 1)'
    );
  
    circle.setAttribute('cx', "0")
    circle.setAttribute('cy', "0")

    // Elimina la transición después de 0.25s (sin esperar a que termine la animación)
    setTimeout(() => {
      this.renderer.setStyle(circle, 'transition', 'none');
    }, 250); // 250ms = 0.25s
  
  }

}