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
    info_en: "For G12:  Look for g12 teachers, advisers, head teachers-in-charge and bring the following requirements:\n"+
"For new students.\n"+
"Clear Photocopy of Student’s birth certificate (PSA/NSO)\n"+
"Original copy of student's report card (SF9)\n"+
"Ballpen\n"+
"\n"+
"For old students\n"+
"Original copy of student's report card (SF9)\n"+
"Ballpen\n"+
"For Transferees or Balik Aral\n"+
"Clear Photocopy of Student’s birth certificate (PSA/NSO)\n"+
"Original Copy of Students report card (SF9) or A&E/PEPT/PVT Result or Certificate \n"+
"Ballpen\n"+
"For G11:  Look for G11 teachers, advisers, headteachers--n-charge and bring the following requirements:\n"+
"For new students.\n"+
"Clear Photocopy of Student’s birth certificate (PSA/NSO)\n"+
"Original copy of student's report card (SF9)\n"+
"Ballpen\n"+
"For old students\n"+
"Original copy of student's report card (SF9)\n"+
"Ballpen\n"+
"For Transferees or Balik Aral\n"+
"Clear Photocopy of Student’s birth certificate (PSA/NSO)\n"+
"Original Copy of Students report card (SF9) or A&E/PEPT/PVT Result or Certificate \n"+
"Ballpen\n\n"+
"For G7-10: Look for G7-G10 teachers, advisers, headteachers in charge and bring the following requirements:\n"+
"For new students.\n"+
"Clear Photocopy of Student’s birth certificate (PSA/NSO)\n"+
"Original copy of student's report card (SF9)\n"+
"Ballpen\n"+
"For old students\n"+
"Original copy of student's report card (SF9)\n"+
"Ballpen\n"+
"For Transferees or Balik Aral\n"+
"Clear Photocopy of Student’s birth certificate (PSA/NSO)\n"+
"Original Copy of Students report card (SF9) or A&E/PEPT/PVT Result or Certificate \n"+
"Ballpen\n\n"+
"For ALS: Look or contact Mrs. Lorna C. Arenal and bring the following requirements:\n"+
"Photocopy of PSA Birth Certificate\n"+
"Photocopy of Married Certificate (if married)\n"+
"Photocopy of Report Card (if graduated from formal school)\n"+
"AF5 (if graduated from ALS-JHS)\n"+
"19 years old and above\n\n"+
"For SPED: Talipan National Highshcool offers a Special Education for PWD students. TNHS provide special kind of instructions to those students ensuring the ability to learn the same skill and information like a normal students."
  },
  fees: {
    keywords: ["principal", "school head", "headmaster", "punong guro", "punong-guro"],
    info_en: "Our principal is Maam Marina Abueva.",
    info_tl: "Ang aming principal ay si Maam Marina Abueva."
  },
  location: {
    keywords: [
      "where is talipan",
      "where is the school",
      "school location",
      "address of the school",
      "saan ang paaralan",
      "nasaan ang paaralan"
    ],
    info_en: "Our school is located in Sitio Fori, Talipan, Pagbilao, Quezon.",
    info_tl: "Matatagpuan ang aming paaralan sa Sitio Fori, Talipan, Pagbilao, Quezon."
  },
  mobile_legends: {
    keywords: ["build ni claude", "claude build", "best build for claude"],
    info_en: "Tough boots, Demon Hunter Sword, Golden Staff, Corrosion Scythe, Malefic Gun, Wind of Nature.",
    info_tl: "Tough boots, Demon Hunter Sword, Golden Staff, Corrosion Scythe, Malefic Gun, Wind of Nature."
  },
  recipe: {
    keywords: ["adobo recipe", "chicken adobo", "how to cook adobo", "paano magluto ng adobo"],
    info_en: "Chicken adobo is a popular Filipino dish that is easy to prepare and rich in flavor...",
    info_tl: "Ang chicken adobo ay isa sa mga pinakasikat na pagkaing Pilipino at madaling lutuin..."
  },
  random11: {
    keywords: ["cj", "cj cantilado", "who is cj cantilado", "sino si cj cantilado"],
    info_en: "Currently, CJ Cantilado is a well-known GAY personality from Gratienza Entertainment...",
    info_tl: "Si CJ Cantilado ay isang baklang ulikba na personalidad mula sa Gratienza Entertainment...",
    image: "https://i.postimg.cc/9ftDNMr9/IMG-20260129-164442.jpg"
  },
  random1: {
    keywords: ["how do i help", "pano ako tutulong", "tulong", "help"],
    info_en: "Help however you can.",
    info_tl: "Tumulong sa abot ng iyong makakaya.",
    image: "https://www.bing.com/th/id/OIP.EXHTMia2dVTp1zTCP2kZfwHaE7?w=215&h=211&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2"
  },
  random: {
    keywords: ["who is wally bayola", "wallybayola", "wally"],
    info_en: "Wally Bayola is a Filipino comedian, actor, and television host...",
    info_tl: "Wally Bayola ay isang komedyante, aktor, at host ng telebisyon...",
    image: "/images/wallybayola.jpeg"
  }
};

