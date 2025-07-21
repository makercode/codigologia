import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-peru-traveler',
  imports: [
    CommonModule,
    MatChipsModule, ],
  templateUrl: './peru-traveler.component.html',
  styleUrl: './peru-traveler.component.scss'
})
export class PeruTravelerComponent {
  goExternal(url:string) {
    window.open(url, '_blank');
  }
}
