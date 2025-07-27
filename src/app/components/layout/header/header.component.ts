import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SandwichComponent } from "../../shared/icons/sandwich/sandwich.component";
import { DrawComponent } from "../../shared/logo/draw/draw.component";
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';

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

  title: string = '';
  currentRoute = ""
  public isHomeRoute: boolean = false;

  constructor(private router: Router, private route: ActivatedRoute) {
  }
  
  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.urlAfterRedirects;
        this.isHomeRoute = this.currentRoute === "/";
        
        // Obtener el título de la ruta actual de manera simple
        let currentRoute = this.route;
        while (currentRoute.firstChild) {
          currentRoute = currentRoute.firstChild;
        }
        this.title = currentRoute.snapshot.title || '';
        
        console.log("Current title:", this.title);
      }
    });
  }

  onValueChanged(value: boolean){
    this.isMenuOpen = value
    this.headerValueChanged.emit(this.isMenuOpen);
  }

  
}
