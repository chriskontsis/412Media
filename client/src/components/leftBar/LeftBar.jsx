import React, { useContext, useState } from "react";
import "./leftBar.scss";
import { AuthContext } from "../../context/authContext";
import profilePic from "../../assets/profilePic.png";
import { makeRequest } from "../../axios";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
const LeftBar = () => {
  const { currentUser } = useContext(AuthContext);
  const [inputValue, setInputValue] = useState("");
  const [userComments, setUserComments] = useState([]);

  const {
    isLoading: tagsLoading,
    error: tagsError,
    data: tagsData,
  } = useQuery(["/popularTags"], () =>
    makeRequest.get("/popularTags").then((res) => {
      return res.data;
    })
  );
  const handleKeyDown = async (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      try {
        const response = await makeRequest.get(
          "/searchComments?input=" + inputValue
        );
        const data = response.data;
        setUserComments(data);
        setInputValue("");
      } catch (err) {
        console.error(err);
      }
    }
  };
  return (
    <div className="leftBar">
      <div className="container">
        <div className="menu">
          <div className="user">
            <img src={profilePic} alt=""></img>
            {currentUser ? (
                <Link to={`/profile/${currentUser.user_id}`} style={{ textDecoration: "none" }}>
                  <span>{currentUser.fname + " " + currentUser.lname}</span>
                </Link>) : (<span>Guest</span>)}
          </div>
          <div className="item">
            <img
              src="https://raw.githubusercontent.com/safak/youtube2022/react-social-ui/src/assets/1.png"
              alt=""
            />
            {currentUser ? (
              <Link to={`/friends/${currentUser.user_id}`} style={{ textDecoration: "none" }}>
                <span>Friends</span>
              </Link>
            ) : (
              <span>Friends</span>
            )}
          </div>
          <div className="item">
            <img
              src="https://raw.githubusercontent.com/safak/youtube2022/react-social-ui/src/assets/8.png"
              alt=""
            />
            {currentUser ? (
                <Link to={`/profile/${currentUser.user_id}`} style={{ textDecoration: "none" }}>
                  <span>Albums</span>
                </Link>) : (<span>Guest</span>)}
          </div>
        </div>
        <hr />
        <div className="menu">
          <div className="title">Popular Tags</div>
          {tagsLoading
            ? "loading.."
            : tagsData.map((tag) => (
                <div className="info" key={tag.tag_text}>
                  <span>{tag.tag_text}</span>
                  <span>{tag.tagcount}</span>
                </div>
              ))}
        </div>
        <hr />
        <div className="menu">
          <div className="title">Search Comments</div>
          <div className="search">
            <input
              type="text"
              placeholder="Search..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
            ></input>
          </div>
          {userComments.map((comment) => (
            <div className="info">
              <span key={comment.fname}>
                {comment.fname + " " + comment.lname}
              </span>
              <span>{comment.ocurr}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LeftBar;
