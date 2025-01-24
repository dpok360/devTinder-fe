import Online from './Online';

const ChatHeader = ({ targetUserDetails, isUserActive }) => {
  return (
    <div className="flex w-full border-b border-cyan-600 justify-between">
      <h1 className="p-4 text-md sm:text-2xl">Chat</h1>
      <div className="chat-image avatar flex items-center">
        <p className="text-md sm:text-xl font-serif text-white flex flex-col items-center">
          {targetUserDetails.userFirstName}
          <span className="text-xs sm:text-sm px-2 font-sans">
            {isUserActive ? 'online' : 'offline'}
          </span>
        </p>
        <div className="w-10 sm:w-20 rounded-full m-2">
          <Online status={isUserActive ? 'online' : 'offline'} />
          <img
            alt="Tailwind CSS chat bubble component"
            src={targetUserDetails.photoUrl}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
