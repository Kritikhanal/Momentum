import React from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

import "./Footer.css";

const SearchResults = () => {
  const location = useLocation();
  const { searchResults } = location.state || {};

  return (
    <section className="jobs page">
      <div className="container">
        <h3>Search Results</h3>
        <div className="banner">
          {searchResults && searchResults.length > 0 ? (
            searchResults.map((job) => (
              <div className="card" key={job._id}>
                <div className="content">
                  <div className="icon">
                    {/* Displaying Profile Picture */}
                    {job.postedBy && job.postedBy.profilePicture ? (
                      <div className="profile-picture">
                        <img
                          src={
                            job.postedBy.profilePicture.url ||
                            "/path/to/default-avatar.png"
                          } // Access profilePicture.url for the image
                          alt={job.postedBy.name || "Posted By"}
                          style={{
                            width: "50px",
                            height: "50px",
                            borderRadius: "50%",
                          }}
                        />
                      </div>
                    ) : (
                      <div className="profile-picture">
                        <img
                          src="/path/to/default-avatar.png"
                          alt="Default Avatar"
                          style={{
                            width: "50px",
                            height: "50px",
                            borderRadius: "50%",
                          }}
                        />
                      </div>
                    )}
                  </div>
                  <div className="text">
                    <p className="title">{job.title}</p>
                    <p>{job.location}</p>
                    <p>{job.country}</p>
                  </div>
                </div>
                <Link to={`/job/${job._id}`} className="btn">
                  Job Details
                </Link>
              </div>
            ))
          ) : (
            <p>No results found.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default SearchResults;
