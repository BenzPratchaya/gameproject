import React, { useState, useEffect } from "react";
import "./css/NavTab.css";
import { Button, Container, Nav, Navbar, NavDropdown, Modal, Form, DropdownButton, Dropdown } from "react-bootstrap";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faComments, faUser, faTrophy, faCircleQuestion, faUserTie } from "@fortawesome/free-solid-svg-icons";

function NavTab() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [formData, setFormData] = useState({ fname: "", lname: "" });
  const MySwal = withReactContent(Swal);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch("http://localhost:3001/authen", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status === "ok") {
            setIsLoggedIn(true);
            fetchUserData(token);
          } else {
            setIsLoggedIn(false);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const fetchUserData = (token) => {
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
          setFormData({ fname: data.user.fname, lname: data.user.lname });
        } else {
          console.error("Failed to fetch user data");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleLogout = (event) => {
    setIsLoggedIn(false);
    event.preventDefault();
    localStorage.removeItem("token");
    window.location = "/login";
  };

  const handleEdit = () => {
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
  };

  const handleSaveEdit = () => {
    MySwal.fire({
      title: "ต้องการแก้ไขข้อมูลหรือไม่?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "แก้ไข",
      cancelButtonText: "ยกเลิก",
    }).then((result) => {
      if (result.isConfirmed) {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("Token not found");
          return;
        }

        const { fname, lname } = formData;
        const id = user.id;
        fetch(`http://localhost:3001/user/update/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          body: JSON.stringify({ id, fname, lname }),
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.status === "success") {
              setUser((prevUser) => ({
                ...prevUser,
                fname: fname,
                lname: lname,
              }));
              setShowEditModal(false);
              MySwal.fire("แก้ไขข้อมูลสำเร็จ", "User updated successfully", "success");
              console.log("User updated successfully");
            } else {
              MySwal.fire("แก้ไขข้อมูลไม่สำเร็จ!", "Failed to update user", "error");
              console.error("Failed to update user");
            }
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      }
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="NavTab">
      {/* ---------------------------------- NAVBAR ---------------------------------- */}
      <Navbar expand="lg" className="fixed-top" style={{ backgroundColor: "black" }}>
        <Container className="container-nav">
          <Navbar.Brand>
            <a href="/home" style={{ textDecoration: "none" }}>
              <img
                src="http://localhost:3000/images/logo.png"
                alt="Logo"
                style={{
                  height: "42px",
                  width: "auto",
                }}
              />
            </a>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="mx-auto my-2 my-lg-0" style={{ maxHeight: "100px" }} navbarScroll>
              <Nav.Link href="/home" className="Nav-Link mx-4">
                <FontAwesomeIcon icon={faHouse} style={{ width: "24px", height: "24px", color: "white" }} />
              </Nav.Link>
              <Nav.Link href="/community" className="Nav-Link mx-4">
                <FontAwesomeIcon icon={faComments} style={{ width: "24px", height: "24px", color: "white" }} />
              </Nav.Link>
              <Nav.Link href="/party" className="Nav-Link mx-4">
                <FontAwesomeIcon icon={faUser} style={{ width: "24px", height: "24px", color: "white" }} />
              </Nav.Link>
              <Nav.Link href="/tournament" className="Nav-Link mx-4">
                <FontAwesomeIcon icon={faTrophy} style={{ width: "24px", height: "24px", color: "white" }} />
              </Nav.Link>
              <Nav.Link href="/quiz" className="Nav-Link mx-4">
                <FontAwesomeIcon icon={faCircleQuestion} style={{ width: "24px", height: "24px", color: "white" }} />
              </Nav.Link>
              {user.role_id === 2 && (
                <Nav.Link href="/admin" className="Nav-Link mx-4">
                  <FontAwesomeIcon icon={faUserTie} style={{ width: "24px", height: "24px", color: "white" }} />
                </Nav.Link>
              )}
            </Nav>
            {isLoggedIn ? (
              <Dropdown align="end" className="user-profile-dropdown">
                <Dropdown.Toggle variant="link" id="dropdown-basic" className="user-profile-toggle">
                  <div className="user-profile">
                    <div className="avatar">
                      <img
                        src="http://localhost:3000/images/profile_avatar.jpg"
                        alt="User Avatar"
                        style={{
                          height: "40px",
                          width: "40px",
                        }}
                      />
                    </div>
                    <div className="username">
                      {user.fname} {user.lname}
                    </div>
                  </div>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={handleEdit}>โปรไฟล์</Dropdown.Item>
                  <Dropdown.Item onClick={handleLogout}>ออกจากระบบ</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <Button href="/login" className="w3-button w3-padding-large w3-white w3-border me-auto mx-2 my-2 my-lg-0 Logout-Button">
                login
              </Button>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br />
      {/* ---------------------------------- END NAVBAR ---------------------------------- */}

      {/* Edit Modal */}
      <Modal show={showEditModal} onHide={handleCloseEditModal}>
        <Modal.Header closeButton style={{ backgroundColor: "#f0f0f0", fontFamily: "'Kanit', sans-serif" }}>
          <Modal.Title>แก้ไขข้อมูลส่วนตัว</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: "#f0f0f0", fontFamily: "'Kanit', sans-serif" }}>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicFirstName">
              <Form.Label>ชื่อ</Form.Label>
              <Form.Control
                type="text"
                placeholder="กรอกชื่อ"
                name="fname"
                value={formData.fname}
                onChange={handleInputChange}
                style={{ fontFamily: "'Kanit', sans-serif" }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicLastName">
              <Form.Label>นามสกุล</Form.Label>
              <Form.Control
                type="text"
                placeholder="กรอกนามสกุล"
                name="lname"
                value={formData.lname}
                onChange={handleInputChange}
                style={{ fontFamily: "'Kanit', sans-serif" }}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer style={{ backgroundColor: "#f0f0f0", fontFamily: "'Kanit', sans-serif" }}>
          <Button variant="secondary" onClick={handleCloseEditModal}>
            ยกเลิก
          </Button>
          <Button variant="primary" onClick={handleSaveEdit}>
            แก้ไข
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default NavTab;
