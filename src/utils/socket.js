import { io } from 'socket.io-client';
import { BASE_URL } from '../constants/constants';

export const createSocketConnection = () => {
  if (location.hostname === 'localhost') {
    return io(BASE_URL, { credentials: true });
  } else {
    return io('/', { path: '/api/socket.io', credentials: true });
  }
};
