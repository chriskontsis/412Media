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

  const {
    isLoading: friendsLoading,
    error: friendsError,
    data: friendsData,
  } = useQuery("/friendsOfFriends", () =>
    makeRequest.get("/friendsOfFriends?userId").then((res) => {
      return res.data.rows;
    })
  );

  console.log(friendsData);
  // leaking passwords lmfao

  return (
    <div className="rightBar">
      <div className="container">
        <div className="item">
          <span>Friend Suggestions</span>
          <div className="user">
            {friendsData && friendsData.length === 0
              ? "No friends of friends"
              : friendsData &&
                friendsData.map((friend) => (
                  <div className="friendContainer" key={friend.id}>
                    <div className="userInfo">
                      <span>{friend.username}</span>
                    </div>
                    <div className="buttons">
                      <button>Follow</button>
                      <button>Dismiss</button>
                    </div>
                  </div>
                ))}
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
