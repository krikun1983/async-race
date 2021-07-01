import BaseComponent from '../../base-components';
import { drive, getCar, getWinner, getWinnerStatus, startEngine, stopEngine } from '../../../app.api';
import store from '../../../store';
import { AnimationCar, Car, GarageCar, WinnerBody } from '../../../type';
import ViewPage from '../../../constants/view-page';
import './garage.scss';
import { animation, generateRandomCars, getDistanceBetweenElements } from '../../../app.utils';

const animationCar: AnimationCar = {
  animation: {},
};
let selectedCar: Car;
let winner: Car | undefined;

export default class Garage extends BaseComponent {
  constructor() {
    super('div', ['garage']);
    this.element.innerHTML = this.renderGarage();
  }

  private renderCarImage = (color: string): string => `
    <?xml version="1.0" encoding="iso-8859-1"?>
  <!-- Generator: Adobe Illustrator 18.1.1, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
  <svg version="1.1" xmlns="http://www.w3.org/2000/svg"
  x="0px" y="0px"
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

  private renderCar = ({ id, name, color, isEngineStarted = true }: GarageCar): string => `
    <div class="general-buttons">
      <button class="btn-icon select-button" id="select-car-${id}"></button>
      <button class="btn-icon remove-button" id="remove-car-${id}"></button>
      <span class="car-name">${name}</span>
    </div>
    <div class="road">
      <div class="launch-pad">
        <div class="control-panel">
          <button class="btn-icon start-engine-button btn-icon-enable"
          id="start-engine-car-${id}">A</button>
          <button class="btn-icon stop-engine-button btn-icon-disable"
          id="stop-engine-car-${id}"
          ${isEngineStarted ? 'disabled' : ''}>B</button>
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

  private startDriving = async (id: number) => {
    const btnStart = document.getElementById(`start-engine-car-${id}`) as HTMLButtonElement;
    const btnStop = document.getElementById(`stop-engine-car-${id}`) as HTMLButtonElement;

    btnStart.setAttribute('disabled', '');
    btnStart.classList.toggle('enabling', true);

    const { velocity, distance } = await startEngine(id);
    const time = Math.round(distance / velocity);

    btnStart.classList.toggle('enabling', false);
    btnStop.removeAttribute('disabled');

    const car = document.getElementById(`car-${id}`) as HTMLDivElement;
    const flag = document.getElementById(`flag-${id}`) as HTMLDivElement;
    if (car && flag) {
      const htmlDistance = Math.floor(getDistanceBetweenElements(car, flag)) + 10;
      animationCar.animation[id] = animation(car, htmlDistance, time);
    }

    const { success } = await drive(id);
    if (!success) window.cancelAnimationFrame(animationCar.animation[id].id);

    return { success, id, time };
  };

  private stopDriving = async (id: number) => {
    const btnStart = document.getElementById(`start-engine-car-${id}`) as HTMLButtonElement;
    const btnStop = document.getElementById(`stop-engine-car-${id}`) as HTMLButtonElement;
    const car = document.getElementById(`car-${id}`) as HTMLDivElement;
    btnStop.setAttribute('disabled', '');
    btnStop.classList.toggle('enabling', true);
    await stopEngine(id);
    btnStop.classList.toggle('enabling', false);
    btnStart.removeAttribute('disabled');
    car.style.transform = 'translateX(0)';
    if (animationCar.animation[id]) window.cancelAnimationFrame(animationCar.animation[id].id);
  };

  updateStateGarage = async (): Promise<void> => {
    const btnNext = document.querySelector('.button-next') as HTMLButtonElement;
    const btnPrev = document.querySelector('.button-prev') as HTMLButtonElement;
    await store.getCars();
    btnNext.disabled = !(store.carsPage * 7 < Number(store.carsCount));
    btnPrev.disabled = store.carsPage === 1;
  };

  private disabledAdd = (...args: HTMLButtonElement[]): void => {
    args.forEach((element: HTMLButtonElement) => {
      const elem = element;
      elem.disabled = true;
    });
  };

  private disabledRemove = (...args: HTMLButtonElement[]): void => {
    args.forEach((element: HTMLButtonElement) => {
      const elem = element;
      elem.disabled = false;
    });
  };

