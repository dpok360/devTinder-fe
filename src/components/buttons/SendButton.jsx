const SendButton = ({ sendMessages }) => {
  return (
    <button onClick={sendMessages} className="btn btn-info btn-md w-20">
      <img src="../../send.svg" alt="send icon" />
    </button>
  );
};

export default SendButton;
