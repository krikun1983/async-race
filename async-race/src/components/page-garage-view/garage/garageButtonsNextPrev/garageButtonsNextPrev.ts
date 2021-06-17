import { BaseComponent } from '../../../base-components';
import './garageButtonsNextPrev.scss';

export class GarageButtonsNextPrev extends BaseComponent {
  constructor() {
    super('div', ['buttonsNextPrev']);
    this.element.innerHTML = `
      <button class="btn button-prev">PREV</button>
      <button class="btn button-next">NEXT</button>
    `;
  }
}
