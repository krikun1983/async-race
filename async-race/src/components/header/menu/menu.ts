import { BaseComponent } from '../../base-components';
import './menu.scss';

export class Menu extends BaseComponent {
  constructor() {
    super('nav', ['menu']);
    this.element.appendChild(Menu.renderButtonToGarage());
    this.element.appendChild(Menu.renderButtonToWinners());
  }

  private static renderButtonToGarage() {
    const button = new BaseComponent('button', [
      'btn-menu',
      'btn-menu-navigate',
      'btn-menu-active',
    ]);
    button.element.innerHTML = 'to garage';
    button.element.setAttribute('data-id', 'garage-view');
    return button.element;
  }

  private static renderButtonToWinners() {
    const button = new BaseComponent('button', [
      'btn-menu',
      'btn-menu-navigate',
    ]);
    button.element.innerHTML = 'to winners';
    button.element.setAttribute('data-id', 'winners-view');
    return button.element;
  }
}
