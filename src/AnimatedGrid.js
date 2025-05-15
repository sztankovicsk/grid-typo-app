import React, { useState, useEffect } from "react";
import Grid from "./Grid";


const AnimatedGrid = ({ 
  text, 
  idle, 
  timeLevel, 
  outsideLevel, 
  feelingLevel, 
  insideLevel }) => {
  const squareSize = 30;
  const spacing = 5;
  const normalizedFeeling = (feelingLevel - 1) / 7;

  let distortion = 0;
  let fillExtra = false;
  
  if (normalizedFeeling < 0.5) {
    // inkább "kitöltés" irányba megyünk
    distortion = 0;  // nincs eltűnés
    fillExtra = true;
  } else {
    // inkább "eltűnés" irányba megyünk
    distortion = (normalizedFeeling - 0.5) * 2; // 0 -> 1 tartományba
    fillExtra = false;
  }
  const [distortedPatternMap, setDistortedPatternMap] = useState([]);

  const isBrowser = typeof window !== "undefined";
  const cols = isBrowser ? Math.floor(window.innerWidth / (squareSize + spacing)) : 60;
  const rows = isBrowser ? Math.floor(window.innerHeight / (squareSize + spacing)) : 40;

  const [time, setTime] = useState(Date.now());
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [visibleWords, setVisibleWord] = useState("");
  
  const calculateWave = (x, y, pattern, time) => {
    // A hullámzást a karakter mintája és pozíciója alapján hozzuk létre
    const frequency = pattern.flat().filter(cell => cell === 1).length * 0.1;  // Sűrűség alapú frekvencia
    const amplitude = frequency * 10;  // A hullám amplitúdója a karakter sűrűségétől függően
  
    // Hullámzási paraméterek, az animáció alapja
    const waveX = Math.sin(x + time / 500) * amplitude;
    const waveY = Math.cos(y + time / 500) * amplitude;
  
    // A hullám egyedi eltolódása a karakter formájától függően
    const waveDistortion = waveX + waveY;
    
    return waveDistortion;
  };
  
  useEffect(() => {
    if (!text) return;
  
    const words = text.split(" ");
    let index = 0;
  
    setVisibleWord(words[0]);
  
    const minDelay = 400;
    const maxDelay = 2000;
    const clampedLevel = Math.max(1, Math.min(8, timeLevel));
    const delay = maxDelay - ((clampedLevel - 1) / 7) * (maxDelay - minDelay);
  
    const interval = setInterval(() => {
      index = (index + 1) % words.length;
      setVisibleWord(words[index]);
    }, delay);
  
    return () => clearInterval(interval);
  }, [text, timeLevel]);
  

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
  
  useEffect(() => {
    const distorted = [];
  
    const normalizedFeeling = (feelingLevel - 1) / 7;
    let distortion = 0;
    let fillExtra = false;
  
    if (normalizedFeeling < 0.5) {
      distortion = 0;
      fillExtra = true;
    } else {
      distortion = Math.min((normalizedFeeling - 0.5) * 2, 0.8);
      fillExtra = false;
    }
  
    const lines = [];
    for (let i = 0; i < visibleWords.length; i += 10) {
      lines.push(visibleWords.slice(i, i + 10));
    }
  
    lines.forEach((line, lineIdx) => {
      [...line].forEach((char, charIdx) => {
        const pattern = getCharacterPattern(char);
        if (!pattern) return;
  
        const distortedPattern = pattern.map(row =>
          row.map(cell => {
            if (fillExtra && !cell) {
              return Math.random() < (0.5 - normalizedFeeling) ? 1 : 0;
            }
            return cell && Math.random() < distortion ? 0 : cell;
          })
        );
  
        distorted.push({
          char,
          charIdx,
          lineIdx,
          pattern: distortedPattern,
        });
      });
    });
  
    setDistortedPatternMap(distorted);
  }, [visibleWords, feelingLevel]);
  
  
  const getCharacterPattern = (char) => {
    const characterMap = {
      A: [
        [0, 0, 1, 0, 0],
        [0, 1, 0, 1, 0],
        [1, 0, 0, 0, 1],
        [1, 0, 0, 0, 1],
        [1, 1, 1, 1, 1],
        [1, 0, 0, 0, 1],
        [1, 0, 0, 0, 1],
      ],
      B: [
        [1, 1, 1, 1, 0],
        [0, 1, 0, 0, 1],
        [0, 1, 0, 0, 1],
        [0, 1, 1, 1, 0],
        [0, 1, 0, 0, 1],
        [0, 1, 0, 0, 1],
        [1, 1, 1, 1, 0],
      ],
      C: [
        [0, 1, 1, 1, 0],
        [1, 0, 0, 0, 1],
        [1, 0, 0, 0, 0],
        [1, 0, 0, 0, 0],
        [1, 0, 0, 0, 0],
        [1, 0, 0, 0, 1],
        [0, 1, 1, 1, 0],
      ],
      D: [
        [1, 1, 1, 1, 0],
        [0, 1, 0, 0, 1],
        [0, 1, 0, 0, 1],
        [0, 1, 0, 0, 1],
        [0, 1, 0, 0, 1],
        [0, 1, 0, 0, 1],
        [1, 1, 1, 1, 0],
      ],
      E: [
        [1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0],
        [1, 0, 0, 0, 0],
        [1, 1, 1, 1, 0],
        [1, 0, 0, 0, 0],
        [1, 0, 0, 0, 0],
        [1, 1, 1, 1, 1],
      ],
      F: [
        [1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0],
        [1, 0, 0, 0, 0],
        [1, 1, 1, 1, 0],
        [1, 0, 0, 0, 0],
        [1, 0, 0, 0, 0],
        [1, 0, 0, 0, 0],
      ],
      G: [
        [0, 1, 1, 1, 0],
        [1, 0, 0, 0, 1],
        [1, 0, 0, 0, 0],
        [1, 0, 1, 1, 1],
        [1, 0, 0, 0, 1],
        [1, 0, 0, 0, 1],
        [0, 1, 1, 1, 0],
      ],
      H: [
        [1, 0, 0, 0, 1],
        [1, 0, 0, 0, 1],
        [1, 0, 0, 0, 1],
        [1, 1, 1, 1, 1],
        [1, 0, 0, 0, 1],
        [1, 0, 0, 0, 1],
        [1, 0, 0, 0, 1],
      ],
      I: [
        [0, 1, 1, 1, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 1, 1, 1, 0],
      ],
      J: [
        [0, 0, 1, 1, 1],
        [0, 0, 0, 1, 0],
        [0, 0, 0, 1, 0],
        [0, 0, 0, 1, 0],
        [0, 0, 0, 1, 0],
        [1, 0, 0, 1, 0],
        [0, 1, 1, 0, 0],
      ],
      K: [
        [1, 0, 0, 0, 1],
        [1, 0, 0, 1, 0],
        [1, 0, 1, 0, 0],
        [1, 1, 0, 0, 0],
        [1, 0, 1, 0, 0],
        [1, 0, 0, 1, 0],
        [1, 0, 0, 0, 1],
      ],
      L: [
        [1, 0, 0, 0, 0],
        [1, 0, 0, 0, 0],
        [1, 0, 0, 0, 0],
        [1, 0, 0, 0, 0],
        [1, 0, 0, 0, 0],
        [1, 0, 0, 0, 0],
        [1, 1, 1, 1, 1],
      ],
      M: [
        [1, 0, 0, 0, 1],
        [1, 1, 0, 1, 1],
        [1, 0, 1, 0, 1],
        [1, 0, 1, 0, 1],
        [1, 0, 0, 0, 1],
        [1, 0, 0, 0, 1],
        [1, 0, 0, 0, 1],
      ],
      N: [
        [1, 0, 0, 0, 1],
        [1, 0, 0, 0, 1],
        [1, 1, 0, 0, 1],
        [1, 0, 1, 0, 1],
        [1, 0, 0, 1, 1],
        [1, 0, 0, 0, 1],
        [1, 0, 0, 0, 1],
      ],
      O: [
        [0, 1, 1, 1, 0],
        [1, 0, 0, 0, 1],
        [1, 0, 0, 0, 1],
        [1, 0, 0, 0, 1],
        [1, 0, 0, 0, 1],
        [1, 0, 0, 0, 1],
        [0, 1, 1, 1, 0],
      ],
      P: [
        [1, 1, 1, 1, 0],
        [1, 0, 0, 0, 1],
        [1, 0, 0, 0, 1],
        [1, 1, 1, 1, 0],
        [1, 0, 0, 0, 0],
        [1, 0, 0, 0, 0],
        [1, 0, 0, 0, 0],
      ],
      Q: [
        [0, 1, 1, 1, 0],
        [1, 0, 0, 0, 1],
        [1, 0, 0, 0, 1],
        [1, 0, 0, 0, 1],
        [1, 0, 1, 0, 1],
        [1, 0, 0, 1, 0],
        [0, 1, 1, 0, 1],
      ],
      R: [
        [1, 1, 1, 1, 0],
        [1, 0, 0, 0, 1],
        [1, 0, 0, 0, 1],
        [1, 1, 1, 1, 0],
        [1, 0, 1, 0, 0],
        [1, 0, 0, 1, 0],
        [1, 0, 0, 0, 1],
      ],
      S: [
        [0, 1, 1, 1, 0],
        [1, 0, 0, 0, 1],
        [1, 0, 0, 0, 0],
        [0, 1, 1, 1, 0],
        [0, 0, 0, 0, 1],
        [1, 0, 0, 0, 1],
        [0, 1, 1, 1, 0],
      ],
      T: [
        [1, 1, 1, 1, 1],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0],
      ],
      U: [
        [1, 0, 0, 0, 1],
        [1, 0, 0, 0, 1],
        [1, 0, 0, 0, 1],
        [1, 0, 0, 0, 1],
        [1, 0, 0, 0, 1],
        [1, 0, 0, 0, 1],
        [0, 1, 1, 1, 0],
      ],
      V: [
        [1, 0, 0, 0, 1],
        [1, 0, 0, 0, 1],
        [1, 0, 0, 0, 1],
        [1, 0, 0, 0, 1],
        [1, 0, 0, 0, 1],
        [0, 1, 0, 1, 0],
        [0, 0, 1, 0, 0],
      ],
      W: [
        [1, 0, 0, 0, 1],
        [1, 0, 0, 0, 1],
        [1, 0, 0, 0, 1],
        [1, 0, 1, 0, 1],
        [1, 0, 1, 0, 1],
        [1, 0, 1, 0, 1],
        [0, 1, 0, 1, 0],
      ],
      X: [
        [1, 0, 0, 0, 1],
        [1, 0, 0, 0, 1],
        [0, 1, 0, 1, 0],
        [0, 0, 1, 0, 0],
        [0, 1, 0, 1, 0],
        [1, 0, 0, 0, 1],
        [1, 0, 0, 0, 1],
      ],
      Y: [
        [1, 0, 0, 0, 1],
        [1, 0, 0, 0, 1],
        [0, 1, 0, 1, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0],
      ],
      Z: [
        [1, 1, 1, 1, 1],
        [0, 0, 0, 0, 1],
        [0, 0, 0, 1, 0],
        [0, 0, 1, 0, 0],
        [0, 1, 0, 0, 0],
        [1, 0, 0, 0, 0],
        [1, 1, 1, 1, 1],
      ],
      "1": [
        [0, 0, 1, 0, 0],
        [0, 1, 1, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 1, 1, 1, 0],
      ],
      "2": [
        [0, 1, 1, 1, 0],
        [1, 0, 0, 0, 1],
        [0, 0, 0, 0, 1],
        [0, 0, 0, 1, 0],
        [0, 0, 1, 0, 0],
        [0, 1, 0, 0, 0],
        [1, 1, 1, 1, 1],
      ],
      "3": [
        [1, 1, 1, 1, 1],
        [0, 0, 0, 1, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 0, 1, 0],
        [0, 0, 0, 0, 1],
        [1, 0, 0, 0, 1],
        [0, 1, 1, 1, 0],
      ],
      "4": [
        [0, 0, 0, 1, 0],
        [0, 0, 1, 1, 0],
        [0, 1, 0, 1, 0],
        [1, 0, 0, 1, 0],
        [1, 1, 1, 1, 1],
        [0, 0, 0, 1, 0],
        [0, 0, 0, 1, 0],
      ],
      "5": [
        [1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0],
        [1, 1, 1, 1, 0],
        [0, 0, 0, 0, 1],
        [0, 0, 0, 0, 1],
        [1, 0, 0, 0, 1],
        [0, 1, 1, 1, 0],
      ],
      "6": [
        [0, 0, 1, 1, 0],
        [0, 1, 0, 0, 0],
        [1, 0, 0, 0, 0],
        [1, 1, 1, 1, 0],
        [1, 0, 0, 0, 1],
        [1, 0, 0, 0, 1],
        [0, 1, 1, 1, 0],
      ],
      "7": [
        [1, 1, 1, 1, 1],
        [0, 0, 0, 0, 1],
        [0, 0, 0, 1, 0],
        [0, 0, 1, 0, 0],
        [0, 1, 0, 0, 0],
        [0, 1, 0, 0, 0],
        [0, 1, 0, 0, 0],
      ],
      "8": [
        [0, 1, 1, 1, 0],
        [1, 0, 0, 0, 1],
        [1, 0, 0, 0, 1],
        [0, 1, 1, 1, 0],
        [1, 0, 0, 0, 1],
        [1, 0, 0, 0, 1],
        [0, 1, 1, 1, 0],
      ],
      "9": [
        [0, 1, 1, 1, 0],
        [1, 0, 0, 0, 1],
        [1, 0, 0, 0, 1],
        [0, 1, 1, 1, 1],
        [0, 0, 0, 0, 1],
        [0, 0, 0, 1, 0],
        [0, 1, 1, 0, 0],
      ],
      "0": [
        [0, 1, 1, 1, 0],
        [1, 0, 0, 0, 1],
        [1, 0, 0, 1, 1],
        [1, 0, 1, 0, 1],
        [1, 1, 0, 0, 1],
        [1, 0, 0, 0, 1],
        [0, 1, 1, 1, 0],
      ],
      "?": [
        [0, 1, 1, 1, 0],
        [1, 0, 0, 0, 1],
        [0, 0, 0, 0, 1],
        [0, 0, 0, 1, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0],
      ],
      "!": [
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0],
      ],
      ".": [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0],
      ],
        ":": [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
      ],
      ",": [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 1, 1, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 1, 0, 0, 0],
      ],
    };
    if (!characterMap[char.toUpperCase()]) {
      // generálj véletlenszerű 5x3 karaktert
      return Array.from({ length: 7 }, () =>
        Array.from({ length: 5 }, () => Math.round(Math.random()))
      );

    };
