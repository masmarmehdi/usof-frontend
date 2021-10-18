import "./post-create.css";

export default function PostCreate() {
  return (
    <div className="post-create">
      <span class="page-title">Create a new post</span>
      <div className="card">
        <form className="post-form">
          <div className="form-group">
            <label for="title" className="title">
              Title<span className="required">*</span>
            </label>
            <input
              type="text"
              placeholder="Title"
              className="post-create-input"
              autoFocus={true}
            />
          </div>
          <div className="form-group">
            <label for="categories" className="categories">
              Categories<span className="required">*</span>
            </label>
            <input
              type="text"
              placeholder="Categories"
              className="post-create-input"
              autoFocus={true}
            />
          </div>
          <div className="form-group">
            <label for="content" className="content">
              Content<span className="required">*</span>
            </label>
            <textarea
              placeholder="What's on your mind?"
              type="text"
              className="post-create-input post-text"
            ></textarea>
          </div>
          <div className="form-group">
            <label className="file_input">
              <div className="upload-section">
                <span>Upload picture(s)</span>
                <i class=" add-img-icon fas fa-plus-circle"></i>
              </div>
            </label>
            <input type="file" id="file_input" style={{ display: "none" }} />
          </div>
          ;
          <div class="btn">
            <button type="submit" className="post-cancel">
              Go back
            </button>
            <button type="submit" className="post-submit">
              Publish
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// import React, { useState } from 'react';
// import Header from '../Components/HeaderComponent';
// import Footer from '../Components/FooterComponent';
// import { Link } from 'react-router-dom';
// import "../css/createPost.css"
// import { useHistory } from 'react-router';

// function CreatePost(){
//     const [title, setTitle] = useState(null)
//     const [content, setContent] = useState(null)
//     const [categories, setCategories] = useState(null)
//     const [state, setState] = useState({selectedFile: "", responseArray: [],})
//     const history = useHistory()
//     const handleInputChange = (event) => {
//         setState({
//           selectedFile: event.target.files,
//           responseArray:[]
//         });
//         document.querySelector('.selectfile').style.background = "#181b58"
//         document.querySelector('.selectfile').style.color = "white"
//         document.querySelector('.selectfile').innerHTML = "File(s) selected"
//     }
//     const formData = new FormData()
//     function Create(){
//         if(!title || !content || !categories){
//             alert('Fields with (*) are required!')
//         }else{
//             if(localStorage.getItem('user-info')){
//                 const createPostUrl = `http://127.0.0.1:8000/api/posts/`;
//                 for (let i = 0; i < state.selectedFile.length; i++) {
//                     formData.append("images[]", state.selectedFile[i]);
//                 }
//                 formData.append('title', title);
//                 formData.append('categories', categories);
//                 formData.append('content', content);
//                 formData.append('user', localStorage.getItem('user-info'));
//                 fetch(createPostUrl, {
//                     method: 'POST',
//                     body:  formData,
//                 })
//                 .then((result) => {
//                     console.log('Success:', result);
//                     alert('Post created successfully!')
//                     history.push('/')
//                 })
//             }else{
//                 alert('Login or register first!')
//             }
//         }
//     }
