import axios from 'axios';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/slice/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../constants/constants';
import Label from './Label';
import Input from './Input';

const Login = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [emailId, setEmailId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoginForm, setIsLoginForm] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const result = await axios.post(
        BASE_URL + '/login',
        {
          emailId,
          password,
        },
        { withCredentials: true }
      );
      if (result) {
        dispatch(addUser(result.data));
        navigate('/');
      }
    } catch (error) {
      setError(error?.response?.data?.ERROR || 'somethong went wrong');
    }
  };

  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        BASE_URL + '/signup',
        { firstName, lastName, emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.data));
      navigate('/profile');
    } catch (error) {
      setError(error?.response?.data?.ERROR);
    }
  };

  return (
    <div className="flex justify-center my-32">
      <div className="card bg-base-300 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title flex justify-center">
            {isLoginForm ? 'Login' : 'SignUp'}
          </h2>
          <div className="py-2">
            {!isLoginForm && (
              <>
                <Label label="First Name" />
                <Input
                  type="text"
                  value={firstName}
                  setterFunc={setFirstName}
                />
                <Label label="Last Name" />
                <Input type="text" value={lastName} setterFunc={setLastName} />
              </>
            )}

            <Label label="Email" />
            <Input type="email" value={emailId} setterFunc={setEmailId} />

            <Label label="Password" />
            <Input type="password" value={password} setterFunc={setPassword} />
          </div>
          <div>
            <p className="font-serif text-red-500 flex justify-center p-2">
              {error}
            </p>
          </div>
          <div className="card-actions justify-center">
            <button
              className="btn btn-outline btn-ghost px-6"
              onClick={isLoginForm ? handleLogin : handleSignUp}
            >
              {isLoginForm ? 'Login' : 'SignUp'}
            </button>
          </div>
          <div className="m-auto cursor-pointer py-2">
            <p onClick={() => setIsLoginForm((value) => !value)}>
              {isLoginForm
                ? 'New User? Signup here'
                : 'Existing User? Login here'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
