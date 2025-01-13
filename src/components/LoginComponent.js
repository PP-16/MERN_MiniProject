import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { NavbarComponent } from "./NavbarComponent";
import axios from "axios";
import Swal from "sweetalert2";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { authenticate, getUser } from "../service/authorize";

export const LoginComponent = () => {
  const [state, setState] = useState({
    username: "",
    password: "",
  });
  const { username, password } = state;

  const inputValue = (name) => (event) => {
    // console.log(name,":",event.target.value);
    setState({ ...state, [name]: event.target.value });
  };
  const navigate = useNavigate();
  const submitForm = (e) => {
    e.preventDefault();
    console.table({ state });
    axios
      .post(`${process.env.REACT_APP_API}/login`, { username, password })
      .then((respnse) => authenticate(respnse, () => navigate("/")))
      .catch((err) => {
        Swal.fire({
          title: "Alert!",
          text: err.response.data.error,
          icon: "error",
        });
      });
  };

  useEffect(() => {
    getUser() && navigate("/");
  }, []);

  return (
    <>
      <div className="container p-5">
        <NavbarComponent />
        <h1>Login | Admin</h1>
        {/* {JSON.stringify(state)} */}
        <form onSubmit={submitForm}>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              className="form-control"
              placeholder="pls input your name !!!"
              value={username}
              onChange={inputValue("username")}
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="pls input your password!!!"
              value={password}
              onChange={inputValue("password")}
            />
          </div>
          <br />
          <input type="submit" value="login" className="btn btn-success" />
        </form>
      </div>
    </>
  );
};
// export default withRouter(LoginComponent)
