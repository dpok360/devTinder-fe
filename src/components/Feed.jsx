import axios from 'axios';
import { BASE_URL } from '../constants/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addFeed } from '../utils/slice/feedSlice';
import { useEffect } from 'react';
import UserCard from '../components/UserCard';

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);

  const getFeed = async () => {
    if (feed) return;
    try {
      const res = await axios.get(BASE_URL + '/feed', {
        withCredentials: true,
      });
      dispatch(addFeed(res?.data));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  return (
    feed && (
      <div className=" flex justify-center py-4">
        <UserCard user={feed} />
      </div>
    )
  );
};

export default Feed;
