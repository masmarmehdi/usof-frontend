import { Link } from "react-router-dom";
import "./post.css";

export default function Post({ post }) {
  return (
    <div className="post">
      {post.images
        ? post.images
            .split("|")
            .map((image) =>
              image !== "" ? (
                <img
                  key={image}
                  className="post-img"
                  src={`http://localhost:8000/posts_picture/${image}`}
                  alt="Avatar"
                />
              ) : null
            )
        : null}
      <div className="post-data">
        <div className="post-categories">
          {post.categories
            ? post.categories
                .split(" ")
                .map((category) => <li className="category">{category}</li>)
            : null}
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
