import "./post.css";

export default function Post() {
  return (
    <div className="post">
      <img
        className="post-img"
        src="https://cdn.pixabay.com/photo/2016/11/14/05/21/children-1822688_960_720.jpg"
        alt=""
      />
      <div className="post-data">
        <div className="post-categories">
          <li className="category">Study</li>
          <li className="category">Sport</li>
        </div>
        <span className="post-title">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.{" "}
        </span>
        <hr />
        <span className="post-date">2 hours ago</span>
      </div>
      <p className="post-content">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras et
        suscipit odio, non aliquam felis. Vivamus dictum nisi eget finibus
        finibus. Curabitur et ullamcorper nisi. Sed maximus euismod suscipit.
        Nullam orci lectus, congue a arcu quis, ullamcorper pretium risus. Cras
        laoreet a risus eget commodo. Orci varius natoque penatibus et magnis
        dis parturient montes, nascetur ridiculus mus. Aliquam sed est sed augue
        rhoncus molestie. Interdum et malesuada fames ac ante ipsum primis in
        faucibus. Morbi viverra libero justo, ac tincidunt justo eleifend vel.
        Nullam vestibulum orci dui, vitae semper nibh rhoncus vel.
      </p>
    </div>
  );
}
