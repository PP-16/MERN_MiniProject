import { useNavigate, json } from "react-router-dom";
import { useState } from "react";
import { NavbarComponent } from "./NavbarComponent";
import axios from "axios";
import Swal from "sweetalert2";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { getUser , getToken} from "../service/authorize";

export const FormConponent = () => {
  const [state, setState] = useState({
    title: "",
    // content: "",
    author: getUser(),
  });
  const { title, author } = state;

  const [content, setContent] = useState("");

  const inputValue = (name) => (event) => {
    // console.log(name,":",event.target.value);
    setState({ ...state, [name]: event.target.value });
  };
const navigate = useNavigate()
  const submitContent = (e) => {
    setContent(e);
  };

  const submitForm = (e) => {
    e.preventDefault();
    console.table({ title, content, author });
    console.log("API URL", process.env.REACT_APP_API);
    axios
      .post(`${process.env.REACT_APP_API}/create`, { title, content, author },{headers:{
        Authorization: getToken()
      }})
      .then((response) => {
        Swal.fire({
          title: "Alert!",
          text: "Save data success!",
          icon: "success",
        });
        setContent("")
       
        setState({ ...state, title: "", author: "" });
        navigate("/")
        // alert("Save data success");
      })
      .catch((e) => {
        Swal.fire({
          title: "Alert!",
          text: e.response.data.error,
          icon: "error",
        });
        // alert(e.response.data.error);
      });
  };

  return (
    <>
      <div className="container p-5">
        <NavbarComponent />
        <h1>Create Form</h1>
        {/* {JSON.stringify(state)} */}
        <form onSubmit={submitForm}>
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              className="form-control"
              placeholder="pls input your title !!!"
              value={title}
              onChange={inputValue("title")}
            />
          </div>
          <div className="form-group">
            <label>Contents</label>
            <ReactQuill
              value={content}
              onChange={setContent}
              theme="snow"
              className="pb-5 mb-3"
              placeholder="input description data"
              style={{ border: "1px solid #666" }}
            />
            {/* <textarea
              className="form-control"
              placeholder="pls input your contents !!!"
              value={content}
              onChange={inputValue("content")}
            ></textarea> */}
          </div>
          <div className="form-group">
            <label>Author</label>
            <input
              type="text"
              className="form-control"
              placeholder="pls input your name!!!"
              value={author}
              onChange={inputValue("author")}
            />
          </div>
          <br />
          <input type="submit" value="save" className="btn btn-success" />
        </form>
      </div>
    </>
  );
};
