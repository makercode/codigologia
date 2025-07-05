import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { RouterModule } from '@angular/router';

import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';


@Component({
  selector: 'app-portfolio',
  imports: [
    MatCardModule,
    MatChipsModule,
    FormsModule,
    RouterModule,
    CarouselModule
  ],
  templateUrl: './portfolio.html',
  styleUrl: './portfolio.scss'
})
export class Portfolio {
  
  customOptions: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['<', '>'],
    autoWidth: true,
    responsive: {
      0: {
        items: 3
      },
      340: {
        items: 4
      },
      480: {
        items: 5
      },
      600: {
        items: 6
      },
      820: {
        items: 8
      },
      940: {
        items: 10
      },
      1320: {
        items: 12
      },
      1720: {
        items: 14
      }
    },
    nav: true
  }


  @ViewChild('svgElement') svgElement!: ElementRef<SVGSVGElement>;
  @ViewChild('circleRef') circleRef!: ElementRef<SVGCircleElement>;
  initialX: number = 0; // Ajusta según el viewBox (0 está en el centro aquí)
  initialY: number = 0;
  
  posts$:any;
  constructor( private renderer: Renderer2) {}

  async ngOnInit() {
  }

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
