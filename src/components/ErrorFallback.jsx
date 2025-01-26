import PropTypes from 'prop-types';

const ErrorFallback = ({ error }) => {
  return (
    <div className="flex justify-center items-center">
      <h1 className="text-2xl font-serif m-4">{error.message}</h1>
    </div>
  );
};

ErrorFallback.propTypes = {
  error: PropTypes.instanceOf(Error),
};

export default ErrorFallback;
