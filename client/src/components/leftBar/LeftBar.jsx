import React from "react";
import "./leftBar.scss";

const LeftBar = () => {
  return (
    <div className="leftBar">
      <div className="container">
        <div className="menu">
          <div className="user">
            <span>John Doe</span>
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
