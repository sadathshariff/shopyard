import "./auth.css";
import { Link, useNavigate } from "react-router-dom";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { useState } from "react";
import { Button, ShowToast } from "../../components";
import axios from "axios";
import { useAuth } from "../../contexts";
export const Login = () => {
  const initialData = {
    email: "",
    password: "",
  };
  const guestCredential = {
    email: "john@gmail.com",
    password: "johndee",
  };
  const navigate = useNavigate();
  const { setResponse } = useAuth();
  const [loginDetails, setLoginDetails] = useState(initialData);
  const [showPassword, setShowPassoword] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setLoginDetails({ ...loginDetails, [name]: value });
  };
  const handleLogin = async (loginDetails) => {
    try {
      const res = await axios.post("/api/auth/login", loginDetails);
      if (res.status === 200) {
        setResponse(res);
        localStorage.setItem("UserToken", res.data.encodedToken);
        ShowToast("Successfully Logged In", "success");
        setLoginDetails(initialData);
        navigate("/", { replace: true });
      }
    } catch (error) {
      setError("Email Entered is Not Registered");
      ShowToast("Email Entered is Not Registered", "error");
    }
  };
  const submitLoginHandler = (e) => {
    e.preventDefault();
    handleLogin(loginDetails);
  };
  return (
    <>
      <main className="login-card">
        <div className="login">
          <h2 className="headline-2 text-center">Login</h2>
          <form onSubmit={submitLoginHandler}>
            <div className="input">
              <label htmlFor="email">Email*</label>
              <input
                type="email"
                name="email"
                id="email"
                className="input-text"
                required
                value={loginDetails.email}
                onChange={(e) => handleChange(e)}
                placeholder="test@gmail.com"
              />
            </div>
            <div className="input">
              <label htmlFor="password">Password*</label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                className="input-text"
                required
                value={loginDetails.password}
                onChange={(e) => handleChange(e)}
                placeholder="Enter your Password"
              />
              <span
                onClick={() => {
                  setShowPassoword((prev) => !prev);
                }}
              >
                {showPassword ? (
                  <FaEye className="eye-icon" />
                ) : (
                  <FaEyeSlash className="eye-icon" />
                )}
              </span>
            </div>
            <div className="input">
              <p className="small-text-2 error">{error}</p>
              <Button btnclass={"btn-primary"} name={"LOGIN"} />
            </div>
            <div className="input text-center">
              <p className="small-text-3">OR</p>
              <Button
                btnclass={"btn-outline-secondary"}
                name={"Login With Test Credential "}
                onClick={() => setLoginDetails(guestCredential)}
              />
            </div>

            <div className="input text-center">
              <Link to="/signup">
                <p className="small-text-3">Don't have an account | Signup </p>
              </Link>
            </div>
          </form>
        </div>
      </main>
    </>
  );
};
