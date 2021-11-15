import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./sidebar.css";

export default function SideBar() {
  const [categories, setcategories] = useState([{}]);
  useEffect(() => {
    axios.get("http://localhost:8000/api/categories/").then((response) => {
      setcategories(response.data);
    });
  }, []);
  return (
    <div className="sidebar">
      <div className="sidebar-item">
        <span className="sidebar-title">Categories</span>
        <ul className="sidebar-list">
          {categories.slice(0, 20).map((category) => (
            <Link className="link" to={`/categories/${category.id}/posts`}>
              <li className="sidebar-list-item">{category.title}</li>
            </Link>
          ))}
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
