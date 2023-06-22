import "./navbar.scss";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import FullscreenExitOutlinedIcon from "@mui/icons-material/FullscreenExitOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import { AuthContext } from "../../context/AuthContext"

import avatar from "../../asset/images/avatar.jpg"

import { DarkModeContext } from "../../context/darkModeContext";
import { Link } from "react-router-dom";
import { useContext } from "react";

const Navbar = () => {
  const { dispatch } = useContext(DarkModeContext);

  const { user } = useContext(AuthContext)

  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="search">
          <Link to="/users" type="button" class="btn btn-link">Users</Link>
          <Link to="/tours" type="button" class="btn btn-link">Tours</Link>
          <Link to="/hotels" type="button" class="btn btn-link">Hotels</Link>
          <Link to="/rooms" type="button" class="btn btn-link">Rooms</Link>
        </div>
        <div className="items">
          {/* <div className="item">
            <LanguageOutlinedIcon className="icon" />
            English
          </div> */}
          <div className="item">
            <DarkModeOutlinedIcon
              className="icon"
              onClick={() => dispatch({ type: "TOGGLE" })}
            />
          </div>
          {/* <div className="item">
            <FullscreenExitOutlinedIcon className="icon" />
          </div>
          <div className="item">
            <NotificationsNoneOutlinedIcon className="icon" />
            <div className="counter">1</div>
          </div>
          <div className="item">
            <ChatBubbleOutlineOutlinedIcon className="icon" />
            <div className="counter">2</div>
          </div> */}
          <div className="item">
            <ListOutlinedIcon className="icon" />
          </div>
          <div className="item">
            <img
              src={avatar}
              alt=""
              className="avatar"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
