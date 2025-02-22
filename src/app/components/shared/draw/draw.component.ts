import { Component } from '@angular/core';
import { SymbolComponent } from "../logo/symbol/symbol.component";
import { LineComponent } from "../logo/line/line.component";

@Component({
  selector: 'app-draw',
  standalone: true,
  imports: [SymbolComponent, LineComponent],
  templateUrl: './draw.component.html',
  styleUrl: './draw.component.scss'
})
export class DrawComponent {

}
