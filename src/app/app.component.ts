import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'friday-angular-1';

  @ViewChild('mainHero', { static: true }) mainHero!: ElementRef;

  ngOnInit() {
    setInterval(this.changeBg.bind(this), 3000);
  }

  changeBg() {
    const main = this.mainHero.nativeElement;
    const numRnd = Math.floor(Math.random() * 3);

    main.classList.remove('bg1', 'bg2', 'bg3');

    const colorClass = numRnd === 0 ? 'bg1' : numRnd === 1 ? 'bg2' : 'bg3';
    main.classList.add(colorClass);
  }
}
