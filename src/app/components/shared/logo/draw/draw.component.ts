import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
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

  @ViewChild('draw', { static: false }) miComponente!: ElementRef;
  @Input() isHomeRoute: boolean  = false;

  private drawElement: any


  public screenWidth: number = window.innerWidth
  public screenHeight: number = window.innerHeight

  public topOffSet: number = this.screenHeight/2 -60

  public xMousePosition: number = this.screenWidth/2
  public yMousePosition: number = this.screenHeight/2

  public isMoving: boolean = true

  constructor(private el: ElementRef) {}

  ngOnInit () {
    console.log("init")
    this.drawElement = this.el.nativeElement.querySelector('#draw')
    this.drawElement.addEventListener('mousemove', this.onMouseMove.bind(this))
    this.drawElement.addEventListener('mouseleave', this.onMouseLeave.bind(this))

    this.screenWidth = window.innerWidth
    console.log("this.xMousePosition", this.xMousePosition)
    console.log("this.xMousePosition", this.xMousePosition)
  }
  
  ngAfterViewInit() {
  }

  onMouseMove(event: MouseEvent): void {
    
    this.topOffSet = this.miComponente.nativeElement.getBoundingClientRect().top;
    this.screenWidth = window.innerWidth
    this.xMousePosition = event.clientX
    this.yMousePosition = event.clientY
    console.log("onMouseMove", this.xMousePosition, this.yMousePosition )

    const rect = this.miComponente.nativeElement.getBoundingClientRect();
    console.log("get top")
    console.log(rect.top)

    this.isMoving = true
  }

  onMouseLeave(): void {
    this.isMoving = false
    console.log(this.isMoving)
  }

  onResize(evt:any) {
    console.log(evt);
    this.topOffSet = this.miComponente.nativeElement.getBoundingClientRect().top;
    this.screenWidth = window.innerWidth
    this.screenHeight = window.innerHeight
  }

  ngOnDestroy(): void {
    this.drawElement.removeEventListener('mousemove', this.onMouseMove)
    this.drawElement.removeEventListener('mouseleave', this.onMouseLeave)
  }

}
