import { Link } from 'react-router-dom';
import { ConnectionTablePropTypes } from '../proptypes/propTypes';

const ConnectionTable = ({ user }) => {
  const { _id, firstName, lastName, gender, age, skills, about, photoUrl } =
    user;

  return (
    <>
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
                  <img src={photoUrl} alt="Avatar Tailwind CSS Component" />
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
          <td>{skills.length > 0 ? skills : '----'}</td>
          <th>
            <Link to={'/chat/' + _id}>
              <button className="btn btn-info btn-md">Chat</button>
            </Link>
          </th>
        </tr>
      </tbody>
    </>
  );
};

ConnectionTable.propTypes = ConnectionTablePropTypes;

export default ConnectionTable;
