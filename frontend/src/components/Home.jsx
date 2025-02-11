import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import "./css/Home.css";
import NavTab from "./NavTab";
import Footer from "./Footer.jsx";
import Cardslider_Menu from "./Cardslider_Menu.jsx";
import Cardslider_Promote from "./Cardslider_Promote.jsx";

function Home() {
  return (
    <div className="Font" style={{ background: "linear-gradient(to bottom, #1d1e20, black)" }}>
      <NavTab />
      <Container>
        <section className="card" style={{ marginTop: "100px", backgroundColor: "#1d1e20" }}>
          <Cardslider_Menu />
        </section>
        <section className="card" style={{ marginTop: "100px", backgroundColor: "#1d1e20" }}>
          <Cardslider_Promote />
        </section>
      </Container>
      <br/>
      <br/>
      <br/>
      <Footer />
    </div>
  );
}

export default Home;
