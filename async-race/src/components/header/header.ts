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
}
