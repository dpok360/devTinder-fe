const ChatBubble = ({ message, user, profilePhoto, targetUserPhoto }) => {
  const name = message.firstName + ' ' + message.lastName;

  //TODO:show green check when online
  //TODO: show time stamp for message->last seen 2 hours ago
  //TODO: limit messages when fetching messages for

  return (
    <>
      <div
        className={
          'chat ' +
          (user.firstName === message.firstName ? 'chat-start' : 'chat-end')
        }
      >
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img
              alt="Tailwind CSS chat bubble component"
              src={
                user.firstName === message.firstName
                  ? profilePhoto
                  : targetUserPhoto
              }
            />
          </div>
        </div>
        <div className="chat-header">
          {name}
          <time className="text-xs opacity-50"></time>
        </div>
        <div className="chat-bubble">{message.text}</div>
        {/* <div className="chat-footer opacity-50">Delivered</div> */}
      </div>
    </>
  );
};

export default ChatBubble;
