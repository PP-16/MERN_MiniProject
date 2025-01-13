import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUser, logout } from "../service/authorize";

export const NavbarComponent = () => {
  const navigate = useNavigate();
  return (
    <nav>
      <ul className="nav nav-tabs">
        <li className="nav-item p-2">
          <Link to="/" className="nav-link">
            Home
          </Link>
        </li>
        {getUser() !== false ? (
          <li className="nav-item p-2">
            <Link to="/create" className="nav-link">
              Create Form
            </Link>
          </li>
        ) : null}
        {getUser() === false ? (
   <>
          <li className="nav-item p-2">
            <Link to="/login" className="nav-link">
              Login
            </Link>
          </li>
           <li className="nav-item p-2">
           <Link to="/register" className="nav-link">
             Register
           </Link>
         </li>
   </>
        ) : (
          <li className="nav-item p-2">
            <button
              className="nav-link"
              onClick={() => logout(() => navigate("/"))}
            >
              Logout
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};
