import WinnersSortCars from './constants/winners-sort-cars';
import WinnersSortOrderCars from './constants/winners-sort-order-cars';
import {
  Car,
  Cars,
  CarsBody,
  Success,
  Transform,
  WinnerBody,
  Winners,
  WinnersOrder,
  WinnersSort,
} from './type';

const base = 'http://127.0.0.1:3000';

const garage = `${base}/garage`;
const engine = `${base}/engine`;
const winners = `${base}/winners`;

export const getCars = async ({
  page = 1,
  limit = 7,
}: {
  page: number;
  limit?: number;
}): Promise<Cars> => {
  const response = await fetch(`${garage}?_page=${page}&_limit=${limit}`);

  return {
    items: await response.json(),
    count: response.headers.get('X-Total-Count'),
  };
};

export const getCar = async (id: number): Promise<Car> => {
  return (await fetch(`${garage}/${id}`)).json();
};

export const createCar = async (body: CarsBody): Promise<Car> => {
  const response = await fetch(`${garage}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  const car = await response.json();
  return car;
};

export const deleteCar = async (id: number): Promise<Car> =>
  (await fetch(`${garage}/${id}`, { method: 'DELETE' })).json();

export const updateCar = async (id: number, body: CarsBody): Promise<Car> =>
  (
    await fetch(`${garage}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    })
  ).json();

export const startEngine = async (id: number): Promise<Transform> =>
  (await fetch(`${engine}?id=${id}&status=started`)).json();

export const stopEngine = async (id: number): Promise<Transform> =>
  (await fetch(`${engine}?id=${id}&status=stopped`)).json();

export const drive = async (id: number): Promise<Success> => {
  const res = await fetch(`${engine}?id=${id}&status=drive`).catch();
  return res.status !== 200 ? { success: false } : { ...(await res.json()) };
};

const getSortOrder = (sort: WinnersSort, order: string) => {
  if (sort && order) return `&_sort=${sort}&_order=${order}`;
  return '';
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
  const response = await fetch(
    `${winners}?_page=${page}&_limit=${limit}${getSortOrder(sort, order)}`,
  );
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

export const getWinner = async (id: number): Promise<WinnerBody> =>
  (await fetch(`${winners}/${id}`)).json();

export const getWinnerStatus = async (id: number): Promise<number> =>
  (await fetch(`${winners}/${id}`)).status;

export const deleteWinner = async (id: number): Promise<WinnerBody> =>
  (await fetch(`${winners}/${id}`, { method: 'DELETE' })).json();

export const createWinner = async (body: WinnerBody): Promise<WinnerBody> =>
  (
    await fetch(winners, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    })
  ).json();

export const updateWinner = async (
  id: number,
  body: WinnerBody,
): Promise<WinnerBody> =>
  (
    await fetch(`${winners}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    })
  ).json();

export const saveWinner = async ({
  id,
  time,
}: {
  id: number;
  time: number;
}): Promise<void> => {
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

const models = [
  'Tesla',
  'Mersedes',
  'BMW',
  'Toyota',
  'Zhiguli',
  'Moskvich',
  'Opel',
  'Aston Martin',
  'Porshe',
];

const names = [
  'Model S',
  'CLK',
  '7',
  'Camry',
  'Combi',
  '9',
  'Corsa',
  'DB9',
  'Cayene',
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
  const result = [];

  for (let i = count; i > 0; i -= 1) {
    result.push({ name: getRandomName(), color: getRandomColor() });
  }

  return result;
};
