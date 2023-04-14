import { React, useContext, useState } from "react";
import "./post.scss";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Link } from "react-router-dom";
import Comments from "../comments/Comments";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { makeRequest } from "../../axios";
import { AuthContext } from "../../context/authContext";
import profilePic from "../../assets/profilePic.png";

const Post = ({ post }) => {
  const [commentOpen, setCommentOpen] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery(["/likes", post.photo_id], () =>
    makeRequest.get("/likes?postId=" + post.photo_id).then((res) => {
      return res.data;
    })
  );
  const mutation = useMutation(
    (liked) => {
      try {
        console.log("in try statment");
        if (liked) return makeRequest.delete("/likes?postId=" + post.photo_id);
        return makeRequest.post("/likes", { postId: post.photo_id });
      } catch (err) {
        console.log(err);
        throw err; // add this line
      }
    },
    {
      onSuccess: () => {
        console.log("Mutation successful:");
        queryClient.invalidateQueries(["/likes"]);
      },
      onError: (error) => {
        console.log("Mutation error:", error);
      },
    }
  );

  const handleLike = () => {
    mutation.mutate(data.includes(currentUser.user_id));
  };
  return (
    <div className="post">
      <div className="container">
        <div className="user">
          <div className="userInfo">
            <img src={profilePic} alt="" />
            <div className="details">
              <Link
                to={`/profile/${post.user_id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span className="name">{post.username}</span>
              </Link>
            </div>
          </div>
          <MoreHorizIcon />
        </div>
        <div className="content">
          <img src={post.imageurl} alt="" />
          <p>{post.caption}</p>
        </div>
        <div className="info">
          <div className="item">
            {isLoading ? (
              "Loading..."
            ) : data.includes(currentUser.user_id) ? (
              <FavoriteOutlinedIcon
                style={{ color: "red" }}
                onClick={handleLike}
              />
            ) : (
              <FavoriteBorderOutlinedIcon onClick={handleLike} />
            )}
            {isLoading ? "likes loading" : data.length} Likes
          </div>
          <div className="item" onClick={() => setCommentOpen(!commentOpen)}>
            <TextsmsOutlinedIcon />
            Comments
          </div>
          <div className="item">
            <ShareOutlinedIcon />
          </div>
        </div>
        {commentOpen && <Comments postId={post.photo_id} key={post.photo_id} />}
      </div>
    </div>
  );
};

export default Post;
