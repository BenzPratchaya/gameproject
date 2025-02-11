import { useState, useEffect } from "react";
import { Container, Row, Col, Button, Image } from "react-bootstrap";
import NavTab from "./NavTab";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const UserSetting = () => {
  const [loading, setLoading] = useState(true);
  const MySwal = withReactContent(Swal);
  const [formData, setFormData] = useState({
    id: "", // เพิ่ม id ใน state
    fname: "",
    lname: "",
    bio: "",
    email: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found, user not authenticated");
      setLoading(false);
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
          setFormData({
            id: data.user.id || "", // ดึง id ของ user
            fname: data.user.fname || "",
            lname: data.user.lname || "",
            bio: data.user.bio || "",
            email: data.user.email || "",
          });
        } else {
          console.error("Failed to fetch user data");
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
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

        const { id, fname, lname } = formData; // ดึง id จาก formData
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
              setFormData((prevData) => ({
                ...prevData,
                fname,
                lname,
              }));
              MySwal.fire("แก้ไขข้อมูลสำเร็จ", "User updated successfully", "success").then(() => {
                window.location.href = "/users"; // เปลี่ยนหน้าไปที่ /users
              });
            } else {
              MySwal.fire("แก้ไขข้อมูลไม่สำเร็จ!", "Failed to update user", "error");
            }
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      }
    });
  };

  if (loading) {
    return <div className="text-white text-center">Loading...</div>;
  }

  return (
    <div style={{ backgroundColor: "#111213" }}>
      <NavTab />
      <Container className="d-flex min-vh-100 text-white" style={{ backgroundColor: "#111213" }}>
        {/* Sidebar */}
        <aside className="p-4 text-light" style={{ marginTop: "80px", width: "350px" }}>
          <p style={{ fontSize: "22px" }}>ตั้งค่า</p>
          <ul className="list-unstyled">
            <li className="bg-warning text-dark p-2 rounded mb-2">โปรไฟล์</li>
            <li className="p-2">คอมมูนิตี้</li>
            <li className="p-2">แรงค์ของฉัน</li>
            <li className="p-2">ผลงาน</li>
            <li className="p-2">ประสบการณ์</li>
            <li className="p-2">ข้อมูลเกี่ยวกับฉัน</li>
          </ul>
        </aside>

        {/* Profile Form */}
        <main className="flex-grow-1 d-flex justify-content-center align-items-center p-4">
          <div className="card bg-secondary text-light p-4 rounded" style={{ width: "950px" }}>
            <div className="card-body">
              <h2 className="card-title mb-4">โปรไฟล์</h2>
              <div className="mb-3">
                <label className="form-label">ชื่อ</label>
                <input className="form-control" name="fname" value={formData.fname} onChange={handleInputChange} />
              </div>
              <div className="mb-3">
                <label className="form-label">นามสกุล</label>
                <input className="form-control" name="lname" value={formData.lname} onChange={handleInputChange} />
              </div>
              <div className="mb-3">
                <label className="form-label">Bio</label>
                <input className="form-control" name="bio" value={formData.bio} onChange={handleInputChange} />
              </div>
              <div className="mb-3">
                <label className="form-label">อีเมล</label>
                <input className="form-control" name="email" value={formData.email} disabled />
              </div>
              <button className="btn btn-warning w-100" onClick={handleSaveEdit}>
                บันทึก
              </button>
            </div>
          </div>
        </main>
      </Container>
    </div>
  );
};

export default UserSetting;
