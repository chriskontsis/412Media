import React from "react";
import "./posts.scss";
import Post from "../post/Post";
import { useQuery } from "react-query";
import { makeRequest } from "../../axios";

const Posts = ({ taggedPhotos }) => {
  const { isLoading, error, data } = useQuery("/", () =>
    makeRequest.get("/").then((res) => {
      return res.data.rows;
    })
  );

  const displayPhotos = taggedPhotos.length ? taggedPhotos : data;

  return (
    <div className="posts">
      {error
        ? "An error occurred"
        : isLoading
        ? "loading..."
        : displayPhotos.map((post) => <Post post={post} key={post.photo_id} />)}
    </div>
  );
};

export default Posts;
