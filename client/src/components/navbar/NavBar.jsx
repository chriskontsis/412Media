import React, { useContext, useState } from "react";
import "./navBar.scss";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import { makeRequest } from "../../axios";
import Home from "../../pages/Home/Home" // Import the Posts component

const NavBar = () => {
  const { currentUser } = useContext(AuthContext);
  const [inputValue, setInputValue] = useState("");
  const [taggedPhotos, setTaggedPhotos] = useState([]);


  const handleKeyDown = async (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      try {
        const response = await makeRequest.get(
          "/searchTags?input=" + inputValue
        );
        const data = response.data;
        setTaggedPhotos(data);
        setInputValue("");
        console.log(data);
      } catch (err) {
        console.error(err);
      }
    }
  };


  return (
    <div className="navbar">
      <div className="left">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span>412 Media</span>
        </Link>
        <HomeOutlinedIcon />
        <GridViewOutlinedIcon />
        <div className="search">
          <SearchOutlinedIcon />
          <input type="text" 
          placeholder="Search Tags..." 
          value = {inputValue} 
          onChange={(e) => setInputValue(e.target.value)} 
          onKeyDown = {handleKeyDown}
          ></input>
        </div>
      </div>
      <div className="taggedPhotos">
        <Home taggedPhotos={taggedPhotos} />
      </div>
      <div className="right">
        <PersonOutlineOutlinedIcon />
        <div className="user">
        {currentUser ? <span>{currentUser.fname}</span> : <span>Guest</span>}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
