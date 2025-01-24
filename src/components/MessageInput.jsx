const MessageInput = ({ newMessages, handleKeyDown, setNewMessages }) => {
  return (
    <input
      value={newMessages}
      onKeyDown={handleKeyDown}
      onChange={(e) => {
        setNewMessages(e.target.value);
      }}
      type="text"
      placeholder="Type here"
      className="input input-bordered input-info w-full max-w-lg"
    />
  );
};

export default MessageInput;
