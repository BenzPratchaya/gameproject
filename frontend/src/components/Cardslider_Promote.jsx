import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const cards = [
  { id: 1, imageUrl: "http://localhost:3000/images/Banner-1.jpg" },
  { id: 2, imageUrl: "http://localhost:3000/images/Banner-2.jpg" },
];

const Cardslider_Promote = () => {
  const settings = {
    infinite: true, // วนซ้ำ
    speed: 500,
    slidesToShow: 1, // จำนวนการ์ดที่แสดงในหนึ่งหน้า
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000, // ความเร็วในการเลื่อน (ms)
  };

  return (
    <div style={{ width: "100%", margin: "auto" }}>
      <Slider {...settings}>
        {cards.map((card) => (
          <div key={card.id} style={{ padding: "10px" }}>
            <div
              style={{
                width: "100%",
                height: "400px",
                borderRadius: "10px",
                backgroundImage: `url(${card.imageUrl})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            ></div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Cardslider_Promote;
