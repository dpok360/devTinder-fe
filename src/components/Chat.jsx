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

const Chat = () => {
  const { targetUserId } = useParams();
  const user = useSelector((store) => store?.user);
  const connectedUsers = useSelector((store) => store?.connection) || [];
  const userId = user?._id;
  // const targetUserName = connectedUsers?.firstName;
  const profilePhoto = user?.photoUrl;
  const [messages, setMessages] = useState([]);
  const [newMessages, setNewMessages] = useState('');
  const [token, setToken] = useState('');
  const [isOnline, setIsOnline] = useState(null);
  const [isActive, setIsActive] = useState(false);

  const socketRef = useRef(null);

  const targetedUser = connectedUsers.filter(
    (target) => target._id === targetUserId
  )[0];
  const targetedUserphotoUrl = targetedUser?.photoUrl;
  const targetUserName = targetedUser?.firstName;

  const fetchChatMessages = async () => {
    try {
      if (!targetUserId) return;
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

  //TODO:for online status
  useEffect(() => {
    const isOnline = getOnlineStatus();
    setIsOnline(isOnline);
  }, [setIsOnline]);

  useEffect(() => {
    fetchChatMessages();
  }, []);

  useEffect(() => {
    const res = getJwt();
    setToken(res);
  }, [setToken]);

  useEffect(() => {
    if (!userId) {
      return;
    }
    //on page load,socket connection is made and join chat event is emitted
    const socket = createSocketConnection(token);

    socketRef.current = socket;
    socket.emit('joinChat', {
      firstName: user.firstName,
      userId,
      targetUserId,
      token,
    });

    //TODO:checks user is active or not
    socket.on('connect', () => {
      setIsActive(socket.connected);
    });

    socket.on('disconnect', () => {
      setIsActive(socket.connected);
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
    //const socket = createSocketConnection(token);
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

  return (
    <div className="w-1/2 m-auto mt-6 border border-cyan-500 rounded-xl h-[80vh] flex flex-col">
      <div className="flex w-full border-b border-cyan-600 justify-between">
        <h1 className="p-4 text-2xl">Chat</h1>
        <div className="chat-image avatar flex items-center">
          <p className="text-xl font-serif text-white flex flex-col">
            {targetUserName}
            <span className="text-sm px-2 font-sans">
              {isActive ? 'online' : 'offline'}
            </span>
          </p>

          <div className="w-20 rounded-full m-2">
            <Online status={isOnline} />
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
        <button onClick={sendMessages} className="btn btn-info btn-md w-20">
          <img src="../../public/svgs/send.svg" alt="send icon" />
        </button>
      </div>
    </div>
  );
};

export default Chat;
