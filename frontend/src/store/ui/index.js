import { combineReducers } from 'redux';

export default combineReducers({
  global: (await import('./global')).default,
  login: (await import('./login')).default,
  register: (await import('./register')).default,
  users: (await import('./users')).default,
  products: (await import('./products')).default,
});
