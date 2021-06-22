import BaseComponent from '../base-components';

export default class NotFound404Page extends BaseComponent {
  constructor() {
    super('section');
    this.element.textContent = 'NOT FOUND 404';
  }

  render(): HTMLElement {
    return this.element;
  }
}
