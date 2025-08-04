import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify'
import { handleError, handleSuccess } from '../util';

function Login() {
    const [loginInfo, setLoginInfo] = useState({
        id: '',
        password: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        const copyLoginInfo = { ...loginInfo };
        copyLoginInfo[name] = value;
        setLoginInfo(copyLoginInfo);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        const { id, password } = loginInfo;
        if (!id || !password) {
            return handleError("ID and password is required!")
        }
        try {
            const url = "http://localhost:8080/auth/login";
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(loginInfo)
            })
            const result = await response.json();
            const { success, message, jwtToken, name, error, role, id } = result;
            if (success) {
                handleSuccess(message);
                localStorage.setItem('token', jwtToken);
                localStorage.setItem('loggedInUser', name);
                localStorage.setItem('role', role);
                localStorage.setItem('id', id);
                setTimeout(() => {
                    if(role === 'student'){
                        navigate("/Dashboard");
                    }
                    else{
                        navigate("/DashboardT");
                    }
                }, 1000);

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
        <div className="block">
            <h1>Welcome back to SAM!</h1>
            <form name="myform" id="form" method="post" onSubmit={handleLogin}>

                <ul className="list">
                    <li>
                        <label>Enter your ID: </label>
                        <div>
                            <input type="text" placeholder="Your ID" name="id" autoFocus onChange={handleChange} />
                        </div>
                    </li>

                    <li>
                        <label>Password: </label>
                        <div>
                            <input type="password" placeholder="Password" name="password" autoFocus onChange={handleChange} />
                        </div>
                    </li>
                </ul>

                <button className="login" type="submit">
                    Login
                </button>

                <p className="line">
                    Don't have an account?
                    <Link to="/signup"> Signup</Link>
                </p>
            </form>
            < ToastContainer />
        </div>
    );
}
export default Login