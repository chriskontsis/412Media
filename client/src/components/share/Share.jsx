import React, { useEffect, useState } from "react";
import "./share.scss";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { makeRequest } from "../../axios";
import { useLocation } from "react-router-dom";
const Share = () => {
  const [desc, setDesc] = useState("");
  const [showUrl, setShowUrl] = useState(false);
  const [showAlbums, setShowAlbums] = useState(false);
  const [showTags, setShowTags] = useState(false);
  const [finalUrl, setFinalUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [albumName, setAlbumName] = useState("");
  const [tags, setTags] = useState([]);
  const [buttonText, setButtonText] = useState("Select Album");
  const [isTagAdded, setIsTagAdded] = useState(false);
  const queryClient = useQueryClient();
  const userId = parseInt(useLocation().pathname.split("/")[2]);

  const { isLoading: albumsLoading, data: albumData } = useQuery(
    ["/findAlbums"],
    () =>
      makeRequest.get("/findAlbums?userId=" + userId).then((res) => {
        return res.data.rows;
      })
  );

  const handleAlbumClick = (event) => {
    const name = event.target.textContent;
    setAlbumName(name);
    setButtonText(name);
    setShowAlbums(false);
  };
  const [tagInputValue, setTagInputValue] = useState("");

  const handleTagInputChange = (event) => {
    setTagInputValue(event.target.value);
  };

  const handleTagInputKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      addTag(tagInputValue);
      setTagInputValue("");
      setIsTagAdded(true);
      setTimeout(() => {
        setIsTagAdded(false);
      }, 1000);
    }
  };

  const handleImageUrlKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setShowUrl(false);
      setFinalUrl(imageUrl);
      setImageUrl("");
    }
  };
  useEffect(() => {
    console.log(finalUrl);
  }, [finalUrl]);

  const addTag = (tagValue) => {
    setTags([...tags, tagValue]);
  };

  const mutation = useMutation(
    () => {
      return makeRequest.post("/addPhoto", {
        imageUrl: finalUrl,
        albumName: albumName,
        tags: tags,
        desc: desc,
      });
    },
    {
      onSuccess: () => {
        console.log("success");
        makeRequest.get("/contribution");
        queryClient.invalidateQueries(["/contribution"]);
        queryClient.invalidateQueries(["/profilePosts"]);
      },
    }
  );

  const handleClick = async (e) => {
    e.preventDefault();
    mutation.mutate();
    setDesc("");
    setImageUrl("");
    setTags([]);
    setAlbumName("Select Album");
  };

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
                {showUrl && (
                  <input
                    type="text"
                    onChange={(e) => setImageUrl(e.target.value)}
                    onKeyDown={handleImageUrlKeyDown}
                    value={imageUrl}
                  />
                )}
              </div>
            </label>
            <div className="item">
              {/* <img src={Map} alt="" /> */}
              <div className="dropdown">
                <button onClick={() => setShowAlbums(!showAlbums)}>
                  {buttonText}
                </button>
                <div
                  className="dropdownAlbums"
                  style={{ display: showAlbums ? "block" : "none" }}
                >
                  {/* <span onClick={handleAlbumClick}>first album</span>
                  <span onClick={handleAlbumClick}>album 2</span>
                  <span onClick={handleAlbumClick}>album 1</span> */}
                  {albumsLoading
                    ? "loading..."
                    : albumData.map((album) => (
                        <span key={album.album_id} onClick={handleAlbumClick}>
                          {album.name}
                        </span>
                      ))}
                </div>
              </div>
            </div>
            <div className="item">
              {/* <img src="" alt="" /> */}
              <span onClick={() => setShowTags(!showTags)}>Add Tags</span>
              {showTags && (
                <div>
                  <input
                    type="text"
                    value={tagInputValue}
                    onChange={handleTagInputChange}
                    onKeyDown={handleTagInputKeyDown}
                  />
                  {isTagAdded && <span style={{ color: "green" }}>✓</span>}
                </div>
              )}
            </div>
          </div>
          <div className="right">
            <button onClick={handleClick}>Post</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Share;
