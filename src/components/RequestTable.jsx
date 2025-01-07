import { DEFAULT_USER_URL } from '../constants/constants';

const RequestTable = ({ requests, index }) => {
  const { firstName, lastName, photoUrl, age, gender, about } =
    requests[index].fromUserId;
  const { status } = requests[index];

  return (
    <tbody>
      <tr>
        {/* <th>
      <label>
        <input type="checkbox" className="checkbox" />
      </label>
    </th> */}
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
          <button className="btn btn-success btn-sm mx-1">Accept</button>
          <button className="btn btn-error btn-sm mx-1">Decline</button>
        </th>
      </tr>
    </tbody>
  );
};

export default RequestTable;
