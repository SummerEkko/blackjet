import React, { useState, useEffect } from "react";

// 扑克牌面
const cardDeck = [
  "A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"
];

// Hi-Lo 计分
function getHiLoValue(card) {
  if (["2", "3", "4", "5", "6"].includes(card)) return 1;
  if (["10", "J", "Q", "K", "A"].includes(card)) return -1;
  return 0;
}

function drawRandomCard() {
  const i = Math.floor(Math.random() * cardDeck.length);
  return cardDeck[i];
}

const HiLoTrainer = () => {
  const [currentCard, setCurrentCard] = useState(""); // 初始为空，避免 SSR/CSR 不一致
  const [count, setCount] = useState(0);
  const [history, setHistory] = useState([]);
  const [showCount, setShowCount] = useState(false);

  // 只在客户端初始化第一张牌
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

  // 未初始化时不渲染（防止 SSR hydration 错误）
  if (!currentCard) return null;

  return (
    <div style={{ maxWidth: 350, margin: "30px auto", padding: 20, border: "1px solid #ddd", borderRadius: 10 }}>
      <h2>Blackjack Hi-Lo 计数练习器</h2>
      <div style={{ fontSize: 48, margin: "20px 0" }}>{currentCard}</div>
      <button onClick={handleNext}>下一张</button>
      <button onClick={handleShowCount} style={{ marginLeft: 10 }}>显示当前分数</button>
      <button onClick={handleReset} style={{ marginLeft: 10 }}>重置</button>
      {showCount && (
        <div style={{ marginTop: 20, fontSize: 20 }}>
          当前Hi-Lo计分：<b>{count}</b>
        </div>
      )}
      <div style={{ marginTop: 30 }}>
        <b>出过的牌：</b> {history.join(", ")}
      </div>
      <div style={{ color: "#666", fontSize: 13, marginTop: 12 }}>
        规则：2~6计+1，10/J/Q/K/A计-1，7/8/9计0。试试盲算后校验自己结果！
      </div>
    </div>
  );
};

export default HiLoTrainer;
