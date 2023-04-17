import React, { useState } from "react";
import "./share.scss";
const Share = () => {
  const [file, setFile] = useState(null);
  const [desc, setDesc] = useState("");

  return (
    <div className="share">
      <div className="container">
        <div className="top">
          <div className="left">
            {/* <img src="" alt="" /> */}
            <input type="text" placeholder={`What's on your mind`} />
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
            <input type="file" id="file" style={{ display: "none" }} />
            <label htmlFor="file">
              <div className="item">
                {/* <img src={Image} alt="" /> */}
                <span>Add Image</span>
              </div>
            </label>
            <div className="item">
              {/* <img src={Map} alt="" /> */}
              <span>Add Album</span>
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
