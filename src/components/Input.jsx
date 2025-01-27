import { InputPorpTypes } from '../proptypes/propTypes';

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

Input.propTypes = InputPorpTypes;

export default Input;
