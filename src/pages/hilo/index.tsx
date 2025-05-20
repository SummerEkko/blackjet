import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Button,
  Typography,
} from "@mui/material";

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

// MUI按钮渐变
function mainBtnMUI(c1: string, c2: string, fontColor = "#fff") {
  return {
    fontWeight: 700,
    borderRadius: 1.5,
    px: 2.5,
    py: 1.2,
    fontSize: { xs: 14, sm: 17 },
    color: fontColor,
    background: `linear-gradient(90deg,${c1},${c2})`,
    boxShadow: 2,
    textTransform: "none",
    "&:hover": {
      background: `linear-gradient(90deg,${c2},${c1})`,
      opacity: 0.93,
    },
  } as any;
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
    <Box
      sx={{
        minHeight: "100vh",
        minWidth: "100vw",
        width: "100vw",
        height: "100vh",
        position: "fixed",
        left: 0,
        top: 0,
        zIndex: 0,
        bgcolor: "transparent",
        background:
          "linear-gradient(120deg, #f9fbb2 0%, #b8f1cc 50%, #5ee8c5 100%)",
        overflow: "auto",
      }}
    >
      {/* Home按钮固定左上角 */}
      <Box
        sx={{
          position: "fixed",
          top: { xs: 16, sm: 40 },
          left: { xs: 16, sm: 40 },
          zIndex: 10,
        }}
      >
        <Link href="/" legacyBehavior>
          <a
            style={{
              background: "linear-gradient(90deg,#ffd89b,#19547b)",
              color: "#fff",
              borderRadius: 12,
              fontWeight: 700,
              fontSize: 18,
              padding: "11px 22px",
              boxShadow: "0 2px 12px #aaa4",
              letterSpacing: 1.2,
              border: "none",
              textDecoration: "none",
              display: "inline-block",
            }}
          >
            ← Home
          </a>
        </Link>
      </Box>
      {/* 主内容卡片居中 */}
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{
          minHeight: "100vh",
          minWidth: "100vw",
        }}
      >
        <Grid item xs={12} sm={8} md={6} lg={4}>
          <Card
            sx={{
              borderRadius: { xs: 3, sm: 4 },
              px: { xs: 1, sm: 4 },
              py: { xs: 2, sm: 4 },
              boxShadow: 5,
              minWidth: { xs: "94vw", sm: 370 },
              maxWidth: 440,
              mx: "auto",
              background: "linear-gradient(135deg, #6ee7b7 0%, #38bdf8 100%)",
              border: "2.2px solid #c4f2e7",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              position: "relative",
            }}
          >
            <CardContent sx={{ width: "100%", px: 0 }}>
              <Box
                sx={{
                  bgcolor: "rgba(255,255,255,0.83)",
                  borderRadius: 2.5,
                  py: 1,
                  mb: 2,
                  textAlign: "center",
                  fontWeight: 700,
                  backdropFilter: "blur(2px)",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    fontSize: { xs: 20, sm: 28 },
                    color: "#116078",
                    letterSpacing: 1,
                    m: 0,
                  }}
                >
                  Blackjack Hi-Lo Trainer
                </Typography>
              </Box>
              {/* 当前牌 */}
              <Box
                sx={{
                  fontSize: { xs: 38, sm: 62 },
                  fontWeight: 700,
                  color: "#008aff",
                  textAlign: "center",
                  letterSpacing: 3,
                  my: { xs: 1, sm: 2 },
                  userSelect: "none",
                  bgcolor: "rgba(255,255,255,0.89)",
                  borderRadius: 2.5,
                  maxWidth: 160,
                  mx: "auto",
                  boxShadow: 2,
                  border: "1.2px solid #89f6dc",
                  py: { xs: 1.5, sm: 2.5 },
                }}
              >
                {currentCard}
              </Box>
              {/* 按钮区 */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  gap: { xs: 1, sm: 2.5 },
                  my: { xs: 2, sm: 3 },
                }}
              >
                <Button
                  onClick={handleNext}
                  sx={{
                    ...mainBtnMUI("#43cea2", "#185a9d"),
                  }}
                >
                  Next Card
                </Button>
                <Button
                  onClick={handleReveal}
                  sx={{
                    ...mainBtnMUI("#fc466b", "#3f5efb"),
                  }}
                >
                  {showCount ? "Hide" : "Reveal"}
                </Button>
                <Button
                  onClick={handleReset}
                  sx={{
                    ...mainBtnMUI("#ddd", "#b1bfd8", "#333"),
                  }}
                >
                  Reset
                </Button>
              </Box>
              {/* Reveal Hi-Lo Count 毛玻璃底 */}
              {showCount && (
                <Box
                  sx={{
                    background:
                      "linear-gradient(90deg,#faffff 60%,#e6fcff 100%)",
                    borderRadius: 1.5,
                    p: { xs: 1.3, sm: 2 },
                    my: 1,
                    fontSize: { xs: 14, sm: 18 },
                    color: "#24405C",
                    fontWeight: 500,
                    textAlign: "center",
                  }}
                >
                  Hi-Lo Count: <b>{count}</b>
                </Box>
              )}
              {/* 历史记录 */}
              <Box
                sx={{
                  mt: 2,
                  fontSize: { xs: 13, sm: 15 },
                  color: "#298e7d",
                  background: "rgba(255,255,255,0.93)",
                  p: 1.2,
                  borderRadius: 1.2,
                  textAlign: "center",
                  maxHeight: 90,
                  overflowY: "auto",
                  boxShadow: 1,
                  wordBreak: "break-word",
                }}
              >
                <b>History:</b> {history.join(", ")}
              </Box>
              {/* 规则说明 */}
              <Box
                sx={{
                  color: "#009888",
                  fontSize: { xs: 11, sm: 13 },
                  mt: 2,
                  textAlign: "center",
                  background: "rgba(255,255,255,0.95)",
                  borderRadius: 1.2,
                  p: 0.9,
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
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
