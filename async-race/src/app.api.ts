import { WinnersSortCars, WinnersSortOrderCars } from './constants/winners-sorts';

import { Car, Cars, CarsBody, Success, Transform, WinnerBody, Winners, WinnersOrder, WinnersSort } from './type';

const BASE_URL = 'http://127.0.0.1:3000';

const GARAGE_API = `${BASE_URL}/garage`;
const ENGINE_API = `${BASE_URL}/engine`;
const WINNERS_API = `${BASE_URL}/winners`;

export const getCars = async ({ page = 1, limit = 7 }: { page: number; limit?: number }): Promise<Cars> => {
  const response = await fetch(`${GARAGE_API}?_page=${page}&_limit=${limit}`);

  return {
    items: await response.json(),
    count: response.headers.get('X-Total-Count'),
  };
};

export const getCar = async (id: number): Promise<Car> => {
  return (await fetch(`${GARAGE_API}/${id}`)).json();
};

export const createCar = async (bodyCar: CarsBody): Promise<Car> => {
  const response = await fetch(`${GARAGE_API}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bodyCar),
  });
  const car = await response.json();
  return car;
};

export const deleteCar = async (id: number): Promise<Car> =>
  (await fetch(`${GARAGE_API}/${id}`, { method: 'DELETE' })).json();

export const updateCar = async (id: number, bodyCar: CarsBody): Promise<Car> =>
  (
    await fetch(`${GARAGE_API}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(bodyCar),
      headers: {
        'Content-Type': 'application/json',
      },
    })
  ).json();

export const startEngine = async (id: number): Promise<Transform> =>
  (await fetch(`${ENGINE_API}?id=${id}&status=started`)).json();

export const stopEngine = async (id: number): Promise<Transform> =>
  (await fetch(`${ENGINE_API}?id=${id}&status=stopped`)).json();

export const drive = async (id: number): Promise<Success> => {
  const res = await fetch(`${ENGINE_API}?id=${id}&status=drive`).catch();
  return res.status !== 200 ? { success: false } : { ...(await res.json()) };
};

const getSortOrder = (sort: WinnersSort, order: string) => {
  return sort && order ? `&_sort=${sort}&_order=${order}` : '';
};

export const getWinners = async ({
  page,
  limit = 10,
  sort = WinnersSortCars.time,
  order = WinnersSortOrderCars.desc,
}: {
  page: number;
  limit: number;
  sort: WinnersSort;
  order: WinnersOrder;
}): Promise<Winners> => {
  const response = await fetch(`${WINNERS_API}?_page=${page}&_limit=${limit}${getSortOrder(sort, order)}`);
  const items = await response.json();

  return {
    items: await Promise.all(
      items.map(async (winner: { id: number }) => ({
        ...winner,
        car: await getCar(winner.id),
      })),
    ),
    count: response.headers.get('X-Total-Count'),
  };
};

export const getWinner = async (id?: number): Promise<WinnerBody> => (await fetch(`${WINNERS_API}/${id}`)).json();

export const getWinnerStatus = async (id?: number): Promise<number> => (await fetch(`${WINNERS_API}/${id}`)).status;

export const deleteWinner = async (id: number): Promise<WinnerBody> =>
  (await fetch(`${WINNERS_API}/${id}`, { method: 'DELETE' })).json();

export const createWinner = async (bodyCar: WinnerBody): Promise<WinnerBody> =>
  (
    await fetch(WINNERS_API, {
      method: 'POST',
      body: JSON.stringify(bodyCar),
      headers: {
        'Content-Type': 'application/json',
      },
    })
  ).json();

export const updateWinner = async (id: number, bodyCar: WinnerBody): Promise<WinnerBody> =>
  (
    await fetch(`${WINNERS_API}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(bodyCar),
      headers: {
        'Content-Type': 'application/json',
      },
    })
  ).json();

export const saveWinner = async ({ id, time }: { id: number; time: number }): Promise<void> => {
  const winnerStatus = await getWinnerStatus(id);

  if (winnerStatus === 404) {
    await createWinner({
      id,
      wins: 1,
      time,
    });
  } else {
    const winner = await getWinner(id);
    await updateWinner(id, {
      id,
      wins: winner.wins + 1,
      time: time < winner.time ? time : winner.time,
    });
  }
};
