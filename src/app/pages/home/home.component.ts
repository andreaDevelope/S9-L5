import { iCar } from './../../model/interface';
import { Component, AfterViewInit, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements AfterViewInit, OnInit {
  carArr: (iCar & { availabilityClass: string })[] = [];

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
        const shuffle = (array: iCar[]) => {
          for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
          }
          return array;
        };

        this.carArr = shuffle(res).map((car) => ({
          ...car,
          availabilityClass: car.available ? 'bg-success' : 'bg-danger',
        }));

        console.log(this.carArr);
      })
      .catch((e) => console.log(e));
  }

  ngAfterViewInit() {
    setTimeout(() => {
      const heroCard = document.querySelector('.card-hero');
      const allCards = document.querySelectorAll('.card');

      if (heroCard) {
        heroCard.classList.add('show');
      }

      allCards.forEach((card) => {
        card.classList.add('show');
      });
    }, 500);
  }
}
