import PropTypes from 'prop-types';

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

MessageInput.propTypes = {
  newMessages: PropTypes.string,
  handleKeyDown: PropTypes.func,
  setNewMessages: PropTypes.func,
};

export default MessageInput;
