import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { NavbarComponent } from "./NavbarComponent";
import parse from "html-react-parser";

export const SingleComponent = () => {
  const param = useParams();
  const [blog, setBlog] = useState("");
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API}/blog/${param.slug}`)
      .then((response) => {
        console.log("response", response);
        setBlog(response.data);
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

  return (
    <>
      <div className="container p-5">
        <NavbarComponent />
        {blog && (
          <>
            <h1>{blog.title}</h1>
            <div className="pt-3">{parse(blog.content)}</div>
            <p className="text-muted">
              ผู้เขียน :{blog.author} เผยแพร่ :
              {new Date(blog.createdAt).toLocaleString()}
            </p>
          </>
        )}
      </div>
    </>
  );
};
