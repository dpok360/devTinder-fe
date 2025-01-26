import PropTypes from 'prop-types';

const SuccessToast = ({ status }) => {
  return (
    <div className="toast toast-top toast-center">
      <div className="alert alert-success">
        <span>Request {status} successfully!</span>
      </div>
    </div>
  );
};

SuccessToast.propTypes = {
  status: PropTypes.string.isRequired,
};

export default SuccessToast;
