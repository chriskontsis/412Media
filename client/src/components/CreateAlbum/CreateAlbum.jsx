import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { makeRequest } from "../../axios";
import { useNavigate } from "react-router-dom";

const CreateAlbum = () => {
  const { currentUser } = useContext(AuthContext);
  const [albumName, setAlbumName] = useState("");
  const [showSuccessNotification, setShowSuccessNotification] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await makeRequest.post("/createAlbum", {
        user_id: currentUser.user_id,
        name: albumName,
        date: new Date().toISOString().slice(0, 10),
      });
      setShowSuccessNotification(true);
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      console.error("Error creating album:", error);
    }
  };

  return (
    <div style={{ width: "50%", margin: "auto", textAlign: "center" }}>
      <h1 style={{ fontSize: "2rem", marginBottom: "1.5rem" }}>
        Create a New Album
      </h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="albumName" style={{ display: "block", marginBottom: "0.5rem" }}>
          Name of Album:
        </label>
        <input
          type="text"
          id="albumName"
          value={albumName}
          onChange={(e) => setAlbumName(e.target.value)}
          required
          style={{ padding: "0.5rem", borderRadius: "0.25rem", border: "1px solid gray", marginBottom: "1rem", width: "100%" }}
        />
        <button type="submit" style={{ backgroundColor: "green", color: "white", padding: "0.5rem 1rem", borderRadius: "0.25rem", border: "none" }}>
          Create
        </button>
      </form>
      {showSuccessNotification && (
        <div style={{ backgroundColor: "green", color: "white", padding: "1rem", borderRadius: "0.25rem", marginTop: "1rem" }}>
          Successfully created, Redirecting... 
        </div>
      )}
    </div>
  );
};

export default CreateAlbum;
