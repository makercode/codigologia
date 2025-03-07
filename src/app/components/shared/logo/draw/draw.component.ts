import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { SymbolComponent } from "../symbol/symbol.component";
import { LineComponent } from "../line/line.component";

@Component({
  selector: 'app-draw',
  standalone: true,
  imports: [SymbolComponent, LineComponent],
  templateUrl: './draw.component.html',
  styleUrl: './draw.component.scss'
})
export class DrawComponent {

  @Input() isHomeRoute: boolean  = false;

  public screenWidth: number = window.innerWidth
  public screenHeight: number = window.innerHeight

  public xMousePosition: number = this.screenWidth/2
  public yMousePosition: number = 50
  private drawElement: any

  public isMoving: boolean = true

  constructor(private el: ElementRef) {}

  ngOnInit () {
    console.log("init")
    this.drawElement = this.el.nativeElement.querySelector('#draw')
    this.drawElement.addEventListener('mousemove', this.onMouseMove.bind(this))
    this.drawElement.addEventListener('mouseleave', this.onMouseLeave.bind(this))
  }

  onMouseMove(event: MouseEvent): void {
    this.screenWidth = window.innerWidth
    this.xMousePosition = event.clientX
    this.yMousePosition = event.clientY

    this.isMoving = true
    console.log(this.isMoving)
  }

  onMouseLeave(): void {
    this.isMoving = false
    console.log(this.isMoving)
  }

  onResize(evt:any) {
    console.log(evt);
    this.screenWidth = window.innerWidth
    this.screenHeight = window.innerHeight
  }

  ngOnDestroy(): void {
    this.drawElement.removeEventListener('mousemove', this.onMouseMove)
    this.drawElement.removeEventListener('mouseleave', this.onMouseLeave)
  }

}
