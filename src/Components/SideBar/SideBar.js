import "./sidebar.css";

export default function SideBar() {
  return (
    <div className="sidebar">
      <div className="sidebar-item">
        <span className="sidebar-title">Posts</span>
        <ul className="sidebar-list">
          <li className="sidebar-list-item">Recent posts</li>
          <li className="sidebar-list-item">Popular posts</li>
          <li className="sidebar-list-item">Must read posts</li>
          <li className="sidebar-list-item">Most liked posts</li>
        </ul>
      </div>
      <div className="sidebar-item">
        <span className="sidebar-title">Categories</span>
        <ul className="sidebar-list">
          <li className="sidebar-list-item">Laravel</li>
          <li className="sidebar-list-item">React</li>
          <li className="sidebar-list-item">PHP</li>
          <li className="sidebar-list-item">JS</li>
          <li className="sidebar-list-item">Python</li>
          <li className="sidebar-list-item">C</li>
          <li className="sidebar-list-item">C++</li>
          <li className="sidebar-list-item">Java</li>
        </ul>
      </div>
      <div className="sidebar-item">
        <span className="sidebar-title">Contact us</span>
        <div className="sidebar-social">
          Via social media:
          <a
            rel="noreferrer"
            href="https://www.instagram.com/masmarmehdi/"
            target="_blank"
          >
            <i class="sidebar-social-icon instagram fab fa-instagram"></i>
          </a>
          <a
            rel="noreferrer"
            href="https://www.facebook.com/profile.php?id=100009062618273"
            target="_blank"
          >
            <i class="sidebar-social-icon facebook fab fa-facebook"></i>
          </a>
          <a
            rel="noreferrer"
            href="https://twitter.com/MehdiMasmar2"
            target="_blank"
          >
            <i class="sidebar-social-icon twitter fab fa-twitter"></i>
          </a>
        </div>
        <div className="sidebar-social">Or phone: +380 95 828 6516</div>
      </div>
      <div className="copyright">
        <i class="fas fa-copyright"></i>Ucode 2021 - mmasmar
      </div>
    </div>
  );
}
