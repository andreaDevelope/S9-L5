import { Component, OnInit, AfterViewInit } from '@angular/core';
import { iCar } from '../../model/interface';

@Component({
  selector: 'app-ford',
  templateUrl: './ford.component.html',
  styleUrls: ['./ford.component.scss'], // Corretto 'styleUrl' in 'styleUrls'
})
export class FordComponent implements OnInit, AfterViewInit {
  fordArr: (iCar & { availabilityClass: string })[] = [];

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

        this.fordArr = shuffle(res)
          .filter((ford) => ford.brand === 'Ford')
          .map((ford) => ({
            ...ford,
            availabilityClass: ford.available ? 'bg-success' : 'bg-danger',
          }));

        console.log(this.fordArr);
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
