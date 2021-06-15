import { BaseComponent } from '../../base-components';
import { FormCreate } from './form-create/form-create';
import { FormUpdate } from './form-update/form-update';
import './garage-forms.scss';

export class GarageForms extends BaseComponent {
  private readonly formCreate: FormCreate;

  private readonly formUpdate: FormUpdate;

  constructor() {
    super('div', ['garage-forms']);
    this.formCreate = new FormCreate();
    this.formUpdate = new FormUpdate();
    this.element.appendChild(this.formCreate.element);
    this.element.appendChild(this.formUpdate.element);
  }
}
