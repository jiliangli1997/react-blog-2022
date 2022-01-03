import "./topbar.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../../context/Context";

export default function TopBar() {
  const { user, dispatch } = useContext(Context);
  const hangleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };
  return (
    <div className="top">
      <div className="topLeft">
        <i
          className="topIcon fab fa-linkedin"
          onClick={() => {
            window.open(
              "https://www.linkedin.com/in/jiliang-li-9328b2177/",
              "_blank"
            );
          }}
        ></i>

        <i
          className="topIcon fab fa-twitter-square"
          onClick={() => {
            window.open("https://twitter.com/Jeremy92378990", "_blank");
          }}
        ></i>

        <i
          className="topIcon fab fa-instagram-square"
          onClick={() => {
            window.open("https://www.instagram.com/jeremy052197/", "_blank");
          }}
        ></i>
      </div>
      <div className="topCenter">
        <ul className="topList">
          <li className="topListItem">
            <Link className="link" to="/">
              HOME
            </Link>
          </li>
          <li className="topListItem">
            <Link className="link" to="/write">
              WRITE
            </Link>
          </li>
          <li className="topListItem" onClick={hangleLogout}>
            {user && "LOGOUT"}
          </li>
        </ul>
      </div>
      <div className="topRight">
        {user ? (
          <Link to="/settings">
            <img src={user.profilePic} alt="" className="topImg" />
          </Link>
        ) : (
          <ul className="topList">
            <Link className="topListItem link" to="/login">
              LOGIN
            </Link>
            <Link className="topListItem link" to="/register">
              REGISTER
            </Link>
          </ul>
        )}
        <i className="topSearchIcon fas fa-search"></i>
      </div>
    </div>
  );
}
