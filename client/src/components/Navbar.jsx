import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { getUserDetails } from "../userDetails";
import Ability from "../role/Ability";

const Navbar = () => {
  const nav = useNavigate();
  const user = getUserDetails();

  const logOut = () => {
    Cookies.remove("token");
    nav("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {/* Home Link */}
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">
                Home
              </Link>
            </li>
            {/* Conditionally render the Assign button */}
            {Ability(["admin", "user"]) && (
              <li className="nav-item">
                <button className="btn btn-primary" onClick={() => nav("/assign")}>
                  Assign
                </button>
              </li>
            )}
            {/* Conditionally show Login or Logout */}
            <li className="nav-item">
              {user ? (
                <span
                  className="nav-link"
                  onClick={logOut}
                  style={{ cursor: "pointer" }}
                >
                  Logout
                </span>
              ) : (
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              )}
            </li>
            {/* Display user name or Signup */}
            <li className="nav-item">
              {user ? (
                <span className="nav-link">{user.name}</span>
              ) : (
                <Link className="nav-link" to="/signup">
                  Signup
                </Link>
              )}
            </li>
          </ul>
          {/* Search Form */}
          <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
