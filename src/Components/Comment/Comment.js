import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Comment({ comment, post }) {
  const [user, setUser] = useState({});
  const user_id = comment.user_id;
  console.log(comment);
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
    <div>
      <div>
        <div className="comments-section">
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Link className="link" to={"/users/" + comment.user_id}>
              <img
                className="user-reply-img"
                src={`http://localhost:8000/profile_pictures/${user.profilePicture}`}
                alt=""
              />
              <p>{user.username}</p>
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
    </div>
  );
}
