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
              fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas",
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
                Candidate: <span style={{ fontWeight: 600 }}>Sid</span> · Toronto-based · Now
                accepting interviews.
              </div>
            </div>

            <div
              style={{
                display: "flex",
                gap: "0.75rem",
                marginTop: "0.5rem",
              }}
            >
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.96, y: 0 }}
                style={{
                  padding: "0.6rem 1rem",
                  borderRadius: "999px",
                  border: "none",
                  background:
                    "linear-gradient(135deg, rgba(45,212,191,0.9), rgba(59,130,246,0.9))",
                  color: "#020617",
                  fontWeight: 600,
                  cursor: "pointer",
                  fontSize: "0.9rem",
                }}
                onClick={() => {
                  const quizSection = document.getElementById("interview-section");
                  if (quizSection) {
                    quizSection.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                Review Candidate
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                style={{
                  padding: "0.6rem 1rem",
                  borderRadius: "999px",
                  border: "1px solid rgba(148,163,184,0.9)",
                  background: "rgba(15,23,42,0.9)",
                  color: "#e5e7eb",
                  fontWeight: 500,
                  cursor: "pointer",
                  fontSize: "0.9rem",
                }}
                onClick={() => {
                  const quizSection = document.getElementById("interview-section");
                  if (quizSection) {
                    quizSection.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                Run Compatibility Test
              </motion.button>
            </div>
          </div>
        </motion.section>

        {/* MODE TOGGLE + STATS */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{
            borderRadius: "1rem",
            padding: "1.5rem",
            background: "rgba(15,23,42,0.9)",
            border: "1px solid rgba(51,65,85,0.9)",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "1rem",
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <div>
              <div style={{ fontSize: "1.1rem", fontWeight: 600 }}>
                Candidate Overview
              </div>
              <div style={{ fontSize: "0.9rem", opacity: 0.8 }}>
                Quick stats on Sid, based on self-reporting, friends&apos; feedback, and a
                dramatic internal monologue.
              </div>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                fontSize: "0.85rem",
              }}
            >
              <span style={{ opacity: !honestMode ? 1 : 0.7 }}>Corporate mode</span>
              <div
                style={{
                  width: "44px",
                  height: "24px",
                  borderRadius: "999px",
                  background: honestMode ? "#22c55e" : "rgba(51,65,85,1)",
                  padding: "3px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: honestMode ? "flex-end" : "flex-start",
                  transition: "background 0.2s ease, justify-content 0.2s ease",
                }}
                onClick={() => setHonestMode((m) => !m)}
              >
                <div
                  style={{
                    width: "18px",
                    height: "18px",
                    borderRadius: "999px",
                    background: "#0f172a",
                  }}
                />
              </div>
              <span style={{ opacity: honestMode ? 1 : 0.7 }}>Honest mode</span>
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap: "1rem",
            }}
          >
            {stats.map((stat) => {
              const adjustedValue = honestMode
                ? Math.max(stat.value - 5, 0)
                : stat.value;

              return (
                <div
                  key={stat.label}
                  style={{
                    padding: "0.9rem",
                    borderRadius: "0.75rem",
                    background: "rgba(15,23,42,0.9)",
                    border: "1px solid rgba(51,65,85,1)",
                  }}
                >
                  <div
                    style={{
                      fontSize: "0.9rem",
                      opacity: 0.9,
                      marginBottom: "0.35rem",
                    }}
                  >
                    {stat.label}
                  </div>
                  <div
                    style={{
                      fontSize: "1.4rem",
                      fontWeight: 600,
                      marginBottom: "0.35rem",
                    }}
                  >
                    {adjustedValue}%
                  </div>
                  <div
                    style={{
                      width: "100%",
                      height: "8px",
                      borderRadius: "999px",
                      background: "rgba(30,41,59,1)",
                      overflow: "hidden",
                    }}
                  >
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${adjustedValue}%` }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      style={{
                        height: "100%",
                        borderRadius: "999px",
                        background:
                          "linear-gradient(90deg, rgba(45,212,191,1), rgba(59,130,246,1))",
                      }}
                    />
                  </div>
                  <div
                    style={{
                      fontSize: "0.75rem",
                      opacity: 0.7,
                      marginTop: "0.25rem",
                    }}
                  >
                    {stat.label === "Chaos (fun, not toxic)"
                      ? "Just enough to keep things interesting, not enough to ruin your life."
                      : "Based on real data (and slightly biased self-evaluation)."}
                  </div>
                </div>
              );
            })}
          </div>
        </motion.section>

        {/* PERKS */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          style={{
            borderRadius: "1rem",
            padding: "1.5rem",
            background:
              "radial-gradient(circle at top left, rgba(56,189,248,0.18), rgba(15,23,42,0.95))",
            border: "1px solid rgba(51,65,85,1)",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <div>
            <div style={{ fontSize: "1.1rem", fontWeight: 600 }}>
              Compensation & Benefits (for you)
            </div>
            <div style={{ fontSize: "0.9rem", opacity: 0.8 }}>
              What you get if you hire this particular boyfriend.
            </div>
          </div>

          <div
            style={{
              display: "flex",
              gap: "0.75rem",
              overflowX: "auto",
              paddingBottom: "0.25rem",
            }}
          >
            {perks.map((perk) => (
              <motion.div
                key={perk}
                whileHover={{ y: -4, scale: 1.02 }}
                style={{
                  minWidth: "240px",
                  maxWidth: "260px",
                  padding: "0.9rem",
                  borderRadius: "0.9rem",
                  background: "rgba(15,23,42,0.95)",
                  border: "1px solid rgba(51,65,85,1)",
                  fontSize: "0.9rem",
                }}
              >
                {perk}
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* INTERVIEW / QUIZ */}
        <motion.section
          id="interview-section"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            borderRadius: "1rem",
            padding: "1.5rem",
            background: "rgba(15,23,42,0.95)",
            border: "1px solid rgba(51,65,85,1)",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <div>
            <div style={{ fontSize: "1.1rem", fontWeight: 600 }}>
              Mini Interview: Are We a Good Fit?
            </div>
            <div style={{ fontSize: "0.9rem", opacity: 0.8 }}>
              Answer a few extremely scientific questions to estimate compatibility.
            </div>
          </div>

          {!showResult ? (
            <>
              <div style={{ fontSize: "0.9rem", opacity: 0.8 }}>
                Question {currentQuestion + 1} of {interviewQuestions.length}
              </div>
              <div
                style={{
                  fontSize: "1rem",
                  fontWeight: 500,
                  marginBottom: "0.5rem",
                }}
              >
                {interviewQuestions[currentQuestion].question}
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
                  gap: "0.75rem",
                }}
              >
                {interviewQuestions[currentQuestion].options.map((opt, idx) => (
                  <motion.button
                    key={opt}
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.96, y: 0 }}
                    onClick={() => handleAnswer(idx)}
                    style={{
                      padding: "0.75rem 0.9rem",
                      borderRadius: "0.75rem",
                      border: "1px solid rgba(51,65,85,1)",
                      background: "rgba(15,23,42,0.95)",
                      color: "#e5e7eb",
                      cursor: "pointer",
                      textAlign: "left",
                      fontSize: "0.9rem",
                    }}
                  >
                    {opt}
                  </motion.button>
                ))}
              </div>
            </>
          ) : (
            <>
              <div
                style={{
                  fontSize: "0.95rem",
                  opacity: 0.85,
                }}
              >
                Results generated. HR (me) has reviewed your answers.
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.75rem",
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: "0.85rem",
                      opacity: 0.8,
                      marginBottom: "0.25rem",
                    }}
                  >
                    Compatibility Score
                  </div>
                  <div
                    style={{
                      fontSize: "1.5rem",
                      fontWeight: 700,
                    }}
                  >
                    {compatibilityScore}%
                  </div>
                  <div
                    style={{
                      fontSize: "0.9rem",
                      marginTop: "0.25rem",
                    }}
                  >
                    {compatibilityLabel}
                  </div>
                </div>

                <div
                  style={{
                    width: "100%",
                    height: "10px",
                    borderRadius: "999px",
                    background: "rgba(30,41,59,1)",
                    overflow: "hidden",
                  }}
                >
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${compatibilityScore}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    style={{
                      height: "100%",
                      borderRadius: "999px",
                      background:
                        "linear-gradient(90deg, rgba(244,63,94,1), rgba(59,130,246,1))",
                    }}
                  />
                </div>

                <div
                  style={{
                    fontSize: "0.9rem",
                    opacity: 0.85,
                  }}
                >
                  Suggested next step: copy-paste this into Hinge:
                  <div
                    style={{
                      marginTop: "0.5rem",
                      padding: "0.75rem",
                      borderRadius: "0.75rem",
                      background: "rgba(15,23,42,0.95)",
                      border: "1px solid rgba(51,65,85,1)",
                      fontSize: "0.85rem",
                      fontFamily:
                        "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas",
                    }}
                  >
                    “I reviewed your boyfriend application and I think we should
                    schedule a first-round interview (coffee?).”
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    gap: "0.75rem",
                    flexWrap: "wrap",
                    marginTop: "0.5rem",
                  }}
                >
                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.96, y: 0 }}
                    onClick={resetQuiz}
                    style={{
                      padding: "0.6rem 1rem",
                      borderRadius: "999px",
                      border: "none",
                      background:
                        "linear-gradient(135deg, rgba(45,212,191,0.9), rgba(59,130,246,0.9))",
                      color: "#020617",
                      fontWeight: 600,
                      cursor: "pointer",
                      fontSize: "0.9rem",
                    }}
                  >
                    Retake Interview
                  </motion.button>
                </div>
              </div>
            </>
          )}
        </motion.section>

        {/* FOOTER */}
        <section
          style={{
            fontSize: "0.8rem",
            opacity: 0.6,
            textAlign: "center",
            paddingBottom: "1rem",
          }}
        >
          Built by Sid as a joke. Unless it works. Then it&apos;s a case study.
        </section>
      </main>
    </div>
  );
}
