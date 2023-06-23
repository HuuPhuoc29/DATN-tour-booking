import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate, Link} from "react-router-dom";
import logo from "../../assets/logo/logo.png"
import "./register.css";
import { AuthContext } from "../../context/AuthContext";

const Register = () => {
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
      if(res.data.isAdmin){
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
        navigate("/")
      } else {
        dispatch({ type: "LOGIN_FAILURE", payload: {message: "Tài khoản của bạn không được phép để truy cập trang web này"} });

      }
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
            <h1 className="span">ĐĂNG KÝ</h1>
            <div class="inputbox">
              <ion-icon name="mail-outline"></ion-icon>
              <input 
                type="text"
                placeholder=""
                id="email"
                onChange={handleChange}
                className="lInput"
                required
                />
              <label for="">Email </label>
            </div>
            <div class="inputbox">
              <ion-icon name="mail-outline"></ion-icon>
              <input 
                type="text"
                placeholder=""
                id="fullname"
                onChange={handleChange}
                className="lInput"
                required
                />
              <label for="">Họ và tên </label>
            </div>
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
              <label for="">Mật khẩu </label>
            </div>
            <button disabled={loading}  className="lButton">
              Đăng ký
            </button>
            <div class="register">
              <p>Đã có tài khoản? <Link to="/login" style={{ color: "blue" }}>Đăng nhập</Link></p>
            </div>
            {error && <span style={{ color: "red" }}>{error.message}</span>}                    
          </form>
        </div>
      </div>
    </section>
  );
};

export default Register;
