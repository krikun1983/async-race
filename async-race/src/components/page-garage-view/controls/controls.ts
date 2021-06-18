import { BaseComponent } from '../../base-components';
import './controls.scss';

export class Controls extends BaseComponent {
  constructor() {
    super('div', ['conrols']);
    this.element.innerHTML = `
    <button class="btn btn-race">Race</button>
    <button class="btn btn-reset" disabled>Reset</button>
    <button class="btn btn-generate">Generate cars</button>
    `;
  }
}
