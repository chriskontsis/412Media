import React, { useContext, useState } from "react";
import "./profile.scss";
import Albums from "../../components/albums/Albums";
import Share from "../../components/share/Share";
import { useQuery, useQueryClient } from "react-query";
import { makeRequest } from "../../axios";
import { AuthContext } from "../../context/authContext";
import { Link, useLocation } from "react-router-dom";
import Post from "../../components/post/Post";
import profilePic from "../../assets/profilePic.png";
const Profile = () => {
  const { currentUser } = useContext(AuthContext);
  const userId = parseInt(useLocation().pathname.split("/")[2]);
  const [showPhotos, setShowPhotos] = useState(true);
  const [showTagged, showTaggedPosts] = useState(false);
  const [taggedPosts, setTaggedPosts] = useState([]);
  const [tags, setTags] = useState("");
  const queryClient = useQueryClient();

  const handleTagChange = (event) => {
    setTags(event.target.value);
  };

  const getTaggedPosts = async () => {
    const result = await makeRequest.get(
      `/getTaggedPosts?userId=${userId}&tags=${tags}`
    );
    showTaggedPosts(true);
    setShowPhotos(false);
    setTags("");
    setTaggedPosts(result.data.rows);
  };

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

  const handleH3Click = () => {
    setShowPhotos((prevShowPhotos) => !prevShowPhotos);
  };

  const { data: friendshipData, refetch: refetchFriendship } = useQuery(
    ["/checkFriendship"],
    () =>
      makeRequest
        .get(
          `/checkFriendship?user_id=${currentUser.user_id}&friend_id=${userId}`
        )
        .then((res) => {
          return res.data;
        })
  );

  const addFriend = async () => {
    try {
      await makeRequest.post(
        `/addFriend?user_id=${currentUser.user_id}&friend_id=${userId}`
      );
      // You can add additional actions here, e.g., show a success message or update the UI
      await refetchFriendship();
      queryClient.invalidateQueries(["/friendsOfFriends"]);
    } catch (error) {
      console.error("Error adding friend:", error);
    }
  };

  const handleAlbumClick = () => {
    showTaggedPosts(false);
    setShowPhotos(false);
    console.log(showTaggedPosts);
  };

  const removeFriend = async () => {
    try {
      await makeRequest.delete(
        `/removeFriend?user_id=${currentUser.user_id}&friend_id=${userId}`
      );
      await refetchFriendship();
      queryClient.invalidateQueries(["/friendsOfFriends"]);
    } catch (error) {
      console.error("Error removing friend:", error);
    }
  };

  const isFriend = friendshipData && friendshipData.status === "friends";
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
            <div
              className="buttonContainer"
              style={{ display: "flex", justifyContent: "center" }}
            >
              {currentUser.user_id === userId ? (
                <Link to={"/updateProfile"}>
                  <button style={{ backgroundColor: "blue" }}>
                    Edit Profile
                  </button>
                </Link>
              ) : isFriend ? (
                <button
                  onClick={removeFriend}
                  style={{ backgroundColor: "red" }}
                >
                  Remove Friend
                </button>
              ) : (
                <button
                  onClick={addFriend}
                  style={{ backgroundColor: "green" }}
                >
                  Add Friend
                </button>
              )}
            </div>
            <div className="display">
              <h3
                onClick={handleH3Click}
                style={{
                  textDecoration:
                    showPhotos || showTagged ? "underline" : "none",
                  cursor: "pointer",
                }}
              >
                Photos
              </h3>
              <h3
                onClick={handleAlbumClick}
                style={{
                  textDecoration:
                    showPhotos || showTagged ? "none" : "underline",
                  cursor: "pointer",
                }}
              >
                Albums
              </h3>
            </div>
          </div>
          <div className="right"></div>
        </div>
      </div>
      {showPhotos || showTagged ? (
        <div className="tagSearch">
          View Your Photos By tags
          <div className="container">
            <div className="inputInfo">
              <input type="text" value={tags} onChange={handleTagChange} />
              <button onClick={getTaggedPosts}>Search</button>
            </div>
          </div>
        </div>
      ) : null}
      {showPhotos ? (
        <>
          {userId === currentUser.user_id ? <Share /> : <></>}
          {error
            ? "An error occurred"
            : isLoading
            ? "loading..."
            : data.map((post) => <Post post={post} key={post.photo_id} />)}
        </>
      ) : showTagged ? (
        <>
          {userId === currentUser.user_id ? <Share /> : <></>}
          {taggedPosts.map((post) => (
            <Post post={post} key={post.photo_id} />
          ))}
        </>
      ) : (
        <Albums />
      )}
    </div>
  );
};

export default Profile;
