import { Component } from '@angular/core';

@Component({
  selector: '.app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  isNavbarCollapsed = true;
  searchQuery = '';

  toggleNavbar() {
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
  }

  onSearch() {
    console.log('Cercando:', this.searchQuery);
  }
}
