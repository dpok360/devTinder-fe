import { configureStore } from '@reduxjs/toolkit';
import useReducer from '../slice/userSlice';

const appStore = configureStore({ reducer: { user: useReducer } });

export default appStore;
