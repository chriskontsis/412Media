import React from "react";
import "./posts.scss";
import Post from "../post/Post";
import { useQuery } from "react-query";
import { makeRequest } from "../../axios";
const Posts = () => {
  const { isLoading, error, data } = useQuery("/", () =>
    makeRequest.get("/").then((res) => {
      return res.data.rows;
    })
  );

  console.log(data);

  return (
    <div className="posts">
      {error
        ? "An error occurred"
        : isLoading
        ? "loading..."
        : data.map((post) => <Post post={post} key={post.photo_id} />)}
    </div>
  );
};

export default Posts;
