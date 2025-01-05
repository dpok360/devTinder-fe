import { Outlet, useNavigate } from 'react-router-dom';
import NavBar from './NavBar';
import Footer from './Footer';
import axios from 'axios';
import { BASE_URL } from '../constants/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../utils/slice/userSlice';
import { useEffect } from 'react';

const Body = () => {
  const userData = useSelector((store) => store.user);
  const dispacth = useDispatch();
  const navigate = useNavigate();

  const fetchUser = async () => {
    if (userData) return;
    try {
      const res = await axios.get(BASE_URL + '/profile/view', {
        withCredentials: true,
      });
      dispacth(addUser(res.data));
    } catch (error) {
      if (error.status === 401) {
        navigate('/login');
      }
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div>
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Body;
