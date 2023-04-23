import React, { useContext, useState } from "react";
import "./rightBar.scss";
import { useQuery, useQueryClient } from "react-query";
import { makeRequest } from "../../axios";
import { AuthContext } from "../../context/authContext";

const RightBar = () => {
  const { currentUser } = useContext(AuthContext);
  const queryClient = useQueryClient();
  const [searchFriend, setSearchFriend] = useState("");
  const [searchFriendData, setSearchFriendData] = useState([]);
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

  const handleFriendChange = (e) => {
    console.log(searchFriend);
    setSearchFriend(e.target.value);
  };

  const handleSearchAdd = async (friend) => {
    await makeRequest.post(
      `/addFriendByUsername?userId=${currentUser.user_id}&friendUsername=${friend}`
    );
    queryClient.invalidateQueries(["/friendsOfFriends"]);
    setSearchFriendData([]);
  };
  const findUser = async (e) => {
    if (e.key === "Enter") {
      const result = await makeRequest.get(
        `/getUsernameInfo?username=${searchFriend}`
      );
      setSearchFriendData(result.data);
      setSearchFriend("");
    }
  };

  const handleClick = async (friend) => {
    await makeRequest.post(
      `/addFriendByUsername?userId=${currentUser.user_id}&friendUsername=${friend}`
    );
    queryClient.invalidateQueries(["/friendsOfFriends"]);
  };

  return (
    <div className="rightBar">
      <div className="container">
        <div className="item">
          <div className="searchUsers">
            <span>Search Users</span>
            <div className="user">
              <input
                type="text"
                placeholder="Enter Username..."
                onKeyDown={findUser}
                value={searchFriend}
                onChange={handleFriendChange}
              />
              {searchFriendData.length > 0 ? (
                <div className="friendContainer">
                  <div className="userInfo">
                    <span>{searchFriendData[0].username}</span>
                  </div>
                  <div className="buttons">
                    <button
                      onClick={() =>
                        handleSearchAdd(searchFriendData[0].username)
                      }
                    >
                      Follow
                    </button>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>

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
