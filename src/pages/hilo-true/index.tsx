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

// 卡牌常量和工具
type CardType =
  | "A" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "J" | "Q" | "K";
const cardFaces: CardType[] = [
  "A","2","3","4","5","6","7","8","9","10","J","Q","K",
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
function generateShuffledDeck(): CardType[] {
  let deck: CardType[] = [];
  for (let d = 0; d < TOTAL_DECKS; ++d) {
    for (const card of cardFaces) for (let c = 0; c < 4; ++c) deck.push(card);
  }
  return shuffle(deck);
}
function getHiLoValue(card: CardType): number {
  if (["2", "3", "4", "5", "6"].includes(card)) return 1;
  if (["10", "J", "Q", "K", "A"].includes(card)) return -1;
  return 0;
}

// MUI专用按钮渐变
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

export default function HiLoTruePage() {
  const [shoe, setShoe] = useState<CardType[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [count, setCount] = useState<number>(0);
  const [history, setHistory] = useState<CardType[]>([]);
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
        background: "linear-gradient(120deg, #f8ffae 0%, #43cea2 100%)",
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
                  bgcolor: "rgba(255,255,255,0.82)",
                  borderRadius: 2.5,
                  py: 1,
                  mb: 2,
                  textAlign: "center",
                  fontWeight: 700,
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
                  Hi-Lo + True Count Trainer
                </Typography>
              </Box>
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
                  {showInfo ? "Hide" : "Reveal"}
                </Button>
                <Button
                  onClick={resetTrainer}
                  sx={{
                    ...mainBtnMUI("#ddd", "#b1bfd8", "#333"),
                  }}
                >
                  Reset
                </Button>
              </Box>
              {showInfo && (
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
                  Hi-Lo Count: <b>{count.toFixed(2)}</b>
                  <br />
                  Cards Left: <b>{leftCards.toFixed(2)}</b>
                  <br />
                  Decks Left: <b>{leftDecks.toFixed(2)}</b>
                  <br />
                  True Count: <b>{trueCount.toFixed(2)}</b>
                  <br />
                  Bet Unit: <b>{betUnit}</b>
                </Box>
              )}
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
                Rule: 2~6 = +1, 10/J/Q/K/A = -1, 7/8/9 = 0.
                <br />
                Decks left and true count are calculated automatically.
                <br />
                <span style={{ color: "#ec407a", fontWeight: 600 }}>
                  Click Reveal to check your running count and decks anytime.
                </span>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
