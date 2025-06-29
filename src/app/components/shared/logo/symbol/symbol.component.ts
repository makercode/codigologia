import { Component, ElementRef, Input, OnInit, SimpleChanges } from '@angular/core';
import { gsap } from 'gsap';

@Component({
  selector: 'app-symbol',
  standalone: true,
  imports: [],
  templateUrl: './symbol.component.html',
  styleUrl: './symbol.component.scss'
})
export class SymbolComponent implements OnInit {
  @Input() xMousePosition: number = 0;
  @Input() yMousePosition: number = 0;
  @Input() screenWidth: number = window.innerWidth;
  @Input() screenHeight: number = window.innerHeight;
  @Input() topOffSet: number = 0;
  
  @Input() isMoving: boolean = false;
  @Input() isHomeRoute: boolean  = false;

  public positionLeft: number = 0
  public positionTop: number = 0
  private symbolElement: any
  private symbol: any

  constructor(private el: ElementRef) {}

  ngOnInit(): void {    
    this.symbolElement = this.el.nativeElement.querySelector('#symbol')
    this.symbol = this.symbolElement.getBoundingClientRect()

    gsap.to(`#symbol`, {
      x: 0,
      y: 0,
      duration: 0.3,
      ease: 'power3.out'
    });
  }


  ngOnChanges(changes: SimpleChanges) {

    console.log("change symbol init")
    this.symbolElement = this.el.nativeElement.querySelector('#symbol')
    this.symbol = this.symbolElement.getBoundingClientRect()

    if(
      changes.hasOwnProperty('xMousePosition') || changes.hasOwnProperty('yMousePosition')
      
    ) {
      this.positionLeft = (this.xMousePosition - this.symbol.left - 60)*2/3
      this.positionTop = (this.yMousePosition - this.symbol.top - 60)*7/8


      gsap.to(`#symbol`, {
        x: this.positionLeft,
        y: this.positionTop,
        duration: 0.3,
        ease: 'power3.out'
      });
    }

    if(changes.hasOwnProperty('isMoving')) {
      if(changes["isMoving"].currentValue) {
        console.log("changes")
        console.log(changes)
      } 
      if(!changes["isMoving"].currentValue) {
        gsap.to(`#symbol`, {
          x: 0,
          y: 0,
          duration: 0.8,
          ease: 'elastic.out(1,0.1)'
        });
      }
    }

  }

  

}
