import Cookies from 'js-cookie';

const getJwt = () => {
  const jwt = Cookies.get('token');
  if (!jwt) {
    console.error('No token found,Please log in');
    return;
  }
  return jwt;
};
export default getJwt;
