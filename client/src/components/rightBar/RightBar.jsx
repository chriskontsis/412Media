import React, { useContext } from "react";
import "./rightBar.scss";
import { QueryClient, useQuery, useQueryClient } from "react-query";
import { makeRequest } from "../../axios";
import { AuthContext } from "../../context/authContext";

const RightBar = () => {
  const { currentUser } = useContext(AuthContext);
  const queryClient = useQueryClient();
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

  const handleClick = async (friend) => {
    await makeRequest.post(
      `/addFriendByUsername?userId=${currentUser.user_id}&friendUsername=${friend}`
    );
    queryClient.invalidateQueries(["/friendsOfFriends"]);
  };

  // console.log(friendsData);
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
                      <button onClick={() => handleClick(friend.username)}>
                        Follow
                      </button>
                    </div>
                  </div>
                ))}
          </div>
        </div>
        <div className="contibItem">
          <span>Highest Contributors</span>
          {error
            ? "An error occurred"
            : isLoading
            ? "loading..."
            : data.map((data) => (
                <div className="contrib" key={data.username}>
                  <div className="conrtibInfo">
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
