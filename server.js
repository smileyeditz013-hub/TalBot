const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// ===============================
// SCHOOL INFORMATION (DO NOT CHANGE CONTENT)
// ===============================
const knowledgeBase = {
  enrollment: {
    keywords: ["enroll", "enrollment", "register", "admission", "mag enroll", "mag-enroll", "pag enroll"],
    info_en: "To enroll, students must prepare their report card, birth certificate, and visit the registrar.",
    info_tl: "Upang makapag-enroll, kailangang maghanda ng report card, birth certificate, at pumunta sa registrar."
  },
  fees: {
    keywords: ["tuition", "fees", "payment", "bayad", "tuition fee"],
    info_en: "School fees vary depending on the grade level.",
    info_tl: "Nagkakaiba ang bayarin sa paaralan depende sa antas ng baitang."
  },
  location: {
    keywords: ["where", "location", "address", "saan", "nasaan"],
    info_en: "Our school is located at the main campus near the public plaza.",
    info_tl: "Matatagpuan ang aming paaralan sa pangunahing kampus malapit sa pampublikong plaza."
  }
};

// ===============================
// LANGUAGE DETECTION
// ===============================
function detectLanguage(message) {
  const tagalogWords = ["saan", "paano", "mag", "ano", "ba", "po", "opo", "salamat"];
  return tagalogWords.some(w => message.includes(w)) ? "tl" : "en";
}

// ===============================
// FRIENDLY REPHRASING (NO NEW INFO)
// ===============================
function rephrase(info, lang) {
  const styles_en = [
    `Sure! ${info}`,
    `No problem 😊 ${info}`,
    `Here’s what I know: ${info}`,
    `${info} Let me know if you need more help.`,
    `Happy to help! ${info}`
  ];

  const styles_tl = [
    `Sige! 😊 ${info}`,
    `Walang problema! ${info}`,
    `Narito ang aking alam: ${info}`,
    `${info} Sabihin mo lang kung may iba ka pang tanong.`,
    `Masaya akong tumulong! ${info}`
  ];

  const styles = lang === "tl" ? styles_tl : styles_en;
  return styles[Math.floor(Math.random() * styles.length)];
}

// ===============================
// CASUAL / FRIENDLY CHAT
// ===============================
function casualReply(message, lang) {
  if (lang === "tl") {
    if (["hi", "hello", "hey", "kumusta"].some(w => message.includes(w))) {
      return "Kumusta! 👋 Ako si TalBot. Paano ako makakatulong?";
    }
    if (message.includes("salamat")) {
      return "Walang anuman! 💙 Nandito lang ako para tumulong.";
    }
    if (message.includes("kamusta ka")) {
      return "Ayos lang ako 😊 Salamat sa pagtatanong!";
    }
  } else {
    if (["hi", "hello", "hey"].some(w => message.includes(w))) {
      return "Hello! 👋 I’m TalBot. How can I help you today?";
    }
    if (message.includes("thank")) {
      return "You’re welcome! 💙 I’m always here to help.";
    }
    if (message.includes("how are you")) {
      return "I’m doing great, thank you! 😊 How can I assist you?";
    }
  }

  return null;
}

// ===============================
// CHAT ENDPOINT
// ===============================
app.post("/chat", (req, res) => {
  const message = req.body.message.toLowerCase();
  const lang = detectLanguage(message);

  // 1. Friendly / casual replies
  const casual = casualReply(message, lang);
  if (casual) {
    return res.json({ reply: casual });
  }

  // 2. School information (STRICT)
  for (const key in knowledgeBase) {
    const topic = knowledgeBase[key];
    if (topic.keywords.some(k => message.includes(k))) {
      const info = lang === "tl" ? topic.info_tl : topic.info_en;
      return res.json({ reply: rephrase(info, lang) });
    }
  }

  // 3. Unknown question (SAFE RESPONSE)
  return res.json({
    reply:
      lang === "tl"
        ? "Pasensya na 😅 Maaari lamang akong sumagot ng mga tanong tungkol sa impormasyon ng paaralan."
        : "Sorry 😅 I can only answer questions related to school information."
  });
});

// ===============================
// SERVER START
// ===============================
app.listen(3000, () => {
  console.log("TalBot is running at http://localhost:3000");
});
