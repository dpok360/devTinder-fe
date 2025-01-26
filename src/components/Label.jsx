import PropTypes from 'prop-types';

const Label = ({ label }) => {
  return (
    <label className="form-control w-full max-w-xs">
      <div className="label">
        <span className="label-text">{label}</span>
      </div>
    </label>
  );
};

Label.propTypes = {
  label: PropTypes.string.isRequired,
};

export default Label;
