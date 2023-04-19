import React, { useState, useContext } from "react";
import "./albums.scss";
import { useQuery } from "react-query";
import { makeRequest } from "../../axios";
import { useLocation } from "react-router-dom";
import Post from "../post/Post";
const Albums = () => {
  const userId = parseInt(useLocation().pathname.split("/")[2]);
  const [showAlbums, setShowAlbums] = useState(true);
  const [showPosts, setShowPosts] = useState(false);
  const [albumName, setAlbumName] = useState("");

  const { isLoading: albumsLoading, data: albumData } = useQuery(
    ["/findAlbums"],
    () =>
      makeRequest.get("/findAlbums?userId=" + userId).then((res) => {
        return res.data.rows;
      })
  );

  const {
    isLoading: postsLoading,
    error: postError,
    data: postData,
  } = useQuery(["/findAlbumPosts", albumName, userId], () =>
    makeRequest
      .get(`/findAlbumPosts?albumId=${albumName}&userId=${userId}`)
      .then((res) => {
        return res.data.rows;
      })
  );

  // const handleClick = async (e) => {
  //   const name = e.target.textContent;
  // };

  return (
    <div className="albums">
      <div className="container">
        <div class="dropdown">
          <button class="dropbtn" onClick={() => setShowAlbums(!showAlbums)}>
            Select Album
          </button>
          <div
            class="dropdown-content"
            style={{ display: showAlbums ? "block" : "none" }}
          >
            {albumsLoading
              ? "loading..."
              : albumData.map((album) => (
                  <span key={album.album_id}>{album.name}</span>
                ))}
          </div>{" "}
          d
        </div>
      </div>

      <div className="posts">
        {postError
          ? "An error occurred"
          : postsLoading
          ? "loading..."
          : postData.length === 0
          ? "No posts available"
          : postData.map((post) => <Post post={post} key={post.photo_id} />)}
      </div>
    </div>
  );
};

export default Albums;
