import WinnersSortCars from './constants/winners-sort-cars';
import WinnersSortOrderCars from './constants/winners-sort-order-cars';

export type WinnersSort = WinnersSortCars.wins | WinnersSortCars.time;

export type WinnersOrder = WinnersSortOrderCars.asc | WinnersSortOrderCars.desc;

export type Winner = {
  car: { name: string; color: string; id: number };
  id: number;
  wins: number;
  time: number;
};

export type Winners = {
  items: Winner[];
  count: string | null;
};

export type WinnerBody = {
  id: number;
  wins: number;
  time: number;
};

export type Transform = {
  velocity: number;
  distance: number;
};

export type Success = {
  success: boolean;
};

export type CarsBody = {
  name: string;
  color: string;
};

export type Car = {
  id: number;
  name: string;
  color: string;
};

export type Cars = {
  items: Car[];
  count: string | null;
};

export type AnimationCar = {
  animation: { [key: number]: { id: number } };
};

export type GarageCar = {
  id: number;
  name: string;
  color: string;
  isEngineStarted?: boolean;
};

export type UpdateCar = {
  id: number;
  name: string;
  color: string;
};

export type Store = {
  carsPage: number;
  winnersPage: number;
  cars: Car[];
  winners: Winner[];
  carsCount: string | null;
  winnersCount: string | null;
  limit: number;
  getCars: () => Promise<void>;
  deleteCar: (id: number) => Promise<void>;
  createCar(body: CarsBody): Promise<void>;
  updateCar: (id: number, body: CarsBody) => Promise<void>;
  getWinners: () => Promise<void>;
  getWinnerStatus: (id: number) => Promise<void>;
  deleteWinner: (id: number) => Promise<void>;
  createWinner: (body: WinnerBody) => Promise<void>;
  updateWinner: (id: number, body: WinnerBody) => Promise<void>;
  sortBy: WinnersSort;
  sortOrder: WinnersOrder;
  view: string;
};
