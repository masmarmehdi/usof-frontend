import SideBar from "../../Components/SideBar/SideBar";
import SinglePost from "../../Components/Single Post/SinglePost";
import "./single-page.css";

export default function SinglePage() {
  return (
    <div className="single-page">
      <SinglePost />
      <SideBar />
    </div>
  );
}
