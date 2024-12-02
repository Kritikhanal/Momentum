import "./App.css";
import { useContext, useEffect } from "react";
import { Context } from "./index";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Navbar from "./components/Layout/Navbar.jsx";
import Footer from "./components/Layout/Footer.jsx";
import Login from "./components/Auth/Login.jsx";
import SignUp from "./components/Auth/Register.jsx";
import Jobs from "./components/Job/Jobs.jsx";
import JobDetails from "./components/Job/JobDetails.jsx";
import Application from "./components/Application/Application.jsx";
import MyApplications from "./components/Application/MyApplications.jsx";
import PostJob from "./components/Job/PostJob.jsx";
import MyJobs from "./components/Job/MyJobs.jsx";
import NotFound from "./components/NotFound/NotFound.jsx";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import UserDashboard from "./components/UserDashboard/UserDashboard";
import axios from "axios";
import ResumeScorer from "./components/ResumeScorer/ResumeScorer.jsx";
import ResumeForm from "./components/Resume-gen/ResumeForm.js";
import ResumeView from "./components/Resume-gen/ResumeView/ResumeView.js";
import EditResume from "./components/Resume-gen/EditResume.js";
import MyResumes from "./components/Resume-gen/MyResume/MyResume.jsx";

function App() {
  const { isAuthorized, setIsAuthorized, user, setUser } = useContext(Context);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/v1/user/getuser",
          {
            withCredentials: true,
          }
        );
        setUser(response.data.user);
        setIsAuthorized(true);
      } catch (error) {
        setIsAuthorized(false);
      }
    };
    fetchUser();
  }, [isAuthorized, setIsAuthorized, setUser]);
  return (
    <>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/resume-scorer" element={<ResumeScorer />} />
          <Route path="/job/getall" element={<Jobs />} />
          <Route path="/job/:id" element={<JobDetails />} />
          <Route path="/application/:id" element={<Application />} />
          <Route path="/applications/me" element={<MyApplications />} />
          <Route path="/job/post" element={<PostJob />} />
          <Route path="/job/me" element={<MyJobs />} />
          <Route path="/resume-builder" element={<ResumeForm />} />
          <Route path="/resume/:id" element={<ResumeView user={user} />} />
          <Route path="/edit-resume/:id" element={<EditResume />} />
          <Route path="/my-resumes" element={<MyResumes user={user} />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/user-dashboard" element={<UserDashboard />} />
          
        </Routes>
        <Footer />
        <Toaster />
      </BrowserRouter>
    </>
  );
}

export default App;
