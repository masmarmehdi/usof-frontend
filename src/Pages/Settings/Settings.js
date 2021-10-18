import SideBar from "../../Components/SideBar/SideBar";
import "./settings.css";
import mmasmar from "../../images/mmasmar.png";

export default function Settings() {
  return (
    <div className="settings">
      <div className="settings-wrapper">
        <div className="settings-title">
          <h1>Settings</h1>
          <span>Update account</span>
          <span>Delete account</span>
        </div>
        <form className="settings-form">
          <div className="settings-profile-picture">
            <img className="profile-picture" src={mmasmar} alt="mmasmar" />
            <span>Role: Admin</span>
            <span>Rating: 10</span>
          </div>

          <div className="settings-data">
            <label>Username</label>
            <input type="text" value="mmasmar" />
            <label>Name</label>
            <input type="text" value="Mehdi Masmar" />
            <label>email</label>
            <input type="text" value="masmar507@gmail.com" />
            <label htmlFor="file_input" className="settings-upload-picture">
              <span>Upload picture(s)</span>
              <i class=" add-img-icon fas fa-plus-circle"></i>
            </label>
            <input
              type="file"
              className="settings-file-input"
              style={{ display: "none" }}
            />
            <button type="submit">Update profile</button>
          </div>
        </form>
      </div>
      <SideBar />
    </div>
  );
}
