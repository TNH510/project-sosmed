// src/pages/Thankyou.tsx
import Layout from "../layouts/layout";
import img1 from "../assets/img/happy-cat.gif";
import { FaHeart, FaStar, FaRibbon } from "react-icons/fa";
import "../components/styles/Thankyou.css";
import { useEffect, useState } from "react";

const Thankyou = () => {
  const [dateTime, setDateTime] = useState({ date: "", time: "" });
  const [selectedFoods, setSelectedFoods] = useState<string[]>([]);
  const [selectedMovies, setSelectedMovies] = useState<string[]>([]);
  const [excitementRate, setExcitementRate] = useState<string>("");

  useEffect(() => {
    // Lấy dữ liệu từ localStorage
    const storedDateTime = localStorage.getItem("dateTime");
    const storedFoods = localStorage.getItem("selectedFoods");
    const storedMovies = localStorage.getItem("selectedMovies");
    const storedRate = localStorage.getItem("excitementRate");

    if (storedDateTime) setDateTime(JSON.parse(storedDateTime));
    if (storedFoods) setSelectedFoods(JSON.parse(storedFoods));
    if (storedMovies) setSelectedMovies(JSON.parse(storedMovies));
    if (storedRate) setExcitementRate(storedRate);

    // Định vị ngẫu nhiên các biểu tượng
    const icons = document.querySelectorAll(".icon-random");
    icons.forEach((icon) => {
      const randomTop = Math.floor(Math.random() * 80);
      const randomLeft = Math.floor(Math.random() * 80);
      (icon as HTMLElement).style.top = `${randomTop}%`;
      (icon as HTMLElement).style.left = `${randomLeft}%`;
    });
  }, []);

  return (
    <Layout>
      <div className="thankyou-container">
        <div className="icon-container">
          <FaHeart className="heart-icon" />
          <FaStar className="star-icon" />
          <FaRibbon className="ribbon-icon" />
        </div>
        <img
          className="thankyou-image"
          src={img1}
          alt="Happy Cat"
          style={{
            width: "300px",
            marginBottom: "20px",
            borderRadius: "15px",
            boxShadow: "0 0 20px pink",
          }}
        />
        <h2 style={{ fontSize: "4rem" }} className="thankyou-text">
          See you soon!❤️
        </h2>
        {dateTime.date && dateTime.time && (
          <h1 className="thankyou-text">
            Don't forget on {dateTime.date} at {dateTime.time}
          </h1>
        )}
        {selectedFoods.length > 0 && (
          <h1 className="thankyou-text">
            We'll enjoy: {selectedFoods.join(", ")}
          </h1>
        )}
        {selectedMovies.length > 0 && (
          <h1 className="thankyou-text">
            We'll watch: {selectedMovies.join(", ")}
          </h1>
        )}
        {excitementRate && (
          <h1 className="thankyou-text">
            Excitement level: {excitementRate}%
          </h1>
        )}
        <div className="icon-container-bottom">
          <FaHeart className="heart-icon-bottom icon-random" />
          <FaStar className="star-icon-bottom icon-random" />
          <FaRibbon className="ribbon-icon-bottom icon-random" />
          <FaHeart className="heart-icon-bottom icon-random" />
          <FaStar className="star-icon-bottom icon-random" />
          <FaRibbon className="ribbon-icon-bottom icon-random" />
          <FaHeart className="heart-icon-bottom icon-random" />
          <FaStar className="star-icon-bottom icon-random" />
          <FaRibbon className="ribbon-icon-bottom icon-random" />
        </div>
      </div>
    </Layout>
  );
};

export default Thankyou;