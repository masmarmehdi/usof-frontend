import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import CreateCommentLikeDislike from "../CreateCommentLikeDislike/CreateCommentLikeDislike";
import "./comment.css";
export default function Comment({ post_id, comment }) {
  const { user } = useContext(Context);
  const [commentedUser, setCommentedUser] = useState({});
  const [content, setContent] = useState("");
  const [updateMode, setupdateMode] = useState(false);
  const commentedUser_id = comment.user_id;
  useEffect(() => {
    const fetch_user = async () => {
      const response = await axios.get(
        `http://localhost:8000/api/users/${commentedUser_id}`
      );
      setCommentedUser(response.data);
    };
    fetch_user();
  }, [commentedUser_id]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = new FormData();
    data.append("user_id", user.id);
    data.append("_method", "PATCH");
    data.append("content", content);

    console.log(data);
    const response = await axios.post(
      `http://127.0.0.1:8000/api/comments/${comment.id}`,
      data
    );
    console.log(response.data);
    if (response.data) {
      setupdateMode(false);
      window.location.reload();
    }
  };
  const updateComment = () => {
    if (updateMode) {
      setupdateMode(false);
    } else {
      setupdateMode(true);
    }
  };
  const handleCommentChange = (e) => {
    setContent(e.target.value);
  };
  const deleteComment = async () => {
    const response = await axios.delete(
      `http://127.0.0.1:8000/api/comments/${comment.id}`,
      {
        user_id: user.id,
      }
    );
    if (!response.data.error) {
      window.location.reload();
    }
  };
  return (
    <div>
      <div>
        <div className="comments-section">
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Link className="link" to={"/users/" + commentedUser_id}>
              <img
                className="user-reply-img"
                src={`http://localhost:8000/profile_pictures/${commentedUser.profilePicture}`}
                alt=""
              />
              <p>{commentedUser.username}</p>
            </Link>
            <p>{new Date(comment.created_at).toDateString()}</p>
            {commentedUser_id === user.id ? (
              <div className="update-delete-comment">
                <div>
                  <button className="edit-comment-btn" onClick={updateComment}>
                    Edit
                  </button>
                </div>
                <div>
                  <button
                    onClick={deleteComment}
                    className="delete-comment-btn"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ) : null}
          </div>
          {updateMode ? (
            <div>
              <form onSubmit={handleSubmit} className="comment-form">
                <input
                  type="text"
                  className="update-comment-form"
                  placeholder={comment.content}
                  onChange={handleCommentChange}
                />
                <button className="save-comment-btn">Save changes</button>
              </form>
            </div>
          ) : (
            <p
              key={comment.id}
              style={{ textAlign: "center" }}
              className="comment-content"
            >
              {comment.content}
            </p>
          )}

          <CreateCommentLikeDislike
            comment_id={comment.id}
            comment={comment}
            post_id={post_id}
          />
        </div>
      </div>
    </div>
  );
}
