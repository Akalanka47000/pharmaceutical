export const constructReceiptEmailPayload = (email, order) => ({
  template: 'payment_confirmation',
  data: {
    order_id: order._id,
    total: order.total,
  },
  options: {
    to: [email],
    subject: 'Pharmaceutical Payment Receipt',
  },
});
