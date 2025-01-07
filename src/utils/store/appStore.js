import { configureStore } from '@reduxjs/toolkit';
import useReducer from '../slice/userSlice';
import feedReducer from '../slice/feedSlice';
import connectionReducer from '../slice/connectionSlice';
import requestReducer from '../slice/requestSlice';

const appStore = configureStore({
  reducer: {
    user: useReducer,
    feed: feedReducer,
    connection: connectionReducer,
    requests: requestReducer,
  },
});

export default appStore;
