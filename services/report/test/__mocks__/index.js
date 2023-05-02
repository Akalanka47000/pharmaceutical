import createError from 'http-errors';

export const mockOrderDetails = [
  {
    _id: '644ab510485608e35fac8344',
    products: [
      {
        _id: '644a9cb2bba7b92795175d04',
        quantity: 1,
      },
    ],
    user: {
      _id: '640a2ca3088159d428f598a4',
      name: 'Akalanka',
    },
    total: 907.8000000000001,
    status: 'paid',
    created_at: '2023-04-27T17:46:56.915+00:00',
    updated_at: '2023-04-27T17:47:56.915+00:00',
    payment_id: 'pi_3N1Z2KSJ18Jyb28v04h9V4yY',
  },
];

export const mockSendEmailError = createError(424, 'Failed to send email');
