import { BuyButtonPropTypes } from '../../proptypes/propTypes';

const BuyButton = ({ type, label, handleBuyClick }) => {
  const isGoldType = type === 'gold' ? 'btn-warning' : 'btn-ghost';

  return (
    <button
      onClick={handleBuyClick}
      className={`btn btn-outline ${isGoldType} p-2 m-2`}
    >
      {label}
    </button>
  );
};

BuyButton.propTypes = BuyButtonPropTypes;

export default BuyButton;
