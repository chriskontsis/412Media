import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { makeRequest } from "../../axios";
import { useNavigate } from "react-router-dom";


const DeleteAlbum = () => { 
    const { currentUser } = useContext(AuthContext);



};

export default DeleteAlbum;