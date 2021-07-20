import React from "react";
import "../css/style.css";

const Footer = () => {
  //TODO: fix mail
  return (
    <div className="footer text-center p-3">
      <h6> Copyright &copy; 2021 | Designed by Ellie Thor</h6>
      <a href="https://www.facebook.com/Ellie.kurts/" target="_blank" rel="noreferrer" className="footerIcon">
        <i className="fab fa-facebook px-2 fa-lg"></i>
      </a>
      <a href="https://www.linkedin.com/in/%E2%80%AAellie-thor%E2%80%AC%E2%80%8F-a42195203" rel="noreferrer" target="_blank" className="footerIcon">
        <i className="fab fa-linkedin px-2 fa-lg "></i>
      </a>
      <a href="mailto:elliethor18@gmail.com" className="footerIcon">
        <i className="fas fa-envelope px-2 fa-lg"></i>
      </a>
      <a href="https://github.com/EllieThor" target="_blank" rel="noreferrer" className="footerIcon">
        <i className="fab fa-github px-2 fa-lg"></i>
      </a>
    </div>
  );
};

export default Footer;
