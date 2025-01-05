import axios from 'axios';
import { useState } from 'react';

const Login = () => {
  const [emailId, setEmailId] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const result = await axios.post(
        'http://localhost:3000/login',
        {
          emailId,
          password,
        },
        { withCredentials: true }
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-300 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title flex justify-center">Login</h2>
          <div className="py-2">
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Email</span>
              </div>
              <input
                type="text"
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
              />
            </label>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Password</span>
              </div>
              <input
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
              />
            </label>
          </div>
          <div className="card-actions justify-center">
            <button
              className="btn btn-outline btn-ghost px-6"
              onClick={handleLogin}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
