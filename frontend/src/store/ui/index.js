import { combineReducers } from 'redux';

export default combineReducers({
  global: (await import('./global')).default,
  login: (await import('./login')).default,
});
