import { useParams } from 'react-router-dom';
import ChatBubble from './ChatBubble';
import { useEffect, useRef, useState } from 'react';
import { createSocketConnection } from '../utils/socket';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { BASE_URL, DEFAULT_USER_URL } from '../constants/constants';
import getJwt from '../utils/getjwt';
import getOnlineStatus from '../utils/getOnlineStatus';
import Online from './Online';
import SendButton from './buttons/SendButton';
import fetchChatMessages from '../utils/fetchChatMessages';

const Chat = () => {
  const { targetUserId } = useParams();
  const user = useSelector((store) => store?.user);
  const connectedUsers = useSelector((store) => store?.connection) || [];
  const userId = user?._id;
  // const targetUserName = connectedUsers?.firstName;
  const profilePhoto = user?.photoUrl;
  const [messages, setMessages] = useState([]);
  const [newMessages, setNewMessages] = useState('');
  //const [token, setToken] = useState('');
  const [isOnline, setIsOnline] = useState(null);
  const [isActive, setIsActive] = useState([]);
  const socketRef = useRef(null);

  const targetedUser = connectedUsers.filter(
    (target) => target._id === targetUserId
  )[0];
  const targetedUserphotoUrl = targetedUser?.photoUrl;
  const targetUserName = targetedUser?.firstName;

  useEffect(() => {
    const loadMessages = async () => {
      const chatMessages = await fetchChatMessages(targetUserId);
      if (!chatMessages) {
        setMessages([]);
      }
      setMessages(chatMessages);
    };
    loadMessages();
  }, [targetUserId]);

  useEffect(() => {
    const isOnline = getOnlineStatus();
    setIsOnline(isOnline);
  }, [setIsOnline]);

  useEffect(() => {
    fetchChatMessages();
  }, []);

  useEffect(() => {
    const token = getJwt();
    if (!userId) {
      return;
    }
    //on page load,socket connection is made and join chat event is emitted
    const socket = createSocketConnection();
    socketRef.current = socket;
    socket.emit('joinChat', {
      firstName: user.firstName,
      userId,
      targetUserId,
      token,
    });
    //TODO:checks user is active or not
    socket.emit('userOnline', { userId });
    socket.on('userStatus', (onlineUsers) => {
      setIsActive(onlineUsers);
    });

    socket.on('messageReceived', ({ firstName, lastName, newMessages }) => {
      setMessages((messages) => [
        ...messages,
        { firstName, lastName, text: newMessages },
      ]);
    });
    socket.on('disconnect', () => {});

    return () => {
      socket.disconnect();
    };
  }, [userId, targetUserId]);

  const sendMessages = () => {
    //send connection status to server
    if (!socketRef.current) return;
    socketRef.current.emit('sendMessage', {
      firstName: user.firstName,
      userId,
      targetUserId,
      newMessages,
    });
    setNewMessages('');
  };
  const isUserActive = !!isActive.find((id) => id === targetUserId);

  return (
    <div className="w-full sm:w-1/2 sm:m-auto sm:mt-6 border border-cyan-500 rounded-xl h-[80vh] flex flex-col">
      <div className="flex w-full border-b border-cyan-600 justify-between">
        <h1 className="p-4 text-2xl">Chat</h1>
        <div className="chat-image avatar flex items-center">
          <p className="text-xl font-serif text-white flex flex-col">
            {targetUserName}
            <span className="text-sm px-2 font-sans">
              {isUserActive ? 'online' : 'offline'}
            </span>
          </p>

          <div className="w-10 sm:w-20 rounded-full m-2">
            <Online status={isUserActive ? 'online' : 'offline'} />
            <img
              alt="Tailwind CSS chat bubble component"
              src={targetedUserphotoUrl || DEFAULT_USER_URL}
            />
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-scroll p-5">
        {messages.map((msg, index) => (
          <ChatBubble
            key={index}
            message={msg}
            user={user}
            profilePhoto={profilePhoto}
            targetUserPhoto={targetedUserphotoUrl}
            isOnline={isOnline}
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
        <SendButton sendMessages={sendMessages} />
      </div>
    </div>
  );
};

export default Chat;
