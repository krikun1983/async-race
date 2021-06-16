import { BaseComponent } from '../../base-components';

import {
  // getCar,
  getCars,
  // createCar,
  // deleteCar,
  // updateCar,
  // startEngine,
  // stopEngine,
  // saveWinner,
  // getWinners,
  // getWinner,
  // drive,
} from '../../../app.api';
import { store } from '../../../store';
import './garage.scss';

export interface GarageCar {
  id: number;
  name: string;
  color: string;
  isEngeneStarted?: boolean;
}

export class Garage extends BaseComponent {
  constructor() {
    super('div', ['garage']);
    this.element.innerHTML = this.renderGarage();
  }

  renderCarImage = (color: string): string => `
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

  renderCar = ({
    id,
    name,
    color,
    isEngeneStarted = false,
  }: GarageCar): string => `
    <div class="general-buttons">
      <button class="button select-button" id="select-car-${id}"></button>
      <button class="button remove-button" id="remove-car-${id}"></button>
      <span class="car-name">${name}</span>
    </div>
    <div class="road">
      <div class="launch-pad">
        <div class="control-panel">
          <button class="icon start-engine-button icon-enable"
          id="start-engine-car-${id}"
          ${isEngeneStarted ? 'disabled' : ''}>A</button>
          <button class="icon stop-engine-button icon-disable"
          id="stop-engine-car-${id}"
          ${isEngeneStarted ? 'disabled' : ''}>B</button>
        </div>
        <div class="car" id="car-${id}">
          ${this.renderCarImage(color)}
        </div>
      </div>
      <div class="flag" id="flag-${id}">🚩</div>
    </div>
  `;

  renderGarage = (): string => `
    <h2>Garage (${store.carsCount})</h2>
    <h3>Page #${store.carsPage}</h3>
    <ul class="garage__list">
      ${store.cars.map(car => `<li>${this.renderCar(car)}</li>`).join('')}
    </ul>
  `;
}