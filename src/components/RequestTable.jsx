import axios from 'axios';
import { BASE_URL, DEFAULT_USER_URL } from '../constants/constants';
import { useDispatch } from 'react-redux';
import { removeRequest } from '../utils/slice/requestSlice';
import { RequestTablePropTypes } from '../proptypes/propTypes';
import ReviewButton from './buttons/ReviewButton';

const RequestTable = ({ requests, index }) => {
  const dispatch = useDispatch();
  const { firstName, lastName, photoUrl, age, gender, about } =
    requests[index].fromUserId;
  const { status, _id } = requests[index];

  const reviewRequest = async (status, _id) => {
    try {
      await axios.post(
        BASE_URL + '/request/review/' + status + '/' + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(_id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <tbody>
        <tr>
          <td>
            <div className="flex items-center gap-4">
              <div className="avatar">
                <div className="mask mask-squircle h-16 w-16">
                  <img
                    src={photoUrl ? photoUrl : DEFAULT_USER_URL}
                    alt="request photo"
                  />
                </div>
              </div>
              <div>
                <div className="font-bold">{firstName + ' ' + lastName}</div>
                <div className="text-sm opacity-50">{age + ',' + gender}</div>
              </div>
            </div>
          </td>
          <td>
            <span className="badge badge-ghost badge-sm">{about}</span>
          </td>
          <td>
            <div className="badge badge-primary">{status}</div>
          </td>
          <th>
            <ReviewButton
              label="Accept"
              reviewRequest={() => reviewRequest('accepted', _id)}
            />
            <ReviewButton
              label="Decline"
              reviewRequest={() => reviewRequest('rejected', _id)}
            />
          </th>
        </tr>
      </tbody>
    </>
  );
};

RequestTable.propTypes = RequestTablePropTypes;

export default RequestTable;
