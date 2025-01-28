import axios from 'axios';
import { BASE_URL, DEFAULT_USER_URL } from '../constants/constants';
import { useDispatch } from 'react-redux';
import { removeUserFromFeed } from '../utils/slice/feedSlice';
import { UserCardPropTypes } from '../proptypes/propTypes';
import { useLocation } from 'react-router-dom';
import SendrequestButton from './buttons/SendrequestButton';

const UserCard = ({ user }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const isProfilePage = location.pathname === '/profile';
  const { firstName, lastName, age, photoUrl, about, gender, skills, _id } =
    user;

  const handleSendRequest = async (status, toUserId) => {
    try {
      const res = await axios.post(
        BASE_URL + '/request/send/' + status + '/' + toUserId,
        {},
        { withCredentials: true }
      );
      if (res.status === 200 && res.statusText == 'OK') {
        dispatch(removeUserFromFeed(toUserId));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="card bg-base-300 w-96 shadow-xl">
      <figure>
        <img src={photoUrl || DEFAULT_USER_URL} alt="user phot" />
      </figure>
      <div className="card-body">
        <h2 className="card-title font-serif">{firstName + ' ' + lastName}</h2>
        {age && gender && <p>{age + ',' + gender}</p>}
        <p className="font-sans">{about}</p>
        <p className="font-sans">{skills}</p>
        {!isProfilePage && (
          <div className="card-actions justify-center my-4">
            <SendrequestButton
              label="Ignore"
              handleSendRequest={() => handleSendRequest('ignored', _id)}
            />
            <SendrequestButton
              label="Accept"
              handleSendRequest={() => handleSendRequest('interested', _id)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

UserCard.propTypes = UserCardPropTypes;

export default UserCard;
