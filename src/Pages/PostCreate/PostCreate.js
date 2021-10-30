import axios from "axios";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import "./post-create.css";

export default function PostCreate() {
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
    data.append("title", title);
    data.append("categories", categories);
    data.append("content", content);
    data.append("status", status);
    data.append("user_id", user.user.id);
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/posts",
        data
      );
      console.log(response.data.error);

      if (response.data.error) {
        setErrors(response.data.error);
      } else {
        response.data && window.location.replace("/");
      }
    } catch (error) {}
  };
  return (
    <div>
      <span class="page-title">Create a new post</span>
      <div className="post-create">
        <div className="card">
          <form className="post-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label for="title" className="title">
                Title<span className="required">*</span>
              </label>
              {errors && <span className="required">{errors.title}</span>}
              <input
                type="text"
                placeholder="Title"
                className="post-create-input"
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
                placeholder="Categories"
                className="post-create-input"
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
                value={status}
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
                placeholder="What's on your mind?"
                type="text"
                className="post-create-input post-text"
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
              <div className="previewed-images">
                {state.images
                  ? state.images.map((image) =>
                      image !== "" ? (
                        <img
                          key={image}
                          className="preview-img"
                          src={URL.createObjectURL(image)}
                          alt="images"
                        />
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
                Publish
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
