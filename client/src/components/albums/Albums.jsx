import React, { useState } from "react";
import "./albums.scss";
import { makeRequest } from "../../axios";
import { useLocation } from "react-router-dom";
import Post from "../post/Post";
import { useQuery } from "react-query";
const Albums = () => {
  const userId = parseInt(useLocation().pathname.split("/")[2]);
  const [showAlbums, setShowAlbums] = useState(false);
  const [albumName, setAlbumName] = useState("");
  const [albumPosts, setAlbumPosts] = useState([]);

  const { isLoading: albumsLoading, data: albumData } = useQuery(
    ["/findAlbums"],
    () =>
      makeRequest.get("/findAlbums?userId=" + userId).then((res) => {
        return res.data.rows;
      })
  );

  const handleClick = async (e) => {
    e.preventDefault();
    setShowAlbums(!showAlbums);
    const name = e.target.textContent;
    console.log(name);
    setAlbumName(name);
    console.log(albumName);
    const response = await makeRequest.get(
      `/findAlbumPosts?albumName=${name}&userId=${userId}`
    );
    setAlbumPosts(response.data.rows);
  };

  return (
    <div className="albums">
      <div className="ddContainer">
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
                    <span key={album.album_id} onClick={handleClick}>
                      {album.name}
                    </span>
                  ))}
            </div>
          </div>
        </div>
      </div>
      <div className="posts">
        {albumPosts && albumPosts.length === 0
          ? "No posts available"
          : albumPosts &&
            albumPosts.map((post) => <Post post={post} key={post.photo_id} />)}
      </div>
    </div>
  );
};

export default Albums;
