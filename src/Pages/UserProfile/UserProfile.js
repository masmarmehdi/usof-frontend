import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import SideBar from "../../Components/SideBar/SideBar";
import "./userprofile.css";

export default function Settings() {
  const location = useLocation();
  const user_id = location.pathname.split("/")[2];
  const [user, setUser] = useState({});
  useEffect(() => {
    const fetch_post = async () => {
      const response = await axios.get(
        `http://localhost:8000/api/users/${user_id}`
      );
      setUser(response.data);
    };
    fetch_post();
  }, [user_id]);
  return (
    <div className="user-profile">
      <div className="user-profile-wrapper">
        <div className="user-profile-title">
          <h1>{user.username}'s Profile</h1>
        </div>
        <div className="user-profile-card">
          <div className="user-profile-profile-picture">
            <img
              className="profile-picture"
              src={`http://127.0.0.1:8000/profile_pictures/${user.profilePicture}`}
              alt={`${user.username}'s Avatar`}
            />
          </div>
          <div>
            <p className="user-profile-data">Username: {user.username}</p>
            <p className="user-profile-data">Name: {user.name}</p>
            <p className="user-profile-data">Email: {user.email}</p>
            <p className="user-profile-data">Rating: {user.rating}</p>
            <p className="user-profile-data">Role: {user.role}</p>
          </div>
        </div>
      </div>
      <SideBar />
    </div>
  );
}
