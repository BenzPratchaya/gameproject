import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faInstagram, faGithub } from "@fortawesome/free-brands-svg-icons";
import "./css/Footer.css";
import { Container } from "react-bootstrap";

function Footer() {
  return (
    <div className="Footer" style={{ backgroundColor: "#231F20" }}>
      {/* ------------------------------------ FOOTER ------------------------------------- */}

      <br />
      <footer className="footer">
        <Container>
          <div className="footer-content">
            <div className="footer-logo">
              <div className="logo">
                <img
                  src="http://localhost:3000/images/logo-with-text-dark.png"
                  alt="Logo"
                  style={{
                    height: "60px",
                    width: "auto",
                  }}
                />
              </div>
            </div>
            <nav className="footer-nav" style={{ fontSize: "20px" }}>
              <a href="#home">หน้าแรก</a>
              <a href="#about">เกี่ยวกับเรา</a>
              <a href="#contact">ติดต่อเรา</a>
              <a href="#feedback">แนะนำ-ติชม</a>
            </nav>
          </div>
          <br />
          <br />
          <div className="footer-bottom" style={{ fontSize: "16px" }}>
            <p>© CTRL G</p>
            <div className="footer-terms">
              <a href="#privacy">นโยบายความเป็นส่วนตัว</a>
              <a href="#terms">เงื่อนไขและข้อกำหนด</a>
            </div>
          </div>
        </Container>
      </footer>
      <div className="footer-bar"></div>
      {/* ---------------------------------- END FOOTER ----------------------------------- */}
    </div>
  );
}

export default Footer;
