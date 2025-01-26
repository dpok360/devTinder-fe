import PropTypes from 'prop-types';

const Input = ({ type, value, setterFunc }) => {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => setterFunc(e.target.value)}
      className="input input-bordered w-full max-w-xs"
    />
  );
};

Input.propTypes = {
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  setterFunc: PropTypes.func.isRequired,
};

export default Input;
