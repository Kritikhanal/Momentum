import { useEffect, useState } from "react";
import axios from "axios";
import { Link} from "react-router-dom";


const Jobs = () => {
  const [jobs, setJobs] = useState([]);
 

  // Fetch jobs from the backend API
  useEffect(() => {
    try {
      axios
        .get("http://localhost:4000/api/v1/job/getall", {
          withCredentials: true,
        })
        .then((res) => {
          console.log(res.data);
          setJobs(res.data);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <section className="jobs page ">
      <div className="container">
        <h3>ALL AVAILABLE JOBS</h3>
        <div className="banner">
          {jobs.jobs &&
            jobs.jobs.map((element) => {
              return (
                <div className="card" key={element._id}>
                  <div className="content">
                    <div className="icon">
                      {/* Displaying Profile Picture */}
                      {element.postedBy && element.postedBy.profilePicture ? (
                        <div className="profile-picture">
                          <img
                            src={
                              element.postedBy.profilePicture.url ||
                              "/path/to/default-avatar.png"
                            } // Access profilePicture.url for the image
                            alt={element.postedBy.name || "Posted By"}
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
                      <p className="title">{element.title}</p>
                      <p>{element.location}</p>
                      <p>{element.country}</p>
                    </div>
                  </div>

                  <Link to={`/job/${element._id}`}>Job Details</Link>
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
};

export default Jobs;
