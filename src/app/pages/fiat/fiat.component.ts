import { Component } from '@angular/core';
import { iCar } from '../../model/interface';

@Component({
  selector: 'app-fiat',
  templateUrl: './fiat.component.html',
  styleUrl: './fiat.component.scss',
})
export class FiatComponent {
  fiatArr: (iCar & { availabilityClass: string })[] = [];

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

        this.fiatArr = shuffle(res)
          .filter((fiat) => fiat.brand === 'Fiat')
          .map((fiat) => ({
            ...fiat,
            availabilityClass: fiat.available ? 'bg-success' : 'bg-danger',
          }));

        console.log(this.fiatArr);
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
