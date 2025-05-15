import React, { useState, useEffect } from "react";

const Grid = ({ text, idle, timeLevel, setTimeLevel, outsideLevel, setOutsideLevel, feelingLevel, setFeelingLevel, insideLevel, setInsideLevel }) => {
  const cellSize = 20;
  const spacing = 1;
  const gridUnit = cellSize + spacing;
  const barSize = cellSize - spacing;
  const [showPopup, setShowPopup] = useState(false);
  const gridWidth = Math.floor(window.innerWidth / (cellSize + spacing));
  const gridHeight = Math.floor(window.innerHeight / (cellSize + spacing));

  const renderPopupControls = () => {
  const popupWidth = gridUnit * 32; // 12 kocka széles
  const popupHeight = gridUnit * 61; // 12 kocka magas
  const xBlocksFromRight = 2; // 2 kockányi szélesség
  const yBlocksFromBottom = 6; // 4 a sáv + 1 fölötte
  const popupX = (gridWidth - xBlocksFromRight - 32) * gridUnit;
  const popupY = (gridHeight - yBlocksFromBottom - 61) * gridUnit;
  
  const receptionText = [
    "RECEPTION",
    "Reception distortion controls how long the message is visible. Longer exposure makes interpretation harder, symbolizing the difficulty attention-disordered individuals face in sustaining focus. Rapid message changes reflect cognitive overload, where information comes too fast to process properly.",
  ];

  const outsideText = [
    "OUTSIDE",
    "External stimuli cause visual disruptions that simulate constant distraction from the environment. The animated chaos reflects the perpetual interference that neurodivergent individuals experience when trying to concentrate.",
  ];

  const insideText = [
    "INSIDE",
    "The expansion of the grid symbolizes internal monologues pulling attention inward. For many with attention disorders, internal thoughts continually disrupt focus on external tasks. The growing grid captures the drifting of focus toward inner worlds.",
  ];
  
  const feelingText = [
    
    "FEELING",
    "The distortion of character clarity reflects the viewer's mood and interest. The less engaged the viewer is, the harder the message becomes to decode, illustrating how loss of motivation leads to cognitive disengagement and difficulty processing information.",
  ];
  return (
    <g>
      {/* POPUP tartalom alul */}
      {showPopup && (
        <foreignObject
          x={popupX}
          y={popupY}
          width={popupWidth}
          height={popupHeight}
        >
          <div
          lang="en"
            style={{
              //backgroundColor: "black",
              color: "white",
              padding: gridUnit,
              //border: "1px solid white",
              fontSize: "14px",
              textAlign: "justify",
              fontFamily: "monospace",
              hyphens: "auto",
              overflowY: "hidden",
              boxSizing: "border-box",
            }}
          >
            
            {/* Felső bevezető blokk */}
            <div
              style={{
                backgroundColor: "black",
                marginBottom: gridUnit,
                padding: gridUnit,
                border: "1px solid white",
                textAlign: "justify",
                boxSizing: "border-box",
                minHeight: gridUnit * 6 // vagy 8, ha magasabb kell

              }}
            >
              <div style={{ fontWeight: "bold", marginBottom: 8 }}>
                Interference – The Silence Between Signals
              </div>
              <div>
                This installation explores how communication breaks down between neurotypical and neurodivergent perspectives. The sections below illustrate distortion through four cognitive dimensions.
              </div>
            </div>

            {/* 2x2 szövegrács */}
            <div
  style={{
   
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: gridUnit,
    marginBottom: gridUnit,
  }}
>
  {[receptionText, outsideText, insideText, feelingText].map((section, idx) => {
    const isTopRow = idx < 2;
    const blockHeight = gridUnit * (isTopRow ? 10 :9); // felsők magasabbak

    return (
      <div
        key={idx}
        style={{
          backgroundColor: "black",
          border: "1px solid white",
          padding: gridUnit,
          height: blockHeight,
          overflowY: "hidden",
          textAlign: "justify",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ fontWeight: "bold", marginBottom: 4 }}>
          {section[0]}
        </div>
        {section.slice(1).map((line, index) => (
          <div key={index} style={{ marginBottom: 6 }}>{line}</div>
        ))}
      </div>
    );
  })}
</div>

            {/* Alsó hosszú blokk */}
            <div
              style={{
                backgroundColor: "black",
                padding: gridUnit,
                border: "1px solid white",
                textAlign: "justify",
                boxSizing: "border-box",
                minHeight: gridUnit * 27,
                overflowY: "hidden",
              }}
            >
              
              <div>
               The work revolves around communication between two participants: one creates a digital message, which appears distorted and altered from its original intent to the other participant. The distorted message can only be partially perceived through a special tool, and remains distorted throughout the experience. The receiving participant must continuously struggle to decode the message, never fully grasping it at once. The project aims to offer neurotypical viewers a tangible experience of one of the most elusive aspects of attention disorders: the difficulty of maintaining focus, the distortion of information, and the unreliability of interpretation. It highlights that attention disorders are not simply about concentration problems but involve a dynamic cognitive state where information processing can fundamentally differ. The installation represents two distinct experiential worlds—neurotypical and neurodivergent—illustrating that attention disorders encompass far more than just distraction. After the neurotypical participant creates a message, it appears distorted to the receiver, losing clarity and descending into cognitive chaos. This represents the challenge of decoding information when a once-clear message becomes fragmented and obscure. It symbolizes how, for neurodivergent individuals, information does not always arrive intact or in an expected form. The fragmented experience reflects moments where meaning collapses and attention falters, overwhelming the ability to process incoming data. Sliders allow the sender to distort specific aspects of the message along parameters like time, external stimuli, internal thoughts, and general cognitive state. This symbolizes the initial stages of losing control: even a clearly formed message can detach from reality and disintegrate under cognitive strain. The mechanisms of distortion mirror the challenges related to focus, information processing, and cognitive regulation. Four key factors shape how the message is encoded and decoded, each representing different aspects of neurodivergent perception.
              </div>
            </div>
          </div>
        </foreignObject>
      )}

      {/* KÉRDŐJEL gomb — legfelül jelenik meg */}
      <rect
        x={(gridWidth - 3) * gridUnit}
        y={(gridHeight - 7) * gridUnit}
        width={gridUnit * 2}
        height={gridUnit * 2}
        fill="black"
        stroke="white"
      />
      <foreignObject
        x={(gridWidth - 3) * gridUnit}
        y={(gridHeight - 7) * gridUnit}
        width={gridUnit * 2}
        height={gridUnit * 2}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontSize: cellSize,
            cursor: "pointer",
            backgroundColor: "transparent",
          }}
          onClick={() => setShowPopup(!showPopup)}
        >
          ?
        </div>
      </foreignObject>
    </g>
  );
};

  const handleKeyDown = (event) => {
    if (event.key === " ") {
      event.preventDefault(); // Megakadályozza az alapértelmezett viselkedést, hogy ne görgessen az oldal
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

 
  
  const renderBars = (value, setter, max = 8) => {
    const bars = [];
    for (let i = 0; i < max; i++) {
      bars.push(
        <div
          key={i}
          onClick={() => setter(i + 1)}
          style={{
            width: barSize,
            height: barSize,
            margin: spacing / 2,
            backgroundColor: i < value ? "white" : "transparent",
            border: "1px solid white",
            cursor: "pointer",
          }}
        />
      );
    }
    return <div style={{ display: "flex" }}>{bars}</div>;
  };
 
  const renderControlRects = () => {
    const startRow = gridHeight - 3;
    const sectionWidth = gridWidth / 4;
    const controlWidth = 8; // 8 oszlop széles minden slider-csoport
    const padding = (sectionWidth - controlWidth) / 2;
  
    const startColList = [0, 1, 2, 3].map(i => Math.round(i * sectionWidth + padding));
  
    const background = (
      <rect
        key="background"
        x={0}
        y={(gridHeight - 4) * gridUnit}
        width={window.innerWidth}
        height={gridUnit * 4}
        fill="black"
      />
    );
  
    const controls = startColList.flatMap((startCol, groupIdx) => {
      const control = [
        { label: "RECEPTION", value: timeLevel, setter: setTimeLevel },
        { label: "OUTSIDE", value: outsideLevel, setter: setOutsideLevel },
        { label: "INSIDE", value: insideLevel, setter: setInsideLevel },
        { label: "FEELING", value: feelingLevel, setter: setFeelingLevel },
      ][groupIdx];
  
      const rects = [];
  
      for (let i = 0; i < 8; i++) {
        const x = (startCol + i) * gridUnit;
        const y = startRow * gridUnit;
  
        rects.push(
          <rect
            key={`control-${control.label}-${i}`}
            x={x}
            y={y}
            width={cellSize}
            height={cellSize}
            fill={i < control.value ? "white" : "transparent"}
            stroke="white"
            onClick={() => control.setter(i + 1)}
            style={{ cursor: "pointer" }}
          />
        );
      }
      const labelX = (startCol + controlWidth / 2) * gridUnit;

      rects.push(
        <text
          key={`label-${control.label}`}
          x={labelX}
          y={(startRow + 1.8) * gridUnit}
          fill="white"
          textAnchor="middle"
          fontSize="14px"
          fontFamily="monospace"
        >
          {control.label}
        </text>
      );
  
      return rects;
    });
  
    // Fehér függőleges elválasztó vonalak a 4 szekció között
    const separators = [1, 2, 3].map(i => {
      const x = Math.round(i * sectionWidth) * gridUnit;
      return (
        <line
          key={`separator-${i}`}
          x1={x}
          y1={(gridHeight - 5) * gridUnit}
          x2={x}
          y2={gridHeight * gridUnit}
          stroke="white"
          strokeWidth={1}
        />
      );
    });
  
    return [background, ...controls, ...separators];
  };
      
  const generateRandomCharacter = () => {
    const pattern = [];
    for (let i = 0; i < 5; i++) {
      pattern.push([
        Math.round(Math.random()),
        Math.round(Math.random()),
        Math.round(Math.random()),
        Math.round(Math.random()),
        Math.round(Math.random()),
      ]);
    }
    return pattern;
  };
  const renderCharacter = (char, xPos, yPos) => {
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

    const charPattern = characterMap[char.toUpperCase()] || Array(7).fill(Array(5).fill(0));

    const characterElements = [];

    for (let i = 0; i < charPattern.length; i++) {
      for (let j = 0; j < charPattern[i].length; j++) {
        if (charPattern[i][j] === 1) {
          characterElements.push(
            <rect
              key={`${char}-${xPos}-${yPos}-${i}-${j}`}
              x={(xPos + j) * (cellSize + spacing)}
              y={(yPos + i) * (cellSize + spacing)}
              width={cellSize}
              height={cellSize}
              fill="white"
            />
          );
        }
      }
    }
    return characterElements;
  };

  const renderText = () => {
    const originalRows = [];
    const charsPerLine = Math.floor(gridWidth / 8); // karakterek száma soronként (5x5 mátrix + spacing)
    const totalLines = Math.ceil(text.length / charsPerLine);
    const totalTextHeight = totalLines * 8;

    const startY = Math.floor((gridHeight - totalTextHeight) / 2);
    let currentLine = "";
    let yOffset = startY;

    const activeText = idle ? "WELCOME TO THE VOID" : text;
    const words = activeText.split(" ");


    words.forEach((word) => {
      if ((currentLine.length + word.length + 1) <= charsPerLine) {
        currentLine += word + " ";
      } else {
        const lineLength = Math.min(charsPerLine, currentLine.length);
        const startX = Math.floor((gridWidth - lineLength * 6) / 2);
        const yPos = yOffset;

        currentLine.split("").forEach((char, idx) => {
          const xPos = startX + idx * 6;
          originalRows.push(...renderCharacter(char, xPos, yPos));
        });

        currentLine = word + " ";
        yOffset += 10; // A sorok közötti távolság
      }
    });

    if (currentLine) {
      const lineLength = Math.min(charsPerLine, currentLine.length);
      const startX = Math.floor((gridWidth - lineLength * 6) / 2);
      const yPos = yOffset;

      currentLine.split("").forEach((char, idx) => {
        const xPos = startX + idx * 6;
        originalRows.push(...renderCharacter(char, xPos, yPos));
      });
    }

    return <>{originalRows}</>;
  };

  return (
    <div
      style={{
        backgroundColor: "black",
        width: "100vw",
        height: "100%",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <svg
  width={window.innerWidth}
  height={window.innerHeight}
  style={{ display: "block" }}
>
  {/* rácsvonalak */}
  {[...Array(gridHeight + 1)].map((_, i) => (
  <line
    key={`h-${i}`}
    x1={0}
    y1={i * gridUnit}
    x2={window.innerWidth}
    y2={i * gridUnit}
    stroke="#D3D3D3"
    strokeWidth={1}
  />
))}
{[...Array(gridWidth + 1)].map((_, i) => (
  <line
    key={`v-${i}`}
    x1={i * gridUnit}
    y1={0}
    x2={i * gridUnit}
    y2={window.innerHeight}
    stroke="#D3D3D3"
    strokeWidth={1}
  />
))}
  {renderText()}
  {renderControlRects()}
  {renderPopupControls()}
</svg>

    </div>
  );
};

export default Grid;