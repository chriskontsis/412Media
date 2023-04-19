import React from "react";
import "./home.scss";
import Posts from "../../components/posts/Posts";
import Share from "../../components/share/Share";

const Home = ({ taggedPhotos }) => {
  return (
    <div className="home">
      {taggedPhotos && taggedPhotos.length > 0 ? (
        taggedPhotos.map((post) => <Posts post={post} key={post.photo_id} />)
      ) : (
        <Posts />
      )}
    </div>
  );
};

export default Home;
