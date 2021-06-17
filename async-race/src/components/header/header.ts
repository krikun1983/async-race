import { BaseComponent } from '../base-components';
import { Menu } from './menu/menu';
import './header.scss';

export class Header extends BaseComponent {
  private readonly menu: Menu;

  constructor() {
    super('header', ['header']);
    this.menu = new Menu();
    this.element.appendChild(Header.renderHeading());
    this.element.appendChild(this.menu.element);
  }

  private static renderHeading() {
    const h1 = new BaseComponent('h1', ['h1']);
    h1.element.innerHTML = 'Async-Rase-Task';
    return h1.element;
  }

  static pageHidden() {
    const btnPageGarage = document.querySelector('#garage-view');
    const PageGarage = document.querySelector('.garage-view');
    const btnPageWinners = document.querySelector('#winners-view');
    const PageWinners = document.querySelector('.winners-view');
    if (btnPageGarage && btnPageWinners) {
      btnPageGarage.addEventListener('click', () => {
        btnPageGarage.classList.add('btn-menu-active');
        btnPageWinners.classList.remove('btn-menu-active');
        PageGarage?.classList.remove('hidden');
        PageWinners?.classList.add('hidden');
      });
      btnPageWinners.addEventListener('click', () => {
        btnPageGarage.classList.remove('btn-menu-active');
        btnPageWinners.classList.add('btn-menu-active');
        PageGarage?.classList.add('hidden');
        PageWinners?.classList.remove('hidden');
      });
    }
  }
}
