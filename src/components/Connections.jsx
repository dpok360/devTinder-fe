import axios from 'axios';
import { BASE_URL } from '../constants/constants';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addConnections } from '../utils/slice/connectionSlice';
import ConnectionTable from './ConnectionTable';

const Connections = () => {
  const connections = useSelector((store) => store.connection);
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + '/user/connections', {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return;

  return (
    <div className="my-10">
      <h1 className="text-2xl font-serif ml-6">Connections</h1>
      <div className="overflow-x-auto">
        <table className="table mx-16">
          {/* head */}
          <thead>
            <tr>
              <th>Name</th>
              <th>About</th>
              <th>Skills</th>
            </tr>
          </thead>

          {connections &&
            (connections.length === 0 ? (
              <tbody>
                <tr>
                  <td className="pl-24 py-12 m-10">
                    <p className="flex justify-center font-serif text-xl">
                      You have currently no connections!
                    </p>
                  </td>
                </tr>
              </tbody>
            ) : (
              connections.map((connection) => {
                return (
                  <ConnectionTable key={connection._id} user={connection} />
                );
              })
            ))}
        </table>
      </div>
    </div>
  );
};

export default Connections;
