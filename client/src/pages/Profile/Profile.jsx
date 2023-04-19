import React, { useContext, useState } from "react";
import "./profile.scss";
import Albums from "../../components/albums/Albums";
import ProfileSearch from "../../components/profileSearch/ProfileSearch";
import Share from "../../components/share/Share";
import { useQuery } from "react-query";
import { makeRequest } from "../../axios";
import { AuthContext } from "../../context/authContext";
import { useLocation } from "react-router-dom";
import Post from "../../components/post/Post";
import profilePic from "../../assets/profilePic.png";
const Profile = () => {
  const { currentUser } = useContext(AuthContext);
  const userId = parseInt(useLocation().pathname.split("/")[2]);
  const [showPhotos, setShowPhotos] = useState(true);

  const { isLoading: albumsLoading, data: albumData } = useQuery(
    ["/findAlbums"],
    () =>
      makeRequest.get("/findAlbums?userId=" + userId).then((res) => {
        return res.data.rows;
      })
  );

  const { isLoading: userLoading, data: userData } = useQuery(
    ["/findUsername"],
    () =>
      makeRequest.get("/findUsername?userId=" + userId).then((res) => {
        return res.data.rows;
      })
  );

  const { isLoading, error, data } = useQuery(["/profilePosts"], () =>
    makeRequest.get("/profilePosts?userId=" + userId).then((res) => {
      return res.data.rows;
    })
  );

  return (
    <div className="profile">
      <div className="images">
        <img src={profilePic} alt="" className="profilePic" />
      </div>
      <div className="profileContainer">
        <div className="userInfo">
          <div className="left"></div>
          <div className="center">
            <span>{userLoading ? "loading..." : userData[0].username}</span>
            <button>Follow</button>
            <div className="display">
              <h3 style={{ textDecoration: "underline" }}>Photos</h3>
              <h3>Albums</h3>
            </div>
          </div>
          <div className="right"></div>
        </div>
      </div>
      {showPhotos ? (
        <>
          {userId === currentUser.user_id ? <Share /> : <></>}
          {error
            ? "An error occurred"
            : isLoading
            ? "loading..."
            : data.map((post) => <Post post={post} key={post.photo_id} />)}
        </>
      ) : (
        <Albums />
      )}
    </div>
  );
};

export default Profile;
