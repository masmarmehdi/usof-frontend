import axios from "axios";
import React, { useContext } from "react";
import { Context } from "../../context/Context";

export default function CreatePostLikeDislike({ post, post_id }) {
  const { user } = useContext(Context);

  const createPostLike = () => {
    axios
      .post(`http://127.0.0.1:8000/api/posts/${post_id}/like`, {
        type: "like",
        post_id,
        user_id: user.id,
      })
      .then((response) => {
        console.log(response.data);
      });
  };
  const createPostDislike = () => {
    axios
      .post(`http://127.0.0.1:8000/api/posts/${post_id}/dislike`, {
        type: "dislike",
        post_id,
        user_id: user.id,
      })
      .then((response) => {
        console.log(response.data);
      });
  };

  return (
    <div>
      <button onClick={createPostLike} className="count">
        <i class="fas like fa-thumbs-up ">{post.likes}</i>
      </button>
      <button onClick={createPostDislike} className="count">
        <i class="fas dislike fa-thumbs-down ">{post.dislikes}</i>
      </button>
    </div>
  );
}
