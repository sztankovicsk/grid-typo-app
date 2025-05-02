import React, { useState } from "react";

  const Grid = ({ text }) => {
  const cellSize = 20;
  const spacing = 1;
  const gridWidth = Math.floor(window.innerWidth / (cellSize + spacing));
  const gridHeight = Math.floor(window.innerHeight / (cellSize + spacing));
  const [timeLevel, setTimeLevel] = useState(4);
  const [outsideLevel, setOutsideLevel] = useState(2);
  const [insideLevel, setInsideLevel] = useState(6);
  const [feelingLevel, setFeelingLevel] = useState(3);
  const distortion = Math.max(0, (feelingLevel - 1) / 7);
  const [showPopup, setShowPopup] = useState(false);
  
  const renderBars = (level, max = 8) => {
    const bars = [];
    for (let i = 0; i < max; i++) {
      bars.push(
        <div
          key={i}
          onClick={() => level.setter(i + 1)}
          style={{
            width: cellSize,
            height: cellSize,
            margin: 1,
            backgroundColor: i < level.value ? "white" : "transparent",
            border: "1px solid white",
            cursor: "pointer",
          }}
        />
      );
    }
    return <div style={{ display: "flex" }}>{bars}</div>;
  };

  const renderBottomControls = () => (
    <div
      style={{
        position: "absolute",
        bottom: 0,
        width: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
        padding: "10px 0",
        color: "white",
        fontFamily: "monospace",
        fontSize: "14px",
      }}
    >
      {[{ label: "TIME", value: timeLevel, setter: setTimeLevel },
        { label: "OUTSIDE", value: outsideLevel, setter: setOutsideLevel },
        { label: "INSIDE", value: insideLevel, setter: setInsideLevel },
        { label: "FEELING", value: feelingLevel, setter: setFeelingLevel },
      ].map((control) => (
        <div key={control.label} style={{ textAlign: "center" }}>
          {renderBars(control)}
          <div style={{ marginTop: 4 }}>{control.label}</div>
        </div>
      ))}

      <div
        style={{
          width: 30,
          height: 30,
          border: "1px solid white",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: "bold",
          cursor: "pointer",
        }}
        onClick={() => setShowPopup(!showPopup)}
      >
        ?
      </div>

      {showPopup && (
        <div
          style={{
            position: "absolute",
            bottom: 50,
            right: 10,
            backgroundColor: "black",
            color: "white",
            padding: "10px",
            border: "1px solid white",
            zIndex: 20,
          }}
        >
          <div style={{ marginBottom: 5 }}>Interference – The Silence Between Signals
          <br /><br />
          Interference is an interactive installation that explores the experience of attention disorders and the challenges of communication through the differences between neurotypical and neurodivergent perception.
The work revolves around communication between two participants: one creates a digital message, which appears distorted and altered from its original intent to the other participant.
The distorted message can only be partially perceived through a special tool, and remains distorted throughout the experience. The receiving participant must continuously struggle to decode the message, never fully grasping it at once.The project aims to offer neurotypical viewers a tangible experience of one of the most elusive aspects of attention disorders: the difficulty of maintaining focus, the distortion of information, and the unreliability of interpretation. It highlights that attention disorders are not simply about concentration problems but involve a dynamic cognitive state where information processing can fundamentally differ.
The installation represents two distinct experiential worlds—neurotypical and neurodivergent—illustrating that attention disorders encompass far more than just distraction.
After the neurotypical participant creates a message, it appears distorted to the receiver, losing clarity and descending into cognitive chaos. This represents the challenge of decoding information when a once-clear message becomes fragmented and obscure. It symbolizes how, for neurodivergent individuals, information does not always arrive intact or in an expected form. The fragmented experience reflects moments where meaning collapses and attention falters, overwhelming the ability to process incoming data.
Sliders allow the sender to distort specific aspects of the message along parameters like time, external stimuli, internal thoughts, and general cognitive state. This symbolizes the initial stages of losing control: even a clearly formed message can detach from reality and disintegrate under cognitive strain. The mechanisms of distortion mirror the challenges related to focus, information processing, and cognitive regulation.
Four key factors shape how the message is encoded and decoded, each representing different aspects of neurodivergent perception:
<br /><br />Time<br />
Time distortion controls how long the message is visible.
Longer exposure makes interpretation harder, symbolizing the difficulty attention-disordered individuals face in sustaining focus.
Rapid message changes reflect cognitive overload, where information comes too fast to process properly.
<br /><br />Inside<br />
The expansion of the grid symbolizes internal monologues pulling attention inward.
For many with attention disorders, internal thoughts continually disrupt focus on external tasks.
The growing grid captures the drifting of focus toward inner worlds.
<br /><br />Outside<br />
External stimuli cause visual disruptions that simulate constant distraction from the environment.
The animated chaos reflects the perpetual interference that neurodivergent individuals experience when trying to concentrate.
<br /><br />Feeling<br />
The distortion of character clarity reflects the viewer's mood and interest.
The less engaged the viewer is, the harder the message becomes to decode, illustrating how loss of motivation leads to cognitive disengagement and difficulty processing information.
<br /><br />Levels of Distortionv<br />
Three levels of distortion—mild, moderate, and severe—represent the broad range of experiences among neurodivergent individuals.
They symbolize not only the difficulty in decoding information but also the diversity of cognitive and emotional challenges faced daily.</div>
<br /> <button
            style={{ background: "none", color: "white", border: "1px solid white", padding: "2px 6px" }}
            onClick={() => setShowPopup(false)}
          >
            close
          </button>
        </div>
      )}
    </div>
  );

  const generateRandomCharacter = () => {
    const pattern = [];
    for (let i = 0; i < 5; i++) {
      pattern.push([
        Math.round(Math.random()),
        Math.round(Math.random()),
        Math.round(Math.random()),
      ]);
    }
    return pattern;
  };
  

  const renderCharacter = (char, xPos, yPos, distortionFactor = 0) => {
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

    let charPattern = characterMap[char.toUpperCase()] || generateRandomCharacter();

    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        if (Math.random() < distortionFactor) {
          charPattern[i][j] = 0;
        }
      }
    }

    const characterElements = [];
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
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
    const distortedRows = [];

    const charsPerLine = Math.floor(gridWidth / 6); // karakterek száma soronként (5x5 mátrix + spacing)
    const totalLines = Math.ceil(text.length / charsPerLine);
    const totalTextHeight = totalLines * 7; // minden karakter 5 magas + spacing (kb. 7 egység)

    const startY = Math.floor((gridHeight - totalTextHeight) / 2);

    text.split("").forEach((char, idx) => {
      const line = Math.floor(idx / charsPerLine);
      const posInLine = idx % charsPerLine;

      const lineLength = Math.min(charsPerLine, text.length - line * charsPerLine);
      const startX = Math.floor((gridWidth - lineLength * 4) / 2);

      const xPos = startX + posInLine * 4;
      const yPos = startY + line * 7;

      originalRows.push(...renderCharacter(char, xPos, yPos, 0));
      distortedRows.push(...renderCharacter(char, xPos, yPos + 6, distortion));
    });

    return (
      <>
        {originalRows}
        {distortedRows}
      </>
    );
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
        {[...Array(gridHeight + 1)].map((_, i) => (
          <line
            key={`h-${i}`}
            x1={0}
            y1={i * (cellSize + spacing)}
            x2={window.innerWidth}
            y2={i * (cellSize + spacing)}
            stroke="#D3D3D3"
            strokeWidth={1}
          />
        ))}
        {[...Array(gridWidth + 1)].map((_, i) => (
          <line
            key={`v-${i}`}
            x1={i * (cellSize + spacing)}
            y1={0}
            x2={i * (cellSize + spacing)}
            y2={window.innerHeight}
            stroke="#D3D3D3"
            strokeWidth={1}
          />
        ))}
        {renderText()}
      </svg>

      {renderBottomControls()}
    </div>
  );
};

export default Grid;
