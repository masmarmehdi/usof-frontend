import Header from "../../Components/Header/Header";
import Posts from "../../Components/Posts/Posts";
import SideBar from "../../Components/SideBar/SideBar";
import "./home.css";
import axios from "axios";
import { useEffect, useState } from "react";
export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetch_posts = async () => {
      const response = await axios.get("http://localhost:8000/api/posts");
      setPosts(response.data);
    };
    fetch_posts();
  });
  return (
    <div>
      <Header />
      <div className="home">
        <Posts posts={posts} />
        <SideBar />
      </div>
    </div>
  );
}
