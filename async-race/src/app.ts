import Header from './components/header';
import PageGarageView from './components/page-garage-view';

export class App {
  private readonly header: Header;

  private readonly pageGarageView: PageGarageView;

  constructor(private readonly rootElement: HTMLElement) {
    this.header = new Header();
    this.pageGarageView = new PageGarageView();
    this.rootElement.appendChild(this.header.element);
    this.rootElement.appendChild(this.pageGarageView.element);
  }

  render(): HTMLElement {
    return this.rootElement;
  }
}
