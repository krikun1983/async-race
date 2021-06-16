import { Car, getCars } from './app.api';
// , getWinners
// const { cars, carsCount } = function() {
//   return new Promise(res => getCars(1).then({cars, carsCount}=>{и юзай здесь}));
// }
//
// const { items: winners, count: winnersCount } = await getWinners({ page: 1 });

// const responce = await getCars(1);

type Store = {
  carsPage: number;
  cars: Car[];
  carsCount: string | null;
  getCars: () => Promise<void>;
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

// const cars = getСarsItem();
// const carsCount = getСarsCount();

// console.log('items cars => ', responce);

// export default {
//   carsPage: 1,
//   cars,
//   carsCount,
//   winnersPage: 1,
// winners,
// winnersCount,
// animation: {},
// view: 'garage',
// sortBy: null,
// sortOrder: null,
// };
