import Header from './components/header';
import PageGarageView from './components/page-garage-view';
import { GarageButtonsNextPrev } from './components/page-garage-view/garage/garageButtonsNextPrev/garageButtonsNextPrev';
import PageWinnersView from './components/page-winners-view';

export class App {
  private readonly header: Header;

  private readonly pageGarageView: PageGarageView;

  private readonly garageButtonsNextPrev: GarageButtonsNextPrev;

  private readonly pageWinnersView: PageWinnersView;

  constructor(private readonly rootElement: HTMLElement) {
    this.header = new Header();
    this.pageGarageView = new PageGarageView();
    this.garageButtonsNextPrev = new GarageButtonsNextPrev();
    this.pageWinnersView = new PageWinnersView();
    this.rootElement.appendChild(this.header.element);
    this.rootElement.appendChild(this.pageGarageView.element);
    this.rootElement.appendChild(this.pageWinnersView.render());
    this.rootElement.appendChild(this.garageButtonsNextPrev.element);
    Header.pageHidden();
  }

  render(): HTMLElement {
    return this.rootElement;
  }
}
