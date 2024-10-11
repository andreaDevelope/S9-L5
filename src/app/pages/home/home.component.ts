import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements AfterViewInit {
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
