import "./single-post.css";
import mmasmar from "../../images/mmasmar.png";

export default function SinglePost() {
  return (
    <div className="single-post">
      <div className="single-post-wrapper">
        <h1 className="single-post-title">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi quis
          nibh at tellus molestie efficitur.
        </h1>
        <div className="single-post-data">
          <span className="post-author">
            <img className="author-img" src={mmasmar} alt="mmasmar" />
            <b>mmasmar</b>
          </span>
          <span className="single-post-date">1 hour ago</span>
        </div>
        <img
          className="single-post-img"
          src="https://cdn.pixabay.com/photo/2021/10/04/16/42/dog-6680642_960_720.jpg"
          alt="happy dog"
        />
        <p className="single-post-content">
          Lorem consectetur consectetur nulla sunt enim quis voluptate duis.
          Aliqua occaecat cillum tempor dolore culpa commodo est aliqua quis
          pariatur minim. Amet ipsum ut esse non proident dolor eiusmod est ea
          do anim. Et esse do ullamco qui laborum aliquip in adipisicing.
          Voluptate cillum in quis nulla tempor.
          <br />
          Vestibulum dictum, nunc eget consectetur fringilla, turpis mauris
          semper sapien, eget rutrum ligula ipsum pharetra metus. Maecenas a
          placerat turpis. Nam bibendum urna ut sollicitudin finibus. Curabitur
          quis quam in odio viverra condimentum. Donec dignissim orci et
          ultrices elementum. Ut vel tincidunt ante. Pellentesque habitant morbi
          tristique senectus et netus et malesuada fames ac turpis egestas.
          Aenean convallis, odio id venenatis consequat, neque lorem efficitur
          est, faucibus aliquam urna tellus sed est. Maecenas convallis, elit
          non tempor hendrerit, risus massa faucibus velit, quis sollicitudin
          urna lectus a turpis. Maecenas ut magna rutrum, scelerisque mauris
          vitae, luctus nisl. In scelerisque turpis vitae enim consectetur, quis
          dignissim quam faucibus. Morbi dignissim vitae urna id ornare.
          <br />
          Vestibulum dictum, nunc eget consectetur fringilla, turpis mauris
          semper sapien, eget rutrum ligula ipsum pharetra metus. Maecenas a
          placerat turpis. Nam bibendum urna ut sollicitudin finibus. Curabitur
          quis quam in odio viverra condimentum. Donec dignissim orci et
          ultrices elementum. Ut vel tincidunt ante. Pellentesque habitant morbi
          tristique senectus et netus et malesuada fames ac turpis egestas.
          Aenean convallis, odio id venenatis consequat, neque lorem efficitur
          est, faucibus aliquam urna tellus sed est. Maecenas convallis, elit
          non tempor hendrerit, risus massa faucibus velit, quis sollicitudin
          urna lectus a turpis. Maecenas ut magna rutrum, scelerisque mauris
          vitae, luctus nisl. In scelerisque turpis vitae enim consectetur, quis
          dignissim quam faucibus. Morbi dignissim vitae urna id ornare.
        </p>
        <div className="activity">
          <div>
            <i class="far like fa-thumbs-up">100</i>
            <i class="far dislike fa-thumbs-down">20</i>
          </div>
          <div>
            <i class="far comment fa-comments"></i>
          </div>
        </div>
      </div>
    </div>
  );
}
