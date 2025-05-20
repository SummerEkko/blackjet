import React, { useState, useEffect } from "react";
import Link from "next/link";

// 配置参数
const DECKS = 6;
const CARD_FACES = [
  "A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"
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
        position: "fixed",
        inset: 0,
        zIndex: 0,
        background: "linear-gradient(120deg, #f9fbb2 0%, #b8f1cc 50%, #5ee8c5 100%)",
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
        {/* 卡片主体带渐变 */}
        <div
          style={{
            maxWidth: 440,
            minWidth: 320,
            margin: "0 auto",
            padding: "38px 32px 36px 32px",
            borderRadius: 32,
            background: "linear-gradient(135deg, #6ee7b7 0%, #38bdf8 100%)",
            boxShadow: "0 12px 60px 0 rgba(80,210,170,0.16), 0 2px 32px 0 rgba(56,189,248,0.12)",
            border: "2.2px solid #c4f2e7",
            fontFamily: "'Segoe UI', 'Arial', sans-serif",
            minHeight: 480,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
          }}
        >
          {/* 顶部毛玻璃白底条 */}
          <div style={{
            background: "rgba(255,255,255,0.83)",
            borderRadius: 20,
            padding: "10px 10px 4px 10px",
            marginBottom: 8,
            marginTop: -10,
            boxShadow: "0 1px 14px #e0fff8aa",
            textAlign: "center",
            backdropFilter: "blur(2px)",
          }}>
            <h2 style={{
              margin: 0, fontSize: 28, fontWeight: 700, color: "#116078", letterSpacing: 1
            }}>
              Blackjack Hi-Lo Trainer
            </h2>
          </div>
          {/* 当前牌 毛玻璃白底 */}
          <div
            style={{
              fontSize: 62,
              fontWeight: 700,
              color: "#008aff",
              textAlign: "center",
              letterSpacing: 3,
              margin: "18px 0 22px 0",
              userSelect: "none",
              background: "rgba(255,255,255,0.89)",
              borderRadius: 18,
              width: "100%",
              maxWidth: 160,
              marginLeft: "auto",
              marginRight: "auto",
              boxShadow: "0 2px 16px #00c3d944",
              border: "1.2px solid #89f6dc",
            }}
          >
            {currentCard}
          </div>
          {/* 按钮区 */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 18,
              marginBottom: 28,
              marginTop: 20,
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
          {/* Reveal Hi-Lo Count 毛玻璃底 */}
          {showCount && (
            <div
              style={{
                background: "linear-gradient(90deg,#faffff 60%,#e6fcff 100%)",
                borderRadius: 10,
                padding: "18px 16px",
                boxShadow: "0 2px 12px #bae1e56e",
                margin: "0 0 16px 0",
                fontSize: 22,
                color: "#24405C",
                fontWeight: 700,
                textAlign: "center",
                letterSpacing: 1,
              }}
            >
              Hi-Lo Count: <b>{count}</b>
            </div>
          )}
          {/* 历史记录 */}
          <div
            style={{
              marginTop: 18,
              fontSize: 14,
              color: "#298e7d",
              background: "rgba(255,255,255,0.93)",
              padding: "12px 14px",
              borderRadius: 8,
              textAlign: "center",
              wordBreak: "break-word",
              maxHeight: 120,
              overflowY: "auto",
              boxShadow: "0 1px 8px #b2f8e944",
            }}
          >
            <b>History:</b> {history.join(", ")}
          </div>
          {/* 规则说明 */}
          <div
            style={{
              color: "#009888",
              fontSize: 12,
              marginTop: 14,
              textAlign: "center",
              background: "rgba(255,255,255,0.95)",
              borderRadius: 8,
              padding: "8px 0",
              marginBottom: 6,
              fontWeight: 500,
            }}
          >
            6 decks, 52 cards per deck.
            <br />
            Rule: 2~6 = +1, 10/J/Q/K/A = -1, 7/8/9 = 0.
            <br />
            <span style={{ color: "#ec407a", fontWeight: 600 }}>
              Try to count in your head and use Reveal to check your result!
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
