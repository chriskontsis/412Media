import React, { useState, useContext } from "react";
import "./albums.scss";
import axios from "axios";
import Album from "../album/Album";
import { AuthContext } from "../../context/authContext";
const Albums = () => {
  const [albums, setAlbums] = useState([
    // ... initial album data
  ]);
  const { currentUser } = useContext(AuthContext);
  const [newAlbumName, setNewAlbumName] = useState("");

  const handleNewAlbumNameChange = (e) => {
    setNewAlbumName(e.target.value);
  };
  const saveNewAlbum = async (newAlbum) => {
    try {
      await axios.post("http://localhost:3005/albums", newAlbum);
    } catch (error) {
      console.error("Error saving new album:", error);
    }
  };
  const addNewAlbum = () => {
    const newAlbum = {
      id: albums.length + 1,
      name: newAlbumName,
      userId: currentUser.userId, // Use the current user ID from the AuthContext
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit",
      img: "https://images.pexels.com/photos/4881619/pexels-photo-4881619.jpeg?auto=compress&cs=tinysrgb&w=1600",
      date: new Date().toISOString().slice(0, 10), // YYYY-MM-DD format
    };
  
    saveNewAlbum(newAlbum);
  
    setAlbums([...albums, newAlbum]);
    setNewAlbumName("");
  };
  
  return (
    <div className="albums">
      <div className="create-album">
        <input
          type="text"
          placeholder="New album name"
          value={newAlbumName}
          onChange={handleNewAlbumNameChange}
        />
        <button onClick={addNewAlbum}>Create Album</button>
      </div>
      {albums.map((album) => (
        <Album album={album} key={album.id} />
      ))}
    </div>
  );
};

export default Albums;