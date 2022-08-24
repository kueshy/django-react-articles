import React, { useEffect, useState } from "react";
import APIService from "../APIService";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [token, setToken] = useCookies(["mytoken"]);

  const [isRegister, setIsRegister] = useState(false);

  const navigate = useNavigate();

  const loginBtn = () => {
    APIService.LoginUser({ username, password })
      .then((resp) => setToken("mytoken", resp.token))
      .catch((error) => console.log(error));
  };

  const registerBtn = () => {
    {
      password === confirmPassword
        ? APIService.RegisterUser({ email, username, password })
            .then(() => loginBtn())
            .catch((error) => console.log(error))
        : alert("Password do not match");
      clearForm();
    }
  };

  const clearForm = () => {
    setEmail("");
    setUsername("");
    setPassword("");
    setConfirmPassword("");
  };

  useEffect(() => {
    if (token["mytoken"]) {
      navigate("/");
    }
  }, [token]);

  return (
    <div className="App">
      <div className="container col-md-4">
        <h1>{isRegister ? "Register User" : "Login"}</h1>
        <div className="mb-3 mt-3 card p-4">
          <label className="form-label text-black" htmlFor="username">
            Username
          </label>
          <input
            type="text"
            id="username"
            className="form-control"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <br />

          {isRegister && (
            <>
              <label className="form-label text-black" htmlFor="name">
                Email address
              </label>
              <input
                type="email"
                id="email"
                className="form-control"
                placeholder="Enter email address "
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <br />
            </>
          )}

          <label className="form-label text-black" htmlFor="username">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="form-control"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {isRegister && (
            <>
              <br />
              <label
                className="form-label text-black"
                htmlFor="confirmPassword"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                className="form-control"
                placeholder="Enter confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </>
          )}

          {isRegister ? (
            <button
              onClick={registerBtn}
              className="btn btn-primary btn-block text-white mt-4"
            >
              Register
            </button>
          ) : (
            <button
              onClick={loginBtn}
              className="btn btn-primary btn-block text-white mt-4"
            >
              Login
            </button>
          )}

          <div className="text-black mt-3">
            {isRegister ? (
              <h6>
                Already have an account?{" "}
                <a href="#" onClick={() => setIsRegister((prev) => !prev)}>
                  login here
                </a>
              </h6>
            ) : (
              <h6>
                Don't have an account?{" "}
                <a
                  className="cursor-pointer"
                  onClick={() => setIsRegister((prev) => !prev)}
                >
                  register here
                </a>
              </h6>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
