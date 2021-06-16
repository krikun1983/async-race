const base = 'http://127.0.0.1:3000';

const garage = `${base}/garage`;
// const engine = `${base}/engine`;
// const winners = `${base}/winners`;

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

// export const deleteCar = async (id: number) =>
//   (await fetch(`${garage}/${id}`, { method: 'DELETE' })).json();

// export const updateCar = async (id: number, body: BodyInit) =>
//   (
//     await fetch(`${garage}/${id}`, {
//       method: 'PUT',
//       body: JSON.stringify(body),
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     })
//   ).json();

// export const startEngine = async (id: number) =>
//   (await fetch(`${engine}?id=${id}&status=started`)).json();

// export const stopEngine = async (id: number) =>
//   (await fetch(`${engine}?id=${id}&status=stopped`)).json();

// export const drive = async (id: number) => {
//   const res = await fetch(`${engine}?id=${id}&status=drive`).catch();
//   return res.status !== 200 ? { success: false } : { ...(await res.json()) };
// };
