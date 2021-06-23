import {
  createCar,
  createWinner,
  deleteCar,
  deleteWinner,
  getCars,
  getWinners,
  getWinnerStatus,
  updateCar,
  updateWinner,
} from './app.api';
import WinnersSortCars from './constants/winners-sort-cars';
import WinnersSortOrderCars from './constants/winners-sort-order-cars';
import { CarsBody, Store, WinnerBody } from './type';

const store: Store = {
  carsPage: 1,
  winnersPage: 1,
  cars: [],
  winners: [],
  carsCount: '0',
  winnersCount: '0',
  limit: 10,
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
    const { items, count } = await getWinners({
      page: this.winnersPage,
      limit: this.limit,
      sort: this.sortBy,
      order: this.sortOrder,
    });
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
  sortBy: WinnersSortCars.wins,
  sortOrder: WinnersSortOrderCars.desc,
  view: 'garage',
};

export default store;
