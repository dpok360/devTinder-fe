import { SendrequestButtonPropTypes } from '../../proptypes/propTypes';

const SendrequestButton = ({ label, handleSendRequest }) => {
  const isIgnoreLabel = label === 'Ignore' ? 'btn-error' : 'btn-success';

  return (
    <button
      className={`btn btn-outline ${isIgnoreLabel}`}
      onClick={handleSendRequest}
    >
      {label}
    </button>
  );
};
SendrequestButton.propTypes = SendrequestButtonPropTypes;
export default SendrequestButton;
