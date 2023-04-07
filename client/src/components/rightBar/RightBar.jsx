import React from "react";
import "./rightBar.scss";

const RightBar = () => {
  return (
    <div className="rightBar">
      <div className="container">
        <div className="item">
          <span>Friend Suggestions</span>
          <div className="user">
            <div className="userInfo">
              <span>Jane Doe</span>
            </div>
            <div className="buttons">
              <button>Follow</button>
              <button>Dismiss</button>
            </div>
          </div>
          <div className="user">
            <div className="userInfo">
              <span>Jane Doe</span>
            </div>
            <div className="buttons">
              <button>Follow</button>
              <button>Dismiss</button>
            </div>
          </div>
        </div>
        <div className="item">
          <span>Highest Contributors</span>
          <div className="user">
            <div className="userInfo">
              <span>Jane Doe</span>
            </div>
            <span>10 pts</span>
          </div>
          <div className="user">
            <div className="userInfo">
              <span>Jane Doe</span>
            </div>
            <span>10 pts</span>
          </div>
          <div className="user">
            <div className="userInfo">
              <span>Jane Doe</span>
            </div>
            <span>10 pts</span>
          </div>
          <div className="user">
            <div className="userInfo">
              <span>Jane Doe</span>
            </div>
            <span>10 pts</span>
          </div>
          <div className="user">
            <div className="userInfo">
              <span>Jane Doe</span>
            </div>
            <span>10 pts</span>
          </div>
          <div className="user">
            <div className="userInfo">
              <span>Jane Doe</span>
            </div>
            <span>10 pts</span>
          </div>
          <div className="user">
            <div className="userInfo">
              <span>Jane Doe</span>
            </div>
            <span>10 pts</span>
          </div>
          <div className="user">
            <div className="userInfo">
              <span>Jane Doe</span>
            </div>
            <span>10 pts</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightBar;
