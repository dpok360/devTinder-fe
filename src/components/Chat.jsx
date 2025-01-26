import { useParams } from 'react-router-dom';
import ChatBubble from './ChatBubble';
import { useEffect, useRef, useState } from 'react';
import { createSocketConnection } from '../utils/socket';
import { useSelector } from 'react-redux';
import getJwt from '../utils/getjwt';
import SendButton from './buttons/SendButton';
import fetchChatMessages from '../utils/fetchChatMessages';
import savePhotoUrlToStorage from '../utils/savePhotoUrlToStorage';
import readPhotoUrlFromStorage from '../utils/readPhotoUrlFromStorage';
import ChatHeader from './ChatHeader';
import MessageInput from './MessageInput';
import checkMessageSeen from '../utils/checkMessagSeen';

const Chat = () => {
  const { targetUserId } = useParams();
  const user = useSelector((store) => store?.user);
  const connectedUsers = useSelector((store) => store?.connection) || [];
  const userId = user?._id;
  const profilePhoto = user?.photoUrl;

  const [messages, setMessages] = useState([]);
  const [newMessages, setNewMessages] = useState('');
  const [isActive, setIsActive] = useState([]);

  const socketRef = useRef(null);
  const messagesEndRef = useRef(null);

  const scrollMessageView = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const targetedUser = connectedUsers.filter(
    (target) => target._id === targetUserId
  )[0];
  const targetedUserphotoUrl = targetedUser?.photoUrl;
  const targetUserName = targetedUser?.firstName;

  savePhotoUrlToStorage(targetedUserphotoUrl, targetUserName);
  const targetUserFromLoaclStorage =
    readPhotoUrlFromStorage('targetUserDetails');
  const targetUserDetails = JSON.parse(targetUserFromLoaclStorage);

  //fetch msg from db
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
    fetchChatMessages();
  }, []);

  useEffect(() => {
    const token = getJwt();
    if (!userId) {
      return;
    }

    const socket = createSocketConnection();
    socketRef.current = socket;
    socket.emit('joinChat', {
      firstName: user.firstName,
      userId,
      targetUserId,
      token,
    });

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

  useEffect(() => {
    scrollMessageView();
  }, [messages]);

  useEffect(() => {
    checkMessageSeen(
      messagesEndRef,
      socketRef,
      messages,
      targetUserId,
      targetUserName
    );
  }, [messages, targetUserId, targetUserName]);

  const sendMessages = () => {
    if (!socketRef.current) return;
    socketRef.current.emit('sendMessage', {
      firstName: user.firstName,
      lastName: user.lastName,
      userId,
      targetUserId,
      newMessages,
    });
    setNewMessages('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && newMessages.trim()) {
      sendMessages();
    }
  };
  const isUserActive = !!isActive.find((id) => id === targetUserId);

  return (
    <div className="w-screen sm:w-1/2 sm:m-auto sm:mt-6 border border-cyan-500  sm:rounded-xl h-[80vh] flex flex-col bg-gray-800">
      <ChatHeader
        targetUserDetails={targetUserDetails}
        isUserActive={isUserActive}
      />
      <div className="flex-1 overflow-scroll p-5">
        {messages.map((msg, index) => (
          <ChatBubble
            key={index}
            message={msg}
            user={user}
            profilePhoto={profilePhoto}
            targetUserPhoto={targetUserDetails.photoUrl}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="flex justify-center items-center mx-auto  p-2 gap-2 w-full ">
        <MessageInput
          newMessages={newMessages}
          handleKeyDown={handleKeyDown}
          setNewMessages={setNewMessages}
        />
        <SendButton sendMessages={sendMessages} />
      </div>
    </div>
  );
};

export default Chat;
