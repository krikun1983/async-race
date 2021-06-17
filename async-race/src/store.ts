import { Car, getCars } from './app.api';

type Store = {
  carsPage: number;
  cars: Car[];
  carsCount: string | null;
  getCars: () => Promise<void>;
};

export type Animat = {
  animation: { [key: number]: { id: number } };
};

export const animat: Animat = {
  animation: {},
};

export const store: Store = {
  carsPage: 1,
  cars: [],
  carsCount: '0',
  async getCars() {
    const { items, count } = await getCars({ page: this.carsPage });
    this.cars = items;
    this.carsCount = count;
  },
};
