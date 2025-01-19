import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { Context } from "../../index";
import { GiHamburgerMenu } from "react-icons/gi";
import { BiUser } from "react-icons/bi";

import "./Navbar.css";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");

  const { isAuthorized, setIsAuthorized, user, setUser } = useContext(Context);
  const navigate = useNavigate();

  // On component mount, check if user data is stored in localStorage
  useEffect(() => {
    console.log("useEffect triggered");

    const savedUser = localStorage.getItem("user");
    const savedIsAuthorized = localStorage.getItem("isAuthorized");
    const token = localStorage.getItem("token");

    console.log("Saved User:", savedUser);
    console.log("Saved IsAuthorized:", savedIsAuthorized);
    console.log("Saved Token:", token);
    if (savedUser && savedIsAuthorized && token) {
      setUser(JSON.parse(savedUser));
      setIsAuthorized(JSON.parse(savedIsAuthorized));
      console.log("User is authenticated, restoring session...");
    } else {
      console.log("No valid session, logging out...");
      handleLogout(); // If no valid session, force logout
    }
  }, []);

  const handleLogout = async () => {
    console.log("Logging out..."); // Debug log

    try {
      const response = await axios.get(
        "http://localhost:4000/api/v1/user/logout",
        {
          withCredentials: true,
        }
      );

      console.log("Logout Response:", response); // Debug log
      toast.success(response.data.message);
      setIsAuthorized(false);
      setUser(null);

      // Clear the localStorage
      localStorage.removeItem("user");
      localStorage.removeItem("isAuthorized");
      localStorage.removeItem("token"); // Remove token if stored

      // Verify that localStorage was cleared
      console.log("LocalStorage after logout:", localStorage); // Debug log

      // Redirect to login page after logout
      navigate("/login");
    } catch (error) {
      console.error("Logout Error:", error); // Debug log
      toast.error(error.response?.data?.message || "Logout failed");
      setIsAuthorized(true);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchKeyword.trim()) return;

    try {
      const response = await axios.get(
        `http://localhost:4000/api/v1/job?title=${searchKeyword.trim()}`,
        { withCredentials: true }
      );
      const searchResults = response.data.jobs;

      console.log("Search Results:", searchResults);

      navigate("/search-results", { state: { searchResults } });

      // Clear the search bar after the search is executed
      setSearchKeyword("");
    } catch (error) {
      console.error("Search Error:", error);
      toast.error("Failed to fetch search results.");
    }
  };

  return (
    <nav>
      <div className="container">
        <div className="logo">
          <img src="/Images/momentum.png" alt="logo" />
        </div>
        <ul className={!show ? "menu" : "show-menu menu"}>
          <li>
            <Link to={"/"} onClick={() => setShow(false)}>
              Home
            </Link>
          </li>
          {!isAuthorized && (
            <li>
              <Link to={"/aboutus"} onClick={() => setShow(false)}>
                About Us
              </Link>
            </li>
          )}

          <li>
            <Link to={"/job/getall"} onClick={() => setShow(false)}>
              All Jobs
            </Link>
          </li>

          {isAuthorized && (
            <>
              <li>
                <Link to={"/resume-scorer"} onClick={() => setShow(true)}>
                  Resume Scorer
                </Link>
              </li>
              <li>
                <Link to={"/resume-builder"} onClick={() => setShow(true)}>
                  Resume Builder
                </Link>
              </li>
              <li>
                <Link to={"/my-resumes"} onClick={() => setShow(true)}>
                  My Resume
                </Link>
              </li>
            </>
          )}

          {/* Conditionally render 'Post a Job' and 'View My Jobs' only if the user is an Employer */}
          {user && user.role === "Employer" && (
            <>
              <li>
                <Link to={"/job/post"} onClick={() => setShow(true)}>
                  Post a Job
                </Link>
              </li>
              <li>
                <Link to={"/job/me"} onClick={() => setShow(true)}>
                  View My Jobs
                </Link>
              </li>
            </>
          )}

          {/* Search functionality */}
          <li>
            <form onSubmit={handleSearch} className="search-form">
              <div className="input-search-button">
                <input
                  className="search-bar"
                  type="text"
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                  placeholder="Search jobs..."
                />

                <button id="search-button" type="submit">
                  Search
                </button>
              </div>
            </form>
          </li>

          {/* Conditionally render logout or login button */}
          {isAuthorized ? (
            <button onClick={handleLogout}>Logout</button>
          ) : (
            <li>
              <Link to="/Login" className="btn">
                Login
              </Link>
            </li>
          )}

          {/* Conditionally render user profile icon */}
          {isAuthorized && (
            <li>
              <Link to="/user-dashboard" className="btn">
                <BiUser />
              </Link>
            </li>
          )}
        </ul>

        <div className="hamburger">
          <GiHamburgerMenu onClick={() => setShow(!show)} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
