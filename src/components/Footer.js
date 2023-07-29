import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import "./Footer.css";
const Footer = () => {
  return (
    <div className="footer">
      <a href="#3" className="icons-i">
        <FaGithub />
      </a>
      <a href="#1" className="icons-i">
        <FaLinkedin />
      </a>
      <a href="#2" className="icons-i">
        <FaTwitter />
      </a>
    </div>
  );
};
export default Footer;
