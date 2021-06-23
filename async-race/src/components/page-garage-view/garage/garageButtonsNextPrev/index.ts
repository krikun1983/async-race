import BaseComponent from '../../../base-components';
import './garageButtonsNextPrev.scss';

export default class GarageButtonsNextPrev extends BaseComponent {
  constructor() {
    super('div', ['buttonsNextPrev']);
    this.element.innerHTML = `
      <button class="btn-controls button-prev" disabled>PREV</button>
      <button class="btn-controls button-next" disabled>NEXT</button>
    `;
  }
}
