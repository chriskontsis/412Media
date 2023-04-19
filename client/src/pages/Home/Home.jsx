import React from "react";
import "./home.scss";
import Posts from "../../components/posts/Posts";
import Share from "../../components/share/Share";

const Home = ({ taggedPhotos }) => {
  return (
    <div className="home">
        <Posts />
    </div>
  );
};

export default Home;
