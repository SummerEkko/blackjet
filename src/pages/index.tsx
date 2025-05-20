import React from "react";
import Link from "next/link";

export default function Home() {
  return (
    <div style={{
      position: "fixed",
      inset: 0,
      background: "linear-gradient(120deg, #f8ffae 0%, #43c6ac 100%)",
      zIndex: 0,
      minHeight: "100vh",
      minWidth: "100vw",
      overflow: "hidden",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}>
      {/* 卡片主体渐变 */}
      <div style={{
        padding: 40,
        borderRadius: 32,
        background: "linear-gradient(135deg, #6ee7b7 0%, #38bdf8 100%)",
        boxShadow: "0 12px 60px 0 rgba(80,210,170,0.14), 0 2px 32px 0 rgba(56,189,248,0.10)",
        minWidth: 360,
        maxWidth: 460,
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        border: "2.2px solid #c4f2e7"
      }}>
        {/* 标题条毛玻璃 */}
        <div style={{
          background: "rgba(255,255,255,0.86)",
          borderRadius: 18,
          padding: "12px 10px 4px 10px",
          width: "100%",
          marginBottom: 10,
          boxShadow: "0 1px 14px #e0fff8aa",
          textAlign: "center",
          backdropFilter: "blur(2.2px)"
        }}>
          <h1 style={{
            textAlign: "center",
            fontSize: 32,
            fontWeight: 800,
            color: "#116078",
            margin: 0,
            letterSpacing: 1.2
          }}>
            Blackjack Trainer
          </h1>
        </div>
        <p style={{
          textAlign: "center",
          marginBottom: 38,
          marginTop: 10,
          fontSize: 18,
          color: "#164B60",
          fontWeight: 500
        }}>
          Choose a counting method to start practicing!
        </p>
        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: 26,
          width: "100%"
        }}>
          <Link
            href="/hilo"
            style={{
              padding: "18px 0",
              background: "linear-gradient(90deg,#43cea2,#185a9d)",
              color: "#fff",
              borderRadius: 12,
              textAlign: "center",
              fontWeight: 700,
              fontSize: 19,
              letterSpacing: 1,
              boxShadow: "0 2px 12px rgba(50,100,120,0.12)",
              textDecoration: "none",
              transition: "background 0.18s",
              display: "block",
              width: "100%"
            }}
          >
            Hi-Lo Algorithm
          </Link>
          <Link
            href="/hilo-true"
            style={{
              padding: "18px 0",
              background: "linear-gradient(90deg,#fc466b,#3f5efb)",
              color: "#fff",
              borderRadius: 12,
              textAlign: "center",
              fontWeight: 700,
              fontSize: 19,
              letterSpacing: 1,
              boxShadow: "0 2px 12px rgba(50,100,120,0.12)",
              textDecoration: "none",
              transition: "background 0.18s",
              display: "block",
              width: "100%"
            }}
          >
            Hi-Lo + True Count Algorithm
          </Link>
        </div>
      </div>
    </div>
  );
}
