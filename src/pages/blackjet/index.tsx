import React, { useState, useEffect } from "react";

// Card face type
type Card = "A" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "J" | "Q" | "K";

const cardDeck: Card[] = [
  "A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"
];

// Hi-Lo counting value
function getHiLoValue(card: Card): number {
  if (["2", "3", "4", "5", "6"].includes(card)) return 1;
  if (["10", "J", "Q", "K", "A"].includes(card)) return -1;
  return 0;
}

function drawRandomCard(): Card {
  const i = Math.floor(Math.random() * cardDeck.length);
  return cardDeck[i];
}

const HiLoTrainer: React.FC = () => {
  const [currentCard, setCurrentCard] = useState<Card | "">(""); // "" before first draw
  const [count, setCount] = useState<number>(0);
  const [history, setHistory] = useState<Card[]>([]);
  const [showCount, setShowCount] = useState<boolean>(false);

  useEffect(() => {
    const firstCard = drawRandomCard();
    setCurrentCard(firstCard);
    setHistory([firstCard]);
    setCount(getHiLoValue(firstCard));
  }, []);

  const handleNext = () => {
    const newCard = drawRandomCard();
    setCurrentCard(newCard);
    setHistory([...history, newCard]);
    setCount(count + getHiLoValue(newCard));
    setShowCount(false);
  };

  const handleShowCount = () => setShowCount(true);

  const handleReset = () => {
    const firstCard = drawRandomCard();
    setCurrentCard(firstCard);
    setHistory([firstCard]);
    setCount(getHiLoValue(firstCard));
    setShowCount(false);
  };

  if (!currentCard) return null;

  return (
    <div style={{ maxWidth: 350, margin: "30px auto", padding: 20, border: "1px solid #ddd", borderRadius: 10 }}>
      <h2>Blackjack Hi-Lo Counting Trainer</h2>
      <div style={{ fontSize: 48, margin: "20px 0" }}>{currentCard}</div>
      <button onClick={handleNext}>Next Card</button>
      <button onClick={handleShowCount} style={{ marginLeft: 10 }}>Show Current Count</button>
      <button onClick={handleReset} style={{ marginLeft: 10 }}>Reset</button>
      {showCount && (
        <div style={{ marginTop: 20, fontSize: 20 }}>
          Current Hi-Lo Count: <b>{count}</b>
        </div>
      )}
      <div style={{ marginTop: 30 }}>
        <b>History:</b> {history.join(", ")}
      </div>
      <div style={{ color: "#666", fontSize: 13, marginTop: 12 }}>
        Rule: 2~6 = +1, 10/J/Q/K/A = -1, 7/8/9 = 0. Try to keep track in your head and check your result!
      </div>
    </div>
  );
};

export default HiLoTrainer;
