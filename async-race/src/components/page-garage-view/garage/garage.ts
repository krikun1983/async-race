import { BaseComponent } from '../../base-components';
import './garage.scss';

export class Garage extends BaseComponent {
  constructor() {
    super('div', ['garage']);
    this.element.innerHTML = `
      <h2>Garage</h2>
      <h3>Page #1</h3>
    `;
  }
}
