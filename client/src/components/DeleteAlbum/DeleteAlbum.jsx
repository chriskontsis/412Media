import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../context/authContext';
import { makeRequest } from '../../axios';
import { useQuery } from 'react-query';
import './DeleteAlbum.scss';

const DeleteAlbum = () => {
  const { currentUser } = useContext(AuthContext);

  const getAlbums = async () => {
    try {
      const response = await makeRequest.get(`/findAlbums?userId=${currentUser.user_id}`);
      return response.data.rows;
    } catch (error) {
      console.error('Error fetching albums:', error);
    }
  };

  const { data: albums, refetch } = useQuery('getAlbums', getAlbums, {
    enabled: false,
  });

  useEffect(() => {
    refetch();
  }, []);

  const handleDelete = async (albumId) => {
    try {
      await makeRequest.post("/deleteAlbum", { album_id: albumId });
      refetch();
    } catch (error) {
      console.error("Error deleting album:", error);
    }
  };

  return (
    <div className="delete-album">
      <h1>Delete Albums</h1>
      <ul className="album-list">
        {albums?.map((album) => (
          <li key={album.album_id} className="album-item">
            <span className="album-name">{album.name}</span>
            <button
              className="delete-button"
              onClick={() => handleDelete(album.album_id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DeleteAlbum;