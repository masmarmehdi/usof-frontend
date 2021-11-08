import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import Pagination from "../../Components/Pagination/Pagination";
import Post from "../../Components/Post/Post";
import SideBar from "../../Components/SideBar/SideBar";
import "./postsbycategory.css";

export default function PostsByCategory() {
  const [categories, setCategories] = useState([]);
  const [category_name, setCategoryName] = useState("");
  const [error, setError] = useState("");
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  const location = useLocation();
  const category_id = location.pathname.split("/")[2];
  useEffect(() => {
    const fetch_category_posts = async () => {
      const response = await axios.get(
        `http://localhost:8000/api/categories/${category_id}/posts`
      );
      if (response.data.error) {
        setError(response.data.error);
      } else {
        setError(false);
        setCategories(response.data);
        setCategoryName(response.data[0].categories);
      }
    };
    fetch_category_posts();
  }, [category_id]);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <div>
      {!error ? <h2>All posts related to {category_name}</h2> : <span></span>}
      <div className="categories-posts">
        {error ? (
          <div className="posts-by-category">
            <p className="error">{error}</p>
          </div>
        ) : (
          <div>
            <Pagination
              postsPerPage={postsPerPage}
              totalPosts={posts.length}
              paginate={paginate}
            />
            <div className="categories-posts">
              <div className="posts-by-category">
                {categories.map((currentPosts) => (
                  <Post post={currentPosts} />
                ))}
              </div>
            </div>
          </div>
        )}
        <SideBar />
      </div>
    </div>
  );
}
