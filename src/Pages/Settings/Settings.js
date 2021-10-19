import SideBar from "../../Components/SideBar/SideBar";
import "./settings.css";
import mmasmar from "../../images/mmasmar.png";

export default function Settings() {
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
          <form className="settings-form">
            <div className="settings-profile-picture">
              <img className="profile-picture" src={mmasmar} alt="mmasmar" />
            </div>

            <div className="settings-data">
              <label className="settings-username">Username</label>
              <input className="settings-input" type="text" value="mmasmar" />
              <label className="settings-name">Name</label>
              <input
                className="settings-input"
                type="text"
                value="Mehdi Masmar"
              />
              <label className="settings-email">Email</label>
              <input
                className="settings-input"
                type="text"
                value="masmar507@gmail.com"
              />
              <label className="settings-upload-picture">
                <span>Upload your profile picture here</span>
                <i class=" add-img-icon fas fa-plus-circle"></i>
              </label>
              <input
                type="file"
                className="settings-file-input"
                style={{ display: "none" }}
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