  private raceCarsBtn = async () => {
    const resultRace = document.querySelector('.result') as HTMLDivElement;
    const promises = store.cars.map(({ id }) => this.startDriving(id));
    const result = await Promise.all(promises);
    let resultMin = 10000;
    let carWinner = 0;
    result.forEach(elem => {
      if (elem.success) {
        if (resultMin >= elem.time) {
          resultMin = elem.time;
          carWinner = elem.id;
        }
      }
    });
    winner = store.cars.find(car => car.id === carWinner);
    if (!winner) {
      return;
    }
    const time = +(resultMin / 1000).toFixed(2);
    const winnerSave: WinnerBody = {
      id: winner.id,
      wins: 1,
      time,
    };
    resultRace.innerHTML = `Win <span>${winner.name}</span>. His time <span>${winnerSave.time}</span> сек`;
    const winnerStatus = await getWinnerStatus(winnerSave.id);
    if (winnerStatus === 404) {
      await store.createWinner(winnerSave);
    } else {
      const winnerUpdate = await getWinner(winnerSave.id);
      await store.updateWinner(winnerSave.id, {
        id: winnerSave.id,
        wins: winnerUpdate.wins + 1,
        time: time < winnerUpdate.time ? time : winnerUpdate.time,
      });
    }
    await this.updateStateGarage();
  };

  private initVariableButton = () => {
    const btnUpdate = document.getElementById('update-submit') as HTMLButtonElement;
    const btnReset = document.querySelector('.btn-reset') as HTMLButtonElement;
    const btnCreate = document.querySelector('.btn-create') as HTMLButtonElement;
    const btnGenerate = document.querySelector('.btn-generate') as HTMLButtonElement;
    const btnRace = document.querySelector('.btn-race') as HTMLButtonElement;
    const btnNext = document.querySelector('.button-next') as HTMLButtonElement;
    return [btnUpdate, btnReset, btnCreate, btnGenerate, btnRace, btnNext];
  };

  private initVariableInput = () => {
    const createNameInput = document.querySelector('.create-name') as HTMLInputElement;
    const createColorInput = document.querySelector('.create-color') as HTMLInputElement;
    const updateNameInput = document.querySelector('.update-name') as HTMLInputElement;
    const updateColorInput = document.querySelector('.update-color') as HTMLInputElement;
    return [createNameInput, createColorInput, updateNameInput, updateColorInput];
  };

  private initVariablePage = () => {
    const garagePage = document.querySelector('.garage') as HTMLDivElement;
    const resultRace = document.querySelector('.result') as HTMLDivElement;
    return [garagePage, resultRace];
  };

  private selectCarBtn = async (
    btnEvent: HTMLButtonElement,
    btnUpdate: HTMLButtonElement,
    nameInput: HTMLInputElement,
    colorInput: HTMLInputElement,
  ) => {
    selectedCar = await getCar(+btnEvent.id.split('select-car-')[1]);
    nameInput.removeAttribute('disabled');
    colorInput.removeAttribute('disabled');
    const newNameInput = nameInput;
    newNameInput.value = selectedCar.name;
    const newColorInput = colorInput;
    newColorInput.value = selectedCar.color;
    this.disabledRemove(btnUpdate);
  };

  private removeCarBtn = async (btnEvent: HTMLButtonElement, garagePage: HTMLDivElement) => {
    const id = +btnEvent.id.split('remove-car-')[1];
    this.element.innerHTML = '';
    await store.deleteCar(id);
    await store.deleteWinner(id);
    await this.updateStateGarage();
    const newGaragePage = garagePage;
    newGaragePage.innerHTML = this.renderGarage();
  };

  private updateCarBtn = async (
    nameInput: HTMLInputElement,
    colorInput: HTMLInputElement,
    garagePage: HTMLDivElement,
    btnUpdate: HTMLButtonElement,
  ) => {
    if (nameInput.value && colorInput.value) {
      const car = {
        name: nameInput.value,
        color: colorInput.value,
      };
      this.element.innerHTML = '';
      await store.updateCar(selectedCar.id, car);
      const newGaragePage = garagePage;
      const newNameInput = nameInput;
      const newColorInput = colorInput;
      newGaragePage.innerHTML = this.renderGarage();
      newNameInput.value = '';
      newNameInput.setAttribute('disabled', '');
      newColorInput.setAttribute('disabled', '');
      this.disabledAdd(btnUpdate);
      newColorInput.value = '#ffffff';
    }
  };

  private createCarBtn = async (
    nameInput: HTMLInputElement,
    colorInput: HTMLInputElement,
    garagePage: HTMLDivElement,
  ) => {
    const car = {
      name: nameInput.value,
      color: colorInput.value,
    };
    this.element.innerHTML = '';
    await store.createCar(car);
    const newGaragePage = garagePage;
    const newNameInput = nameInput;
    const newColorInput = colorInput;
    newGaragePage.innerHTML = this.renderGarage();
    newNameInput.value = '';
    newColorInput.value = '#ffffff';
  };

  private generateCarBtn = async (btnEvent: HTMLButtonElement, garagePage: HTMLDivElement) => {
    this.disabledAdd(btnEvent);
    this.element.innerHTML = '';
    const cars = generateRandomCars(100);
    await Promise.all(cars.map(async c => store.createCar(c)));
    await this.updateStateGarage();
    const newGaragePage = garagePage;
    newGaragePage.innerHTML = this.renderGarage();
    this.disabledRemove(btnEvent);
  };

