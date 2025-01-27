import { SuccessToastPropTypes } from '../proptypes/propTypes';

const SuccessToast = ({ status }) => {
  return (
    <div className="toast toast-top toast-center">
      <div className="alert alert-success">
        <span>Request {status} successfully!</span>
      </div>
    </div>
  );
};

SuccessToast.propTypes = SuccessToastPropTypes;

export default SuccessToast;
