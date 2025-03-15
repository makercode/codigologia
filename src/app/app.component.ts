import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './components/layout/footer/footer.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { MenuComponent } from "./components/shared/menu/menu.component";
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FooterComponent, HeaderComponent, MatSidenavModule, MatButtonModule, MenuComponent,MatCardModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  @ViewChild('sidenav') sidenav!: MatDrawer; 
  title = 'codigologia'
  isMenuOpen = false

  constructor() {
  }

  // @ViewChild('sidenav') public sidenav: MatSidenav;

  ngOnInit() {
  }

  //suscribe to header changes 
  onHeaderValueChanged(value: boolean) {
    this.isMenuOpen = value
    this.sidenav.toggle();
  }

}
