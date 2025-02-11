import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Button, Image } from "react-bootstrap";
import NavTab from "./NavTab";

const UserProfile = () => {
  const [user, setUser] = useState({}); // แก้ให้เป็น {} แทน []
  const [loading, setLoading] = useState(true); // state สำหรับเช็คว่าโหลดเสร็จหรือยัง

  useEffect(() => {
    const token = localStorage.getItem("token"); // ดึง token จาก localStorage
    if (!token) {
      console.error("No token found, user not authenticated");
      return;
    }

    fetch("http://localhost:3001/profile", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          setUser(data.user);
        } else {
          console.error("Failed to fetch user data");
        }
        setLoading(false); // โหลดเสร็จ
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false);
      });
  }, []); // เพิ่ม [] เพื่อให้ useEffect รันแค่ครั้งเดียว;

  return (
    <>
      <NavTab />
      <div className="text-white min-vh-100" style={{ marginTop: "100px", backgroundColor: "#111213" }}>
        {/* Banner Section */}
        <div className="bg-secondary" style={{ height: "300px", position: "relative" }}>
          <div className="position-absolute" style={{ bottom: "0px" }}>
            <Image src="http://localhost:3000/images/profile_cover.jpg" className="border border-3 border-dark" style={{ width: "100%" }} />
          </div>
        </div>

        {/* Profile Section */}
        <Container className="mt-5">
          <div style={{ display: "flex" }}>
            <h3 className="d-flex justify-content-center" style={{ fontSize: "36px" }}>
              {user.fname} {user.lname}
            </h3>
            <div className="d-flex justify-content-center gap-2 mx-3" style={{ height: "44px" }}>
              <Button className="d-flex align-items-center justify-content-center" variant="primary" style={{ width: "65px" }}>
                URL
              </Button>
              <Button className="d-flex align-items-center justify-content-center" variant="success" style={{ width: "145px" }}>
                ยืนยันบัญชี
              </Button>
              <Button
                href="/settings"
                variant="outline-light"
                className="d-flex align-items-center justify-content-center"
                style={{ width: "145px", height: "44px" }}
              >
                แก้ไขโปรไฟล์
              </Button>
            </div>
          </div>
          <p style={{ fontSize: "15px" }}>{user.email}</p>
        </Container>

        {/* Menu Section */}
        <Container className="mt-4 text-center">
          <div style={{ display: "flex" }}>
            <div className="d-flex justify-content-center gap-2" style={{ height: "40px" }}>
              <Button variant="warning" style={{ width: "102px" }}>
                โปรไฟล์
              </Button>
              <Button variant="outline-light" style={{ width: "136px" }}>
                โพสต์ของฉัน
              </Button>
              <Button variant="outline-light" style={{ width: "90px" }}>
                อัลบั้ม
              </Button>
              <Button variant="outline-light" style={{ width: "138px" }}>
                การแจ้งเตือน
              </Button>
              <Button variant="outline-light" style={{ width: "188px" }}>
                ทัวร์นาเมนต์ที่เข้าร่วม
              </Button>
              <Button variant="outline-light" style={{ width: "177px" }}>
                ทัวร์นาเมนต์ของฉัน
              </Button>
              <Button variant="outline-light" style={{ width: "191px" }}>
                สร้างทัวร์นาเมนต์
              </Button>
            </div>
          </div>
        </Container>

        {/* Menu Section */}
        <Container
          className="mt-4"
          style={{
            backgroundColor: "#231F20",
            borderRadius: "15px",
            padding: "20px",
          }}
        >
          <p style={{ fontSize: "24px" }}>แรงค์ในเกม</p>
          <hr />
          <div className="d-flex flex-column align-items-center justify-content-center" style={{ height: "200px" }}>
            <img
              src="http://localhost:3000/images/empty_List.png"
              alt="Logo"
              style={{
                height: "100px",
                width: "110px",
                paddingLeft: "10px",
              }}
            />
            <p style={{ fontSize: "16px", color: "#fff" }}>ยังไม่มีข้อมูล</p>
          </div>
        </Container>
        <Container
          className="mt-4"
          style={{
            backgroundColor: "#231F20",
            borderRadius: "15px",
            padding: "20px",
          }}
        >
          <p style={{ fontSize: "24px" }}>ผลงาน</p>
          <hr />
          <div className="d-flex flex-column align-items-center justify-content-center" style={{ height: "200px" }}>
            <img
              src="http://localhost:3000/images/empty_List.png"
              alt="Logo"
              style={{
                height: "100px",
                width: "110px",
                paddingLeft: "10px",
              }}
            />
            <p style={{ fontSize: "16px", color: "#fff" }}>ยังไม่มีข้อมูล</p>
          </div>
        </Container>
        <Container
          className="mt-4"
          style={{
            backgroundColor: "#231F20",
            borderRadius: "15px",
            padding: "20px",
          }}
        >
          <p style={{ fontSize: "24px" }}>ประสบการณ์</p>
          <hr />
          <div className="d-flex flex-column align-items-center justify-content-center" style={{ height: "200px" }}>
            <img
              src="http://localhost:3000/images/empty_List.png"
              alt="Logo"
              style={{
                height: "100px",
                width: "110px",
                paddingLeft: "10px",
              }}
            />
            <p style={{ fontSize: "16px", color: "#fff" }}>ยังไม่มีข้อมูล</p>
          </div>
        </Container>
        <Container
          className="mt-4"
          style={{
            backgroundColor: "#231F20",
            borderRadius: "15px",
            padding: "20px",
          }}
        >
          <p style={{ fontSize: "24px" }}>ข้อมูลเกี่ยวกับฉัน</p>
          <hr />
          <div className="d-flex flex-column align-items-center justify-content-center" style={{ height: "200px" }}>
            <img
              src="http://localhost:3000/images/empty_List.png"
              alt="Logo"
              style={{
                height: "100px",
                width: "110px",
                paddingLeft: "10px",
              }}
            />
            <p style={{ fontSize: "16px", color: "#fff" }}>ยังไม่มีข้อมูล</p>
          </div>
        </Container>
        <Container
          className="mt-4"
          style={{
            backgroundColor: "#231F20",
            borderRadius: "15px",
            padding: "20px",
          }}
        >
          <p style={{ fontSize: "24px" }}>อัลบั้มรูป</p>
          <hr />
          <div className="d-flex flex-column align-items-center justify-content-center" style={{ height: "200px" }}>
            <img
              src="http://localhost:3000/images/empty_List.png"
              alt="Logo"
              style={{
                height: "100px",
                width: "110px",
                paddingLeft: "10px",
              }}
            />
            <p style={{ fontSize: "16px", color: "#fff" }}>ยังไม่มีข้อมูล</p>
          </div>
        </Container>
      </div>
    </>
  );
};

export default UserProfile;
