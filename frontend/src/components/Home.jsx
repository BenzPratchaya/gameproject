import React, { useState, useEffect } from "react";
import { Button, Container, Row, Col } from "react-bootstrap";
import "./css/Home.css";
import NavTab from "./NavTab";
import Footer from "./Footer.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBriefcaseMedical, faNewspaper, faUser, faComments, faVideo, faBookMedical } from "@fortawesome/free-solid-svg-icons";

function Home() {
  return (
    <div className="Font">
      <NavTab />
      <section className="functional" style={{ marginTop: "100px" }}>
        <Container>
          <Row>
            <Col className="text-center py-4" style={{ border: "1px solid rgba(0, 0, 0, 0.08)", boxShadow: "3px 30px 30px rgba(0, 0, 0, 0.08)" }}>
              <FontAwesomeIcon icon={faBriefcaseMedical} style={{ height: "60px", marginBottom: "10px" }} />
              <h3>What is Lorem Ipsum?</h3>
              <p>Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...</p>
            </Col>
            <Col className="text-center py-4" style={{ border: "1px solid rgba(0, 0, 0, 0.08)", boxShadow: "3px 30px 30px rgba(0, 0, 0, 0.08)" }}>
              <FontAwesomeIcon icon={faNewspaper} style={{ height: "60px", marginBottom: "10px" }} />
              <h3>What is Lorem Ipsum?</h3>
              <p>Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...</p>
            </Col>
            <Col className="text-center py-4" style={{ border: "1px solid rgba(0, 0, 0, 0.08)", boxShadow: "3px 30px 30px rgba(0, 0, 0, 0.08)" }}>
              <FontAwesomeIcon icon={faUser} style={{ height: "60px", marginBottom: "10px" }} />
              <h3>What is Lorem Ipsum?</h3>
              <p>Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...</p>
            </Col>
            <Col className="text-center py-4" style={{ border: "1px solid rgba(0, 0, 0, 0.08)", boxShadow: "3px 30px 30px rgba(0, 0, 0, 0.08)" }}>
              <FontAwesomeIcon icon={faComments} style={{ height: "60px", marginBottom: "10px" }} />
              <h3>What is Lorem Ipsum?</h3>
              <p>Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...</p>
            </Col>
          </Row>
        </Container>
        <br />
      </section>
      <section className="firstaid" style={{ padding: "50px 0", backgroundColor: "#f8f9fa" }}>
        <Container>
          <Row>
            <Col xs={12} md={6}>
              <img src="http://localhost:3000/images/first-aid-1080x675.jpeg" alt="" style={{ maxWidth: "100%", height: "auto", display: "block" }} />
            </Col>
            <Col xs={12} md={6} style={{ paddingLeft: "20px" }}>
              <h3>Lorem Ipsum</h3>
              <p>Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...</p>
              <br />
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
                  <FontAwesomeIcon icon={faVideo} style={{ height: "60px", marginBottom: "10px" }} />
                  <h3>Lorem Ipsum</h3>
                  <p>Neque porro quisquam est qui dolorem</p>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
                  <FontAwesomeIcon icon={faBookMedical} style={{ height: "60px", marginBottom: "10px" }} />
                  <h3>Lorem Ipsum</h3>
                  <p>Neque porro quisquam est qui dolorem</p>
                </div>
              </div>
              <Button href="/firstaid" className="w3-button w3-padding-large w3-white w3-border" style={{ marginTop: "20px" }}>
                Lorem Ipsum
              </Button>
            </Col>
          </Row>
        </Container>
      </section>
      <Footer />
    </div>
  );
}

export default Home;
