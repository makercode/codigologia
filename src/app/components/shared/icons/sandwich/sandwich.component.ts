import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-sandwich',
  standalone: true,
  imports: [],
  templateUrl: './sandwich.component.html',
  styleUrl: './sandwich.component.scss',
})
export class SandwichComponent {

  title: string = "Dashboard";
  @Input() isMenuOpen: boolean = false;
  @Output() valueChanged = new EventEmitter<boolean>()

  counter: number = 0
  constructor() {
  }

  updateMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    console.log(this.isMenuOpen)
    this.valueChanged.emit(this.isMenuOpen); // Notifica al padre
  }
}