// ===============================
// TEXT NORMALIZATION (FIXES LONG INPUTS)
// ===============================
function normalize(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

// ===============================
// TYPO TOLERANCE (STRING SIMILARITY)
// ===============================
function editDistance(a, b) {
  const costs = [];
  for (let i = 0; i <= a.length; i++) {
    let lastValue = i;
    for (let j = 0; j <= b.length; j++) {
      if (i === 0) costs[j] = j;
      else if (j > 0) {
        let newValue = costs[j - 1];
        if (a[i - 1] !== b[j - 1]) {
          newValue = Math.min(newValue, lastValue, costs[j]) + 1;
        }
        costs[j - 1] = lastValue;
        lastValue = newValue;
      }
    }
    if (i > 0) costs[b.length] = lastValue;
  }
  return costs[b.length];
}

function similarity(a, b) {
  const longer = a.length > b.length ? a : b;
  const shorter = a.length > b.length ? b : a;
  return (longer.length - editDistance(longer, shorter)) / longer.length;
}

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
  } else {
    if (["hi", "hello", "hey"].some(w => message.includes(w)))
      return "Hello! 👋 I’m TalBot. How can I help you today?";
    if (message.includes("thank"))
      return "You’re welcome! 💙 I’m always here to help.";
  }
  return null;
}

// ===============================
// CHAT ENDPOINT (SMART MATCHING)
// ===============================
app.post("/chat", (req, res) => {
  const message = normalize(req.body.message);
  const lang = detectLanguage(message);

  const casual = casualReply(message, lang);
  if (casual) return res.json({ reply: casual });

  let bestMatch = null;
  let bestScore = 0;

  for (const key in knowledgeBase) {
    const topic = knowledgeBase[key];
    for (const kw of topic.keywords) {
      const score = similarity(message, normalize(kw));
      if (score > bestScore && score > 0.6) {
        bestScore = score;
        bestMatch = topic;
      }
    }
  }

  if (bestMatch) {
    const info = lang === "tl" ? bestMatch.info_tl : bestMatch.info_en;
    const response = { reply: rephrase(info, lang) };
    if (bestMatch.image) response.image = bestMatch.image;
    return res.json(response);
  }

  // SAFE LOCATION FALLBACK
  if (message.includes("where") || message.includes("saan")) {
    return res.json({
      reply: lang === "tl"
        ? "Paumanhin 😅 wala pa akong impormasyon tungkol sa lokasyong iyon."
        : "Sorry 😅 I don’t have information about that location yet."
    });
  }

  return res.json({
    reply:
      lang === "tl"
        ? "Paumanhin 😅 mga tanong lang na may kinalaman sa impormasyon ng paaralan ang maaari kong sagutin."
        : "Sorry 😅 I can only answer questions related to school information."
  });
});

// ===============================
// START SERVER
// ===============================
app.listen(3000, () => {
  console.log("TalBot running at http://localhost:3000");
});












