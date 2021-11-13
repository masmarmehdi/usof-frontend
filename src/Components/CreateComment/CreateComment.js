import axios from "axios";
import React, { useContext, useState } from "react";
import { Context } from "../../context/Context";
import "./create-comment.css";

export default function CreateComment({ post_id }) {
  const { user } = useContext(Context);
  const [content, setContent] = useState("");
  const [errors, setErrors] = useState(false);
  let data = new FormData();
  data.append("post_id", post_id);
  data.append("user_id", user.id);
  data.append("content", content);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors(false);
    const response = await axios.post(
      `http://127.0.0.1:8000/api/posts/${post_id}/comments`,
      data
    );
    if (response.data.error) {
      setErrors(response.data.error);
    } else {
      response.data && window.location.reload();
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="create-comment">
          {errors && <span>{errors}</span>}
          <input
            type="text"
            className="comment-input"
            placeholder="Tell your opinion about this post"
            onChange={(e) => setContent(e.target.value)}
          />
          <button type="submit">Comment</button>
        </div>
      </form>
    </div>
  );
}
