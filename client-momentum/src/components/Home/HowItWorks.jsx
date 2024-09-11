import { FaUserPlus } from "react-icons/fa";
import { MdFindInPage } from "react-icons/md";
import { IoMdSend } from "react-icons/io";

const HowItWorks = () => {
  return (
    <>
      <div className="howitworks">
        <div className="container">
          <h3>How MOMentum Works</h3>
          <div className="banner">
            <div className="card">
              <FaUserPlus />
              <p>Create your Account</p>
              <p>
                Sign up and complete your profile to unlock a world of job
                opportunities tailored to your skills and preferences.
              </p>
            </div>
            <div className="card">
              <MdFindInPage />
              <p>Find a Job/Post a Job</p>
              <p>
                Browse through a diverse range of job listings or post your job
                vacancy to connect with qualified candidates effortlessly.
              </p>
            </div>
            <div className="card">
              <IoMdSend />
              <p>Apply For Job/Recruit Suitable Candidates</p>
              <p>
                Apply to jobs with just a few clicks or recruit the perfect
                candidate by reviewing their profiles and connecting directly.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HowItWorks;
