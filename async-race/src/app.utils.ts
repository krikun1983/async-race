import { Models, Names } from './constants/car-names';
import { CarsBody } from './type';

export const getPositionAtCenter = (element: HTMLElement): { x: number; y: number } => {
  const { top, left, width, height } = element.getBoundingClientRect();
  return {
    x: left + width / 2,
    y: top + height / 2,
  };
};

export const getDistanceBetweenElements = (a: HTMLElement, b: HTMLElement): number => {
  const aPosition = getPositionAtCenter(a);
  const bPosition = getPositionAtCenter(b);

  return Math.hypot(aPosition.x - bPosition.x, aPosition.y - bPosition.y);
};

export const animation = (car: HTMLDivElement, distance: number, animationTime: number): { id: number } => {
  let start: number | null = null;
  const state: {
    id: number;
  } = { id: 1 };

  const step = (timestamp: number) => {
    if (!start) start = timestamp;
    const time = timestamp - start;
    const passed = Math.round(time * (distance / animationTime));
    const carStyleTransform = car;
    carStyleTransform.style.transform = `translateX(${Math.min(passed, distance)}px)`;

    if (passed < distance) {
      state.id = window.requestAnimationFrame(step);
    }
  };
  state.id = window.requestAnimationFrame(step);

  return state;
};

const models = [
  Models.tesla,
  Models.mercedes,
  Models.bmw,
  Models.toyota,
  Models.volvo,
  Models.nissan,
  Models.opel,
  Models.astonMartin,
  Models.porsche,
];

const names = [
  Names.modelS,
  Names.clk,
  Names.seven,
  Names.camry,
  Names.sonata,
  Names.nine,
  Names.transit,
  Names.db9,
  Names.cayman,
];

const getRandomName = () => {
  const model = models[Math.floor(Math.random() * models.length)];
  const name = names[Math.floor(Math.random() * models.length)];

  return `${model} ${name}`;
};

const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i += 1) {
    color += letters[Math.floor(Math.random() * 16)];
  }

  return color;
};

export const generateRandomCars = (count = 100): CarsBody[] => {
  return new Array(count).fill(1).map(() => ({ name: getRandomName(), color: getRandomColor() }));
};
