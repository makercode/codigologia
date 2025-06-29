import { Component, ElementRef, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { gsap } from 'gsap';

@Component({
  selector: 'app-line',
  standalone: true,
  imports: [],
  templateUrl: './line.component.html',
  styleUrl: './line.component.scss'
})
export class LineComponent implements OnInit  {
  @ViewChild('string1', { static: false }) string1!: ElementRef;
  
  @Input() screenWidth: number = window.innerWidth;
  @Input() screenHeight: number = window.innerHeight;
  @Input() xMousePosition: number = this.screenWidth / 2;
  @Input() yMousePosition: number = this.screenHeight / 2;
  @Input() topOffSet: number = this.screenHeight-60;
  @Input() isMoving: boolean = false;
  @Input() isHomeRoute: boolean  = false;
  

  public positionLeft: number = this.screenWidth / 2
  public positionTop: number = this.screenHeight / 2
  private svgTop: number = 0 
  private stringElement: any
  private string: any
  private finalPath: string = "M 0 60 Q 500 60 " + this.screenWidth + " 60";
  private initialPath: string = `M 0 60 Q ${this.positionLeft} ${this.positionTop} ${this.screenWidth} 60`;

  constructor(private el: ElementRef) {}
  
  ngOnInit(): void {
    this.positionLeft = this.screenWidth / 2
    this.positionTop = this.screenHeight / 2

    this.stringElement = this.el.nativeElement.querySelector('#string1')
    this.string = this.stringElement.getBoundingClientRect()
  }

  ngOnChanges(changes: SimpleChanges) {
    
    console.log("change line init")
    console.log(this.screenWidth)
    this.stringElement = this.el.nativeElement.querySelector('#string1')
    this.string = this.stringElement.getBoundingClientRect()
    

    if( 
      changes.hasOwnProperty('xMousePosition') || 
      changes.hasOwnProperty('yMousePosition') || 
      changes.hasOwnProperty('topOffset')
    ) {
      this.positionLeft = this.xMousePosition - this.string.left
      this.positionTop = this.yMousePosition - this.topOffSet - this.svgTop

      console.log("getting top", this.string.top)

      this.initialPath = `M 0 60 Q ${this.positionLeft} ${this.positionTop} ${this.screenWidth} 60` 

      gsap.to(`#string1 svg path`, {
        attr: { d: this.initialPath },
        duration: 0.3,
        ease: 'power3.out'
      });
    }

    if( changes.hasOwnProperty('screenWidth') || changes.hasOwnProperty('screenHeight') ) {
      this.finalPath = "M 0 60 Q 500 60 " + this.screenWidth + " 60";
    } 

    if( changes.hasOwnProperty('isMoving') ) {
      if(changes["isMoving"].currentValue) {
        console.log("changes")
        console.log(changes)
      }
      if(!changes["isMoving"].currentValue) {
        gsap.to(`#string1 svg path`, {
          attr: { d: this.finalPath },
          duration: 0.8,
          ease: 'elastic.out(1,0.1)'
        });
      }
    }

  }

}
