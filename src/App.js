import React, { useState } from "react";
import Confetti from "react-confetti";
import "./App.css";

function App() {
  const [names, setNames] = useState("");
  const [eras, setEras] = useState({});
  const [showConfetti, setShowConfetti] = useState(false);

  const taylorSwiftEras = [
    "Self-Titled Era",
    "Fearless Era",
    "Speak Now Era",
    "Red Era",
    "1989 Era",
    "Reputation Era",
    "Lover Era",
    "Folklore/Evermore Era",
    "Fearless (Taylor’s Version)",
    "Red (Taylor’s Version) Era",
    "Midnights Era",
  ];

  const sanitizeInput = (input) => {
    return input.replace(/[<>"'&]/g, "");
  };

  const generateEra = () => {
    const sanitizedNames = names
      .split(",")
      .map((name) => sanitizeInput(name.trim()))
      .filter(Boolean);

    if (sanitizedNames.length === 0) {
      alert("Please enter at least one name.");
      return;
    }

    const uniqueEras = {};
    const shuffledEras = [...taylorSwiftEras].sort(() => Math.random() - 0.5);

    sanitizedNames.forEach((name, index) => {
      uniqueEras[name] = shuffledEras[index % shuffledEras.length];
    });

    setEras(uniqueEras);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 4000);
  };

  return (
    <div className="App">
      <video className="background-video" autoPlay loop muted>
        <source src={process.env.PUBLIC_URL + "/background.mp4"} type="video/mp4" />
      </video>
      {showConfetti && <Confetti />}
      <h1>Taylor Swift Era Generator</h1>
      <input
        type="text"
        placeholder="Enter names separated by commas..."
        value={names}
        onChange={(e) => setNames(e.target.value)}
      />
      <button onClick={generateEra}>Generate Era</button>
      {Object.keys(eras).length > 0 && (
        <ul>
          {Object.entries(eras).map(([name, era]) => (
            <li key={name}>
              {name}: {era}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
