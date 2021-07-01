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
import ViewPage from './constants/view-page';
import { CarsBody, Store, WinnerBody } from './type';
import { WinnersSortCars, WinnersSortOrderCars } from './constants/winners-sorts';

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
  async createCar(bodyCar: CarsBody) {
    await createCar(bodyCar);
    await this.getCars();
  },
  async updateCar(id: number, bodyCar: CarsBody) {
    await updateCar(id, bodyCar);
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
  async createWinner(bodyCar: WinnerBody) {
    await createWinner(bodyCar);
    await this.getWinners();
  },
  async updateWinner(id: number, bodyCar: WinnerBody) {
    await updateWinner(id, bodyCar);
    await this.getWinners();
  },
  sortBy: WinnersSortCars.wins,
  sortOrder: WinnersSortOrderCars.desc,
  view: ViewPage.garage,
};

export default store;
