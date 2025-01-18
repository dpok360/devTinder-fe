import { useParams } from 'react-router-dom';
import ChatBubble from './ChatBubble';
import { useEffect, useState } from 'react';
import { createSocketConnection } from '../utils/socket';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { BASE_URL } from '../constants/constants';

const Chat = () => {
  const { targetUserId } = useParams();
  const user = useSelector((store) => store?.user);
  const connectedUsers = useSelector((store) => store?.connection) || [];
  const userId = user?._id;
  const profilePhoto = user?.photoUrl;
  const [messages, setMessages] = useState([]);
  const [newMessages, setNewMessages] = useState('');

  const targetedUserphotoUrl = connectedUsers.filter(
    (target) => target._id === targetUserId
  )[0]?.photoUrl;

  const fetchChatMessages = async () => {
    try {
      const chat = await axios.get(BASE_URL + '/chat/' + targetUserId, {
        withCredentials: true,
      });
      const chatMessages = chat?.data?.messages.map((msg) => {
        return {
          firstName: msg?.senderId?.firstName,
          lastName: msg?.senderId?.lastName,
          text: msg?.text,
        };
      });
      setMessages(chatMessages);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchChatMessages();
  }, []);

  useEffect(() => {
    if (!userId) {
      return;
    }
    //on page load,socket connection is made and join chat event is emitted
    const socket = createSocketConnection();
    socket.emit('joinChat', {
      firstName: user.firstName,
      userId,
      targetUserId,
    });
    socket.on('messageReceived', ({ firstName, lastName, newMessages }) => {
      setMessages((messages) => [
        ...messages,
        { firstName, lastName, text: newMessages },
      ]);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, targetUserId]);

  const sendMessages = () => {
    const socket = createSocketConnection();
    socket.emit('sendMessage', {
      firstName: user.firstName,
      userId,
      targetUserId,
      newMessages,
    });
    setNewMessages('');
  };

  return (
    <div className="w-1/2 m-auto mt-6 border border-cyan-500 rounded-xl h-[80vh] flex flex-col">
      <h1 className="p-5 border-b border-gray-500">Chat</h1>
      <div className="flex-1 overflow-scroll p-5">
        {/* chat message   */}
        {messages.map((msg, index) => (
          <ChatBubble
            key={index}
            message={msg}
            user={user}
            profilePhoto={profilePhoto}
            targetUserPhoto={targetedUserphotoUrl}
          />
        ))}
      </div>
      <div className="flex items-center mx-28 p-2 gap-2 w-full ">
        <input
          value={newMessages}
          onChange={(e) => {
            setNewMessages(e.target.value);
          }}
          type="text"
          placeholder="Type here"
          className="input input-bordered input-info w-full max-w-lg"
        />
        <button onClick={sendMessages} className="btn btn-info btn-md w-20">
          <img src="../../public/svgs/send.svg" alt="send icon" />
        </button>
      </div>
    </div>
  );
};

export default Chat;
