const ChatBubble = ({ message, user }) => {
  const name = message.firstName + ' ' + message.lastName;

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
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
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
