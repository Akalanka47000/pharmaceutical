export const statuses = ['ready_for_pickup', 'picked_up', 'dispatched_to_warehouse', 'assigned_to_delivery_rider', 'delivered', 'delivery_failed'].reduce((acc, curr) => {
  acc[curr] = curr;
  return acc;
}, {});
