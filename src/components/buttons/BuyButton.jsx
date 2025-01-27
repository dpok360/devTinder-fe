const BuyButton = ({ label, handleBuyClick }) => {
  return (
    <button
      onClick={() => handleBuyClick('gold')}
      className="btn btn-outline btn-warning p-2 m-2"
    >
      {label}
    </button>
  );
};

export default BuyButton;
