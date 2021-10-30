import axios from "axios";
import { useContext, useState } from "react";
import SideBar from "../../Components/SideBar/SideBar";
import { Context } from "../../context/Context";
import "./settings.css";

export default function Settings() {
  const { user, dispatch } = useContext(Context);
  const [username, setUsername] = useState(user.username);
  const [name, setName] = useState(user.name);
  const [profilePicture, setProfilePicture] = useState(null);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [pictureSuccess, setPictureSuccess] = useState(false);
  const handleProfilePicture = (e) => {
    setProfilePicture(e.target.files[0]);
  };
  const handlePictureSubmit = async (e) => {
    e.preventDefault();

    let pictureData = new FormData();

    pictureData.append("profilePicture", profilePicture);
    pictureData.append("user_id", user.id);
    dispatch({
      type: "SUCCESS_USER_UPDATE",
      payload: user,
    });
    dispatch({ type: "START_USER_UPDATE" });

    const response = await axios.post(
      `http://localhost:8000/api/auth/profilePicture/`,
      pictureData
    );
    if (!response.data.error) {
      console.log(response.data.user);
      setPictureSuccess(response.data.success);
      setTimeout(() => {
        setPictureSuccess(false);
        window.location.reload();
      }, 2000);
    } else {
      setError(response.data.error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "START_USER_UPDATE" });

    const response = await axios.post(
      "http://localhost:8000/api/auth/update/",
      {
        user_id: user.id,
        username,
        name,
      }
    );
    console.log(response.data.user);
    if (!response.data.error) {
      dispatch({ type: "SUCCESS_USER_UPDATE", payload: response.data.user });
      setSuccess(response.data.success);
      setTimeout(() => {
        setSuccess(false);
      }, 2000);
    } else {
      setError(response.data.error.profilePicture);
    }
  };

  return (
    <div className="settings">
      <div className="settings-wrapper">
        <div className="settings-title">
          <h1>Settings</h1>
        </div>
        <div className="settings-card">
          <div class="settings-account">
            <span>Update account</span>
            <button class="settings-delete">Delete account</button>
          </div>
          <form className="settings-form" onSubmit={handlePictureSubmit}>
            <input type="hidden" name="user_id" />
            <div className="settings-profile-picture">
              {error && <span>{error}</span>}
              {pictureSuccess && (
                <span className="success">{pictureSuccess}</span>
              )}
              {profilePicture ? (
                <img
                  key={profilePicture}
                  className="profile-picture"
                  src={URL.createObjectURL(profilePicture)}
                  alt="images"
                />
              ) : (
                <img
                  className="profile-picture"
                  src={`http://127.0.0.1:8000/profile_pictures/${user.profilePicture}`}
                  alt={`${user.username}'s Avatar`}
                />
              )}

              <label className="settings-upload-picture">
                {profilePicture ? (
                  <span class="upload-selected">
                    File "{profilePicture.name}" Selected
                  </span>
                ) : (
                  <span class="upload-selected">
                    Upload your profile picture here
                  </span>
                )}
                <i class=" add-img-icon fas fa-plus-circle"></i>
                <input
                  type="file"
                  className="settings-file-input"
                  style={{ display: "none" }}
                  name="profilePicture"
                  onChange={handleProfilePicture}
                />
              </label>
              <button type="submit" class="btn-upload">
                Upload
              </button>
            </div>
          </form>
          {error && <span>{error}</span>}
          {success && (
            <span className="success" style={{ textAlign: "center" }}>
              {success}
            </span>
          )}
          <form className="settings-form" onSubmit={handleSubmit}>
            <div className="settings-data">
              <label className="settings-username">Username</label>
              <input
                className="settings-input"
                type="text"
                placeholder={user.username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
              <label className="settings-name">Name</label>
              <input
                className="settings-input"
                type="text"
                placeholder={user.name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <label className="settings-email">Email</label>
              <input
                className="settings-input"
                type="text"
                value={user.email}
                disabled
              />

              <div className="settings-btn">
                <button type="submit" class="settings-btn-cancel">
                  Cancel
                </button>
                <button type="submit" class="settings-btn-submit">
                  Update profile
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <SideBar />
    </div>
  );
}
