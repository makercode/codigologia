import { Component, ElementRef, EventEmitter, Input, Output } from '@angular/core';
import { SandwichComponent } from "../../shared/icons/sandwich/sandwich.component";
import { DrawComponent } from "../../shared/logo/draw/draw.component";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [SandwichComponent, DrawComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent  {
  @Input() isMenuOpen: boolean = false;
  @Output() headerValueChanged = new EventEmitter<boolean>()

  onValueChanged(value: boolean){
    this.isMenuOpen = value
    this.headerValueChanged.emit(this.isMenuOpen);
  }

  
}
