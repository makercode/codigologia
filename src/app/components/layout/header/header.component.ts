import { Component, ElementRef } from '@angular/core';
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

}
