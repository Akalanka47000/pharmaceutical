export const statuses = ['open', 'resolved'].reduce((acc, curr) => {
  acc[curr] = curr;
  return acc;
}, {});
