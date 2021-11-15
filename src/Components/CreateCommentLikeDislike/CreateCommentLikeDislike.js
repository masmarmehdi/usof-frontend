import axios from "axios";
import React, { useContext } from "react";
import { Context } from "../../context/Context";

export default function CreateCommentLikeDislike({ comment_id, comment }) {
  const { user } = useContext(Context);

  const createCommentLike = () => {
    axios
      .post(`http://127.0.0.1:8000/api/comments/${comment_id}/like`, {
        type: "like",
        comment_id,
        user_id: user.id,
      })
      .then((response) => {
        console.log(response.data);
      });
  };
  const createCommentDislike = () => {
    axios
      .post(`http://127.0.0.1:8000/api/comments/${comment_id}/dislike`, {
        type: "dislike",
        comment_id,
        user_id: user.id,
      })
      .then((response) => {
        console.log(response.data);
      });
  };

  return (
    <div>
      <button onClick={createCommentLike} className="count">
        <i class="fas like fa-thumbs-up ">{comment.likes}</i>
      </button>
      <button onClick={createCommentDislike} className="count">
        <i class="fas dislike fa-thumbs-down ">{comment.dislikes}</i>
      </button>
    </div>
  );
}
