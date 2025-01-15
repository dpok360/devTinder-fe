import axios from 'axios';
import { BASE_URL } from '../constants/constants';

const Premium = () => {
  const handleBuyClick = async (type) => {
    const order = await axios.post(
      BASE_URL + '/payment/create',
      { membershipType: type },
      { withCredentials: true }
    );

    const { amount, keyId, notes, currency, orderId } = order.data;

    var options = {
      key: keyId,
      amount,
      currency,
      name: 'Dev Tinder',
      description: 'Connect to other developers',
      order_id: orderId,
      image: 'https://example.com/your_logo',
      prefill: {
        name: notes.firstName + ' ' + notes.lastName,
        email: notes.emailId,
      },
      notes,
      theme: {
        color: '#3399cc',
      },
    };

    //should open razorpay dialog box

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="m-10">
      <div className="flex w-2/3 m-auto">
        <div className="card bg-base-300 rounded-box grid h-96 flex-grow place-items-center">
          <h1 className="font-serif text-2xl p-2 text-white">
            Silver Membership
          </h1>
          <ul className="font-extralight p-2 m-2 ">
            <li className="flex gap-1">
              <span>
                <img src="../../public/svgs/tick.svg" alt="tick" />
              </span>
              Chat with other people
            </li>
            <li className="flex gap-1">
              <span>
                <img src="../../public/svgs/tick.svg" alt="tick" />
              </span>
              100 connection per days
            </li>
            <li className="flex gap-1">
              <span>
                <img src="../../public/svgs/tick.svg" alt="tick" />
              </span>
              Blue tick for 3 months
            </li>
          </ul>
          <button
            onClick={() => handleBuyClick('silver')}
            className="btn btn-outline p-2 m-2"
          >
            By Silver
          </button>
        </div>
        <div className="divider divider-horizontal">OR</div>

        <div className="card bg-base-300 rounded-box grid h-96 flex-grow place-items-center">
          <h1 className="font-serif text-2xl p-2 text-warning">
            Gold Membership
          </h1>
          <ul className="font-extralight p-2 m-2 ">
            <li className="flex gap-1">
              <span>
                <img src="../../public/svgs/tick.svg" alt="tick" />
              </span>
              Chat with other people
            </li>
            <li className="flex gap-1">
              <span>
                <img src="../../public/svgs/tick.svg" alt="tick" />
              </span>
              Infinite connection per days
            </li>
            <li className="flex gap-1">
              <span>
                <img src="../../public/svgs/tick.svg" alt="tick" />
              </span>
              Blue tick
            </li>
          </ul>
          <button
            onClick={() => handleBuyClick('gold')}
            className="btn btn-outline btn-warning p-2 m-2"
          >
            By Gold
          </button>
        </div>
      </div>
    </div>
  );
};

export default Premium;
