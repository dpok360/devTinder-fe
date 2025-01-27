import PropTypes from 'prop-types';
import Tick from './Tick';

const List = ({ label }) => {
  return (
    <li className="flex gap-1">
      <span>
        <Tick />
      </span>
      {label}
    </li>
  );
};

List.propTypes = {
  label: PropTypes.string.isRequired,
};

export default List;
