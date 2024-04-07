import React from "react";
import "../footer/footer.css";
import { Link } from "react-router-dom";
import { FaSquareInstagram } from "react-icons/fa6";
import { FaFacebookSquare } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <>
      <div className="footer">
        <hr />
        <div className="footerContent">
          <div className="disclaimer">
            <p>Copyright &copy; 2024 || All Right Reserved</p>
            <p>Terms & Conditions</p>
            <p>Privacy Policy</p>
          </div>

          <div className="owner">
            <p>
              Made with 💖 By {" "}
              <Link to={"https://anilthakurbarahi.com.np/"} target="_blank" className="sunil">
                Suniel Sharma
              </Link>
            </p>
          </div>
          <div className="socailmediaIcon">
            <Link to={'https://www.facebook.com/profile.php?id=61555425136513'} target="_blank"><p><FaFacebookSquare /></p></Link>
            <Link to={'https://www.instagram.com/logins89/'} target="_blank"><p><FaSquareInstagram /></p> </Link>
            <Link to={'#'} target="_blank"><p><FaSquareXTwitter /></p> </Link>
            
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
