const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// ✅ SERVE THE WEBSITE
app.use(express.static("public"));

// ===============================
// SCHOOL INFORMATION (DO NOT ADD / REMOVE INFO)
// ===============================
const knowledgeBase = {
  enrollment: {
    keywords: ["enroll", "enrollment", "register", "admission", "mag enroll", "mag-enroll", "pag enroll"],
    info_en: "To enroll, students must prepare their report card, birth certificate, and visit the registrar.",
    info_tl: "Upang makapag-enroll, kailangang maghanda ng report card, birth certificate, at pumunta sa registrar."
  },
  fees: {
    keywords: ["principal", "school head", "headmaster", "punong guro", "punong-guro"],
    info_en: "Our principal is Maam Marina Abueva.",
    info_tl: "Ang aming principal ay si Maam Marina Abueva."
  },
  location: {
    keywords: ["where", "location", "address", "saan", "nasaan"],
    info_en: "Our school is located in Sitio Fori, Talipan, Pagbilao, Quezon.",
    info_tl: "Matatagpuan ang aming paaralan sa Sitio Fori, Talipan, Pagbilao, Quezon."
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
// FRIENDLY REPHRASING
// ===============================
function rephrase(info, lang) {
  const en = [
    `Sure! ${info}`,
    `No problem 😊 ${info}`,
    `Here’s what I know: ${info}`,
    `${info} Let me know if you need more help.`,
    `Happy to help! ${info}`
  ];

  const tl = [
    `Sige! 😊 ${info}`,
    `Walang problema! ${info}`,
    `Narito ang aking alam: ${info}`,
    `${info} Sabihin mo lang kung may iba ka pang tanong.`,
    `Masaya akong tumulong! ${info}`
  ];

  const styles = lang === "tl" ? tl : en;
  return styles[Math.floor(Math.random() * styles.length)];
}

// ===============================
// CASUAL CHAT
// ===============================
function casualReply(message, lang) {
  if (lang === "tl") {
    if (["hi", "hello", "hey", "kumusta"].some(w => message.includes(w)))
      return "Kumusta! 👋 Ako si TalBot. Paano ako makakatulong?";
    if (message.includes("salamat"))
      return "Walang anuman! 💙 Nandito lang ako para tumulong.";
    if (message.includes("kamusta ka"))
      return "Ayos lang ako 😊 Salamat sa pagtatanong!";
  } else {
    if (["hi", "hello", "hey"].some(w => message.includes(w)))
      return "Hello! 👋 I’m TalBot. How can I help you today?";
    if (message.includes("thank"))
      return "You’re welcome! 💙 I’m always here to help.";
    if (message.includes("how are you"))
      return "I’m doing great 😊 How can I assist you?";
  }
  return null;
}

// ===============================
// CHAT ENDPOINT
// ===============================
app.post("/chat", (req, res) => {
  const message = req.body.message.toLowerCase();
  const lang = detectLanguage(message);

  const casual = casualReply(message, lang);
  if (casual) return res.json({ reply: casual });

  for (const key in knowledgeBase) {
    const topic = knowledgeBase[key];
    if (topic.keywords.some(k => message.includes(k))) {
      const info = lang === "tl" ? topic.info_tl : topic.info_en;
      return res.json({ reply: rephrase(info, lang) });
    }
  }

  return res.json({
    reply:
      lang === "tl"
        ? "Pasensya na 😅 Maaari lamang akong sumagot ng mga tanong tungkol sa impormasyon ng paaralan."
        : "Sorry 😅 I can only answer questions related to school information. You may also try to change the words or keywords you used and check for wrong spellings, since im only a rule based AI i deoend on keywords. Please avoid wrong spellings and typographical errors thanks!"
  });
});

// ===============================
// START SERVER
// ===============================
app.listen(3000, () => {
  console.log("TalBot running at http://localhost:3000");
});

