import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { iCar } from '../../model/interface';

@Component({
  selector: '.app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  isNavbarCollapsed = true;
  searchQuery = '';
  cars: iCar[] = [];

  constructor(private router: Router) {}

  toggleNavbar() {
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
  }

  ngOnInit() {
    fetch('/assets/db/db.json')
      .then((res) => {
        if (res.ok) {
          return <Promise<iCar[]>>res.json();
        } else {
          throw new Error('la risposta non è un 200');
        }
      })
      .then((res) => {
        this.cars = res;
      })
      .catch((e) => console.log(e));
  }

  onSearch() {
    console.log('Cercando:', this.searchQuery);

    const foundCar = this.cars.find((car) =>
      car.model.toLowerCase().includes(this.searchQuery.toLowerCase())
    );

    if (foundCar) {
      console.log('Auto trovata:', foundCar);
      this.router.navigate([`/${foundCar.brand}`]);
    } else {
      console.log('Nessuna auto trovata per il modello:', this.searchQuery);
      this.router.navigate([`/404`]);
    }
  }
}
