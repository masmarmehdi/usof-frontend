import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import Post from "../../Components/Post/Post";
import SideBar from "../../Components/SideBar/SideBar";
import "./postsbycategory.css";

export default function PostsByCategory() {
  const [categories, setCategories] = useState([]);
  const [category_name, setCategoryName] = useState("");

  const location = useLocation();
  const category_id = location.pathname.split("/")[2];
  useEffect(() => {
    const fetch_category_posts = async () => {
      const response = await axios.get(
        `http://localhost:8000/api/categories/${category_id}/posts`
      );
      setCategories(response.data);
      setCategoryName(response.data[0].categories);
      console.log(response.data);
    };
    fetch_category_posts();
  }, [category_id]);
  return (
    <div>
      <h2>All posts related to {category_name}</h2>
      <div className="categories-posts">
        <div className="posts-by-category">
          {categories.map((post) => (
            <Post post={post} />
          ))}
        </div>
        <SideBar />
      </div>
    </div>
  );
}
