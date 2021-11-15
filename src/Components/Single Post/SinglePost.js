import "./single-post.css";
import { useLocation } from "react-router";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Comments from "../Comments/Comments";
import CreateComment from "../CreateComment/CreateComment";
import CreatePostLikeDislike from "../CreatePostLikeDislike/CreatePostLikeDislike";

export default function SinglePost() {
  const location = useLocation();
  const post_id = location.pathname.split("/")[2];
  const [post, setpost] = useState({});
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8000/api/posts/${post_id}`).then((response) => {
      setpost(response.data);
      setLoading(false);
    });
  }, [post_id]);
  const user_id = post.user_id;
  useEffect(() => {
    axios.get(`http://localhost:8000/api/users/${user_id}`).then((response) => {
      setUser(response.data);
    });
  }, [user_id]);
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/posts/${post_id}/comments`)
      .then((res) => {
        setComments(res.data);
      });
  }, [post_id]);
  let display = false;

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
      {loading ? (
        <div className="loader">Loading</div>
      ) : (
        <div>
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
            <p className="single-post-content">{post.content}</p>

            <div className="single-post-images">
              {post.images
                ? post.images.split("|").map((image) =>
                    image !== "" ? (
                      <div className="post-images">
                        <img
                          key={image}
                          className="single-post-img"
                          src={`http://localhost:8000/posts_picture/${image}`}
                          alt={`${user.username}'s post images`}
                        />
                      </div>
                    ) : null
                  )
                : null}
            </div>

            <div className="activity">
              <CreatePostLikeDislike post={post} post_id={post_id} />
              <div onClick={handleComments} style={{ cursor: "pointer" }}>
                <i class="far comment fa-comments">
                  <span className="count">{comments.length}</span>
                </i>
              </div>
            </div>
            <CreateComment post_id={post_id} />
            <Comments
              className="show-comments"
              post={post}
              comments={comments}
            />
          </div>
        </div>
      )}
    </div>
  );
}
