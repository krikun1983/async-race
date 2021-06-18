import {
  Car,
  CarsBody,
  createCar,
  deleteCar,
  deleteWinner,
  getCars,
  getWinners,
  saveWinner,
  updateCar,
  Winner,
} from './app.api';

type Store = {
  carsPage: number;
  winnersPage: number;
  cars: Car[];
  winners: Winner[];
  carsCount: string | null;
  winnersCount: string | null;
  getCars: () => Promise<void>;
  deleteCar: (id: number) => Promise<void>;
  createCar(body: CarsBody): Promise<void>;
  updateCar: (id: number, body: CarsBody) => Promise<void>;
  getWinners: () => Promise<void>;
  deleteWinner: (id: number) => Promise<void>;
  sortBy: null;
  sortOrder: null;
  view: 'garage';
};

export type Animat = {
  animation: { [key: number]: { id: number } };
};

export const animat: Animat = {
  animation: {},
};

export const store: Store = {
  carsPage: 1,
  winnersPage: 1,
  cars: [],
  winners: [],
  carsCount: '0',
  winnersCount: '0',
  async getCars() {
    const { items, count } = await getCars({ page: this.carsPage });
    this.cars = items;
    this.carsCount = count;
  },
  async deleteCar(id: number) {
    await deleteCar(id);
    await this.getCars();
  },
  async createCar(body: CarsBody) {
    await createCar(body);
    await this.getCars();
  },
  async updateCar(id: number, body: CarsBody) {
    await updateCar(id, body);
    await this.getCars();
  },
  async getWinners() {
    const { items, count } = await getWinners({ page: this.winnersPage });
    this.winners = items;
    this.winnersCount = count;
  },
  async deleteWinner(id: number) {
    await deleteWinner(id);
    await this.getWinners();
  },
  // async saveWinner() {
  //   await saveWinner({ id, time });
  // },
  sortBy: null,
  sortOrder: null,
  view: 'garage',
};
