import axios from 'axios';
import { BASE_URL } from '../constants/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addRequest } from '../utils/slice/requestSlice';
import { useEffect } from 'react';
import RequestTable from './RequestTable';

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + '/user/requests/received', {
        withCredentials: true,
      });
      dispatch(addRequest(res.data.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <>
      <div className="my-10">
        <h1 className="text-2xl font-serif ml-6">Requests</h1>
        <div className="overflow-x-auto">
          <table className="table mx-20">
            {/* head */}
            <thead>
              <tr>
                <th>Name</th>
                <th>About</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>

            {requests &&
              (requests.length === 0 ? (
                <tbody>
                  <tr>
                    <td className="pl-24 py-12 m-10">
                      <p className="flex justify-center font-serif text-xl">
                        You have currently no request!
                      </p>
                    </td>
                  </tr>
                </tbody>
              ) : (
                requests.map((request, index) => {
                  return (
                    <RequestTable
                      index={index}
                      key={request._id}
                      requests={requests}
                    />
                  );
                })
              ))}
          </table>
        </div>
      </div>
    </>
  );
};

export default Requests;
