import Post from "../Post/Post";
import "./posts.css";

export default function Posts({ posts }) {
  return (
    <div className="posts">
      {posts.map((post) => (
        <Post post={post} />
      ))}
    </div>
  );
}
