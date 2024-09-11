import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { Context } from "../../index";
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState(""); // Add state for search keyword
  const { isAuthorized, setIsAuthorized, user, setUser } = useContext(Context);
  const navigate = useNavigate();

  // On component mount, check if user data is stored in localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const savedIsAuthorized = localStorage.getItem("isAuthorized");

    if (savedUser && savedIsAuthorized) {
      setUser(JSON.parse(savedUser));
      setIsAuthorized(JSON.parse(savedIsAuthorized));
    }
  }, [setUser, setIsAuthorized]);

  const handleLogout = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/v1/user/logout",
        {
          withCredentials: true,
        }
      );

      toast.success(response.data.message);
      setIsAuthorized(false);
      setUser(null);

      // Clear the localStorage
      localStorage.removeItem("user");
      localStorage.removeItem("isAuthorized");

      // Redirect to login page after logout
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed");
      setIsAuthorized(true);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Perform search logic here using the searchKeyword state
    console.log("Search keyword:", searchKeyword);
    // Reset search keyword
    setSearchKeyword("");
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
          <li>
            <Link to={"/aboutus"} onClick={() => setShow(false)}>
              About Us
            </Link>
          </li>
          <li>
            <Link to={"/job/getall"} onClick={() => setShow(false)}>
              All Jobs
            </Link>
          </li>

          {/* Conditionally render 'My Applications' based on user's login status and role */}
          {isAuthorized && user && user.role !== "Employer" && (
            <li>
              <Link to={"/applications/me"} onClick={() => setShow(true)}>
                My Applications
              </Link>
            </li>
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
        </ul>

        <div className="hamburger">
          <GiHamburgerMenu onClick={() => setShow(!show)} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
