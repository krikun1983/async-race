import { BaseComponent } from '../../../base-components';
import './form-update.scss';

export class FormUpdate extends BaseComponent {
  constructor() {
    super('form', ['form-update']);
    this.element.innerHTML = `
      <input class="update-name" type="text" placeholder="Car name">
      <input class="update-color" type="color" value="#ffffff">
      <button class="btn-update" type="button">Update</button>
    `;
  }
}
