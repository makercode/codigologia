import { AfterViewInit, Component, ElementRef } from '@angular/core';
import { gsap } from 'gsap';

@Component({
  selector: 'app-line',
  standalone: true,
  imports: [],
  templateUrl: './line.component.html',
  styleUrl: './line.component.scss'
})
export class LineComponent implements AfterViewInit  {

  private stringElement: any;
  private drawElement: any;
  private cord: any;
  public screenWidth: number = 1920;
  private finalPath: string = "M 0 120 Q 500 120 " + this.screenWidth + " 120"; // Define tu finalPath aquí

  constructor(private el: ElementRef) {}

  ngAfterViewInit(): void {
    this.stringElement = this.el.nativeElement.querySelector('#string1');
    this.drawElement = this.el.nativeElement.querySelector('#draw');
    this.cord = this.stringElement.getBoundingClientRect();

    this.stringElement.addEventListener('mousemove', this.onMouseMove.bind(this));
    this.stringElement.addEventListener('mouseleave', this.onMouseLeave.bind(this));
    this.screenWidth = window.innerWidth;
  }

  onMouseMove(event: MouseEvent): void {
    this.screenWidth = window.innerWidth;
    console.log('play');
    let svgTop = 110 //this.drawElement.getBoundingClientRect().top + window.scrollY-30;
    console.log( svgTop );

    console.log(`a ${this.cord.left}`);
    console.log(`b ${event.clientX}`);
    console.log(`c ${this.cord.top}`);
    console.log(`d ${event.clientY}`);

    const initialPath = `M 0 120 Q ${event.clientX - this.cord.left} ${event.clientY - this.cord.top - svgTop} ${this.screenWidth} 120`;
    gsap.to(`#string1 svg path`, {
      attr: { d: initialPath },
      duration: 0.3,
      ease: 'power3.out'
    });
  }


  onResize(evt:any) {
    console.log(evt);
    this.screenWidth = window.innerWidth;
  }

  onMouseLeave(): void {
    // Asegúrate de que audioElements esté definido en tu componente
    gsap.to(`#string1 svg path`, {
      attr: { d: this.finalPath },
      duration: 0.8,
      ease: 'elastic.out(1,0.1)'
    });
  }

  // Opcional: Limpiar los event listeners cuando el componente se destruye
  ngOnDestroy(): void {
    this.stringElement.removeEventListener('mousemove', this.onMouseMove);
    this.stringElement.removeEventListener('mouseleave', this.onMouseLeave);
  }
}
