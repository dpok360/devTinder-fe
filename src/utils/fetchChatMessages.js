import axios from 'axios';
import { BASE_URL } from '../constants/constants';

const fetchChatMessages = async (targetUserId) => {
  try {
    if (!targetUserId) return [];
    const chat = await axios.get(BASE_URL + '/chat/' + targetUserId, {
      withCredentials: true,
    });

    const chatMessages = chat?.data?.messages.map((msg) => {
      return {
        firstName: msg?.senderId?.firstName,
        lastName: msg?.senderId?.lastName,
        text: msg?.text,
        createdAt: msg?.createdAt,
      };
    });
    return chatMessages;
  } catch (error) {
    console.error(error.message);
  }
};

export default fetchChatMessages;
