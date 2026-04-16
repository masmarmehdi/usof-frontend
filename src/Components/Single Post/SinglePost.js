import "./single-post.css";
import { useHistory, useLocation } from "react-router";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Comments from "../Comments/Comments";
import CreateComment from "../CreateComment/CreateComment";
import CreatePostLikeDislike from "../CreatePostLikeDislike/CreatePostLikeDislike";
import { Context } from "../../context/Context";

export default function SinglePost() {
  const { user: authUser } = useContext(Context);
  const location = useLocation();
  const post_id = location.pathname.split("/")[2];

  const [post, setPost] = useState({});
  const [author, setAuthor] = useState({});
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showComments, setShowComments] = useState(false);

  const history = useHistory();

  useEffect(() => {
    axios.get(`http://localhost:8000/api/posts/${post_id}`).then((res) => {
      setPost(res.data);
      setLoading(false);
    });
  }, [post_id]);

  useEffect(() => {
    if (!post.user_id) return;
    axios
      .get(`http://localhost:8000/api/users/${post.user_id}`)
      .then((res) => setAuthor(res.data));
  }, [post.user_id]);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/posts/${post_id}/comments`)
      .then((res) => setComments(res.data));
  }, [post_id]);

  const deletePost = async () => {
    await axios.delete(`http://localhost:8000/api/posts/${post_id}`);
    history.push(`/users/${author.id}/posts`);
  };

  if (loading) {
    return (
      <div className="single-post-page">
        <article className="post-card">
          <div className="post-card-content">

            {/* Title */}
            <div className="sp-sk-title-row">
              <div className="skeleton-line sp-sk-title"></div>
              <div className="skeleton-line sp-sk-title short"></div>
            </div>

            {/* Meta */}
            <div className="sp-sk-meta">
              <div className="skeleton-line sp-sk-avatar"></div>
              <div className="sp-sk-author-info">
                <div className="skeleton-line sp-sk-name"></div>
                <div className="skeleton-line sp-sk-role"></div>
              </div>
              <div className="skeleton-line sp-sk-date"></div>
            </div>

            {/* Tags */}
            <div className="sp-sk-tags">
              <div className="skeleton-line sp-sk-tag"></div>
              <div className="skeleton-line sp-sk-tag"></div>
              <div className="skeleton-line sp-sk-tag"></div>
            </div>

            {/* Content + image */}
            <div className="sp-sk-body">
              <div className="sp-sk-lines">
                <div className="skeleton-line skeleton-body"></div>
                <div className="skeleton-line skeleton-body"></div>
                <div className="skeleton-line skeleton-body short"></div>
                <div className="skeleton-line skeleton-body"></div>
                <div className="skeleton-line skeleton-body short"></div>
              </div>
              <div className="skeleton-line sp-sk-image"></div>
            </div>

          </div>
        </article>
      </div>
    );
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return date.toLocaleDateString("en-US", { 
      month: "long", 
      day: "numeric", 
      year: "numeric" 
    });
  };

  return (
    <div className="single-post-page">
      <article className="post-card">
        <div className="post-card-content">
          {/* Header */}
          <header className="post-header">
            <div className="post-header-content">
              <h1 className="post-title">{post.title}</h1>
              {post.user_id === authUser?.id && (
                <div className="post-actions">
                  <Link 
                    to={`/posts/${post.id}/update`} 
                    className="btn-action btn-edit"
                    title="Edit post"
                  >
                    <i className="fas fa-edit"></i> Edit
                  </Link>
                  <button 
                    className="btn-action btn-delete" 
                    onClick={deletePost}
                    title="Delete post"
                  >
                    <i className="fas fa-trash"></i> Delete
                  </button>
                </div>
              )}
            </div>
          </header>

          {/* Meta */}
          <div className="post-meta">
            <Link to={`/users/${author.id}`} className="author">
              <img
                src={`http://localhost:8000/profile_pictures/${author.profilePicture}`}
                alt={author.username}
                className="author-avatar"
              />
              <div className="author-info">
                <span className="author-name">{author.username}</span>
                <span className="author-role">{author.role || "User"}</span>
              </div>
            </Link>
            <div className="post-meta-right">
              <span className="post-date">
                <i className="far fa-clock"></i>
                {formatDate(post.created_at)}
              </span>
            </div>
          </div>

          {/* Categories */}
          {post.categories && (
            <div className="post-tags">
              {post.categories.split(" ").map((cat, index) => (
                <span key={index} className="tag">
                  <i className="fas fa-tag"></i> {cat}
                </span>
              ))}
            </div>
          )}

          {/* Content + Images side by side */}
          <div className="post-body-row">
            <div className="single-post-content">
              <div className="content-text">{post.content}</div>
            </div>

            {post.images && post.images.split("|").some(img => img !== "") && (
              <div className="post-images">
                {post.images.split("|").map(
                  (img, index) =>
                    img && (
                      <img
                        key={index}
                        src={`http://localhost:8000/posts_picture/${img}`}
                        alt={`Post image ${index + 1}`}
                        className="post-image"
                      />
                    )
                )}
              </div>
            )}
          </div>
        </div>

        <div className="post-card-content">
          {/* Footer Actions */}
          <footer className="post-footer">
            <div className="post-actions-left">
              <CreatePostLikeDislike post={post} post_id={post_id} />
            </div>
            <button
              className="comment-toggle"
              onClick={() => setShowComments(!showComments)}
            >
              <i className="fas fa-comments"></i>
              <span>{comments.length} {comments.length === 1 ? 'Answer' : 'Answers'}</span>
              <i className={`fas fa-chevron-${showComments ? 'up' : 'down'}`}></i>
            </button>
          </footer>

          {/* Divider */}
          <div className="post-divider"></div>

          {/* Comments Section */}
          <div className="comments-section">
            <CreateComment post_id={post_id} />

            {showComments && (
              <div className="comments-container">
                <div className="comments-header">
                  <h3>
                    <i className="fas fa-comments"></i> 
                    {comments.length} {comments.length === 1 ? 'Answer' : 'Answers'}
                  </h3>
                </div>
                <Comments post={post} comments={comments} />
              </div>
            )}
          </div>
        </div>
      </article>
    </div>
  );
}
