import { createStore } from 'easy-peasy';

import { userModel } from './user';
import { todoModel } from './todo';

export const store = createStore({
  user: userModel,
  todo: todoModel,
});
