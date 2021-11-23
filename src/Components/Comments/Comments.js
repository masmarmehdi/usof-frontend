import React from "react";
import "./comments.css";
import Comment from "../Comment/Comment";

export default function Comments({ post, comments }) {
  return (
    <div id="show-comments">
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} post_id={post.id} />
      ))}
    </div>
  );
}
