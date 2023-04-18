import React, { useContext } from "react";
import "./profile.scss";
import Albums from "../../components/albums/Albums";
import ProfileSearch from "../../components/profileSearch/ProfileSearch";
import Share from "../../components/share/Share";
import { useQuery } from "react-query";
import { makeRequest } from "../../axios";
import { AuthContext } from "../../context/authContext";
import { useLocation } from "react-router-dom";
import Post from "../../components/post/Post";
const Profile = () => {
  const { currentUser } = useContext(AuthContext);
  const userId = parseInt(useLocation().pathname.split("/")[2]);

  const { isLoading, error, data } = useQuery(["/profilePosts"], () =>
    makeRequest.get("/profilePosts?userId=" + userId).then((res) => {
      return res.data.rows;
    })
  );

  return (
    <div className="profile">
      <ProfileSearch />
      {userId === currentUser.user_id ? <Share /> : <></>}
      {error
        ? "An error occurred"
        : isLoading
        ? "loading..."
        : data.map((post) => <Post post={post} key={post.photo_id} />)}
    </div>
  );
};

export default Profile;
