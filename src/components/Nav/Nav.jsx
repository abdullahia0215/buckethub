import React from "react";
import { Link } from "react-router-dom";
import LogOutButton from "../LogOutButton/LogOutButton";
import "./Nav.css";
import { useSelector } from "react-redux";

function Nav() {
  const user = useSelector((store) => store.user);

  return (
    <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/home">
          BucketHub
        </Link>
        {/* <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          // data-bs-target="#navbarColor01"
          // aria-controls="navbarColor01"
        >
          <span className="navbar-toggler-icon"></span>
        </button> */}
        <div className="collapse navbar-collapse" id="navbarColor01">
          <ul className="navbar-nav ms-auto">
            {user.id === null && (
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Login / Register
                </Link>
              </li>
            )}
            {user.id && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/brigades">
                    Brigades
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/myBucket">
                    My Bucket
                  </Link>
                </li>

                <li className="nav-item">
                  <LogOutButton className="nav-link" />
                </li>
              </>
            )}
                            <li className="nav-item">
                  <Link className="nav-link" to="/about">
                    About
                  </Link>
                </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
