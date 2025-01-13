import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { NavbarComponent } from "./NavbarComponent";
import axios from "axios";
import Swal from "sweetalert2";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { getToken} from "../service/authorize";

export const EditConponent = () => {
  const param = useParams();
  console.log("param", param);
  const [state, setState] = useState({
    title: "",
    author: "",
    slug:""
  });
  const { title,  author,slug } = state;
  const [content, setContent] = useState("");
  const inputValue = (name) => (event) => {
    // console.log(name,":",event.target.value);
    setState({ ...state, [name]: event.target.value });
  };
  //   console.log("state :", state);
  const submitContent = (e) => {
    setContent(e);
  };
 const navigate = useNavigate()

  //getdata to update
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API}/blog/${param.slug}`)
      .then((response) => {
        // console.log("response", response.data);
        const { title, content, author, slug } = response.data;
        setState({ ...state, title, author, slug });
        setContent(content)
        // setBlog(response.data);
      })
      .catch((e) => {
        Swal.fire({
          title: "Alert!",
          text: e.response.data.error,
          icon: "error",
        });
        // alert(e.response.data.error);
      });
  }, []);
  const submitForm = (e) => {
    e.preventDefault();
    // console.table({ title, content, author });
    console.log("API URL", process.env.REACT_APP_API);
    axios
      .put(`${process.env.REACT_APP_API}/updateblog/${slug}`, { title, content, author },{headers:{
        Authorization: getToken()
      }})
      .then((response) => {
        Swal.fire({
          title: "Alert!",
          text: "Update data success!",
          icon: "success"
        });
     
      const { title, content, author,slug } =  response.data
        setState({...state, title, content, author,slug })
        // alert("Save data success");
        navigate("/")
      })
      .catch((e) => {
        Swal.fire({
          title: "Alert!",
          text: e.response.data.error,
          icon: "error"
        });
        // alert(e.response.data.error);
      });
};

const showUpdateFrom = () => (
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
    <input type="submit" value="update" className="btn btn-success" />
  </form>
);

  return (
    <>
      <div className="container p-5">
        <NavbarComponent />
        <h1>Edit Form</h1>
        {showUpdateFrom()}
      </div>
    </>
  );
};
