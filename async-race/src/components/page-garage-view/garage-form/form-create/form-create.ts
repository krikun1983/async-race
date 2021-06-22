import BaseComponent from '../../../base-components';
import './form-create.scss';

export default class FormCreate extends BaseComponent {
  constructor() {
    super('form', ['form-create']);
    this.element.innerHTML = `
      <input class="create-name" type="text" placeholder="Car name">
      <input class="create-color" type="color" value="#ffffff">
      <button class="btn-create" type="button">Create</button>
    `;
  }
}
