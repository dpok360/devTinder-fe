import { useSelector } from 'react-redux';
import Editprofile from './Editprofile';

const Profile = () => {
  const user = useSelector((store) => store.user);

  return (
    user && (
      <div>
        <Editprofile user={user} />
      </div>
    )
  );
};

export default Profile;
