import BaseComponent from '../../base-components';
import './controls.scss';

export default class Controls extends BaseComponent {
  constructor() {
    super('div', ['controls']);
    this.element.innerHTML = `
    <button class="btn-controls btn-race">Race</button>
    <button class="btn-controls btn-reset" disabled>Reset</button>
    <button class="btn-controls btn-generate">Generate cars</button>
    `;
  }
}
