import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify'
import { handleError, handleSuccess } from '../util';

function Signup() {
  const [signupInfo, setSignupInfo] = useState({
    id: '',
    name: '',
    email: '',
    phoneno: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    const copySignupInfo = { ...signupInfo };
    copySignupInfo[name] = value;
    setSignupInfo(copySignupInfo);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const { id, name, email, phoneno, password } = signupInfo;
    if (!id || !name || !email || !phoneno || !password) {
      return handleError("Every field is required!")
    }
    try {
      const url = "http://localhost:8080/auth/signup";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(signupInfo)
      })
      const result = await response.json();
      const { success, message, error } = result;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate('/Login');
        }, 1000)
      } else if (error) {
        const details = error.details[0].message;
        handleError(details);
      } else if (!success) {
        handleError(message);
      }
      console.log(result);
    }
    catch (err) {
      handleError(err);
    }
  }

  return (
    <div className="container">
      <h1 className="h1">Welcome to SAM!</h1>

      <form name="myform" method="post" id="form" onSubmit={handleSignup}>
        <ul className="list">
          <li>
            <label>Enter your role: </label>
            <div>
              <input type="text" name="role" placeholder="role" autoFocus onChange={handleChange} />
            </div>
          </li>

          <li>
            <label>Enter your ID: </label>
            <div>
              <input type="text" name="id" placeholder="your ID" autoFocus onChange={handleChange} />
            </div>
          </li>

          <li>
            <label>Name: </label>
            <div>
              <input type="text" name="name" placeholder="Name" onChange={handleChange} />
            </div>
          </li>

          <li>
            <label>Email ID: </label>
            <div>
              <input type="email" name="email" placeholder="Email-ID" onChange={handleChange} />
            </div>
          </li>

          <li>
            <label>Phone no: </label>
            <div>
              <input type="tel" name="phoneno" placeholder="Phone" onChange={handleChange} />
            </div>
          </li>

          <li className="pass">
            <label>Set Password: </label>
            <div>
              <input type="password" name="password" placeholder="Password" onChange={handleChange} />
            </div>
          </li>
        </ul>

        <button className="signup" type="submit">
          Signup
        </button>
      </form>
      <span>Already have an account
        <Link to="/login"> Login</Link>
      </span>
      <ToastContainer />
    </div>
  )
}

export default Signup
