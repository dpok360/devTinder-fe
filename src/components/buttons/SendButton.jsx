const SendButton = ({ sendMessages }) => {
  return (
    <button
      onClick={sendMessages}
      className="btn btn-info btn-md  w-16 sm:w-20"
      aria-label="Send message"
    >
      <img src="../../send.svg" alt="send icon" />
    </button>
  );
};

export default SendButton;
