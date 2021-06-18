import { BaseComponent } from '../../base-components';

import {
  deleteCar,
  drive,
  getCar,
  // getCar,
  getCars,
  startEngine,
  stopEngine,
  updateCar,
  // createCar,
  // updateCar,
  // saveWinner,
  // getWinners,
  // getWinner,
} from '../../../app.api';
import { animat, store } from '../../../store';
import './garage.scss';
import { GaragePartUpdate } from './garagePartUpdate';
import { GarageButtonsNextPrev } from './garageButtonsNextPrev/garageButtonsNextPrev';

export interface GarageCar {
  id: number;
  name: string;
  color: string;
  isEngeneStarted?: boolean;
}

export type UpdateCar = {
  id?: number;
  name?: string;
  color?: string;
};

let selectedCar: { name: string; color: string; id: number } | null = null;

export class Garage extends BaseComponent {
  private readonly garagePartUpdate: GaragePartUpdate;

  private readonly garageButtonsNextPrev: GarageButtonsNextPrev;

  constructor() {
    super('div', ['garage']);
    this.garagePartUpdate = new GaragePartUpdate();
    this.garageButtonsNextPrev = new GarageButtonsNextPrev();
    this.element.appendChild(this.garagePartUpdate.element);
    this.element.innerHTML = this.renderGarage();
    this.garagePartUpdate.element.setAttribute('id', 'garage');
    this.element.appendChild(this.garageButtonsNextPrev.element);
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

  private renderCar = ({
    id,
    name,
    color,
    isEngeneStarted = true,
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
          id="start-engine-car-${id}">A</button>
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

  renderGarage = () => `
    <h2>Garage (${store.carsCount})</h2>
    <h3>Page #${store.carsPage}</h3>
    <ul class="garage__list">
      ${store.cars.map(car => `<li>${this.renderCar(car)}</li>`).join('')}
    </ul>
  `;

  private getPositionAtCenter = (
    element: HTMLElement,
  ): { x: number; y: number } => {
    const { top, left, width, height } = element.getBoundingClientRect();
    return {
      x: left + width / 2,
      y: top + height / 2,
    };
  };

  private getDistanceBetweenElements = (a: HTMLElement, b: HTMLElement) => {
    const aPosition = this.getPositionAtCenter(a);
    const bPosition = this.getPositionAtCenter(b);

    return Math.hypot(aPosition.x - bPosition.x, aPosition.y - bPosition.y);
  };

  private animation = (
    car: HTMLElement,
    distance: number,
    animationTime: number,
  ): { id: number } => {
    let start: number | null = null;
    const state: {
      id: number;
    } = { id: 1 };

    function step(timestamp: number) {
      if (!start) start = timestamp;
      const time = timestamp - start;
      const passed = Math.round(time * (distance / animationTime));

      car.style.transform = `translateX(${Math.min(passed, distance)}px)`;

      if (passed < distance) {
        state.id = window.requestAnimationFrame(step);
      }
    }
    state.id = window.requestAnimationFrame(step);

    return state;
  };

  private startDriving = async (id: number) => {
    const startButton = document.getElementById(`start-engine-car-${id}`);
    startButton?.setAttribute('disabled', '');
    startButton?.classList.toggle('enabling', true);

    const { velocity, distance } = await startEngine(id);
    const time = Math.round(distance / velocity);

    startButton?.classList.toggle('enabling', false);
    const stopButton = document.getElementById(`stop-engine-car-${id}`);
    stopButton?.removeAttribute('disabled');

    const car = document.getElementById(`car-${id}`);
    const flag = document.getElementById(`flag-${id}`);
    if (car && flag) {
      const htmlDistance =
        Math.floor(this.getDistanceBetweenElements(car, flag)) + 10;
      animat.animation[id] = this.animation(car, htmlDistance, time);
    }

    const { success } = await drive(id);
    if (!success) window.cancelAnimationFrame(animat.animation[id].id);

    return { success, id, time };
  };

  private stopDriving = async (id: number) => {
    const stopButton = document.getElementById(`stop-engine-car-${id}`);
    stopButton?.setAttribute('disabled', '');
    stopButton?.classList.toggle('enabling', true);
    await stopEngine(id);
    stopButton?.classList.toggle('enabling', false);
    document
      .getElementById(`start-engine-car-${id}`)
      ?.removeAttribute('disabled');

    const car = document.getElementById(`car-${id}`);
    if (car) {
      car.style.transform = 'translateX(0)';
    }

    if (animat.animation[id])
      window.cancelAnimationFrame(animat.animation[id].id);
  };

  updateStateGarage = async (): Promise<void> => {
    if (store.carsPage * 7 < Number(store.carsCount)) {
      document.getElementById('button-next')?.removeAttribute('disabled');
    } else {
      document.getElementById('button-next')?.setAttribute('disabled', '');
    }
    if (store.carsPage > 1) {
      document.getElementById('button-prev')?.removeAttribute('disabled');
    } else {
      document.getElementById('button-prev')?.setAttribute('disabled', '');
    }
  };

  static deleteDiv(): void {
    const garage = document.querySelector('.garage-part-update');
    if (garage) {
      garage.remove();
    }
  }

  // temp() {
  //   const promises = store.cars.map(({ id }) => this.startDriving(id));
  // }

  // raceAll = async (promises, ids) => {
  //   const { success, id, time } = await Promise.race(promises);

  //   if (!success) {
  //     const failedIndex = ids.fineIndex(i => i === id);
  //     const restPromises = [
  //       ...promises.slice(0, failedIndex),
  //       ...promises.slice(failedIndex + 1, promises.length),
  //     ];
  //     const restIds = [
  //       ...ids.slice(0, failedIndex),
  //       ...ids.slice(failedIndex + 1, ids.length),
  //     ];
  //     return raceAll(restPromises, restIds);
  //   }

  //   return {
  //     ...store.cars.find(car => car.id === id),
  //     time: +(time / 1000).toFixed(2),
  //   };
  // };

  // race = async action => {
  //   const promises = store.cars.map(({ id }) => action(id));

  //   const winner = await raceAll(
  //     promises,
  //     store.cars.map(car => car.id),
  //   );

  //   return winner;
  // };

  listen(): void {
    document.body.addEventListener(
      'click',
      async (event: Event): Promise<void> => {
        if (
          (event.target as HTMLElement).classList.contains(
            'start-engine-button',
          )
        ) {
          const id = +(event.target as HTMLElement).id.split(
            'start-engine-car-',
          )[1];
          this.startDriving(id);
        }
        if (
          (event.target as HTMLElement).classList.contains('stop-engine-button')
        ) {
          const id = +(event.target as HTMLElement).id.split(
            'stop-engine-car-',
          )[1];
          this.stopDriving(id);
        }
        if ((event.target as HTMLElement).classList.contains('select-button')) {
          selectedCar = await getCar(
            +(event.target as HTMLElement).id.split('select-car-')[1],
          );
          (document.getElementById('update-name') as HTMLInputElement).value =
            selectedCar!.name;
          (document.getElementById('update-color') as HTMLInputElement).value =
            selectedCar!.color;
          (
            document.getElementById('update-name') as HTMLInputElement
          ).disabled = false;
          (
            document.getElementById('update-color') as HTMLInputElement
          ).disabled = false;
          (
            document.getElementById('update-submit') as HTMLButtonElement
          ).disabled = false;
        }
        if ((event.target as HTMLElement).classList.contains('remove-button')) {
          const id = +(event.target as HTMLElement).id.split('remove-car-')[1];
          this.element.innerHTML = '';
          await store.deleteCar(id);
          (document.querySelector('.garage') as HTMLDivElement).innerHTML =
            this.renderGarage();
        }
        if ((event.target as HTMLElement).classList.contains('btn-race')) {
          (event.target as HTMLElement).setAttribute('disabled', '');
          store.cars.map(({ id }) => this.startDriving(id));
          // const winner = await race(startDriving);
          // await saveWinner(winner);
          // const message = document.getElementById('message');
          // message.innerHTML = `${winner.name} went first (${winner.time}s)!`;
          // message.classList.toggle('visible', true);
          // document.getElementById('reset').disabled = false;
        }
        if ((event.target as HTMLElement).classList.contains('btn-reset')) {
          (event.target as HTMLElement).setAttribute('disabled', '');
          store.cars.map(({ id }) => this.stopDriving(id));
          // const message = document.getElementById('message');
          // message.classList.toggle('visible', false);
          document.getElementById('btn-race')?.removeAttribute('disabled');
        }
        if ((event.target as HTMLElement).classList.contains('btn-update')) {
          // event.preventDefault();
          const updateText = document.getElementById(
            'update-name',
          ) as HTMLInputElement;
          const updateColor = document.getElementById(
            'update-color',
          ) as HTMLInputElement;
          if (updateText.value && updateColor.value) {
            const car = {
              name: updateText.value,
              color: updateColor.value,
            };
            this.element.innerHTML = '';
            await store.updateCar(selectedCar!.id, car);
            (document.querySelector('.garage') as HTMLDivElement).innerHTML =
              this.renderGarage();
            updateText.value = '';
            updateText.disabled = true;
            updateColor.disabled = true;
            (
              document.getElementById('update-submit') as HTMLButtonElement
            ).disabled = true;
            updateColor.value = '#ffffff';
            selectedCar = null;
          }
          // const car = Object.fromEntries(
          //   new Map(
          //     [...(event.target as HTMLElement)]
          //       .filter(({ name }) => !!name)
          //       .map(({ value, name }) => [name, value]),
          //   ),
          // );
        }
      },
    );
    // document
    //   .getElementById('update-submit')
    //   .addEventListener('submit', async event => {
    //     event.preventDefault();
    //     const car = Object.fromEntries(
    //       new Map(
    //         [...event.target]
    //           .filter(({ name }) => !!name)
    //           .map(({ value, name }) => [name, value]),
    //       ),
    //     );
    //     await updateCar(selectedCar.id, car);
    //     await updateStateGarage();
    //     document.getElementById('garage').innerHTML = renderCarImage();
    //     document.getElementById('update-name').value = '';
    //     document.getElementById('update-name').disabled = true;
    //     document.getElementById('update-color').disabled = true;
    //     document.getElementById('update-submit').disabled = true;
    //     document.getElementById('update-color').value = '#ffffff';
    //     selectedCar = null;
    //   });
  }

  render() {
    return this.element;
  }
}
