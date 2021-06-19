import { WinnersSort } from '../../../app.api';
import { store } from '../../../store';
import { BaseComponent } from '../../base-components';

export class WinnersView extends BaseComponent {
  constructor() {
    super('div', ['winners']);
    this.element.innerHTML = this.renderWinners();
  }

  private renderCarImage = (color: string): string => `
      <?xml version="1.0" encoding="iso-8859-1"?>
    <!-- Generator: Adobe Illustrator 18.1.1, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
    <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
      viewBox="0 0 612.001 612.001" style="fill: ${color};" width="40" xml:space="preserve">
    <g>
      <path d="M589.333,276.033c-11.234-3.756-89.378-20.834-89.378-20.834s-144.86-82.375-162.245-82.375s-136.639,
      0.053-136.639,0.053
        c-29.137,0-53.487,22.203-81.68,47.909c-13.287,12.112-27.953,25.442-44.13,37.299l-60.249,8.011
        C6.306,268.872,0,277.018,0,286.643v69.03c0,11.913,
        9.656,21.571,21.57,21.571h41.401c3.007,34.65,32.153,61.932,67.57,61.932
        c35.415,0,64.563-27.283,67.57-61.931h197.687c3.007,34.65,32.153,
        61.931,67.57,61.931s64.563-27.283,67.57-61.931h34.013
        c26.95,0,40.119-11.64,43.426-22.566C616.739,327.03,610.724,283.185,589.333,276.033z M130.541,406.48
        c-19.38,0-35.148-15.766-35.148-35.146s15.766-35.148,35.148-35.148c19.38,0,35.146,15.766,35.146,35.148
        C165.688,390.714,149.921,406.48,130.541,406.48z M261.008,255.201H143.134c8.526-6.736,16.409-13.886,23.671-20.505
        c19.086-17.402,35.57-32.432,55.294-32.432c0,0,17.85-0.008,38.91-0.017V255.201z M289.711,202.236
        c14.588-0.005,27.592-0.009,34.116-0.009c16.245,0,82.135,38.264,
        106.864,52.975h-140.98L289.711,202.236L289.711,202.236z
        M463.367,406.48c-19.38,0-35.146-15.766-35.146-35.146s15.766-35.148,
        35.146-35.148c19.38,0,35.148,15.766,35.148,35.148
        C498.515,390.714,482.747,406.48,463.367,406.48z"/>
    </g></svg>`;

  renderWinners = () => `
    <h2>Winners (${store.winnersCount})</h2>
    <h3>Page #${store.winnersPage}</h3>
    <table class="table" cellspacing="0" border="0" cellpadding="0">
      <thead>
        <th>Number</th>
        <th>Car</th>
        <th>Name</th>
        <th class="table-button
        table-wins ${store.sortBy === 'wins' ? store.sortOrder : ''}
        id="sort-by-wins">Wins</th>
        <th
        class="table-button
        table-time ${store.sortBy === 'time' ? store.sortOrder : ''}
        id="sort-by-time">Best time (seconds)</th>
      </thead>
      <tbody>
        ${store.winners
          .map(
            (winner, index) => `
          <tr>
            <td>${index + 1}</td>
            <td>${this.renderCarImage(winner.car.color)}</td>
            <td>${winner.car.name}</td>
            <td>${winner.wins}</td>
            <td>${winner.time}</td>
          </tr>
        `,
          )
          .join('')}
      </tbody>
    </table>
  `;

  updateStateWinners = async (): Promise<void> => {
    await store.getWinners();
    if (store.winnersPage * 10 < Number(store.winnersCount)) {
      document.querySelector('.button-next')?.removeAttribute('disabled');
    } else {
      document.querySelector('.button-next')?.setAttribute('disabled', '');
    }
    if (store.winnersPage > 1) {
      document.querySelector('.button-prev')?.removeAttribute('disabled');
    } else {
      document.querySelector('.button-prev')?.setAttribute('disabled', '');
    }
  };

  setSortOrder = async (sortBy: WinnersSort) => {
    store.sortOrder = store.sortOrder === 'asc' ? 'desc' : 'asc';
    store.sortBy = sortBy;
    this.element.innerHTML = '';
    await this.updateStateWinners();
    (document.querySelector('.winners') as HTMLElement).innerHTML =
      this.renderWinners();
  };

  renders(): void {
    document.body.addEventListener(
      'click',
      async (event: Event): Promise<void> => {
        if (
          (event.target as HTMLElement).classList.contains('btn-winners-view')
        ) {
          // console.log();
          (document.querySelector('.winners') as HTMLElement).innerHTML = '';
          this.element.innerHTML = '';
          // await store.getWinners();
          (document.querySelector('.winners') as HTMLElement).innerHTML =
            this.renderWinners();
        }
        if ((event.target as HTMLElement).classList.contains('table-wins')) {
          this.element.innerHTML = '';
          await this.setSortOrder('wins');
          (document.querySelector('.winners') as HTMLElement).innerHTML =
            this.renderWinners();
        }
        if ((event.target as HTMLElement).classList.contains('table-time')) {
          this.element.innerHTML = '';
          await this.setSortOrder('time');
          (document.querySelector('.winners') as HTMLElement).innerHTML =
            this.renderWinners();
        }
        if (
          (event.target as HTMLButtonElement).classList.contains('button-next')
        ) {
          switch (store.view) {
            case 'winners': {
              this.element.innerHTML = '';
              store.winnersPage += 1;
              await this.updateStateWinners();
              (document.querySelector('.winners') as HTMLElement).innerHTML =
                this.renderWinners();
              break;
            }
            default:
          }
        }
        if (
          (event.target as HTMLButtonElement).classList.contains('button-prev')
        ) {
          switch (store.view) {
            case 'winners': {
              this.element.innerHTML = '';
              store.winnersPage -= 1;
              await this.updateStateWinners();
              (document.querySelector('.winners') as HTMLElement).innerHTML =
                this.renderWinners();
              break;
            }
            default:
          }
        }
        if ((event.target as HTMLElement).classList.contains('btn-update')) {
          // event.preventDefault();
          this.element.innerHTML = '';
          await this.updateStateWinners();
          (document.querySelector('.winners') as HTMLElement).innerHTML =
            this.renderWinners();
        }
      },
    );
  }
}
