import { configureStore } from '@reduxjs/toolkit';
import useReducer from '../slice/userSlice';
import feedReducer from '../slice/feedSlice';

const appStore = configureStore({
  reducer: { user: useReducer, feed: feedReducer },
});

export default appStore;
