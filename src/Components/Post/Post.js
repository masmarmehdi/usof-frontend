import { Link } from "react-router-dom";
import "./post.css";

export default function Post({ post }) {
  return (
    <div className="post">
      <img
        className="post-img"
        src={`http://localhost:8000/posts_picture/${post.images}`}
        alt=""
      />
      <div className="post-data">
        <div className="post-categories">
          {/* Adding multiple categories for a specific post (still not working)
           {post.categories.map((category) => (
            <li className="category">{category.title}</li>
          ))} 
          */}
          <li className="category">{post.categories}</li>
        </div>
        <Link to={`posts/${post.id}`} className="link">
          <span className="post-title">{post.title} </span>
        </Link>
        <hr />
        <span className="post-date">
          {new Date(post.created_at).toDateString()}
        </span>
      </div>
      <p className="post-content">{post.content}</p>
    </div>
  );
}
