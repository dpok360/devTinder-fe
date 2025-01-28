import axios from 'axios';
import { BASE_URL } from '../constants/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addFeed } from '../utils/slice/feedSlice';
import { useEffect } from 'react';
import UserCard from '../components/UserCard';

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
    if (feed) return;
    try {
      const res = await axios.get(BASE_URL + '/feed', {
        withCredentials: true,
      });
      dispatch(addFeed(res.data.users));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);
  if (!feed) return;
  if (feed.length <= 0)
    return (
      <h1 className="font-serif text-xl flex justify-center m-12">
        No new users found
      </h1>
    );

  return (
    feed &&
    feed.length > 0 && (
      <div className="flex justify-center py-4">
        <UserCard user={feed[0]} />
      </div>
    )
  );
};

export default Feed;
