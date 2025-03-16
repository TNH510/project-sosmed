// src/pages/Date.tsx
import { useState } from "react";
import CardComponent from "../components/Card/Card";
import Layout from "../layouts/layout";
import food1 from "../assets/img/food/food1.jpg";
import food2 from "../assets/img/food/food2.jpg";
import food3 from "../assets/img/food/food3.jpg";
import food4 from "../assets/img/food/food4.jpg";
import food5 from "../assets/img/food/food5.jpg";
import food6 from "../assets/img/food/food6.jpg";
import mov1 from "../assets/img/movies/img1.jpg";
import mov2 from "../assets/img/movies/img2.jpg";
import mov3 from "../assets/img/movies/img3.jpg";
import mov4 from "../assets/img/movies/img4.jpg";
import mov5 from "../assets/img/movies/img5.jpg";
import mov6 from "../assets/img/movies/img6.jpg";
import img1 from "../assets/img/cat-jump.gif";
import HeartButton from "../components/HeartButton/HeartButton";
import { pink } from "../components/interfaces/HeartButton.interface";
import HeartSlider from "../components/Heart/Heart";
import { useNavigate } from "react-router";

const Date = () => {
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>("food");
  const [excitementRate, setExcitementRate] = useState<number>(0);
  const navigate = useNavigate();

  const handleCardClick = (index: number) => {
    if (selectedCards.includes(index)) {
      setSelectedCards(selectedCards.filter((cardIndex) => cardIndex !== index));
    } else {
      setSelectedCards([...selectedCards, index]);
    }
  };

  const getTitle = () => {
    switch (selectedCategory) {
      case "food":
        return "What do you want to eat ?";
      case "movie":
        return "What movie do you want to watch ?";
      default:
        return "";
    }
  };

  const foodData = [
    { title: "Pancake", image: food1 },
    { title: "Fried Rice", image: food2 },
    { title: "Salmon", image: food3 },
    { title: "Steak", image: food4 },
    { title: "Burger and Fries", image: food5 },
    { title: "Pizza", image: food6 },
  ];

  const movieData = [
    { title: "Beetlejuice Beetlejuice", image: mov1 },
    { title: "Dul Muluk Dul Malik", image: mov2 },
    { title: "Hellboy: The Crooked Man", image: mov3 },
    { title: "Never Let Go", image: mov4 },
    { title: "Transformers One", image: mov5 },
    { title: "Deadpool & Wolverine", image: mov6 },
  ];

  const handleRateChange = (value: number) => {
    setExcitementRate(value);
  };

  const nextQuestion = () => {
    if (selectedCategory === "food" && selectedCards.length > 0) {
      const selectedFoods = selectedCards.map((index) => foodData[index].title);
      localStorage.setItem("selectedFoods", JSON.stringify(selectedFoods));
    } else if (selectedCategory === "movie" && selectedCards.length > 0) {
      const selectedMovies = selectedCards.map((index) => movieData[index].title);
      localStorage.setItem("selectedMovies", JSON.stringify(selectedMovies));
    } else if (selectedCategory === "rate") {
      if (excitementRate === 0) {
        alert("Please rate your excitement level before continuing!");
        return;
      }
      localStorage.setItem("excitementRate", excitementRate.toString());
      navigate("/thankyou");
      return;
    }

    if (selectedCategory === "movie") {
      setSelectedCategory("rate");
    } else {
      setSelectedCategory("movie");
    }
    setSelectedCards([]);
  };

  return (
    <Layout>
      <h1 style={{ color: pink }}>{getTitle()}</h1>
      <main className="d-flex flex-wrap justify-content-center mt-3">
        {selectedCategory === "food" &&
          foodData.map((card, index) => (
            <div key={index} className="m-2">
              <CardComponent
                title={card.title}
                image={card.image}
                isSelected={selectedCards.includes(index)}
                onClick={() => handleCardClick(index)}
              />
            </div>
          ))}
        {selectedCategory === "movie" &&
          movieData.map((card, index) => (
            <div key={index} className="m-2">
              <CardComponent
                title={card.title}
                image={card.image}
                isSelected={selectedCards.includes(index)}
                onClick={() => handleCardClick(index)}
              />
            </div>
          ))}
        {selectedCategory === "rate" && (
          <div className="d-flex flex-column justify-content-center align-items-center">
            <img
              className="m-auto"
              src={img1}
              alt="Image 1"
              style={{
                width: "300px",
                marginBottom: "20px",
                borderRadius: "15px",
              }}
            />
            <h1 style={{ color: pink }} className="py-3 text-center">
              Rate how excited are you
            </h1>
            <HeartSlider onChange={handleRateChange} />
          </div>
        )}
      </main>
      {selectedCategory === "rate" ? (
        <HeartButton
          style={{
            width: "100%",
            maxWidth: "300px",
            margin: "0 auto",
            marginTop: "2rem",
            display: "block",
          }}
          text="Continue ⊂(・ヮ・⊂)"
          onClick={nextQuestion}
        />
      ) : (
        <HeartButton
          style={{
            width: "100%",
            maxWidth: "300px",
            margin: "0 auto",
            marginTop: "2rem",
          }}
          text="Continue ⊂(・ヮ・⊂)"
          onClick={nextQuestion}
        />
      )}
    </Layout>
  );
};

export default Date;