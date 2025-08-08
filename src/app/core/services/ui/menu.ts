import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Menu {

  isOpen:boolean = true
  constructor() { }
  
  getMenuState() {
    return this.isOpen
  }
  toggleMenuState() {
    return !this.isOpen
  }

}
