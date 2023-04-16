export const userFilters = [
  {
    key: 'name',
    label: 'Name',
  },
  {
    key: 'email',
    label: 'Name',
  },
  {
    key: 'difficulty',
    label: 'Difficulty',
    options: [
      {
        key: 'admin',
        label: 'Admin',
      },
      {
        key: 'buyer',
        label: 'Buyer',
      },
      {
        key: 'seller',
        label: 'Seller',
      }
    ],
  },
]

export const userSorts = [
  {
    key: 'created_at',
    label: 'Registration Date',
    direction: 0,
  },
]
