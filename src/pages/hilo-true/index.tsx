import React, { useState, useEffect } from "react";
import Link from "next/link";

type Card = "A" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "J" | "Q" | "K";
const cardFaces: Card[] = [
  "A","2","3","4","5","6","7","8","9","10","J","Q","K"
];
const TOTAL_DECKS = 6, CARDS_PER_DECK = 52, TOTAL_CARDS = TOTAL_DECKS * CARDS_PER_DECK;

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
function generateShuffledDeck(): Card[] {
  let deck: Card[] = [];
  for (let d = 0; d < TOTAL_DECKS; ++d) {
    for (const card of cardFaces) for (let c = 0; c < 4; ++c) deck.push(card);
  }
  return shuffle(deck);
}
function getHiLoValue(card: Card): number {
  if (["2", "3", "4", "5", "6"].includes(card)) return 1;
  if (["10", "J", "Q", "K", "A"].includes(card)) return -1;
  return 0;
}
function mainBtnStyle(c1: string, c2: string, fontColor = "#fff"): React.CSSProperties {
  return {
    padding: "12px 20px",
    fontWeight: 700,
    border: "none",
    borderRadius: 8,
    fontSize: 16,
    color: fontColor,
    background: `linear-gradient(90deg,${c1},${c2})`,
    boxShadow: "0 2px 8px #aac6c87a",
    cursor: "pointer",
    transition: "background 0.2s, box-shadow 0.16s",
    outline: "none",
  };
}

export default function HiLoTruePage() {
  const [shoe, setShoe] = useState<Card[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [count, setCount] = useState<number>(0);
  const [history, setHistory] = useState<Card[]>([]);
  const [showInfo, setShowInfo] = useState<boolean>(false);
  const [showEndModal, setShowEndModal] = useState<boolean>(false);

  useEffect(() => { resetTrainer(); }, []);

  const resetTrainer = () => {
    const newShoe = generateShuffledDeck();
    setShoe(newShoe);
    setCurrentIndex(0);
    setCount(getHiLoValue(newShoe[0]));
    setHistory([newShoe[0]]);
    setShowInfo(false);
    setShowEndModal(false);
  };

  const handleNext = () => {
    if (currentIndex >= TOTAL_CARDS - 1) {
      setShowEndModal(true);
      return;
    }
    const nextCard = shoe[currentIndex + 1];
    setCurrentIndex(currentIndex + 1);
    setCount(count + getHiLoValue(nextCard));
    setHistory([...history, nextCard]);
    setShowInfo(false);
  };

  const handleReveal = () => setShowInfo((v) => !v);

  const usedCards = currentIndex + 1;
  const leftCards = TOTAL_CARDS - usedCards;
  const leftDecks = leftCards / CARDS_PER_DECK;
  const trueCount = leftDecks > 0 ? count / leftDecks : 0;
  const betUnit = Math.max(1, Math.floor(trueCount - 1));
  const currentCard = shoe[currentIndex];
  if (!currentCard) return null;

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        background: "linear-gradient(120deg, #f8ffae 0%, #43cea2 100%)",
        position: "relative",
        boxSizing: "border-box",
        overflowX: "hidden",
      }}
    >
      {/* Home 按钮 */}
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
      {/* 居中区 */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        {/* 卡片有色渐变 */}
        <div
          style={{
            maxWidth: 440,
            minWidth: 320,
            margin: "0 auto",
            padding: "38px 32px 36px 32px",
            borderRadius: 32,
            background: "linear-gradient(135deg, #6ee7b7 0%, #38bdf8 100%)", // 蓝绿主色
            boxShadow: "0 12px 60px 0 rgba(80,210,170,0.16), 0 2px 32px 0 rgba(56,189,248,0.12)",
            border: "2.2px solid #c4f2e7",
            fontFamily: "'Segoe UI', 'Arial', sans-serif",
            minHeight: 560,
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
          }}
        >
          {/* 内容叠加毛玻璃白色条，增强对比 */}
          <div style={{
            background: "rgba(255,255,255,0.82)",
            borderRadius: 20,
            padding: "12px 14px 6px 14px",
            marginBottom: 8,
            marginTop: -10,
            boxShadow: "0 1px 16px #e0fff8aa",
            textAlign: "center",
            backdropFilter: "blur(2.5px)",
          }}>
            <h2 style={{
              margin: 0, fontSize: 28, fontWeight: 700, color: "#116078", letterSpacing: 1
            }}>
              Hi-Lo + True Count Trainer
            </h2>
          </div>
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
          <div style={{
            display: "flex",
            justifyContent: "center",
            gap: 18,
            marginBottom: 28,
            marginTop: 20,
          }}>
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
              {showInfo ? "Hide" : "Reveal"}
            </button>
            <button
              onClick={resetTrainer}
              style={mainBtnStyle("#ddd", "#b1bfd8", "#333")}
            >
              Reset
            </button>
          </div>
          {/* Reveal 信息区 */}
          {showInfo && (
            <div
              style={{
                background: "linear-gradient(90deg,#faffff 60%,#e6fcff 100%)",
                borderRadius: 10,
                padding: "18px 16px",
                boxShadow: "0 2px 12px #bae1e56e",
                margin: "0 0 16px 0",
                fontSize: 18,
                color: "#24405C",
                fontWeight: 500,
                textAlign: "center",
                lineHeight: 2,
                transition: "opacity 0.18s",
              }}
            >
              Hi-Lo Count: <b>{count.toFixed(2)}</b>
              <br />
              Cards Left: <b>{leftCards.toFixed(2)}</b>
              <br />
              Decks Left: <b>{leftDecks.toFixed(2)}</b>
              <br />
              True Count: <b>{trueCount.toFixed(2)}</b>
              <br />
              Bet Unit: <b>{betUnit}</b>
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
            Rule: 2~6 = +1, 10/J/Q/K/A = -1, 7/8/9 = 0.<br />
            Decks left and true count are calculated automatically.<br />
            <span style={{ color: "#ec407a", fontWeight: 600 }}>
              Click Reveal to check your running count and decks anytime.
            </span>
          </div>
          {/* 发完牌弹窗 */}
          {showEndModal && (
            <div
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                width: "100%",
                height: "100%",
                background: "rgba(0,0,0,0.25)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 99,
                borderRadius: 32,
              }}
            >
              <div
                style={{
                  background: "#fff",
                  borderRadius: 16,
                  boxShadow: "0 4px 32px #3333",
                  padding: "34px 40px 28px 40px",
                  textAlign: "center",
                  maxWidth: 320,
                }}
              >
                <h3
                  style={{
                    fontSize: 22,
                    color: "#2160ab",
                    fontWeight: 700,
                    marginBottom: 10,
                  }}
                >
                  All 312 cards have been dealt!
                </h3>
                <p
                  style={{
                    color: "#455",
                    margin: "18px 0 22px 0",
                    fontSize: 16,
                  }}
                >
                  The deck is finished.<br />
                  Click Confirm to reset a new 6-deck shoe.
                </p>
                <button
                  onClick={resetTrainer}
                  style={{
                    padding: "10px 28px",
                    borderRadius: 8,
                    fontWeight: 700,
                    fontSize: 16,
                    background: "linear-gradient(90deg,#43cea2,#185a9d)",
                    color: "#fff",
                    border: "none",
                    cursor: "pointer",
                    boxShadow: "0 2px 8px #aac6c87a",
                  }}
                >
                  Confirm
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
