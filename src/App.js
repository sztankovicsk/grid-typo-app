import React, { useEffect, useRef, useState } from "react";

const App = () => {
  const appRef = useRef(null);
  const [text, setText] = useState("");

  useEffect(() => {
    if (appRef.current) {
      appRef.current.focus();
    }
  }, []);

  const handleKeyDown = (e) => {
    if (e.key.length === 1) setText((prev) => prev + e.key);
    else if (e.key === "Backspace") setText((prev) => prev.slice(0, -1));
  };

  return (
    <div
      ref={appRef}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      style={{
        backgroundColor: "black",
        color: "white",
        minHeight: "100vh",
        fontSize: "24px",
        padding: "2rem",
      }}
    >
      <h1>Hello from Vercel!</h1>
      <p>Start typing: {text}</p>
    </div>
  );
};

export default App;