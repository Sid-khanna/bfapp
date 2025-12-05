"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const terminalLines = [
  "Initializing candidate: Sid...",
  "Compiling red flags...",
  "Optimizing cuddle algorithm...",
  "Loading boyfriend application UI...",
  "Ready for review. Proceed with caution.",
];

const stats = [
  { label: "Loyalty", value: 95 },
  { label: "Communication", value: 87 },
  { label: "Emotional Intelligence", value: 82 },
  { label: "Chaos (fun, not toxic)", value: 68 },
];

const perks = [
  "Gym partner / cheer squad on demand",
  "Late-night drives + emotionally loaded playlists",
  "Aggressive ‘did you eat?’ reminders",
  "Will listen to you rant about work like it’s a Netflix show",
  "Random voice notes when something reminds me of you",
  "Built you a whole website, so… commitment is not the issue",
];

const interviewQuestions = [
  {
    question: "Ideal Sunday with me?",
    options: [
      "Coffee + walk",
      "Gym + food",
      "Couch, shows, and ordering in",
      "Spontaneous adventure day",
    ],
  },
  {
    question: "When we argue, what’s your style?",
    options: [
      "Talk it out now",
      "Need 10–30 mins then talk",
      "Send memes first, then talk",
      "Disappear for 2 days (wrong answer btw)",
    ],
  },
  {
    question: "Preferred shared activity?",
    options: [
      "Cooking together",
      "Reading / vibing in silence",
      "Travel + exploring new places",
      "Watching F1 and pretending we understand strategy",
    ],
  },
];

// simple typewriter hook for the terminal
function useTypewriter(lines: string[], typingSpeed = 40, lineDelay = 500) {
  const [displayed, setDisplayed] = useState<string[]>([]);

  useEffect(() => {
    let active = true;

    const typeLines = async () => {
      for (let i = 0; i < lines.length; i++) {
        if (!active) break;
        const line = lines[i];
        let current = "";

        for (let j = 0; j < line.length; j++) {
          if (!active) break;
          current += line[j];
          setDisplayed((prev) => {
            const copy = [...prev];
            copy[i] = current;
            return copy;
          });
          await new Promise((res) => setTimeout(res, typingSpeed));
        }

        await new Promise((res) => setTimeout(res, lineDelay));
      }
    };

    setDisplayed(Array(lines.length).fill(""));
    void typeLines();

    return () => {
      active = false;
    };
  }, [lines, typingSpeed, lineDelay]);

  return displayed;
}

export default function Home() {
  const typedLines = useTypewriter(terminalLines);
  const [honestMode, setHonestMode] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);

  const compatibilityScore = (() => {
    if (!answers.length) return 0;
    let score = 0;
    interviewQuestions.forEach((q, i) => {
      const a = answers[i];
      if (a == null) return;
      // last option is usually the "chaotic" one, so score it low
      score += a === q.options.length - 1 ? 1 : 10;
    });
    return Math.min(
      100,
      Math.round((score / (interviewQuestions.length * 10)) * 100)
    );
  })();

  const compatibilityLabel =
    compatibilityScore > 85
      ? "High Potential Candidate"
      : compatibilityScore > 60
      ? "Strong Match Potential"
      : "Needs Further Interviewing";

  const handleAnswer = (optionIndex: number) => {
    const updated = [...answers];
    updated[currentQuestion] = optionIndex;
    setAnswers(updated);

    if (currentQuestion === interviewQuestions.length - 1) {
      setShowResult(true);
    } else {
      setCurrentQuestion((prev) => prev + 1);
    }
  };

  const resetQuiz = () => {
    setAnswers([]);
    setCurrentQuestion(0);
    setShowResult(false);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#050816",
        color: "#e5e7eb",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
        padding: "1.5rem",
      }}
    >
      <main
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem",
        }}
      >
        {/* HERO / TERMINAL */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            borderRadius: "1rem",
            padding: "1.5rem",
            background:
              "linear-gradient(135deg, rgba(56,189,248,0.1), rgba(129,140,248,0.15))",
            border: "1px solid rgba(148,163,184,0.5)",
          }}
        >
          <div
            style={{
              fontSize: "0.8rem",
              opacity: 0.7,
              marginBottom: "0.5rem",
            }}
          >
            SYSTEM TERMINAL · Boyfriend Application v1.0
          </div>
          <div
            style={{
              background: "rgba(15,23,42,0.9)",
              borderRadius: "0.75rem",
              padding: "1rem",
              fontFamily:
                "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas",
              fontSize: "0.85rem",
            }}
          >
            {typedLines.map((line, idx) => (
              <div key={idx}>
                <span style={{ color: "#22c55e" }}>{">"}</span>{" "}
                <span>{line}</span>
                {idx === typedLines.length - 1 &&
                line.length < terminalLines[idx].length ? (
                  <span style={{ opacity: 0.7 }}>▌</span>
                ) : null}
              </div>
            ))}
          </div>

          <div
            style={{
              marginTop: "1rem",
              display: "flex",
              flexWrap: "wrap",
              gap: "0.75rem",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div
                style={{
                  fontSize: "1.4rem",
                  fontWeight: 700,
                }}
              >
                Application for the Position of: Boyfriend (Full-Time)
              </div>
              <div style={{ fontSize: "0.95rem", opacity: 0.8 }}>
                Candidate: <span style={{ fontWeight: 600 }}>Sid</span> ·
                Toronto-based · Now accepting interviews.
              </div>
            </div>

            <div
