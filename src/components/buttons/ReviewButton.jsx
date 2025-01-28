import { ReviewRequestPropTypes } from '../../proptypes/propTypes';

const ReviewButton = ({ label, reviewRequest }) => {
  const isIgnoreLabel = label === 'Accept' ? 'btn-success' : 'btn-error';
  return (
    <button
      className={`btn btn-sm mx-1 ${isIgnoreLabel}`}
      onClick={reviewRequest}
    >
      {label}
    </button>
  );
};

ReviewButton.propTypes = ReviewRequestPropTypes;

export default ReviewButton;
