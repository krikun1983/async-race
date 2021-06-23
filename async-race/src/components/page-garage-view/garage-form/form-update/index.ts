import BaseComponent from '../../../base-components';
import './form-update.scss';

export default class FormUpdate extends BaseComponent {
  constructor() {
    super('form', ['form-update']);
    this.element.innerHTML = `
      <input class="update-name" id="update-name" type="text" placeholder="Car name" disabled>
      <input class="update-color" id="update-color" type="color" value="#ffffff" disabled>
      <button class="btn-update" id="update-submit" type="button" disabled>Update</button>
    `;
  }
}
