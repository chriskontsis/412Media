import React, { useState } from "react";
import "./share.scss";
const Share = () => {
  const [file, setFile] = useState(null);
  const [desc, setDesc] = useState("");
  const [showUrl, setShowUrl] = useState(false);
  const [showAlbums, setShowAlbums] = useState(false);

  return (
    <div className="share">
      <div className="container">
        <div className="top">
          <div className="left">
            {/* <img src="" alt="" /> */}
            <input
              type="text"
              placeholder={`What's on your mind`}
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
          </div>
          <div className="right">
            {/* {file && (
              <img className="file" alt="" src={URL.createObjectURL(file)} />
            )} */}
          </div>
        </div>
        <hr />
        <div className="bottom">
          <div className="left">
            <label htmlFor="url">
              <div className="item">
                {/* <img src={Image} alt="" /> */}
                <span onClick={() => setShowUrl(!showUrl)}>Add Image URL</span>
                {showUrl && <input type="text" />}
              </div>
            </label>
            <div className="item">
              {/* <img src={Map} alt="" /> */}
              <div className="dropdown">
                <button onClick={() => setShowAlbums(!showAlbums)}>
                  Select Album
                </button>
                <div
                  className="dropdownAlbums"
                  style={{ display: showAlbums ? "block" : "none" }}
                >
                  <span>album 1</span>
                  <span>album 1</span>
                  <span>album 1</span>
                </div>
              </div>
            </div>
            <div className="item">
              {/* <img src="" alt="" /> */}
              <span>Add Tags</span>
            </div>
          </div>
          <div className="right">
            <button>Share</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Share;
