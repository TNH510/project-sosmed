// src/components/Heart/Heart.tsx
import { useState, useRef } from "react";
import "./HeartSlider.css"; // Giả định CSS gốc vẫn được giữ

interface HeartSliderProps {
  onChange?: (value: number) => void; // Thêm prop onChange để gửi giá trị ra ngoài
}

const HeartSlider = ({ onChange }: HeartSliderProps) => {
  const [value, setValue] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const animations = ["float-1", "float-2", "float-3", "float-4"];
  const animationDuration = 2000;

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value);
    setValue(newValue);
    if (onChange) onChange(newValue); // Gửi giá trị ra ngoài qua prop onChange

    const randomAnimation =
      animations[Math.floor(Math.random() * animations.length)];

    const heart = document.createElement("div");
    heart.classList.add("heart");
    heart.textContent = "💙";
    heart.style.animationName = randomAnimation;
    heart.style.animationDuration = `${animationDuration}ms`;
    heart.style.filter = `hue-rotate(${newValue * 3.6}deg)`;
    heart.style.left = `${newValue}%`;

    if (containerRef.current) {
      containerRef.current.appendChild(heart);
    }

    heart.onanimationend = ({ target }) => {
      if (target) {
        (target as HTMLElement).remove();
      }
    };
  };

  return (
    <div className="slider-container">
      <div className="slider container" ref={containerRef}>
        <input
          type="range"
          min="0"
          max="100"
          value={value}
          style={{ width: "100%" }}
          onChange={handleInput}
        />
      </div>
      <span className="value-display">{value}%</span>
    </div>
  );
};

export default HeartSlider;