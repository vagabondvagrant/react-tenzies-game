import "./styles.css";
import Dice from "./Dice";
import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
import Footer from "./components/Footer";

export default function App() {
  const [dice, setDice] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  //new feature of darkmode
  const toggleDarkMode = () => {
    setDarkMode((prevDarkMode) => !prevDarkMode);
  };
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);

  useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld);
    const firstValue = dice[0].value;
    const allSameValue = dice.every((die) => die.value === firstValue);
    if (allHeld && allSameValue) {
      setTenzies(true);
      console.log("You won!");
    }
  }, [dice]);

  function generateNewDice() {
    return {
      id: nanoid(), // Generate a unique id for each dice
      value: Math.ceil(Math.random() * 6),
      isHeld: false
    };
  }

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDice());
    }
    return newDice;
  }

  function holdDice(id) {
    setDice((oldDice) =>
      oldDice.map((die) =>
        die.id === id ? { ...die, isHeld: !die.isHeld } : die
      )
    );
  }

  function rollDice() {
    if (!tenzies) {
      setDice((oldDice) =>
        oldDice.map((die) => {
          return die.isHeld ? die : generateNewDice();
        })
      );
    } else {
      setTenzies(false);
      setDice(allNewDice());
    }
  }

  const diceElements = dice.map((die) => (
    <Dice
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
    />
  ));

  return (
    <main className={darkMode ? "dark-mode" : "Pink-mode"}>
      {tenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dices are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="App">
        <div className="dice-container">{diceElements}</div>
      </div>
      <button onClick={rollDice} className="roll-dice">
        {tenzies ? "New Game" : "Roll dice"}
      </button>
      <button onClick={toggleDarkMode} className="dark-mode-btn">
        {darkMode ? "Light Mode" : "Pink Mode"}
      </button>
      <Footer />
    </main>
  );
}
