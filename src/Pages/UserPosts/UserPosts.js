import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import Pagination from "../../Components/Pagination/Pagination";
import Post from "../../Components/Post/Post";
import SideBar from "../../Components/SideBar/SideBar";
import "./user-post.css";

export default function UserPosts() {
  const [error, setError] = useState("");
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  const location = useLocation();
  const user_id = location.pathname.split("/")[2];
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/users/${user_id}/posts`)
      .then((response) => {
        console.log(response.data);
        if (response.data.error) {
          setError(response.data.error);
        } else {
          setError(false);
          setPosts(response.data);
        }
        setLoading(false);
      });
  }, [user_id]);
  useEffect(() => {
    axios.get(`http://localhost:8000/api/users/${user_id}`).then((response) => {
      console.log(response.data);
      setUser(response.data);
      setLoading(false);
    });
  }, [user_id]);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <div>
      <h2>{user.username}'s posts</h2>
      <div className="post-by-user">
        {error ? (
          <div className="posts-by-user">
            <p className="error">{error}</p>
            <SideBar />
          </div>
        ) : loading ? (
          <div className="loader">Loading</div>
        ) : (
          <div className="user-posts">
            <div>
              <Pagination
                postsPerPage={postsPerPage}
                totalPosts={posts.length}
                paginate={paginate}
              />
              <div className="user-posts">
                <div className="posts-by-user">
                  {currentPosts.map((post) => (
                    <Post key={post.id} post={post} />
                  ))}
                </div>
              </div>
            </div>
            <SideBar />
          </div>
        )}
      </div>
    </div>
  );
}
