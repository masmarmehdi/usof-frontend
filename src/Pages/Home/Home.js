import Header from "../../Components/Header/Header";
import Posts from "../../Components/Posts/Posts";
import SideBar from "../../Components/SideBar/SideBar";
import "./home.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Pagination from "../../Components/Pagination/Pagination";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios
      .get("http://localhost:8000/api/posts")
      .then((response) => {
        setPosts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <div>
      <Header />
      <div className="home">
        <div className="home-content">
          {loading ? (
            <div className="skeleton-list">
              {[1, 2, 3, 4, 5].map((n) => (
                <div key={n} className="skeleton-post-card">
                  <div className="skeleton-line skeleton-title"></div>
                  <div className="skeleton-line skeleton-meta"></div>
                  <div className="skeleton-line skeleton-body"></div>
                  <div className="skeleton-line skeleton-body short"></div>
                </div>
              ))}
            </div>
          ) : (
            <Posts posts={currentPosts} />
          )}
        </div>
        <SideBar />
      </div>
      {!loading && (
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={posts.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      )}
    </div>
  );
}
