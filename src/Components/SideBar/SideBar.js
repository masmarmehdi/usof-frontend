import axios from "axios";
import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import "./sidebar.css";

export default function SideBar() {
  const [categories, setCategories] = useState([]);
  const [postCounts, setPostCounts] = useState({});

  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:8000/api/categories/"),
      axios.get("http://localhost:8000/api/posts"),
    ])
      .then(([catRes, postsRes]) => {
        const cats = catRes.data;
        const posts = postsRes.data;

        const counts = {};
        cats.forEach((cat) => {
          counts[cat.title.toLowerCase()] = 0;
        });
        posts.forEach((post) => {
          if (post.categories) {
            post.categories.split(" ").forEach((tag) => {
              const key = tag.trim().toLowerCase();
              if (counts[key] !== undefined) counts[key]++;
            });
          }
        });

        setCategories(cats);
        setPostCounts(counts);
      })
      .catch(() => {});
  }, []);

  // Top 5 categories sorted by post count descending
  const popularCategories = useMemo(() => {
    return [...categories]
      .sort((a, b) => {
        const countA = postCounts[a.title.toLowerCase()] || 0;
        const countB = postCounts[b.title.toLowerCase()] || 0;
        return countB - countA;
      })
      .slice(0, 5);
  }, [categories, postCounts]);

  return (
    <div className="sidebar">
      <div className="sidebar-item">
        <span className="sidebar-title">
          <i className="fas fa-fire"></i> Popular Categories
        </span>
        <div className="sidebar-chips">
          {popularCategories.map((category) => (
            <Link
              key={category.id}
              className="sidebar-chip"
              to={`/categories/${category.id}/posts`}
            >
              #{category.title}
            </Link>
          ))}
        </div>
      </div>

      <div className="sidebar-item">
        <span className="sidebar-title">
          <i className="fas fa-envelope"></i> Contact us
        </span>
        <div className="sidebar-social">
          <div className="sidebar-social-icons">
            <a
              rel="noreferrer"
              href="https://www.instagram.com/masmarmehdi/"
              target="_blank"
              className="instagram"
            >
              <i className="sidebar-social-icon instagram fab fa-instagram"></i>
            </a>
            <a
              rel="noreferrer"
              href="https://www.facebook.com/profile.php?id=100009062618273"
              target="_blank"
              className="facebook"
            >
              <i className="sidebar-social-icon facebook fab fa-facebook"></i>
            </a>
            <a
              rel="noreferrer"
              href="https://twitter.com/MehdiMasmar2"
              target="_blank"
              className="twitter"
            >
              <i className="sidebar-social-icon twitter fab fa-twitter"></i>
            </a>
          </div>
        </div>
      </div>
        <div className="sidebar-social contact-info">
          <i className="fas fa-phone"></i>
          <span> Phone: +212 6 45 87 19 66</span>
        </div>
      <div className="copyright">
        <i className="fas fa-copyright"></i>Ucode 2021 - mmasmar
      </div>
    </div>
  );
}
