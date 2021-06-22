import WinnersSortCars from './constants/winners-sort-cars';
import WinnersSortOrderCars from './constants/winners-sort-order-cars';

export type Component = {
  render(): HTMLElement;
};

export interface Route {
  path: string;
  Component: new () => Component;
}

export type WinnersSort = WinnersSortCars.wins | WinnersSortCars.time;

export type WinnersOrder = WinnersSortOrderCars.asc | WinnersSortOrderCars.desc;

export type Winner = {
  car: { name: string; color: string; id: number };
  id: number;
  wins: number;
  time: number;
};

export type WinnerBody = {
  id: number;
  wins: number;
  time: number;
};

export type Winners = {
  items: Winner[];
  count: string | null;
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

export type Animat = {
  animation: { [key: number]: { id: number } };
};
