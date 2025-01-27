import { ErrorFallBackPropTypes } from '../proptypes/propTypes';

const ErrorFallback = ({ error }) => {
  return (
    <div className="flex justify-center items-center">
      <h1 className="text-2xl font-serif m-4">{error.message}</h1>
    </div>
  );
};

ErrorFallback.propTypes = ErrorFallBackPropTypes;

export default ErrorFallback;
