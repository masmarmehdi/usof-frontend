import "./single-post.css";
import { useLocation } from "react-router";
import axios from "axios";
import { useEffect, useState } from "react";

export default function SinglePost() {
  const location = useLocation();
  const post_id = location.pathname.split("/")[2];
  const [post, setpost] = useState({});
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetch_post = async () => {
      const response = await axios.get(
        `http://localhost:8000/api/posts/${post_id}`
      );
      setpost(response.data);
    };
    fetch_post();
  }, [post_id]);
  const user_id = post.user_id;
  useEffect(() => {
    const fetch_user = async () => {
      const response = await axios.get(
        `http://localhost:8000/api/users/${user_id}`
      );
      setUser(response.data);
    };
    fetch_user();
  }, [user_id]);
  return (
    <div className="single-post">
      <div className="single-post-wrapper">
        <h1 className="single-post-title">{post.title}</h1>
        <div className="single-post-data">
          <span className="post-author">
            <img
              className="author-img"
              src={`http://localhost:8000/profile_pictures/${user.profilePicture}`}
              alt={`${user.username}'s avatar`}
            />
            <b>{user.username}</b>
          </span>
          <span className="single-post-date">
            {new Date(post.created_at).toDateString()}
          </span>
        </div>
        <img
          className="single-post-img"
          src={`http://localhost:8000/posts_picture/${post.images}`}
          alt="happy dog"
        />
        <p className="single-post-content">{post.content}</p>
        <div className="activity">
          <div>
            <i class="far like fa-thumbs-up">{post.likes}</i>
            <i class="far dislike fa-thumbs-down">{post.dislikes}</i>
          </div>
          <div>
            <i class="far comment fa-comments"></i>
          </div>
        </div>
      </div>
    </div>
  );
}
