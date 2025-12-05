"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const terminalLines = [
  "Booting Boyfriend Application System...",
  "Initializing candidate: Sid...",
  "Compiling red flags (0 critical found)...",
  "Optimizing cuddle algorithm...",
  "Loading profile interface...",
  "Ready for review. Proceed with caution.",
];

const stats = [
  { label: "Loyalty", value: 100 }, // locked at 100
  { label: "Communication", value: 87 },
  { label: "Emotional Intelligence", value: 82 },
  { label: "Chaos (fun, not toxic)", value: 62 },
];

const perks = [
  "Gym partner / cheer squad on demand",
  "Late-night drives + emotionally loaded playlists",
  "Aggressive ‘did you eat?’ reminders",
  "Will listen to you rant about work like it’s a Netflix show",
  "Random voice notes when something reminds me of you",
  "Built you a whole website, so… commitment is clearly not the issue",
];

const interviewQuestions = [
  {
    question: "Ideal Sunday with me?",
    options: [
      { text: "Coffee + walk", score: 10 },
      { text: "Gym + food", score: 10 },
      { text: "Couch, shows, and ordering in", score: 10 },
      { text: "Spontaneous adventure day", score: 10 },
    ],
  },
  {
    question: "When we argue, what’s your style?",
    options: [
      { text: "Talk it out now", score: 10 },
      { text: "Need 10–30 mins then talk", score: 10 },
      { text: "Send memes first, then talk", score: 10 },
      {
        text: "Disappear for 2 days (wrong answer btw)",
        score: 0, // only wrong one
      },
    ],
  },
  {
    question: "Preferred shared activity?",
    options: [
      { text: "Cooking together", score: 10 },
      { text: "Reading / vibing in silence", score: 10 },
      { text: "Travel + exploring new places", score: 10 },
      {
        text: "Watching F1 and pretending we understand strategy",
        score: 10,
      },
    ],
  },
];

const references = [
  "“Will turn your entire chat into his FYP by sending way too many reels.” – Group chat",
  "“Claims he doesn’t know every song. Evidence suggests otherwise.” – Close friend",
  "“Hard worker, would not trust him with a ‘skip intro’ button.” – Netflix",
  "“Exceeded expectations in emotional support, underperformed in sleeping early.” – Gym partner",
];

const redFlags = [
  "Overthinks everything, including this website.",
  "Says “I’ll be there in 10” knowing it means 20.",
  "Sees a cliff edge and thinks ‘great place to sit and think.’",
  "Chronically lies to himself about bedtime.",
];

