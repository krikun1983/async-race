import {
  Car,
  CarsBody,
  createCar,
  createWinner,
  deleteCar,
  deleteWinner,
  getCars,
  getWinners,
  getWinnerStatus,
  saveWinner,
  updateCar,
  updateWinner,
  Winner,
  WinnerBody,
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
  getWinnerStatus: (id: number) => Promise<void>;
  deleteWinner: (id: number) => Promise<void>;
  createWinner: (body: WinnerBody) => Promise<void>;
  updateWinner: (id: number, body: WinnerBody) => Promise<void>;
  sortBy: null;
  sortOrder: null;
  view: string;
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
  async getWinnerStatus(id: number) {
    await getWinnerStatus(id);
    await this.getWinners();
  },
  async deleteWinner(id: number) {
    await deleteWinner(id);
    await this.getWinners();
  },
  async createWinner(body: WinnerBody) {
    await createWinner(body);
    await this.getWinners();
  },
  async updateWinner(id: number, body: WinnerBody) {
    await updateWinner(id, body);
    await this.getWinners();
  },
  sortBy: null,
  sortOrder: null,
  view: 'garage',
};
