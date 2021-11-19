import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import "./post-update.css";

export default function PostUpdate() {
  const location = useLocation();
  const post_id = location.pathname.split("/")[2];
  const [post, setPost] = useState("");
  useEffect(() => {
    axios.get(`http://localhost:8000/api/posts/${post_id}`).then((response) => {
      setPost(response.data);
    });
  }, [post_id]);
  const [title, setTitle] = useState("");
  const [categories, setCategories] = useState("");
  const [status, setStatus] = useState("active");
  const [state, setState] = useState({ images: [] });
  const [errors, setErrors] = useState(false);

  const [content, setContent] = useState("");

  const { user } = useContext(Context);

  const handleChange = (e) => {
    const imagesArray = [];

    for (let i = 0; i < e.target.files.length; i++) {
      imagesArray.push(e.target.files[i]);
    }
    setState({
      images: imagesArray,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = new FormData();
    for (let i = 0; i < state.images.length; i++) {
      data.append("images[]", state.images[i]);
    }
    if (title) {
      data.append("title", title);
    }
    if (categories) {
      data.append("categories", categories);
    }
    if (content) {
      data.append("content", content);
    }
    data.append("status", status);
    data.append("user_id", user.id);
    data.append("_method", "PATCH");
    console.log(data);
    const response = await axios.post(
      `http://127.0.0.1:8000/api/posts/${post_id}`,
      data
    );
    console.log(response.data);

    if (response.data.error) {
      setErrors(response.data.error);
    } else {
      response.data && window.location.replace(`/users/${user.id}/posts`);
    }
  };

  return (
    <div>
      <span class="page-title">Update your post here:</span>
      <div className="post-update">
        <div className="card">
          <form className="post-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label for="title" className="title">
                Title<span className="required">*</span>
              </label>
              {errors && <span className="required">{errors.title}</span>}
              <input
                type="text"
                placeholder={post.title}
                className="post-update-input"
                autoFocus={true}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
            </div>
            <div className="form-group">
              <label for="categories" className="categories">
                Categories<span className="required">*</span>
              </label>
              {errors && <span className="required">{errors.categories}</span>}

              <input
                type="text"
                placeholder={post.categories}
                className="post-update-input"
                autoFocus={true}
                onChange={(e) => {
                  setCategories(e.target.value);
                }}
              />
            </div>
            <div className="form-group">
              <label for="status" className="status">
                Status<span></span>
              </label>

              <select
                className="post-status"
                placeholder={post.status}
                onChange={(e) => {
                  setStatus(e.target.value);
                }}
              >
                <option>active</option>
                <option>inactive</option>
              </select>
            </div>
            <div className="form-group">
              <label for="content" className="content">
                Content<span className="required">*</span>
              </label>
              {errors && <span className="required">{errors.content}</span>}

              <textarea
                type="text"
                placeholder={post.content}
                className="post-update-input post-text"
                onChange={(e) => {
                  setContent(e.target.value);
                }}
              ></textarea>
            </div>
            <div className="form-group">
              <label className="file_input">
                <div className="upload-section">
                  {state.images.length === 0 ? (
                    <span>Upload picture(s)</span>
                  ) : (
                    <span>{state.images.length} file(s) selected</span>
                  )}
                  <input
                    type="file"
                    id="file_input"
                    style={{ display: "none" }}
                    name="images"
                    onChange={handleChange}
                    multiple
                  />
                  <i class=" add-img-icon fas fa-plus-circle"></i>
                </div>
              </label>
              Previous photo
              <div className="previewed-images">
                {post.images
                  ? post.images
                      .split("|")
                      .map((image) =>
                        image !== "" ? (
                          <img
                            key={image}
                            className="preview-img"
                            src={`http://localhost:8000/posts_picture/${image}`}
                            alt="images"
                          />
                        ) : null
                      )
                  : null}
              </div>
              <div className="previewed-images">
                {state.images
                  ? state.images.map((image) =>
                      image !== "" ? (
                        <div className="previewed-images">
                          <p>Upcoming changes:</p>
                          <img
                            key={image}
                            className="preview-img"
                            src={URL.createObjectURL(image)}
                            alt="images"
                          />
                        </div>
                      ) : null
                    )
                  : null}
              </div>
            </div>
            ;
            <div class="btn">
              <button type="submit" className="post-cancel">
                <Link className="link" to="/">
                  Go back
                </Link>
              </button>
              <button type="submit" className="post-submit">
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
