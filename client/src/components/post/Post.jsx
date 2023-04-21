import React, { useContext, useState } from "react";
import "./post.scss";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
import Comments from "../comments/Comments";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { makeRequest } from "../../axios";
import { AuthContext } from "../../context/authContext";
import profilePic from "../../assets/profilePic.png";

const Post = ({ post }) => {
  const [commentOpen, setCommentOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const { currentUser } = useContext(AuthContext);
  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery(["/likes", post.photo_id], () =>
    makeRequest.get("/likes?postId=" + post.photo_id).then((res) => {
      return res.data;
    })
  );
  const {
    isLoading: tagsLoading,
    error: tagsError,
    data: tagsData,
  } = useQuery(["/tags", post.photo_id], () =>
    makeRequest.get("/tags?postId=" + post.photo_id).then((res) => {
      return res.data;
    })
  );
  const mutation = useMutation(
    (liked) => {
      try {
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

  const deleteMutation = useMutation(
    () => makeRequest.delete(`/posts/${post.photo_id}`),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("/posts");
      },
      onError: (error) => {
        console.log("Delete post error:", error);
      },
    }
  );

  const handleLike = () => {
    mutation.mutate(data.includes(currentUser.user_id));
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDeletePost = () => {
    deleteMutation.mutate();
    handleMenuClose();
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
          <IconButton onClick={handleMenuClick} size="small">
            <MoreHorizIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            {currentUser.user_id === post.user_id && (
              <MenuItem onClick={handleDeletePost}>
                <DeleteIcon />
                Delete Photo
              </MenuItem>
            )}
          </Menu>
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
            <LocalOfferOutlinedIcon />
            {tagsLoading
              ? "loading.."
              : tagsData.map((tag) => (
                  <span
                    key={tag.tag_id}
                    style={{ textDecoration: "underline" }}
                  >
                    {tag.tag_text}
                  </span>
                ))}
          </div>
        </div>
        {commentOpen && (
          <Comments postId={post.photo_id} key={post.photo_id} />
        )}
      </div>
    </div>
  );
};

export default Post;

