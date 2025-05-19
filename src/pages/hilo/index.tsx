import React, { useState, useEffect } from "react";
import Link from "next/link";

// 配置参数
const DECKS = 6;
const CARD_FACES = [
  "A",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
] as const;
type Card = (typeof CARD_FACES)[number];

// 生成完整洗牌堆
function getShuffledDecks(): Card[] {
  const allCards: Card[] = [];
  for (let i = 0; i < DECKS; i++) {
    CARD_FACES.forEach((card) => {
      for (let j = 0; j < 4; j++) allCards.push(card);
    });
  }
  // Fisher-Yates shuffle
  for (let i = allCards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [allCards[i], allCards[j]] = [allCards[j], allCards[i]];
  }
  return allCards;
}

function getHiLoValue(card: Card): number {
  if (["2", "3", "4", "5", "6"].includes(card)) return 1;
  if (["10", "J", "Q", "K", "A"].includes(card)) return -1;
  return 0;
}

function mainBtnStyle(
  color1: string,
  color2: string,
  fontColor: string = "#fff"
): React.CSSProperties {
  return {
    padding: "12px 20px",
    fontWeight: 700,
    border: "none",
    borderRadius: 8,
    fontSize: 16,
    color: fontColor,
    background: `linear-gradient(90deg,${color1},${color2})`,
    boxShadow: "0 2px 8px #aac6c87a",
    cursor: "pointer",
    transition: "background 0.2s, box-shadow 0.16s",
    outline: "none",
  };
}

export default function HiLoPage() {
  const [deck, setDeck] = useState<Card[]>([]);
  const [currentCard, setCurrentCard] = useState<Card | "">("");
  const [count, setCount] = useState<number>(0);
  const [history, setHistory] = useState<Card[]>([]);
  const [showCount, setShowCount] = useState<boolean>(false);

  // 首次初始化洗牌堆
  useEffect(() => {
    startNewShoe();
    // eslint-disable-next-line
  }, []);

  const startNewShoe = () => {
    const newDeck = getShuffledDecks();
    setDeck(newDeck.slice(1));
    setCurrentCard(newDeck[0]);
    setHistory([newDeck[0]]);
    setCount(getHiLoValue(newDeck[0]));
    setShowCount(false);
  };

  const handleNext = () => {
    if (deck.length === 0) {
      // 这里可以弹窗/alert 或用 window.confirm
      setTimeout(() => {
        if (window.confirm("All cards dealt! Click OK to start a new shoe.")) {
          startNewShoe();
        }
      }, 80);
      return;
    }
    const [next, ...rest] = deck;
    setCurrentCard(next);
    setDeck(rest);
    setHistory([...history, next]);
    setCount(count + getHiLoValue(next));
    setShowCount(false);
  };

  const handleReveal = () => setShowCount((v) => !v);

  const handleReset = () => startNewShoe();

  if (!currentCard) return null;

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        background: "#f4f6fb",
        position: "relative",
      }}
    >
      <Link href="/" legacyBehavior>
        <a
          style={{
            position: "absolute",
            left: 40,
            top: 40,
            zIndex: 10,
            padding: "11px 22px",
            borderRadius: 12,
            fontWeight: 700,
            fontSize: 18,
            color: "#fff",
            background: "linear-gradient(90deg,#ffd89b,#19547b)",
            textDecoration: "none",
            boxShadow: "0 2px 12px #aaa4",
            letterSpacing: 1.2,
            transition: "background 0.18s",
            border: "none",
          }}
        >
          ← Home
        </a>
      </Link>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <div
          style={{
            maxWidth: 430,
            margin: "0 auto",
            padding: "32px 24px 28px 24px",
            borderRadius: 18,
            background: "rgba(255,255,255,0.97)",
            boxShadow: "0 8px 32px rgba(70, 130, 180, 0.14)",
            border: "1px solid #e3ebf4",
            fontFamily: "'Segoe UI', 'Arial', sans-serif",
            minHeight: 480,
          }}
        >
          <h2
            style={{
              textAlign: "center",
              fontSize: 28,
              fontWeight: 700,
              marginBottom: 16,
              letterSpacing: 1,
              color: "#24405C",
            }}
          >
            Blackjack Hi-Lo Trainer
          </h2>
          <div
            style={{
              fontSize: 62,
              fontWeight: 700,
              color: "#1565C0",
              textAlign: "center",
              letterSpacing: 3,
              margin: "16px 0 26px 0",
              textShadow: "0 2px 16px #c6e0ff7d",
              userSelect: "none",
            }}
          >
            {currentCard}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 18,
              marginBottom: 28,
            }}
          >
            <button
              onClick={handleNext}
              style={mainBtnStyle("#43cea2", "#185a9d")}
            >
              Next Card
            </button>
            <button
              onClick={handleReveal}
              style={mainBtnStyle("#fc466b", "#3f5efb")}
            >
              {showCount ? "Hide" : "Reveal"}
            </button>
            <button
              onClick={handleReset}
              style={mainBtnStyle("#ddd", "#b1bfd8", "#333")}
            >
              Reset
            </button>
          </div>
          {showCount && (
            <div
              style={{
                background: "linear-gradient(90deg,#e9eafc,#d7fcf8)",
                borderRadius: 10,
                padding: "18px 16px",
                boxShadow: "0 2px 8px #bae1e56e",
                margin: "0 0 16px 0",
                fontSize: 22,
                color: "#24405C",
                fontWeight: 700,
                textAlign: "center",
                transition: "opacity 0.18s",
                letterSpacing: 1,
              }}
            >
              Hi-Lo Count: <b>{count}</b>
            </div>
          )}
          <div
            style={{
              marginTop: 18,
              fontSize: 14,
              color: "#8b99af",
              background: "#f8fafc",
              padding: "12px 14px",
              borderRadius: 8,
              textAlign: "center",
              wordBreak: "break-word",
              maxHeight: 120,
              overflowY: "auto",
            }}
          >
            <b>History:</b> {history.join(", ")}
          </div>
          <div
            style={{
              color: "#96a0b3",
              fontSize: 12,
              marginTop: 14,
              textAlign: "center",
            }}
          >
            6 decks, 52 cards per deck.
            <br />
            Rule: 2~6 = +1, 10/J/Q/K/A = -1, 7/8/9 = 0.
            <br />
            Try to count in your head and use Reveal to check your result!
          </div>
        </div>
      </div>
    </div>
  );
}
