import { useState, useEffect } from "react";
import "./App.css";
import { Link, json } from "react-router-dom";
import { NavbarComponent } from "./components/NavbarComponent";
import axios from "axios";
import Swal from "sweetalert2";
import parse from "html-react-parser";
import { getUser,getToken } from "./service/authorize";

function App() {
  const [blogs, setBlogs] = useState([]);
  const fetchData = () => {
    axios
      .get(`${process.env.REACT_APP_API}/blogs`)
      .then((response) => {
        setBlogs(response.data);
      })
      .catch((err) => {
        Swal.fire({
          title: "Alert!",
          text: err.response.data.error,
          icon: "error",
        });
      });
  };

  useEffect(() => {
    fetchData();
    getUser()
  }, []);

  const confirmDelete = (slug) => {
    Swal.fire({
      title: "Are you sure",
      icon: "warning",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        deleteBlog(slug);
      }
    });
  };
  const deleteBlog = (slug) => {
    axios
      .delete(`${process.env.REACT_APP_API}/removeblog/${slug}`,{headers:{
        Authorization: getToken()
      }})
      .then((response) => {
        Swal.fire({
          title: "Deleted",
          text: response.data.message,
          icon: "success",
        });
        fetchData();
      })
      .catch((err) => console.log("err", err));
  };

  return (
    <div className="container p-5">
      <NavbarComponent />
      {/* {JSON.stringify(blogs)} */}
      {blogs.map((blog, index) => (
        <>
          <div
            className="row"
            key={index}
            style={{ borderBottom: "1px solid silver" }}
          >
            <div className="col pt-3 pb-2">
              <Link to={`/blog/${blog.slug}`}>
                <h2>{blog.title}</h2>
              </Link>
              <div className="pt-3">
                {parse(blog.content.substring(0, 250))}
              </div>
              <p className="text-muted">
                ผู้เขียน :{blog.author} เผยแพร่ :{" "}
                {new Date(blog.createdAt).toLocaleString()}
              </p>
              {getUser() ? (
                <>
                  <Link
                    className="btn btn-outline-warning"
                    to={`/blog/edit/${blog.slug}`}
                  >
                    Update
                  </Link>
                  &nbsp;
                  <button
                    className="btn btn-outline-danger"
                    onClick={() => confirmDelete(blog.slug)}
                  >
                    Delete
                  </button>
                </>
              ):null}
            </div>
          </div>
        </>
      ))}
    </div>
  );
}

export default App;
