import { BaseComponent } from '../base-components';
import { WinnersView } from './winners/winners';
import './page-winners-view.scss';

export class PageWinnersView extends BaseComponent {
  private readonly winners: WinnersView;

  constructor() {
    super('section', ['winners-view', 'hidden']);
    this.winners = new WinnersView();
    this.element.appendChild(this.winners.element);
  }
}
