import { useState } from 'react';
import UserCard from './UserCard';
import axios from 'axios';
import { BASE_URL } from '../constants/constants';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/slice/userSlice';
import PropTypes from 'prop-types';
import Input from './Input';
import Label from './Label';

const Editprofile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age);
  const [gender, setGender] = useState(user.gender);
  const [skills, setSkills] = useState(user.skills);
  const [about, setAbout] = useState(user.about);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [showToast, setShowToast] = useState(false);
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  const saveProfile = async () => {
    setError('');
    try {
      const res = await axios.patch(
        BASE_URL + '/profile/edit',
        {
          firstName,
          lastName,
          age,
          gender,
          photoUrl,
          about,
          skills,
        },
        { withCredentials: true }
      );

      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 2000);
    } catch (error) {
      console.log(error);
      setError(error?.response?.data?.ERROR);
    }
  };

  return (
    <>
      <div className="flex justify-center my-14">
        <div className="flex justify-center mx-10">
          <div className="card bg-base-300 w-96 shadow-xl">
            <div className="card-body">
              <h2 className="card-title flex justify-center">Profile</h2>
              <div className="py-2">
                <Label label="First Name" />
                <Input
                  type="text"
                  value={firstName}
                  setterFunc={setFirstName}
                />
                <Label label="Last Name" />
                <Input type="text" value={lastName} setterFunc={setLastName} />

                <Label label="Age" />
                <Input type="text" value={age} setterFunc={setAge} />

                <Label label="Gender" />
                <select
                  className="select select-bordered w-full max-w-xs"
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option>male</option>
                  <option>female</option>
                  <option>others</option>
                </select>

                <Label label="Skills" />
                <Input type="text" value={skills} setterFunc={setSkills} />

                <Label label="Photo url" />
                <Input type="text" value={photoUrl} setterFunc={setPhotoUrl} />
                <Label label="About" />
                <textarea
                  className="textarea textarea-bordered"
                  placeholder="Bio"
                  onChange={(e) => setAbout(e.target.value)}
                ></textarea>
              </div>

              <div>
                <p className="font-serif text-red-500 flex justify-center p-2">
                  {error}
                </p>
              </div>
              <div className="card-actions justify-center">
                <button
                  className="btn btn-outline btn-ghost px-6"
                  onClick={saveProfile}
                >
                  Save Profile
                </button>
              </div>
            </div>
          </div>
        </div>
        <UserCard
          user={{ firstName, lastName, age, gender, photoUrl, skills, about }}
        />
      </div>
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>profile saved Successfully!</span>
          </div>
        </div>
      )}
    </>
  );
};

Editprofile.propTypes = {
  user: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    gender: PropTypes.string.isRequired,
    age: PropTypes.string.isRequired,
    skills: PropTypes.arrayOf(PropTypes.string).isRequired,
    about: PropTypes.string.isRequired,
    photoUrl: PropTypes.number.isRequired,
  }).isRequired,
};

export default Editprofile;
