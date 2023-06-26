import { Link } from "react-router-dom"
import logo from "../../assets/logo/logo.png"

import "./navbar.css"
import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"

import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user } = useContext(AuthContext)
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
    navigate("/login")
  }

  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" className="navHome">
          <img className="logoNav" alt="logo" src={logo}></img>
        </Link>
        {user 
          ? (
          <div className="navItems">
            <span className="navSpan">{user.username}</span>
            <button className="navButton" onClick={handleLogout}>
              Đăng xuất
            </button>
            <div class="btn-group">
              <button id="drop" type="button" class="btn btn-link dropdown-toggle" data-bs-toggle="dropdown-menu" data-toggle="dropdown" aria-expanded="false" style={{position: "relative"}}>
              </button>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="#">Action</a></li>
                <li><a class="dropdown-item" href="#">Another action</a></li>
                <li><a class="dropdown-item" href="#">Something else here</a></li>
                <li><a class="dropdown-item" href="#">Separated link</a></li>
              </ul>
            </div>
          </div>) 
          : 
          (<div className="navItems">
          <button className="navButton">
            <Link to="/register" className="navButtonLink">Đăng ký</Link>
          </button>
          <button className="navButton">
            <Link to="/login" className="navButtonLink">Đăng nhập</Link>
          </button>
        </div>)}
      </div>
    </div>
  )
}

export default Navbar