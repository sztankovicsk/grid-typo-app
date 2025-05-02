import React, { useState } from "react";
import Grid from "./Grid";
import AnimatedGrid from "./AnimatedGrid";

const AnimatedSquares = () => {
  const squareSize = 50;
  const spacing = 20;
  const cols = Math.floor(window.innerWidth / (squareSize + spacing));
  const rows = Math.floor(window.innerHeight / (squareSize + spacing));
  const [time, setTime] = React.useState(Date.now());
  const [mouse, setMouse] = React.useState({ x: 0, y: 0 });


  React.useEffect(() => {
    const handleMouseMove = (e) => {
      setMouse({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setTime(Date.now());
    }, 1000 / 60);
    return () => clearInterval(interval);
  }, []);

  const renderSquares = () => {
    const squares = [];
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const x = col * (squareSize + spacing);
        const y = row * (squareSize + spacing);
        const baseRotateX = Math.sin((row + time / 200) / 5) * 45;
        const baseRotateY = Math.cos((col + time / 200) / 5) * 45;
        const mouseAngle = Math.atan2(mouse.y - y, mouse.x - x);
        const mouseSpeed = 100;
        const rotateXWithMouse = baseRotateX + Math.sin(mouseAngle) * mouseSpeed;
        const rotateYWithMouse = baseRotateY + Math.cos(mouseAngle) * mouseSpeed;

        squares.push(
          <div
            key={`${row}-${col}`}
            style={{
              position: "absolute",
              top: y,
              left: x,
              width: squareSize,
              height: squareSize,
              backgroundColor: "white",
              transform: `rotateX(${rotateXWithMouse}deg) rotateY(${rotateYWithMouse}deg)`,
              transition: "transform 0.05s ease-out",
            }}
          />
        );
      }
    }
    return squares;
  };

  return (
    <div
      style={{
        backgroundColor: "black",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        position: "relative",
        cursor: "none",
      }}
    >
      {renderSquares()}
    </div>
  );
};

const App = () => {
    const [text, setText] = useState("");
  
    const handleKeyDown = (e) => {
      if (e.key.length === 1) setText((prev) => prev + e.key);
      else if (e.key === "Backspace") setText((prev) => prev.slice(0, -1));
    };
    const [outsideLevel, setOutsideLevel] = useState(2);
    return (
      <div
        style={{ backgroundColor: "black", color: "white", overflowY: "auto" }}
        tabIndex={0}
        onKeyDown={handleKeyDown}
      >
     
        <section style={{ minHeight: "100%" }}>
          <AnimatedGrid text={text} />
        </section>
      </div>
    );
  };
  
export default App;
