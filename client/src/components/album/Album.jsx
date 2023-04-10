import { React } from "react";
import "./album.scss";

const Album = ({ album }) => {
  return (
    <div className="album">
      <div className="container">
        <div className="item">
          <img src={album.img} alt="" />
          <span>{album.name}</span>
        </div>
      </div>
    </div>
  );
};

export default Album;
