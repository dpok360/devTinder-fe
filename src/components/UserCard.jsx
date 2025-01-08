import axios from 'axios';
import { BASE_URL, DEFAULT_USER_URL } from '../constants/constants';
import { useDispatch } from 'react-redux';
import { removeUserFromFeed } from '../utils/slice/feedSlice';

const UserCard = ({ user }) => {
  const dispatch = useDispatch();
  //TODO:
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
        <div className="card-actions justify-center my-4">
          <button
            className="btn btn-outline btn-error"
            onClick={() => {
              handleSendRequest('ignored', _id);
            }}
          >
            Ignore
          </button>

          <button
            className="btn btn-outline btn-success"
            onClick={() => {
              handleSendRequest('interested', _id);
            }}
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
