import axios from "axios";
import { useContext, useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { Context } from "../../context/Context";
import "./post-create.css";

export default function PostCreate() {
  const [title, setTitle] = useState("");
  const [categories, setCategories] = useState("");
  const [categoryTags, setCategoryTags] = useState([]);
  const [status, setStatus] = useState("active");
  const [state, setState] = useState({ images: [] });
  const [errors, setErrors] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [availableCategories, setAvailableCategories] = useState([]);

  const [content, setContent] = useState("");
  const [charCount, setCharCount] = useState(0);

  const { user } = useContext(Context);
  const history = useHistory();

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/categories/")
      .then((response) => {
        setAvailableCategories(response.data);
      })
      .catch(() => {});
  }, []);

  const handleCategoryInput = (e) => {
    const value = e.target.value;
    setCategories(value);
    if (value.trim()) {
      const tags = value
        .split(" ")
        .filter((tag) => tag.trim() !== "")
        .map((tag) => tag.trim());
      setCategoryTags(tags);
    } else {
      setCategoryTags([]);
    }
  };

  const removeCategoryTag = (index) => {
    const newTags = categoryTags.filter((_, i) => i !== index);
    setCategoryTags(newTags);
    setCategories(newTags.join(" "));
  };

  const handleChange = (e) => {
    const imagesArray = Array.from(e.target.files);
    setState({ images: imagesArray });
  };

  const removeImage = (index) => {
    setState({ images: state.images.filter((_, i) => i !== index) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors(false);

    if (!title.trim()) {
      setErrors({ title: "Title is required" });
      setIsSubmitting(false);
      return;
    }
    if (!categories.trim()) {
      setErrors({ categories: "At least one category is required" });
      setIsSubmitting(false);
      return;
    }
    if (!content.trim()) {
      setErrors({ content: "Content is required" });
      setIsSubmitting(false);
      return;
    }

    let data = new FormData();
    for (let i = 0; i < state.images.length; i++) {
      data.append("images[]", state.images[i]);
    }
    data.append("title", title.trim());
    data.append("categories", categories.trim());
    data.append("content", content.trim());
    data.append("status", status);
    data.append("user_id", user.id);

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/posts", data);
      if (response.data.error) {
        setErrors(response.data.error);
        setIsSubmitting(false);
      } else {
        history.push("/");
      }
    } catch {
      setErrors({ general: "Something went wrong. Please try again." });
      setIsSubmitting(false);
    }
  };

  return (
    <div className="post-create-wrapper">
      <div className="post-create-layout">

        {/* ── Main form column ── */}
        <div className="post-create-main">
          <div className="post-create-header">
            <h1 className="page-title">
              <i className="fas fa-edit"></i> Ask a Question
            </h1>
            <p className="page-subtitle">
              Share your question with the community and get helpful answers
            </p>
          </div>

          <div className="post-create-card">
            <form className="post-form" onSubmit={handleSubmit}>
              {errors.general && (
                <div className="error-message general-error">
                  <i className="fas fa-exclamation-circle"></i>
                  {errors.general}
                </div>
              )}

              {/* Title */}
              <div className="form-group">
                <label htmlFor="title" className="form-label">
                  Question Title <span className="required">*</span>
                </label>
                {errors && errors.title && (
                  <span className="error-text">{errors.title}</span>
                )}
                <input
                  type="text"
                  id="title"
                  placeholder="What's your question? Be specific."
                  className={`form-input ${errors && errors.title ? "input-error" : ""}`}
                  value={title}
                  autoFocus
                  onChange={(e) => {
                    setTitle(e.target.value);
                    setErrors({ ...errors, title: null });
                  }}
                  maxLength={200}
                />
                <span className="char-count">{title.length}/200</span>
              </div>

              {/* Categories */}
              <div className="form-group">
                <label htmlFor="categories" className="form-label">
                  Tags / Categories <span className="required">*</span>
                  <span className="label-hint">(space-separated)</span>
                </label>
                {errors && errors.categories && (
                  <span className="error-text">{errors.categories}</span>
                )}
                <input
                  type="text"
                  id="categories"
                  placeholder="e.g., javascript react performance"
                  className={`form-input ${errors && errors.categories ? "input-error" : ""}`}
                  value={categories}
                  onChange={handleCategoryInput}
                />

                {/* Active tags */}
                {categoryTags.length > 0 && (
                  <div className="category-tags">
                    {categoryTags.map((tag, index) => (
                      <span key={index} className="category-tag">
                        <span className="tag-hash">#</span>{tag}
                        <button
                          type="button"
                          className="tag-remove"
                          onClick={() => removeCategoryTag(index)}
                        >
                          <i className="fas fa-times"></i>
                        </button>
                      </span>
                    ))}
                  </div>
                )}

                {/* Popular categories */}
                {availableCategories.length > 0 && (
                  <div className="category-suggestions">
                    <span className="suggestions-label">
                      <i className="fas fa-fire"></i> Popular:
                    </span>
                    <div className="suggestions-list">
                      {availableCategories.slice(0, 8).map((cat) => {
                        const isSelected = categoryTags.some(
                          (t) => t.toLowerCase() === cat.title.toLowerCase()
                        );
                        return (
                          <button
                            key={cat.id}
                            type="button"
                            className={`suggestion-tag${isSelected ? " suggestion-tag--selected" : ""}`}
                            disabled={isSelected}
                            onClick={() => {
                              const newCategories = categories
                                ? `${categories} ${cat.title}`
                                : cat.title;
                              setCategories(newCategories);
                              handleCategoryInput({ target: { value: newCategories } });
                            }}
                          >
                            {isSelected ? (
                              <i className="fas fa-check"></i>
                            ) : null}
                            #{cat.title}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="form-group">
                <label htmlFor="content" className="form-label">
                  Description <span className="required">*</span>
                </label>
                {errors && errors.content && (
                  <span className="error-text">{errors.content}</span>
                )}
                <textarea
                  id="content"
                  placeholder="Describe your question in detail. Include what you've already tried, expected vs actual behavior, relevant code, etc."
                  className={`form-textarea ${errors && errors.content ? "input-error" : ""}`}
                  value={content}
                  rows="12"
                  onChange={(e) => {
                    setContent(e.target.value);
                    setCharCount(e.target.value.length);
                    setErrors({ ...errors, content: null });
                  }}
                />
                <div className="textarea-footer">
                  <span className="char-count">{charCount} characters</span>
                  <span className="textarea-hint">
                    <i className="fas fa-lightbulb"></i> Be specific and include examples
                  </span>
                </div>
              </div>

              {/* Status */}
              <div className="form-group">
                <label htmlFor="status" className="form-label">
                  Visibility
                </label>
                <div className="status-select-wrapper">
                  <select
                    id="status"
                    className="form-select"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="active">Public — visible to everyone</option>
                    <option value="inactive">Draft — only you can see it</option>
                  </select>
                  <i className="fas fa-chevron-down select-icon"></i>
                </div>
              </div>

              {/* Images */}
              <div className="form-group">
                <label className="form-label">
                  Images <span className="optional">(Optional)</span>
                </label>
                <div className="file-upload-area">
                  <label htmlFor="file_input" className="file-upload-label">
                    <div className="upload-content">
                      <i className="fas fa-cloud-upload-alt upload-icon"></i>
                      {state.images.length === 0 ? (
                        <>
                          <span className="upload-text">Click to upload or drag and drop</span>
                          <span className="upload-hint">PNG, JPG, GIF up to 10MB</span>
                        </>
                      ) : (
                        <span className="upload-selected">
                          {state.images.length} file{state.images.length > 1 ? "s" : ""} selected
                        </span>
                      )}
                    </div>
                    <input
                      type="file"
                      id="file_input"
                      style={{ display: "none" }}
                      name="images"
                      onChange={handleChange}
                      multiple
                      accept="image/*"
                    />
                  </label>
                </div>
                {state.images.length > 0 && (
                  <div className="previewed-images">
                    {state.images.map((image, index) => (
                      <div key={index} className="preview-image-wrapper">
                        <img
                          className="preview-img"
                          src={URL.createObjectURL(image)}
                          alt={`Preview ${index + 1}`}
                        />
                        <button
                          type="button"
                          className="remove-image-btn"
                          onClick={() => removeImage(index)}
                        >
                          <i className="fas fa-times"></i>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="form-actions">
                <Link to="/" className="btn-action-cancel">
                  <i className="fas fa-arrow-left"></i> Cancel
                </Link>
                <button
                  type="submit"
                  className="btn-action-publish"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <><i className="fas fa-spinner fa-spin"></i> Publishing...</>
                  ) : (
                    <><i className="fas fa-paper-plane"></i> Publish Post</>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* ── Guide Sidebar ── */}
        <aside className="post-create-sidebar">
          <div className="guide-card">
            <div className="guide-card-header">
              <i className="fas fa-lightbulb"></i>
              <span>How to write a great post</span>
            </div>

            <ol className="guide-steps">
              <li className="guide-step">
                <div className="step-number">1</div>
                <div className="step-content">
                  <strong>Write a clear title</strong>
                  <p>Summarize your question or topic in one sentence. Avoid vague titles like "Help needed".</p>
                </div>
              </li>
              <li className="guide-step">
                <div className="step-number">2</div>
                <div className="step-content">
                  <strong>Add relevant tags</strong>
                  <p>Select categories that describe your topic so the right people find your post.</p>
                </div>
              </li>
              <li className="guide-step">
                <div className="step-number">3</div>
                <div className="step-content">
                  <strong>Describe in detail</strong>
                  <p>Include what you've tried, expected vs actual results, and any relevant context.</p>
                </div>
              </li>
              <li className="guide-step">
                <div className="step-number">4</div>
                <div className="step-content">
                  <strong>Add images (optional)</strong>
                  <p>Screenshots, diagrams, or photos can make your post much clearer.</p>
                </div>
              </li>
              <li className="guide-step">
                <div className="step-number">5</div>
                <div className="step-content">
                  <strong>Review before posting</strong>
                  <p>Check spelling and make sure the question is complete and understandable.</p>
                </div>
              </li>
            </ol>
          </div>

          <div className="guide-card guide-card-tips">
            <div className="guide-card-header">
              <i className="fas fa-star"></i>
              <span>Quick tips</span>
            </div>
            <ul className="tips-list">
              <li><i className="fas fa-check"></i> Search first — your question may be answered</li>
              <li><i className="fas fa-check"></i> One question per post</li>
              <li><i className="fas fa-check"></i> Be respectful and constructive</li>
              <li><i className="fas fa-check"></i> Accept answers that helped you</li>
            </ul>
          </div>
        </aside>

      </div>
    </div>
  );
}
