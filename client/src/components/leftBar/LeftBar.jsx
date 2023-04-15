import React, { useContext, useState } from "react";
import "./leftBar.scss";
import { AuthContext } from "../../context/authContext";
import profilePic from "../../assets/profilePic.png";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";
import { makeRequest } from "../../axios";

const LeftBar = () => {
  const { currentUser } = useContext(AuthContext);
  const [inputValue, setInputValue] = useState("");
  const [userComments, setUserComments] = useState([]);

  // const { isLoading, error, data } = useQuery(() =>
  //   makeRequest.get("/searchComments?input=" + inputValue).then((res) => {
  //     return res.data;
  //   })
  // );

  // const mutation = useMutation(
  //   (toSearch) => {
  //     try {
  //       console.log(toSearch);
  //       return makeRequest.get("/searchComments", inputValue);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   },
  //   {
  //     onSuccess: () => {
  //       queryClient.invalidateQueries(["/searchComments"]);
  //     },
  //   }
  // );

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
            <span>{currentUser.fname + " " + currentUser.lname}</span>
          </div>
          <div className="item">
            <img
              src="https://raw.githubusercontent.com/safak/youtube2022/react-social-ui/src/assets/1.png"
              alt=""
            />
            <span>Friends</span>
          </div>
          <div className="item">
            <img
              src="https://raw.githubusercontent.com/safak/youtube2022/react-social-ui/src/assets/8.png"
              alt=""
            />
            <span>Albums</span>
          </div>
        </div>
        <hr />
        <div className="menu">
          <div className="title">Popular Tags</div>
          <span>Tag1</span>
          <span>Tag2</span>
          <span>Tag3</span>
          <span>Tag4</span>
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
            <span key={comment.fname}>
              {comment.fname + " " + comment.lname}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LeftBar;
