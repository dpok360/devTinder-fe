import { useParams } from 'react-router-dom';
import ChatBubble from './ChatBubble';
import { useEffect, useState } from 'react';
import { createSocketConnection } from '../utils/socket';
import { useSelector } from 'react-redux';

const Chat = () => {
  const { targetUserId } = useParams();
  const userId = useSelector((store) => store?.user?._id);
  const [messages, setMessages] = useState('');

  useEffect(() => {
    //on page load,socket connection is made and join chat event is emitted
    const socket = createSocketConnection();
    socket.emit('joinChat', { userId, targetUserId });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="w-1/2 m-auto mt-6 border border-cyan-500 rounded-xl h-[80vh] flex flex-col">
      <h1 className="p-5 border-b border-gray-500">Chat</h1>
      <div className="flex-1 overflow-scroll p-5">
        <ChatBubble />
      </div>
      <div className="flex items-center mx-28 p-2 gap-2 w-full ">
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered input-info w-full max-w-lg"
        />
        <button className="btn btn-info btn-md w-20">
          <img src="../../public/svgs/send.svg" alt="send icon" />
        </button>
      </div>
    </div>
  );
};

export default Chat;
