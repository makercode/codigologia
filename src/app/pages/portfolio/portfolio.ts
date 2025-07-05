import { CommonModule } from '@angular/common';
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
    CommonModule, 
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

  portfoltio = [
    {
      title: "Peru Traveler",
      text: "Ejercicio Angular usando Ovservables RxJs",
      state: true
    },
    {
      title: "Woo Starsoft",
      text: "Plugin aplicando patrones para conectar Api Woocommerce y ERP",
      state: true
    },
    {
      title: "Mano Alzada",
      text: "Página Wordpress de noticias Wordpress mantenido por más de 6 años",
      state: true
    },
    {
      title: "Codigología",
      text: "Blog Angular interactivo y optimizado en ahorro de recursos",
      state: true
    },
    {
      title: "MYP",
      text: "Página Wordpress de presentación para laboratorio dermatológico",
      state: true
    },
    {
      title: "CYR",
      text: "Página Wordpress de presentación para proveedor eléctrico",
      state: true
    },
    {
      title: "Toño Nuñez",
      text: "Página Wordpress de presentación para el artista Toño Nuñez",
      state: true
    },
    {
      title: "Monica Pasco",
      text: "Página Wordpress de presentación para la artista Monica Pasco",
      state: true
    },
    {
      title: "Voces por el Cambio",
      text: "Página Wordpress de proyecto social Latoniamericano",
      state: true
    },
    {
      title: "Yaqua",
      text: "Página de campaña para el aumento de interacciones en redes sociales",
      state: true
    },
    {
      title: "Barn",
      text: "Página interactiva para la previsualización de proyectos tipo establos",
      state: true
    },
    {
      title: "Beauty Boss",
      text: "Ecommerce Wordpress de cosméticos y productos de belleza",
      state: true
    },
    {
      title: "Depor Trivia",
      text: "Cuestionario sencillo de un equipo de fútbol peruano",
      state: true
    },
    {
      title: "El negociador",
      text: "Pagina de campaña hecho para facebook para Cristal",
      state: true
    },
    {
      title: "Guaraná traductor",
      text: "Pagina interactiva con traductor cifrado César hecho para Guaraná",
      state: true
    }
    /*,
    {
      title: "",
      text: "",
      state: true
    }*/
  ]
  
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
    

    const target = event.target as HTMLElement;
    let targetHexagon:HTMLElement|null = target;
    let circle:HTMLElement|null = target.querySelector('.movingCircle');

    if(!circle) {
      targetHexagon = target.closest(".hexagon")
      if(targetHexagon){
        circle = targetHexagon.querySelector('.movingCircle');
      }
    }
    if(targetHexagon && circle) {
      let topTargetHexagon = targetHexagon.getBoundingClientRect().top;
      let leftTargetHexagon = targetHexagon.getBoundingClientRect().left;
      circle = targetHexagon.querySelector('.movingCircle') as HTMLElement;

      circle.style.top = `${event.clientY-topTargetHexagon}px`
      circle.style.left = `${event.clientX-leftTargetHexagon}px`
    }


    /*

    const svgElement = event.currentTarget as SVGSVGElement;
    
    // Obtiene las coordenadas relativas al SVG
    const point = svgElement.createSVGPoint();
    point.x = event.clientX;
    point.y = event.clientY;
    
    // Convierte las coordenadas del mouse al sistema de coordenadas del SVG
    const svgPoint = point.matrixTransform(svgElement.getScreenCTM()?.inverse());
    
    // Actualiza las posiciones del círculo
    circle.setAttribute('cx', svgPoint.x.toString())
    circle.setAttribute('cy', svgPoint.y.toString())*/
  
  }

  onMouseLeave(event: MouseEvent) {
    /*
    const target = event.target as HTMLElement;
    let targetHexagon:HTMLElement|null = target;
    let circle:HTMLElement|null = target.querySelector('.movingCircle');

    if(!circle) {
      targetHexagon = target.closest(".hexagon")
      if(targetHexagon){
        circle = targetHexagon.querySelector('.movingCircle');
      }
    }
    if(targetHexagon && circle) {
      circle = targetHexagon.querySelector('.movingCircle') as HTMLElement;

      circle.style.top = `-150px`
      circle.style.left = `-150px`

    }
    */
  }
}
