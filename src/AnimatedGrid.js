import React, { useState, useEffect } from "react";
import Grid from "./Grid";

const AnimatedGrid = ({ text }) => {
  const squareSize = 50;
  const spacing = 20;
  const cols = Math.floor(window.innerWidth / (squareSize + spacing));
  const rows = Math.floor(window.innerHeight / (squareSize + spacing));

  const [time, setTime] = useState(Date.now());
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMouse({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(Date.now());
    }, 1000 / 60);
    return () => clearInterval(interval);
  }, []);

  const getCharacterPattern = (char) => {
    const characterMap = {
        A: [[0, 1, 0],[1, 0, 1],[1, 1, 1],[1, 0, 1],[1, 0, 1]],
        B: [[1, 1, 0],[1, 0, 1],[1, 1, 0],[1, 0, 1],[1, 1, 0]],
        C: [[0, 1, 1],[1, 0, 0],[1, 0, 0],[1, 0, 0],[0, 1, 1]],
        D: [[1, 1, 0],[1, 0, 1],[1, 0, 1],[1, 0, 1],[1, 1, 0]],
        E: [[0, 1, 1],[1, 0, 0],[1, 1, 0],[1, 0, 0],[0, 1, 1]],
        F: [[0, 1, 1],[1, 0, 0],[1, 1, 0],[1, 0, 0],[1, 0, 0]],
        G: [[0, 1, 1],[1, 0, 0],[1, 0, 1],[1, 0, 1],[0, 1, 1]],
        H: [[1, 0, 1],[1, 0, 1],[1, 1, 1],[1, 0, 1],[1, 0, 1]],
        I: [[0, 1, 0],[0, 1, 0],[0, 1, 0],[0, 1, 0],[0, 1, 0]],
        J: [[0, 1, 1],[0, 0, 1],[0, 0, 1],[1, 0, 1],[0, 1, 0]],
        K: [[1, 0, 1],[1, 0, 1],[1, 1, 0],[1, 0, 1],[1, 0, 1]],
        L: [[1, 0, 0],[1, 0, 0],[1, 0, 0],[1, 0, 1],[1, 1, 1]],
        M: [[1, 0, 1],[1, 1, 1],[1, 0, 1],[1, 0, 1],[1, 0, 1]],
        N: [[1, 0, 1],[1, 0, 1],[0, 1, 1],[1, 1, 0],[1, 0, 1]],
        O: [[0, 1, 0],[1, 0, 1],[1, 0, 1],[1, 0, 1],[0, 1, 0]],
        P: [[1, 1, 0],[1, 0, 1],[1, 1, 0],[1, 0, 0],[1, 0, 0]],
        Q: [[0, 1, 0],[1, 0, 1],[1, 0, 1],[1, 0, 1],[0, 1, 1]],
        R: [[1, 1, 0],[1, 0, 1],[1, 1, 0],[1, 0, 1],[1, 0, 1]],
        S: [[0, 1, 1],[1, 0, 0],[0, 1, 0],[0, 0, 1],[1, 1, 0]],
        T: [[1, 1, 1],[0, 1, 0],[0, 1, 0],[0, 1, 0],[0, 1, 0]],
        U: [[1, 0, 1],[1, 0, 1],[1, 0, 1],[1, 0, 1],[1, 1, 1]],
        V: [[1, 0, 1],[1, 0, 1],[1, 0, 1],[1, 0, 1],[0, 1, 0]],
        W: [[1, 0, 1],[1, 0, 1],[1, 0, 1],[1, 1, 1],[1, 0, 1]],
        X: [[1, 0, 1],[1, 0, 1],[0, 1, 0],[1, 0, 1],[1, 0, 1]],
        Y: [[1, 0, 1],[1, 0, 1],[0, 1, 0],[0, 1, 0],[0, 1, 0]],
        Z: [[1, 1, 0],[0, 0, 1],[0, 1, 0],[1, 0, 0],[0, 1, 1]],
        1: [[1, 1, 0],[0, 1, 0],[0, 1, 0],[0, 1, 0],[0, 1, 0]],
        2: [[1, 1, 1],[0, 0, 1],[1, 1, 1],[1, 0, 0],[1, 1, 1]],
        3: [[1, 1, 1],[0, 0, 1],[0, 1, 1],[0, 0, 1],[1, 1, 1]],
        4: [[1, 0, 1],[1, 0, 1],[1, 1, 1],[0, 0, 1],[0, 0, 1]],
        5: [[1, 1, 1],[1, 0, 0],[1, 1, 1],[0, 0, 1],[1, 1, 1]],
        6: [[1, 1, 1],[1, 0, 0],[1, 1, 1],[1, 0, 1],[1, 1, 1]],
        7: [[1, 1, 1],[1, 0, 1],[0, 0, 1],[0, 0, 1],[0, 0, 1]],
        8: [[1, 1, 1],[1, 0, 1],[1, 1, 1],[1, 0, 1],[1, 1, 1]],
        9: [[1, 1, 1],[1, 0, 1],[1, 1, 1],[0, 0, 1],[1, 1, 1]],
        0: [[1, 1, 1],[1, 0, 1],[1, 0, 1],[1, 0, 1],[1, 1, 1]],
        "?": [[1, 1, 0],[0, 0, 1],[0, 1, 1],[0, 0, 0],[0, 1, 0]],
        "(": [[0, 0, 1],[0, 1, 0],[0, 1, 0],[0, 1, 0],[0, 0, 1]],
        ")": [[1, 0, 0],[0, 1, 0],[0, 1, 0],[0, 1, 0],[1, 0, 0]],
        "/": [[0, 0, 1],[0, 1, 1],[0, 1, 0],[1, 1, 0],[1, 0, 0]],
        "!": [[0, 1, 0],[0, 1, 0],[0, 1, 0],[0, 0, 0],[0, 1, 0]],
        ":": [[0, 0, 0],[0, 1, 0],[0, 0, 0],[0, 1, 0],[0, 0, 0]],
        ",": [[0, 0, 0],[0, 0, 0],[0, 0, 0],[0, 1, 0],[1, 1, 0]],
        "-": [[0, 0, 0],[0, 0, 0],[1, 1, 1],[0, 0, 0],[0, 0, 0]],
        ".": [[0, 0, 0],[0, 0, 0],[0, 0, 0],[0, 0, 0],[0, 1, 0]],
        " ": [[0, 0, 0],[0, 0, 0],[0, 0, 0],[0, 0, 0],[0, 0, 0]]
    };
    return characterMap[char.toUpperCase()] || null;
  };

  const renderSquares = () => {
    const squares = [];
    const centerX = Math.floor(cols / 2);
    const centerY = Math.floor(rows / 2);

    const charsPerLine = 10;
    const lines = [];
    for (let i = 0; i < text.length; i += charsPerLine) {
      lines.push(text.slice(i, i + charsPerLine));
    }

    const textMap = new Set();

    lines.forEach((line, lineIdx) => {
      [...line].forEach((char, charIdx) => {
        const pattern = getCharacterPattern(char);
        if (!pattern) return;
        for (let i = 0; i < pattern.length; i++) {
          for (let j = 0; j < pattern[i].length; j++) {
            if (pattern[i][j]) {
              const x = centerX + j + (charIdx * 4) - Math.floor((line.length * 4) / 2);
              const y = centerY + i + (lineIdx * 6) - Math.floor((lines.length * 6) / 2);
              textMap.add(`${x}-${y}`);
            }
          }
        }
      });
    });

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const x = col * (squareSize + spacing);
        const y = row * (squareSize + spacing);

        const isChar = textMap.has(`${col}-${row}`);
        let rotateX = 90;
        let rotateY = 0;
        let transition = "transform 0.05s ease-out";

        if (!isChar) {
          const baseRotateX = Math.sin((row + time / 200) / 5) * 45;
          const baseRotateY = Math.cos((col + time / 200) / 5) * 45;
          const mouseAngle = Math.atan2(mouse.y - y, mouse.x - x);
          const mouseSpeed = 100;
          rotateX = baseRotateX + Math.sin(mouseAngle) * mouseSpeed;
          rotateY = baseRotateY + Math.cos(mouseAngle) * mouseSpeed;
        }

        squares.push(
          <div
            key={`sq-${row}-${col}`}
            style={{
              position: "absolute",
              top: y,
              left: x,
              width: squareSize,
              height: squareSize,
              backgroundColor: "white",
              transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
              transition: transition,
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

  return (
    <div
      style={{ backgroundColor: "black", color: "white", overflow: "hidden" }}
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <section style={{ minHeight: "100vh", overflow: "hidden" }}>
        <Grid text={text} />
      </section>
      <section style={{ minHeight: "100vh", overflow: "hidden" }}>
        <AnimatedGrid text={text} />
      </section>
    </div>
  );
};

export default App;