import React from "react";
import "./tagSearchResults.scss";
import Posts from "../../components/posts/Posts";
import { makeRequest } from "../../axios";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import Post from "../../components/post/Post";

const fetchSearchResults = async (searchTerm) => {
  const response = await makeRequest.get("/searchTags", {
    params: {
      input: searchTerm,
    },
  });
  return response.data;
};

const TagSearchResults = () => {
  const { searchTerm } = useParams();

  // Use the useQuery hook to fetch search results
  const { isLoading, error, data } = useQuery(
    ["searchResults", searchTerm],
    () => fetchSearchResults(searchTerm)
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="tagSearchResults">
      <h1>Search Results Posts Containing Tag: {searchTerm}</h1>
      {data.map((post) => (
        <Post post={post} key={post.photo_id} />
      ))}
    </div>
  );
};

export default TagSearchResults;
