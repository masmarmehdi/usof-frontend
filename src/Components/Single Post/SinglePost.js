import "./single-post.css";
import { useLocation } from "react-router";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function SinglePost() {
  const location = useLocation();
  const post_id = location.pathname.split("/")[2];
  const [post, setpost] = useState({});
  const [user, setUser] = useState({});
  const [comments, setComments] = useState([]);
  let display = false;
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

  useEffect(() => {
    const fetch_post_comments = async () => {
      const response = await axios.get(
        `http://localhost:8000/api/posts/${post_id}/comments`
      );
      setComments(response.data);
    };
    fetch_post_comments();
  }, [post_id]);
  const handleComments = () => {
    if (!display) {
      document.getElementById("show-comments").style = "display:inherit;";
      display = true;
    } else {
      document.getElementById("show-comments").style = "display:none";
      display = false;
    }
  };
  return (
    <div className="single-post">
      <h1 style={{ marginLeft: 20 }}>
        {user.username}'s post about {post.categories}
      </h1>
      <div className="single-post-wrapper">
        <h1 className="single-post-title">{post.title}</h1>

        <div className="single-post-data">
          <span className="post-author">
            <Link className="link" to={"/users/" + post.user_id}>
              <img
                className="author-img"
                src={`http://localhost:8000/profile_pictures/${user.profilePicture}`}
                alt={`${user.username}'s avatar`}
              />
            </Link>
            <Link className="link" to={"/users/" + post.user_id}>
              <p className="author-username">{user.username}</p>
            </Link>
          </span>
          <div className="single-post-categories">
            {post.categories
              ? post.categories
                  .split(" ")
                  .map((category) => (
                    <li className="single-post-category">{category}</li>
                  ))
              : null}
          </div>
          <span className="single-post-date">
            {new Date(post.created_at).toDateString()}
          </span>
        </div>
        <div className="single-post-images">
          {post.images
            ? post.images
                .split("|")
                .map((image) =>
                  image !== "" ? (
                    <img
                      key={image}
                      className="single-post-img"
                      src={`http://localhost:8000/posts_picture/${image}`}
                      alt={`${user.username}'s post images`}
                    />
                  ) : null
                )
            : null}
        </div>
        <p className="single-post-content">{post.content}</p>
        <div className="activity">
          <div>
            <i class="fas like fa-thumbs-up ">
              <span className="count">{post.likes}</span>
            </i>
            <i class="fas dislike fa-thumbs-down ">
              <span className="count">{post.dislikes}</span>
            </i>
          </div>
          <div onClick={handleComments} style={{ cursor: "pointer" }}>
            <i class="far comment fa-comments">
              <span className="count">{comments.length}</span>
            </i>
          </div>
        </div>
        <div id="show-comments">
          {comments.map((comment) => (
            <div>
              <div className="comments-section">
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Link className="link" to={"/users/" + post.user_id}>
                    <img
                      className="user-reply-img"
                      src={`http://localhost:8000/profile_pictures/${user.profilePicture}`}
                      alt=""
                    />
                    <p>Username</p>
                  </Link>
                  <p>{new Date(comment.created_at).toDateString()}</p>
                </div>
                <p key={comment.id} style={{ textAlign: "center" }}>
                  {comment.content}
                </p>
                <div>
                  <i class="fas comment-like fa-thumbs-up ">
                    <span className="count">{post.likes}</span>
                  </i>
                  <i class="fas comment-dislike fa-thumbs-down ">
                    <span className="count">{post.dislikes}</span>
                  </i>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
