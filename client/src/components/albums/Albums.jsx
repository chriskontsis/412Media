import React, { useState, useContext } from "react";
import "./albums.scss";
import axios from "axios";
import Album from "../album/Album";
import { AuthContext } from "../../context/authContext";
import Share from "../share/Share";
import { useQuery } from "react-query";
import { makeRequest } from "../../axios";
import { useLocation } from "react-router-dom";
const Albums = () => {
  const userId = parseInt(useLocation().pathname.split("/")[2]);

  const handleKeyDown = async (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      try {
        const response = await makeRequest.get("/getAlbums?userId=" + userId);
        const data = response.data;
      } catch (err) {
        console.error(err);
      }
    }
  };
  return (
    <div className="albums">
      <div className="create-album"></div>
    </div>
  );
};

export default Albums;
