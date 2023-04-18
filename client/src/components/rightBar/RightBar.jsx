import React from "react";
import "./rightBar.scss";
import { useQuery } from "react-query";
import { makeRequest } from "../../axios";

const RightBar = () => {
  const { isLoading, error, data } = useQuery("/contribution", () =>
    makeRequest.get("/contribution").then((res) => {
      return res.data;
    })
  );

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
          {error
            ? "An error occurred"
            : isLoading
            ? "loading..."
            : data.map((data) => (
                <div className="user" key={data.username}>
                  <div className="userInfo">
                    <span>{data.username}</span>
                  </div>
                  <span>{data.contribution + "pts"}</span>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default RightBar;
