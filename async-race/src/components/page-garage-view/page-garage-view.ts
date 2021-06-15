import { BaseComponent } from '../base-components';
import { Controls } from './controls/controls';
import { GarageForms } from './garage-form/garage-forms';
import { Garage } from './garage/garage';

export class PageGarageView extends BaseComponent {
  private readonly garageForms: GarageForms;

  private readonly controls: Controls;

  private readonly garage: Garage;

  constructor() {
    super('section', ['garage-view']);
    this.garageForms = new GarageForms();
    this.controls = new Controls();
    this.garage = new Garage();
    this.element.appendChild(this.garageForms.element);
    this.element.appendChild(this.controls.element);
    this.element.appendChild(this.garage.element);
  }
}
