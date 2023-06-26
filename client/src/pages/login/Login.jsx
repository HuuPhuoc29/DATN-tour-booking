import axios from "axios";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import logo from "../../assets/logo/logo.png"
import "./login.css";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });

  const { user, loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate()

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/auth/login", credentials);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
      navigate("/")
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };
  
  console.log(user)

  return (
    <section>
      <div class="form-box">
        <div class="form-value">
          <form action="">
            <img className="logo" alt="logo" src={logo}></img>
            <h2 className="span">ĐĂNG NHẬP</h2>
            <div class="inputbox">
                <ion-icon name="mail-outline"></ion-icon>
                <input 
                  type="text"
                  placeholder=""
                  id="username"
                  onChange={handleChange}
                  className="lInput"
                  required
                  />
                <label for="">Tên tài khoản</label>
            </div>
            <div class="inputbox">
                <ion-icon name="lock-closed-outline"></ion-icon>
                <input 
                  type="password"
                  placeholder=""
                  id="password"
                  onChange={handleChange}
                  className="lInput"
                  required></input>
                <label for="">Mật khẩu</label>
            </div>
            <button disabled={loading} onClick={handleClick} className="lButton">
              Đăng nhập
            </button>
            <div class="register">
              <p>Chưa có tài khoản! <Link to="/register" style={{ color: "blue" }}>Đăng ký</Link></p>
            </div>
            {error && <span style={{ color: "red" }}>{error.message}</span>}
            <div class="forget">
              <Link to="/reset">Quên mật khẩu</Link>
            </div>
              
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
