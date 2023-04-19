import React, { useState, useContext } from "react";
import "./albums.scss";
import { useQuery } from "react-query";
import { makeRequest } from "../../axios";
import { useLocation } from "react-router-dom";
const Albums = () => {
  const userId = parseInt(useLocation().pathname.split("/")[2]);

  const { isLoading: albumsLoading, data: albumData } = useQuery(
    ["/findAlbums"],
    () =>
      makeRequest.get("/findAlbums?userId=" + userId).then((res) => {
        return res.data.rows;
      })
  );

  console.log(albumData);
  return (
    <div className="albums">
      <div className="create-album">
        {albumsLoading
          ? "loading..."
          : albumData.map((album) => (
              <span key={album.album_id}>{album.name}</span>
            ))}
      </div>
    </div>
  );
};

export default Albums;
