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
    this.rootElement.innerHTML += `<div class="help">Огромная просьба проверить
    через 2 дня, если не сложно. Нахожуь в процессе заполнения!!!
    Ну или оставьте свои координаты. Заранее спасибо)))</div>`;
    this.rootElement.appendChild(this.pageGarageView.element);
    this.rootElement.appendChild(this.garageButtonsNextPrev.element);
    this.rootElement.appendChild(this.pageWinnersView.element);
    Header.pageHidden();
  }

  render(): HTMLElement {
    return this.rootElement;
  }
}
