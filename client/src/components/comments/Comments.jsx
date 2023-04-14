import React, { useContext, useState } from "react";
import "./comments.scss";
import { AuthContext } from "../../context/authContext";
import { makeRequest } from "../../axios";
import { useMutation, useQuery, useQueryClient } from "react-query";

const Comments = ({ postId }) => {
  //const { currentUser } = useContext(AuthContext);
  const [desc, setDesc] = useState("");
  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery(["/comments"], () =>
    makeRequest.get("/comments?postId=" + postId).then((res) => {
      return res.data.rows;
    })
  );

  const mutation = useMutation(
    (newComment) => {
      return makeRequest.post("/comments", newComment);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["/comments"]);
      },
    }
  );

  const handleClick = async (e) => {
    e.preventDefault();
    mutation.mutate({ desc, postId });
    setDesc("");
  };

  return (
    <div className="comments">
      <div className="write">
        <input
          type="text"
          placeholder="write a comment"
          onChange={(e) => setDesc(e.target.value)}
          value={desc}
        />
        <button onClick={handleClick}>post</button>
      </div>
      {isLoading
        ? "loading.."
        : data.map((comment) => (
            <div className="comment" key={comment.c_id}>
              {/* <img src={comment.profilePicture} alt="" /> */}
              <div className="info">
                <span>{comment.username}</span>
                <p>{comment.commenttext}</p>
              </div>
            </div>
          ))}
    </div>
  );
};

export default Comments;
