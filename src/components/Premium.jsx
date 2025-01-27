import axios from 'axios';
import { BASE_URL } from '../constants/constants';
import { useEffect, useState } from 'react';
import List from './List';
import BuyButton from './buttons/BuyButton';

const Premium = () => {
  const [isUserPremium, setIsUserPremium] = useState(false);
  useEffect(() => {
    verifyPremiumUser();
  }, []);

  const verifyPremiumUser = async () => {
    const res = await axios.get(BASE_URL + '/premium/verify', {
      withCredentials: true,
    });

    if (res.isPremium) {
      setIsUserPremium(true);
    }
  };

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

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return isUserPremium ? (
    <p>You are already a premium user</p>
  ) : (
    <div className="m-10">
      <div className="flex w-2/3 m-auto">
        <div className="card bg-base-300 rounded-box grid h-96 flex-grow place-items-center">
          <h1 className="font-serif text-2xl p-2 text-white">
            Silver Membership
          </h1>
          <ul className="font-extralight p-2 m-2 ">
            <List label="Chat with other people" />
            <List label="100 connection per days" />
            <List label=" Blue tick for 3 months" />
          </ul>
          <BuyButton
            label="Buy Silver"
            handleBuyClick={() => handleBuyClick('silver')}
          />
        </div>
        <div className="divider divider-horizontal">OR</div>

        <div className="card bg-base-300 rounded-box grid h-96 flex-grow place-items-center">
          <h1 className="font-serif text-2xl p-2 text-warning">
            Gold Membership
          </h1>
          <ul className="font-extralight p-2 m-2 ">
            <List label="Chat with other people" />
            <List label="Infinite connection per days" />
            <List label="Blue tick" />
          </ul>
          <BuyButton
            label="Buy Gold"
            handleBuyClick={() => handleBuyClick('gold')}
          />
        </div>
      </div>
    </div>
  );
};

export default Premium;
