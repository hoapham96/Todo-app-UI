import React, { useState, useEffect } from 'react';
import Auth from '../utils/auth';
import axios from "axios";

const Login = (props) => {
  const [formState, setFormState] = useState({ username: '', password: '' });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    
    const res = await axios.post(`http://localhost:3001/api/v1/login/`,formState )
        console.log(res);
        console.log(res.data);
        console.log(res.data.token);
        Auth.login(res.data.token);

    // clear form values
    setFormState({
      username: '',
      password: '',
    });
  };

  

// submit form
  

  return (
    <main className="flex-row justify-center mb-4">
      <div className="col-12 col-md-6">
        <div className="card">
          <h4 className="card-header">Login</h4>
          <div className="card-body">
            <form onSubmit={handleFormSubmit}>
              <input
                className="form-input"
                placeholder="Your username"
                name="username"
                type="text"
                id="username"
                onChange={handleChange}
              />
              <input
                className="form-input"
                placeholder="******"
                name="password"
                type="password"
                id="password"
                onChange={handleChange}
              />
              <button className="btn d-block w-100" type="submit">
                Submit
              </button>
            </form>

            {/* {error && <div>Login failed</div>} */}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;