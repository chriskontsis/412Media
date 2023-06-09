import React, { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import "./editProfile.scss";
import { makeRequest } from "../../axios";
const EditProfile = () => {
  // const [field, setField] = useState("");
  // const [newVal, setNewVal] = useState("");
  const { updateCurrentUser } = useContext(AuthContext);

  const handleUpdateClick = async (e) => {
    e.preventDefault();
    let newField;
    const queryParam =
      e.target.parentElement.previousElementSibling.textContent.trim();
    const inputValue = e.target.parentElement
      .querySelector("input")
      .value.trim();
    if (queryParam === "first name") newField = "fname";
    else if (queryParam === "last name") newField = "lname";
    else newField = queryParam;

    try {
      const response = await makeRequest.put(
        `/updateUserInfo?field=${newField}&newVal=${inputValue}`
      );
      updateCurrentUser(response.data[0]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="editProfile">
      <div className="container">
        <h2>Update Your Information</h2>
        <div className="editProfile">
          <div className="container">
            <div className="item">
              <h3>username </h3>
              <div className="input-container">
                <input type="text" />
                <button onClick={handleUpdateClick}>update</button>
              </div>
            </div>
            <div className="item">
              <h3>first name </h3>
              <div className="input-container">
                <input type="text" />
                <button onClick={handleUpdateClick}>update</button>
              </div>
            </div>
            <div className="item">
              <h3>last name</h3>
              <div className="input-container">
                <input type="text" />
                <button onClick={handleUpdateClick}>update</button>
              </div>
            </div>
            <div className="item">
              <h3>password</h3>
              <div className="input-container">
                <input type="text" />
                <button onClick={handleUpdateClick}>update</button>
              </div>
            </div>
            <div className="item">
              <h3>dob</h3>
              <div className="input-container">
                <input type="text" />
                <button onClick={handleUpdateClick}>update</button>
              </div>
            </div>
            <div className="item">
              <h3>hometown</h3>
              <div className="input-container">
                <input type="text" />
                <button onClick={handleUpdateClick}>update</button>
              </div>
            </div>
            <div className="item">
              <h3>gender</h3>
              <div className="input-container">
                <input type="text" />
                <button onClick={handleUpdateClick}>update</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
