import { Link } from "react-router-dom";
import "./post.css";

export default function Post({ post }) {
  const hasImage = post.images && post.images.split("|")[0] !== "";
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  return (
    <article className="post">
      <Link to={`/posts/${post.id}`} className="post-link">
        <div className="post-body">
          <div className="post-header">
            <div className="post-categories">
              {post.categories
                ? post.categories
                    .split(" ")
                    .slice(0, 3)
                    .map((category, index) => (
                      <span key={index} className="category">
                        {category}
                      </span>
                    ))
                : null}
            </div>
            <span className="post-date">
              <i className="far fa-clock"></i>
              {formatDate(post.created_at)}
            </span>
          </div>

          <h2 className="post-title">{post.title}</h2>

          <p className="post-content">{post.content}</p>

          <div className="post-footer">
            <span className="read-more">
              Read more <i className="fas fa-arrow-right"></i>
            </span>
          </div>
        </div>

        {hasImage && (
          <div className="post-image-wrapper">
            <img
              className="post-img"
              src={`http://localhost:8000/posts_picture/${post.images.split("|")[0]}`}
              alt={post.title}
            />
          </div>
        )}
      </Link>
    </article>
  );
}