  private nextPageCarBTN = async (garagePage: HTMLDivElement) => {
    if (store.view === ViewPage.garage) {
      this.element.innerHTML = '';
      store.carsPage += 1;
      await this.updateStateGarage();
      const newGaragePage = garagePage;
      newGaragePage.innerHTML = this.renderGarage();
    }
  };

  private prevPageCarBTN = async (garagePage: HTMLDivElement) => {
    if (store.view === ViewPage.garage) {
      this.element.innerHTML = '';
      store.carsPage += 1;
      await this.updateStateGarage();
      const newGaragePage = garagePage;
      newGaragePage.innerHTML = this.renderGarage();
    }
  };

  private raceCarBtn = (
    btnEvent: HTMLButtonElement,
    btnGenerate: HTMLButtonElement,
    btnCreate: HTMLButtonElement,
    btnReset: HTMLButtonElement,
  ) => {
    this.disabledAdd(btnEvent, btnGenerate, btnCreate);
    this.disabledRemove(btnReset);
    this.raceCarsBtn();
  };

  private resetCarBtn = (
    btnEvent: HTMLButtonElement,
    btnGenerate: HTMLButtonElement,
    btnCreate: HTMLButtonElement,
    btnRace: HTMLButtonElement,
    resultRace: HTMLDivElement,
  ) => {
    this.disabledAdd(btnEvent);
    store.cars.map(({ id }) => this.stopDriving(id));
    this.disabledRemove(btnGenerate, btnCreate, btnRace);
    const newResultRace = resultRace;
    newResultRace.innerHTML = '';
  };

  private viewWinnersPageBtn = (
    btnReset: HTMLButtonElement,
    btnGenerate: HTMLButtonElement,
    btnCreate: HTMLButtonElement,
    btnRace: HTMLButtonElement,
    btnNext: HTMLButtonElement,
    resultRace: HTMLDivElement,
  ) => {
    store.cars.map(({ id }) => this.stopDriving(id));
    this.disabledAdd(btnReset);
    this.disabledRemove(btnGenerate, btnCreate, btnRace, btnNext);
    const newResultRace = resultRace;
    newResultRace.innerHTML = '';
  };

  listen(): void {
    document.body.addEventListener('click', async (event: Event): Promise<void> => {
      const btnEvent = event.target as HTMLButtonElement;
      const [btnUpdate, btnReset, btnCreate, btnGenerate, btnRace, btnNext] = this.initVariableButton();
      const [createNameInput, createColorInput, updateNameInput, updateColorInput] = this.initVariableInput();
      const [garagePage, resultRace] = this.initVariablePage();
      if (btnEvent.classList.contains('start-engine-button')) {
        const id = +btnEvent.id.split('start-engine-car-')[1];
        this.startDriving(id);
      } else if (btnEvent.classList.contains('stop-engine-button')) {
        const id = +btnEvent.id.split('stop-engine-car-')[1];
        this.stopDriving(id);
      } else if (btnEvent.classList.contains('select-button')) {
        this.selectCarBtn(btnEvent, btnUpdate, updateNameInput, updateColorInput);
      } else if (btnEvent.classList.contains('remove-button')) {
        this.removeCarBtn(btnEvent, garagePage);
      } else if (btnEvent.classList.contains('btn-winners-view')) {
        this.viewWinnersPageBtn(btnReset, btnGenerate, btnCreate, btnRace, btnNext, resultRace);
      } else if (btnEvent.classList.contains('btn-garage-view')) {
        await this.updateStateGarage();
      } else if (btnEvent.classList.contains('btn-race')) {
        this.raceCarBtn(btnEvent, btnGenerate, btnCreate, btnReset);
      } else if (btnEvent.classList.contains('btn-reset')) {
        this.resetCarBtn(btnEvent, btnGenerate, btnCreate, btnRace, resultRace);
      } else if ((event.target as HTMLElement).classList.contains('btn-update')) {
        this.updateCarBtn(updateNameInput, updateColorInput, garagePage, btnUpdate);
      } else if (btnEvent.classList.contains('btn-create')) {
        this.createCarBtn(createNameInput, createColorInput, garagePage);
      } else if (btnEvent.classList.contains('btn-generate')) {
        this.generateCarBtn(btnEvent, garagePage);
      } else if (btnEvent.classList.contains('button-next')) {
        this.nextPageCarBTN(garagePage);
      } else if (btnEvent.classList.contains('button-prev')) {
        this.prevPageCarBTN(garagePage);
      }
    });
  }
}
