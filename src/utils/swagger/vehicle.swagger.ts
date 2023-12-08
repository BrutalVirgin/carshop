export const SWAGGER_ADD_VEHICLE = {
  id: '57fddad3-9ca7-48e3-868b-ff671e05a284',
  author: 'test@gmail.com',
  carManufacturer: 'MASDA',
  carModel: '3',
  vin: '11111111111111111',
  year: 2017,
  image:
    'public\\photos\\6f932866-ea7e-4458-be60-a9068dfc1d70b242720e-e75f-4d86-aa63-c183c0dab886.jpg',
  description: 'good car',
  createdAt: '2023-12-06T16:48:53.423Z',
  updatedAt: '2023-12-06T16:48:53.423Z',
};

export const SWAGGER_UPDATE_CAR = {
  id: '40477a08-8db8-48c4-b6e0-537f02812b6b',
  author: 'test@gmail.com',
  carManufacturer: 'Infinity',
  carModel: '123',
  vin: '22222222222222222',
  year: 1900,
  image:
    'public\\photos\\17530043-ea50-4ecb-8908-fac834a44ed2181baa9d-ba49-4783-8665-2929adfa89f5.jpg',
  description: 'asdasd',
  createdAt: '2023-12-08T16:24:50.395Z',
  updatedAt: '2023-12-08T17:42:11.107Z',
};

export const SWAGGER_GET_MY_VEHICLES = [
  {
    id: 'd62a4423-1ea5-40ef-839e-c42da909c621',
    author: 'test@gmail.com',
    carManufacturer: 'mazda',
    carModel: '3',
    vin: '11111111111111111',
    year: 2017,
    image:
      'public\\photos\\2749699c-7779-486e-8dc4-7db1d8c44aa4759b6b4f-b2bd-40e8-a9db-dca39b21efd5.jpg',
    description: 'nice car',
    createdAt: '2023-12-07T13:57:53.182Z',
    photos: [
      {
        id: 'e7455a25-9c1f-4db3-9890-bfb539c542bb',
        url: 'public\\photos\\2749699c-7779-486e-8dc4-7db1d8c44aa4759b6b4f-b2bd-40e8-a9db-dca39b21efd5.jpg',
        createdAt: '2023-12-07T13:57:53.202Z',
        updatedAt: '2023-12-07T13:57:53.202Z',
      },
      {
        id: 'd05c0775-eb7a-4676-baba-ce7970513797',
        url: 'public\\photos\\2749699c-7779-486e-8dc4-7db1d8c44aa4af4b013b-928b-41a7-bb8b-a052144ff0c7.jpg',
        createdAt: '2023-12-07T13:57:53.202Z',
        updatedAt: '2023-12-07T13:57:53.202Z',
      },
    ],
  },
];

export const SWAGGER_GET_ONE_VEHICLE = {
  id: '051cc8bf-4a09-4768-a049-a317d4a48445',
  author: 'test@gmail.com',
  carManufacturer: 'mazda',
  carModel: '3',
  vin: '1111****1111',
  year: 2017,
  description: 'nice car',
  createdAt: '2023-12-07T14:06:00.931Z',
  photos: [
    {
      id: '07dfb120-7031-4bf1-aa01-e416d5042a3b',
      url: 'public\\photos\\b088a6f5-2e92-4ca2-b15b-0ea1d23c6c730e90405b-321d-47e0-b5dd-6c843d1fbb38.jpg',
      createdAt: '2023-12-07T14:06:00.946Z',
      updatedAt: '2023-12-07T14:06:00.946Z',
    },
    {
      id: '354917a4-029d-453b-b8a3-4f09e164f667',
      url: 'public\\photos\\b088a6f5-2e92-4ca2-b15b-0ea1d23c6c73499f0d11-9193-419a-afc3-5ea04f86fee7.jpg',
      createdAt: '2023-12-07T14:06:00.946Z',
      updatedAt: '2023-12-07T14:06:00.946Z',
    },
  ],
};

export const SWAGGER_LIST_OF_VEHICLES = [
  {
    id: 'bad0d9d0-7060-46cc-b206-55dafd655e79',
    author: 'test@gmail.com',
    carManufacturer: 'masda',
    carModel: '3',
    year: 2017,
    image:
      'public\\photos\\c7f14b42-0894-44d8-bbb2-08cdf9696cff81d73a5b-e1b0-48bc-9543-03831e55c02b.jpg',
    description: 'nice car',
    createdAt: '2023-12-07T16:49:33.974Z',
  },
];

export const SWAGGER_SCHEMA_ADD_CAR = {
  type: 'object',
  properties: {
    author: { type: 'string' },
    carManufacturer: { type: 'string' },
    carModel: { type: 'string' },
    vin: { type: 'string' },
    year: { type: 'string' },
    description: { type: 'string' },
    image: {
      type: 'array',
      items: {
        type: 'string',
        format: 'binary',
      },
    },
  },
};

export const SWAGGER_SCHEMA_UPDATE_CAR = {
  type: 'object',
  properties: {
    carId: { type: 'string' },
    carManufacturer: { type: 'string' },
    carModel: { type: 'string' },
    vin: { type: 'string' },
    year: { type: 'string' },
    description: { type: 'string' },
    image: {
      type: 'array',
      items: {
        type: 'string',
        format: 'binary',
      },
    },
  },
};
