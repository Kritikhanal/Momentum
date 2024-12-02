import { Link } from "react-router-dom";
import { FaFacebookF, FaYoutube, FaLinkedin } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footerShow">
      <div>&copy; All Rights Reserved By MOMentum.</div>
      <div>
        <Link to={"/"} target="_blank">
          <FaFacebookF />
        </Link>
        <Link to={"/"} target="_blank">
          <FaYoutube />
        </Link>
        <Link to={""} target="_blank">
          <FaLinkedin />
        </Link>
        <Link to={"/"} target="_blank">
          <RiInstagramFill />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
