import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SideBar from "../../Components/SideBar/SideBar";
import "./categories.css";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:8000/api/categories/").then((response) => {
      setCategories(response.data);
      //   console.log(response.data);
      setLoading(false);
    });
  }, []);
  return (
    <div>
      <h2>All categories:</h2>

      <div className="categories-div">
        <div className="categories-display">
          {loading ? (
            <div className="loader">Loading</div>
          ) : (
            categories.map((category) => (
              <div>
                <Link className="link" to={`/categories/${category.id}/posts`}>
                  <p className="category-card">{category.title}</p>
                </Link>
              </div>
            ))
          )}
        </div>
        <SideBar />
      </div>
    </div>
  );
}
