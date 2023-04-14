import React, { useContext } from "react";
import "./leftBar.scss";
import { AuthContext } from "../../context/authContext";
import profilePic from "../../assets/profilePic.png";
const LeftBar = () => {
  const { currentUser } = useContext(AuthContext);
  return (
    <div className="leftBar">
      <div className="container">
        <div className="menu">
          <div className="user">
            <img src={profilePic} alt=""></img>
            <span>{currentUser.fname + " " + currentUser.lname}</span>
          </div>
          <div className="item">
            <img
              src="https://raw.githubusercontent.com/safak/youtube2022/react-social-ui/src/assets/1.png"
              alt=""
            />
            <span>Friends</span>
          </div>
          <div className="item">
            <img
              src="https://raw.githubusercontent.com/safak/youtube2022/react-social-ui/src/assets/8.png"
              alt=""
            />
            <span>Albums</span>
          </div>
        </div>
        <hr />
        <div className="menu">
          <span>Popular Tags</span>
          <span>Tag1</span>
          <span>Tag2</span>
          <span>Tag3</span>
          <span>Tag4</span>
        </div>
      </div>
    </div>
  );
};

export default LeftBar;
