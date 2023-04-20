import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/authContext";
import { makeRequest } from "../../axios";
import { useQuery } from "react-query";
import "./FriendsList.scss";

const FriendsList = () => {
  const { currentUser } = useContext(AuthContext);

  const getFriendsName = async () => {
    try {
      const response = await makeRequest.get(`/getFriends?user_id=${currentUser.user_id}`);
      const friendsData = response.data;

      const friendsNameList = friendsData.map((friend) => {
        return {
          friend_id: friend.friend_id,
          friend_fname: friend.friend_fname,
          friend_lname: friend.friend_lname,
        };
      });

      // console.log(friendsNameList);
      return friendsNameList;
    } catch (error) {
      console.error("Error fetching friends:", error);
    }
  };

  const { data: friendsList, refetch } = useQuery("getFriendsName", getFriendsName, {
    enabled: false,
  });

  useEffect(() => {
    refetch();
  }, []);

  const removeFriend = async (friend_id) => {
    try {
      await makeRequest.delete(`/removeFriend?friend_id=${friend_id}`);
      refetch();
    } catch (error) {
      console.error("Error removing friend:", error);
    }
  };

  return (
    <div className="friends-list">
      <h1>Friends List</h1>
      <ul>
        {friendsList?.map((friend) => (
          <li key={friend.friend_id} className="friend-item">
            {friend.friend_fname} {friend.friend_lname}
            <button
              className="remove-button"
              style={{ backgroundColor: "red" }}
              onClick={() => removeFriend(friend.friend_id)}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FriendsList;
