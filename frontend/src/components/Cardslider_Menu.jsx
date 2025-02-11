import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";;

const cards = [
  { id: 1, title: "หาเพื่อนเล่นเกม", imageUrl: "http://localhost:3000/images/Banner-Party.jpg" },
  { id: 2, title: "ทัวร์นาเม้นต์", imageUrl: "http://localhost:3000/images/Banner-Tournament.jpg" },
  { id: 3, title: "คลับพิเศษ", imageUrl: "http://localhost:3000/images/Banner-Secret.jpg" },
  { id: 4, title: "ที่แลกของขวัญ", imageUrl: "http://localhost:3000/images/Banner-Reward.jpg" },
  { id: 5, title: "เล่นควิซ", imageUrl: "http://localhost:3000/images/Banner-Quiz.jpg" },
  { id: 6, title: "คอมมิวนิตี้", imageUrl: "http://localhost:3000/images/Banner-Webboard.jpg" },
];

const Cardslider_Menu = () => {
  const [currentSlide, setCurrentSlide] = React.useState(0);

  const settings = {
    infinite: true, // วนซ้ำ
    speed: 500,
    slidesToShow: 3, // จำนวนการ์ดที่แสดงในหนึ่งหน้า
    slidesToScroll: 1,
    beforeChange: (oldIndex, newIndex) => setCurrentSlide(newIndex), // เก็บสถานะของ slide ปัจจุบัน
    centerMode: true, // จัดให้อยู่ตรงกลาง
    centerPadding: "0", // ปิด padding เพื่อให้ขอบชิด
  };

  return (
    <div style={{ width: "100%", margin: "auto"}}>
      <Slider {...settings}>
        {cards.map((card, index) => {
          const isCenter = index === currentSlide || index === (currentSlide + cards.length) % cards.length;
          return (
            <div key={card.id} style={{ padding: "10px"}}>
              <div
                style={{
                  width: "100%",
                  height: isCenter ? "300px" : "250px", // ตรงกลางสูง 300px ที่เหลือสูง 250px
                  borderRadius: "10px",
                  backgroundImage: `url(${card.imageUrl})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "height 0.3s ease", // เพิ่มเอฟเฟกต์ smooth
                }}
              >
                <h3
                  style={{
                    fontSize: "30px",
                    color: "#fff",
                    textShadow: "0 2px 4px rgba(0, 0, 0, 0.8)",
                  }}
                >
                  {card.title}
                </h3>
              </div>
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default Cardslider_Menu;
