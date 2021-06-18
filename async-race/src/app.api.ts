const base = 'http://127.0.0.1:3000';

const garage = `${base}/garage`;
const engine = `${base}/engine`;
const winners = `${base}/winners`;

export interface Winner {
  id: number;
  wins: number;
  time: number;
}

export interface Winners {
  items: Winner[];
  count: string | null;
}

export interface WinnerBody {
  id?: number;
  wins: number;
  time: number;
}
export interface Car {
  id: number;
  name: string;
  color: string;
}

export interface Cars {
  items: Car[];
  count: string | null;
}

export interface CarsBody {
  name: string;
  color: string;
}

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

export const getCar = async (id: number) => {
  return (await fetch(`${garage}/${id}`)).json();
};

export const createCar = async (body: CarsBody) => {
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

export const deleteCar = async (id: number) =>
  (await fetch(`${garage}/${id}`, { method: 'DELETE' })).json();

export const updateCar = async (id: number, body: CarsBody) =>
  (
    await fetch(`${garage}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    })
  ).json();

export const startEngine = async (id: number) =>
  (await fetch(`${engine}?id=${id}&status=started`)).json();

export const stopEngine = async (id: number) =>
  (await fetch(`${engine}?id=${id}&status=stopped`)).json();

export const drive = async (id: number) => {
  const res = await fetch(`${engine}?id=${id}&status=drive`).catch();
  return res.status !== 200 ? { success: false } : { ...(await res.json()) };
};

export type WinnersSort = 'id' | 'wins' | 'time';
export type WinnersOrder = 'ASC' | 'DESC';

const getSortOrder = (sort: WinnersSort, order: string) => {
  if (sort && order) return `&_sort=${sort}&_order=${order}`;
  return '';
};

export const getWinners = async ({
  page,
  limit = 10,
  sort = 'time',
  order = 'DESC',
}: {
  page: number;
  limit?: number;
  sort?: WinnersSort;
  order?: WinnersOrder;
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

export const getWinner = async (id: number) =>
  (await fetch(`${winners}/${id}`)).json();

export const getWinnerStatus = async (id: number) =>
  (await fetch(`${winners}/${id}`)).status;

export const deleteWinner = async (id: number) =>
  (await fetch(`${winners}/${id}`, { method: 'DELETE' })).json();

export const createWinner = async (body: Winner) =>
  (
    await fetch(winners, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    })
  ).json();

export const updateWinner = async (id: number, body: WinnerBody) =>
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
}) => {
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
