import { Link } from "react-router-dom"
import logo from "../../assets/logo/logo.png"
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import "./navbar.css"
import { useContext, useState } from "react"
import { AuthContext } from "../../context/AuthContext"

const Navbar = () => {
  const { user } = useContext(AuthContext)
  console.log(user)
  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  }

  const [isOpen, setIsOpen] = useState(false);
  // const [hideBorder, setHideBorder] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    // setHideBorder(true);
  };

  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" className="navHome">
          <img className="logoNav" alt="logo" src={logo}></img>
        </Link>
        {user 
          ? (
          <div className="navItems">
            <div className="item">
              <img
                src={user.img}
                alt=""
                className="avatar"
              />
            </div>
            <span className="navSpan">{user.username}</span>
            {/* <button className="navButton" onClick={handleLogout}>
              Đăng xuất
            </button> */}
            <div className="button-dropdown">
              <button className={`dropdown-button ${isOpen ? 'hide-border' : ''}`} onClick={toggleDropdown}>
                <ArrowDropDownIcon />
              </button>
              {isOpen && (
                <div className="dropdown-content">
                  <Link className="dropdown-content-a" to="/">Thông tin cá nhân</Link>
                  <Link className="dropdown-content-a" to="/">Đổi mật khẩu</Link>
                  <div class="dropdown-divider"></div>
                  <Link className="dropdown-content-a" onClick={handleLogout}>Đăng xuất</Link>
                </div>
              )}
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