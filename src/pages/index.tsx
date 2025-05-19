import React from "react";
import Link from "next/link";

export default function Home() {
  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(120deg,#F8FFAE 0%,#43C6AC 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}>
      <div style={{
        padding: 36,
        borderRadius: 18,
        background: "rgba(255,255,255,0.92)",
        boxShadow: "0 8px 32px rgba(60,120,150,0.12)",
        minWidth: 340,
        maxWidth: 420
      }}>
        <h1 style={{ textAlign: "center", fontSize: 32, fontWeight: 800, marginBottom: 16 }}>
          Blackjack Trainer
        </h1>
        <p style={{ textAlign: "center", marginBottom: 36, fontSize: 16, color: "#333" }}>
          Choose a counting method to start practicing!
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <Link
            href="/hilo"
            style={{
              padding: "16px 0",
              background: "linear-gradient(90deg,#43cea2,#185a9d)",
              color: "#fff",
              borderRadius: 10,
              textAlign: "center",
              fontWeight: 600,
              fontSize: 18,
              letterSpacing: 1,
              boxShadow: "0 2px 8px rgba(50,100,120,0.13)",
              textDecoration: "none",
              transition: "background 0.2s",
              display: "block"
            }}
          >
            Hi-Lo Algorithm
          </Link>
          <Link
            href="/hilo-true"
            style={{
              padding: "16px 0",
              background: "linear-gradient(90deg,#fc466b,#3f5efb)",
              color: "#fff",
              borderRadius: 10,
              textAlign: "center",
              fontWeight: 600,
              fontSize: 18,
              letterSpacing: 1,
              boxShadow: "0 2px 8px rgba(50,100,120,0.13)",
              textDecoration: "none",
              transition: "background 0.2s",
              display: "block"
            }}
          >
            Hi-Lo + True Count Algorithm
          </Link>
        </div>
      </div>
    </div>
  );
}
