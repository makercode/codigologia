import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SandwichComponent } from "../../shared/icons/sandwich/sandwich.component";
import { DrawComponent } from "../../shared/logo/draw/draw.component";
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [SandwichComponent, DrawComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  @Input() isMenuOpen: boolean = false;
  @Output() headerValueChanged = new EventEmitter<boolean>()

  currentRoute = ""
  public isHomeRoute: boolean = false;

  constructor(private router: Router) {
  }
  
  ngOnInit(): void {
    this.router.events.subscribe(event => {
      console.log("evnt")
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.urlAfterRedirects;
        this.isHomeRoute = this.currentRoute === "/"
      }
      console.log("evnt 2")
    });
  }

  onValueChanged(value: boolean){
    this.isMenuOpen = value
    this.headerValueChanged.emit(this.isMenuOpen);
  }

  
}
