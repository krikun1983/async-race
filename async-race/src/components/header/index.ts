import BaseComponent from '../base-components';
import Menu from './menu';
import store from '../../store';
import './header.scss';

export default class Header extends BaseComponent {
  private readonly menu: Menu;

  constructor() {
    super('header', ['header']);
    this.menu = new Menu();
    this.element.appendChild(Header.renderHeading());
    this.element.appendChild(this.menu.element);
  }

  private static renderHeading() {
    const title = new BaseComponent('h1', ['title']);
    title.element.innerHTML = 'Async-Rase-Task';
    return title.element;
  }

  static pageHidden(): void {
    const btnPageGarage = document.querySelector('#garage-view');
    const PageGarage = document.querySelector('.garage-view') as HTMLElement;
    const btnPageWinners = document.querySelector('#winners-view');
    const PageWinners = document.querySelector('.winners-view') as HTMLElement;
    if (btnPageGarage && btnPageWinners) {
      btnPageGarage.addEventListener('click', () => {
        btnPageGarage.classList.add('btn-menu-active');
        btnPageWinners.classList.remove('btn-menu-active');
        PageGarage.classList.remove('hidden');
        PageWinners.classList.add('hidden');
        store.view = 'garage';
      });
      btnPageWinners.addEventListener('click', () => {
        btnPageGarage.classList.remove('btn-menu-active');
        btnPageWinners.classList.add('btn-menu-active');
        PageGarage.classList.add('hidden');
        PageWinners.classList.remove('hidden');
        store.view = 'winners';
      });
    }
  }
}