// typewriter hook for intro terminal
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
  const [showIntro, setShowIntro] = useState(true);
  const [honestMode, setHonestMode] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);

  // hide intro after typing is basically done
  useEffect(() => {
    const totalTime =
      terminalLines.reduce((acc, line) => acc + line.length * 40, 0) +
      terminalLines.length * 500 +
      800;

    const timer = setTimeout(() => setShowIntro(false), totalTime);
    return () => clearTimeout(timer);
  }, []);

  const { compatibilityScore, compatibilityLabel } = (() => {
    const maxScore = interviewQuestions.reduce((acc, q) => {
      const best = Math.max(...q.options.map((o) => o.score));
      return acc + best;
    }, 0);

    let score = 0;
    interviewQuestions.forEach((q, i) => {
      const a = answers[i];
      if (a == null) return;
      score += q.options[a].score;
    });

    const pct =
      maxScore === 0 ? 0 : Math.min(100, Math.round((score / maxScore) * 100));

    let label: string;
    if (pct >= 90) {
      label =
        "HR recommends immediate offer. Lock him in before another team poaches him.";
    } else if (pct >= 70) {
      label =
        "Strong cultural fit. Recommend second-round interview (coffee, then food).";
    } else if (pct >= 40) {
      label =
        "Potential, but requires onboarding and maybe a few ‘what are we?’ conversations.";
    } else {
      label =
        "System suggests friendship… but HR won’t stop you if you like red flags.";
    }

    return { compatibilityScore: pct, compatibilityLabel: label };
  })();

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
        fontFamily:
          "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
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
        {showIntro ? (
          // INTRO SCREEN – ONLY TERMINAL
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            style={{
              minHeight: "80vh",
              display: "flex",
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: "100%",
                background: "rgba(15,23,42,0.95)",
                borderRadius: "1rem",
                padding: "1.25rem",
                border: "1px solid rgba(148,163,184,0.6)",
                fontFamily:
                  "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas",
                fontSize: "0.9rem",
              }}
            >
              <div
                style={{
                  fontSize: "0.8rem",
                  opacity: 0.7,
                  marginBottom: "0.75rem",
                }}
              >
                SYSTEM TERMINAL · Boyfriend Application Boot Sequence
              </div>
              {typedLines.map((line, idx) => (
                <div key={idx}>
                  <span style={{ color: "#22c55e" }}>{">"}</span>{" "}
                  <span>{line}</span>
                </div>
              ))}
            </div>
          </motion.section>
        ) : (
          <>
            {/* HERO CARD */}
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
                APPLICATION · Position: Boyfriend (Full-Time)
              </div>

              <div
                style={{
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
                      fontSize: "1.6rem",
                      fontWeight: 700,
                    }}
                  >
                    Candidate: Sid
                  </div>
                  <div
                    style={{
                      fontSize: "0.95rem",
                      opacity: 0.8,
                      marginTop: "0.25rem",
                    }}
                  >
                    Emotionally available. Slightly delusional,
                    but in a fun way. Now accepting applications for shared
                    hoodies, playlists, and future inside jokes.
                  </div>
                                    <div
                    style={{
                      fontSize: "0.85rem",
                      opacity: 0.85,
                      marginTop: "0.6rem",
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "0.6rem",
                    }}
                  >
                    <a
                      href="https://instagram.com/sid_khanna__"
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        padding: "0.35rem 0.75rem",
                        borderRadius: "999px",
                        border: "1px solid rgba(148,163,184,0.8)",
                        textDecoration: "none",
                        color: "#e5e7eb",
                        fontSize: "0.8rem",
                      }}
                    >
                      📸 @sid_khanna__
                    </a>
                    <a
                      href="mailto:siddharth.khanna1@gmail.com"
                      style={{
                        padding: "0.35rem 0.75rem",
                        borderRadius: "999px",
                        border: "1px solid rgba(148,163,184,0.8)",
                        textDecoration: "none",
                        color: "#e5e7eb",
                        fontSize: "0.8rem",
                      }}
                    >
                      📧 Siddharth.Khanna1@gmail.com
                    </a>
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
                      const section =
                        document.getElementById("overview-section");
                      if (section) {
                        section.scrollIntoView({ behavior: "smooth" });
                      }
                    }}
                  >
                    Review Profile
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
                      const section =
                        document.getElementById("interview-section");
                      if (section) {
                        section.scrollIntoView({ behavior: "smooth" });
                      }
                    }}
                  >
                    Run Compatibility Test
                  </motion.button>
                </div>
              </div>
            </motion.section>

            {/* OVERVIEW + STATS */}
            <motion.section
              id="overview-section"
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
                  <div
                    style={{ fontSize: "1.1rem", fontWeight: 600 }}
                  >
                    Candidate Overview
                  </div>
                  <div
                    style={{ fontSize: "0.9rem", opacity: 0.8 }}
                  >
                    Quick stats on Sid, based on self-reporting, friend
                    reviews, and an unnecessarily detailed internal
                    monologue.
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
                  <span style={{ opacity: !honestMode ? 1 : 0.7 }}>
                    Corporate mode
                  </span>
                  <div
                    style={{
                      width: "44px",
                      height: "24px",
                      borderRadius: "999px",
                      background: honestMode
                        ? "#22c55e"
                        : "rgba(51,65,85,1)",
                      padding: "3px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: honestMode
                        ? "flex-end"
                        : "flex-start",
                      transition:
                        "background 0.2s ease, justify-content 0.2s ease",
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
                  <span style={{ opacity: honestMode ? 1 : 0.7 }}>
                    Honest mode
                  </span>
                </div>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(auto-fit, minmax(180px, 1fr))",
                  gap: "1rem",
                }}
              >
                {stats.map((stat) => {
                  const adjustedValue =
                    stat.label === "Loyalty"
                      ? 100
                      : stat.label === "Chaos (fun, not toxic)" && honestMode
                      ? Math.min(stat.value + 15, 100) // chaos goes UP in honest mode
                      : honestMode
                      ? Math.max(stat.value - 5, 0) // others go slightly down
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
                          animate={{
                            width: `${adjustedValue}%`,
                          }}
                          transition={{
                            duration: 0.8,
                            ease: "easeOut",
                          }}
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
                        {stat.label === "Loyalty"
                          ? "Hard-locked at 100%. No games, no divided attention."
                          : stat.label ===
                            "Chaos (fun, not toxic)"
                          ? "Just enough to keep things interesting, not enough to ruin your life."
                          : "Based on real data (and slightly biased self-evaluation)."}
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.section>

            {/* PICTURES SECTION */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              style={{
                borderRadius: "1rem",
                padding: "1.5rem",
                background: "rgba(15,23,42,0.95)",
                border: "1px solid rgba(51,65,85,1)",
              }}
            >
              <div
                style={{
                  fontSize: "1.1rem",
                  fontWeight: 600,
                  marginBottom: "0.75rem",
                }}
              >
                Candidate Visual Evidence
              </div>
              <div
                style={{
                  fontSize: "0.9rem",
                  opacity: 0.8,
                  marginBottom: "0.75rem",
                }}
              >
                A small sample of the face you&apos;ll be arguing with
                about what to eat.
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(auto-fit, minmax(180px, 1fr))",
                  gap: "0.75rem",
                }}
              >
                {["/pic1.jpg", "/pic2.jpg", "/pic3.jpg"].map((src) => (
                  <motion.img
                    key={src}
                    src={src}
                    alt="Sid"
                    whileHover={{ scale: 1.05, y: -2 }}
                    style={{
                      width: "100%",
                      height: "220px",
                      objectFit: "cover",
                      borderRadius: "0.75rem",
                      border: "1px solid rgba(51,65,85,1)",
                      backgroundColor: "#020617",
                    }}
                  />
                ))}
              </div>
            </motion.section>

            {/* PERKS – vertical grid */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
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
                <div
                  style={{ fontSize: "1.1rem", fontWeight: 600 }}
                >
                  Compensation & Benefits (for you)
                </div>
                <div
                  style={{ fontSize: "0.9rem", opacity: 0.8 }}
                >
                  What you get if you hire this particular boyfriend.
                </div>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(auto-fit, minmax(220px, 1fr))",
                  gap: "0.9rem",
                }}
              >
                {perks.map((perk) => (
                  <motion.div
                    key={perk}
                    whileHover={{ y: -4, scale: 1.02 }}
                    style={{
                      padding: "0.95rem",
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

            {/* REFERENCES */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              style={{
                borderRadius: "1rem",
                padding: "1.5rem",
                background: "rgba(15,23,42,0.95)",
                border: "1px solid rgba(51,65,85,1)",
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
              }}
            >
              <div
                style={{
                  fontSize: "1.1rem",
                  fontWeight: 600,
                  marginBottom: "0.25rem",
                }}
              >
                References (Highly Biased)
              </div>
              <div
                style={{
                  fontSize: "0.9rem",
                  opacity: 0.8,
                  marginBottom: "0.5rem",
                }}
              >
                External feedback from previous stakeholders in the “Sid
                experience”.
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(auto-fit, minmax(220px, 1fr))",
                  gap: "0.75rem",
                }}
              >
                {references.map((ref) => (
                  <motion.div
                    key={ref}
                    whileHover={{ y: -3, scale: 1.01 }}
                    style={{
                      padding: "0.9rem",
                      borderRadius: "0.8rem",
                      background: "rgba(15,23,42,0.95)",
                      border: "1px solid rgba(51,65,85,1)",
                      fontSize: "0.85rem",
                      fontStyle: "italic",
                    }}
                  >
                    {ref}
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* RED FLAGS */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              style={{
                borderRadius: "1rem",
                padding: "1.5rem",
                background: "rgba(15,23,42,0.95)",
                border: "1px solid rgba(239,68,68,0.6)",
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                <span style={{ fontSize: "1.2rem" }}>⚠️</span>
                <div
                  style={{ fontSize: "1.05rem", fontWeight: 600 }}
                >
                  Red Flags (Disclosed Upfront)
                </div>
              </div>
              <div
                style={{
                  fontSize: "0.9rem",
                  opacity: 0.8,
                  marginBottom: "0.25rem",
                }}
              >
                HR requires that the following known issues be disclosed
                before proceeding.
              </div>

              <ul
                style={{
                  margin: 0,
                  paddingLeft: "1.1rem",
                  fontSize: "0.9rem",
                  display: "grid",
                  gap: "0.35rem",
                }}
              >
                {redFlags.map((flag) => (
                  <li key={flag}>{flag}</li>
                ))}
              </ul>
            </motion.section>

            {/* INTERVIEW / QUIZ */}
            <motion.section
              id="interview-section"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
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
                <div
                  style={{
                    fontSize: "1.1rem",
                    fontWeight: 600,
                  }}
                >
                  Mini Interview: Are We a Good Fit?
                </div>
                <div
                  style={{ fontSize: "0.9rem", opacity: 0.8 }}
                >
                  Answer a few extremely scientific questions to estimate
                  compatibility.
                </div>
              </div>

              {!showResult ? (
                <>
                  <div
                    style={{
                      fontSize: "0.9rem",
                      opacity: 0.8,
                    }}
                  >
                    Question {currentQuestion + 1} of{" "}
                    {interviewQuestions.length}
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
                      gridTemplateColumns:
                        "repeat(auto-fit, minmax(160px, 1fr))",
                      gap: "0.75rem",
                    }}
                  >
                    {interviewQuestions[
                      currentQuestion
                    ].options.map((opt, idx) => (
                      <motion.button
                        key={opt.text}
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
                        {opt.text}
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
                        animate={{
                          width: `${compatibilityScore}%`,
                        }}
                        transition={{
                          duration: 0.8,
                          ease: "easeOut",
                        }}
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
                          border:
                            "1px solid rgba(51,65,85,1)",
                          fontSize: "0.85rem",
                          fontFamily:
                            "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas",
                        }}
                      >
                        “I reviewed your boyfriend application and I think
                        we should schedule a first-round interview
                        (coffee?).”
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
            {/* CONTACT SECTION */}
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              style={{
                borderRadius: "1rem",
                padding: "1.5rem",
                background: "rgba(15,23,42,0.95)",
                border: "1px solid rgba(51,65,85,1)",
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
              }}
            >
              <div style={{ fontSize: "1.1rem", fontWeight: 600 }}>
                Next Steps
              </div>
              <div style={{ fontSize: "0.9rem", opacity: 0.8 }}>
                If this application has passed your initial screening, further communication
                may proceed through the following verified channels:
              </div>
            
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                  gap: "0.75rem",
                  marginTop: "0.5rem",
                }}
              >
                <a
                  href="https://instagram.com/sid_khanna__"
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    padding: "0.85rem",
                    borderRadius: "0.75rem",
                    background: "rgba(15,23,42,0.95)",
                    border: "1px solid rgba(51,65,85,1)",
                    textDecoration: "none",
                    color: "#e5e7eb",
                    fontSize: "0.9rem",
                  }}
                >
                  📸 Instagram
                  <div style={{ fontSize: "0.8rem", opacity: 0.7 }}>
                    @sid_khanna__
                  </div>
                </a>
            
                <a
                  href="mailto:siddharth.khanna1@gmail.com"
                  style={{
                    padding: "0.85rem",
                    borderRadius: "0.75rem",
                    background: "rgba(15,23,42,0.95)",
                    border: "1px solid rgba(51,65,85,1)",
                    textDecoration: "none",
                    color: "#e5e7eb",
                    fontSize: "0.9rem",
                  }}
                >
                  📧 Email
                  <div style={{ fontSize: "0.8rem", opacity: 0.7 }}>
                    Siddharth.Khanna1@gmail.com
                  </div>
                </a>
              </div>
            </motion.section>


            {/* FOOTER / CONTRACT TERMS */}
            <section
              style={{
                fontSize: "0.8rem",
                opacity: 0.65,
                textAlign: "center",
                paddingBottom: "1rem",
                marginTop: "0.5rem",
              }}
            >
              <div>
                Built by Sid as a joke. Unless it works. Then it&apos;s a
                case study.
              </div>
              <div style={{ marginTop: "0.35rem" }}>
                By proceeding, you acknowledge that:
                <br />
                – Candidate will worry about you if you don&apos;t text back.
                <br />
                – Spontaneous drives, gym hype, and emotional playlists may
                occur.
                <br />
                – Refunds not available, but cuddles are.
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
}
