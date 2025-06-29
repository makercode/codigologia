import { Component, Input, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SandwichComponent } from "../icons/sandwich/sandwich.component";

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterModule, SandwichComponent],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {
  @Input() isMenuOpen: boolean = false;

  
}