return characterMap[char.toUpperCase()];


  };

  const renderSquares = () => {
    const squares = [];
  
    const charsPerLine = 10;
    const charSpacingX = 6;
    const charSpacingY = 9;
    const displayText = idle ? "WELCOME TO THE VOID" : visibleWords;
  
    const lines = [];
    for (let i = 0; i < displayText.length; i += charsPerLine) {
      lines.push(displayText.slice(i, i + charsPerLine));
    }
  
    const totalLines = lines.length;
    const maxLineLength = Math.max(...lines.map((line) => line.length));
    const totalTextWidth = maxLineLength * charSpacingX;
    const totalTextHeight = totalLines * charSpacingY;
    const scale = 1 + (insideLevel / 8) * 1.5;
    const offsetX = Math.floor(cols / 2) - Math.floor(totalTextWidth / 2);
    const offsetY = Math.floor(rows / 2) - Math.floor(totalTextHeight / 2);
  
    const textMap = new Set();
  
    distortedPatternMap.forEach(({ charIdx, lineIdx, pattern }) => {
      for (let i = 0; i < pattern.length; i++) {
        for (let j = 0; j < pattern[i].length; j++) {
          if (pattern[i][j]) {
            const gridX = offsetX + j + (charIdx * charSpacingX);
            const gridY = offsetY + i + (lineIdx * charSpacingY);
            textMap.add(`${gridX}-${gridY}`);
          }
        }
      }
    });
  
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const baseSquareSize = squareSize;
        let dynamicSquareSize = baseSquareSize;

        // Szorzó az 'insideLevel' érték alapján minden négyzethez
        const level = insideLevel / 8; // Skálázás 0 - 1 között
        const scale = 1 + level * 1.5;  // max. 2.5x nagyítás
        dynamicSquareSize = baseSquareSize * scale;

        const baseX = col * (baseSquareSize + spacing);
        const baseY = row * (baseSquareSize + spacing);

        // Igazítás: nagyobb négyzetek középre legyenek igazítva
        const offset = (dynamicSquareSize - baseSquareSize) / 2;

        const x = baseX - offset;
        const y = baseY - offset;

        const isChar = textMap.has(`${col}-${row}`);
        let rotateX = 90;
        let rotateY = 0;
  
        if (!isChar) {
          const chaos = Math.max(0.1, outsideLevel / 8);
          const baseRotateX = Math.sin((row + time / (200 * (1 - chaos + 0.1))) / 5) * 45 * chaos;
          const baseRotateY = Math.cos((col + time / (200 * (1 - chaos + 0.1))) / 5) * 45 * chaos;
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
            width: dynamicSquareSize,
            height: dynamicSquareSize,
            backgroundColor: "white",
            transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
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
  const [timeLevel, setTimeLevel] = useState(7);
  const [outsideLevel, setOutsideLevel] = useState(2); 
  const [feelingLevel, setFeelingLevel] = useState(4);
  const [insideLevel, setInsideLevel] = useState(1);
   // vagy bármilyen alapérték 1-8 között
// vagy bármi alapértelmezett érték



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
        <Grid 
        text={text} 
        timeLevel={timeLevel}
        setTimeLevel={setTimeLevel} 
        outsideLevel={outsideLevel}
        setOutsideLevel={setOutsideLevel}
        feelingLevel={feelingLevel}           // ← EZ HIÁNYZOTT
        setFeelingLevel={setFeelingLevel}
        insideLevel={insideLevel}
        setInsideLevel={setInsideLevel}/>  

      </section>
      <section style={{ minHeight: "100vh", overflow: "hidden" }}>
        <AnimatedGrid 
        text={text} 
        timeLevel={timeLevel} 
        outsideLevel={outsideLevel} 
        feelingLevel={feelingLevel} 
        insideLevel={insideLevel} 
        />
      </section>
    </div>
  );
};

export default App;