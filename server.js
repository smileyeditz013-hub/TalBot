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
  },
  mobile_legends: {
    keywords: ["build ni claude", "claude build", "best build for claude"],
    info_en: "Tough boots, Demon Hunter Sword, Golden Staff, Corrosion Scythe, Malefic Gun, Wind of Nature.",
    info_tl: "Tough boots, Demon Hunter Sword, Golden Staff, Corrosion Scythe, Malefic Gun, Wind of Nature."
  },
  recipe: {
    keywords: ["adobo recipe", "chicken adobo", "how to cook adobo", "paano magluto ng adobo"],
    info_en: "Chicken adobo is a popular Filipino dish that is easy to prepare and rich in flavor. To cook chicken adobo, you will need one kilogram of chicken cut into pieces, half a cup of soy sauce, half a cup of vinegar, one cup of water, five cloves of crushed garlic, two to three bay leaves, one teaspoon of whole peppercorns, one tablespoon of cooking oil, and optional salt or sugar to taste. Start by marinating the chicken in soy sauce and garlic for about thirty minutes. Heat the oil in a pan and lightly brown the chicken. Add the marinade, water, bay leaves, and peppercorns, then bring it to a boil. Lower the heat and let it simmer for thirty to forty minutes. Add the vinegar and do not stir for two to three minutes. Season according to taste and serve hot with rice.",
    info_tl: "Ang chicken adobo ay isa sa mga pinakasikat na pagkaing Pilipino at madaling lutuin. Sa pagluluto ng adobo, kailangan ang isang kilong manok na hiniwa, kalahating tasa ng toyo, kalahating tasa ng suka, isang tasa ng tubig, limang butil ng bawang na dinurog, dalawa hanggang tatlong dahon ng laurel, isang kutsarita ng pamintang buo, isang kutsara ng mantika, at opsyonal na asin o asukal ayon sa panlasa. I-marinate ang manok sa toyo at bawang ng tatlumpung minuto. Initin ang mantika at bahagyang iprito ang manok. Idagdag ang marinade, tubig, laurel, at paminta at pakuluin. Hinaan ang apoy at lutuin ng tatlumpu hanggang apatnapung minuto. Idagdag ang suka at huwag haluin ng dalawa hanggang tatlong minuto. Timplahan ayon sa panlasa at ihain kasama ng kanin."
  },
  random11: {
    keywords: ["cj", "cj cantilado", "who is cj cantilado", "sino si cj cantilado"],
    info_en: "Currently, CJ Cantilado is a well-known GAY personality from Gratienza Entertainment with proud pride 🏳️‍🌈 colors, admired for his confidence and creativity. He proudly embraces who he is and currently serves as the research leader of Group 2 (Tali-Bot), where he guides the team with focus and strong leadership.",
    info_tl: "Si CJ Cantilado ay isang baklang ulikba na personalidad mula sa Gratienza Entertainment sya ay loud and proud sa kanyang pride 🏳️‍🌈 colors, na hinahangaan dahil sa kanyang kumpiyansa at pagiging malikhain. Siya ang research leader ng Group 2 (Tali-Bot) at mahusay na gumagabay sa kanyang grupo sa kanilang gawain.",
    image: "https://i.postimg.cc/9ftDNMr9/IMG-20260129-164442.jpg"
  },
  random1: {
    keywords: ["how do i help", "pano ako tutulong", "tulong", "help"],
    info_en: "help how ever you can",
    info_tl: "tumulong sa abot ng iyong makakaya",
    image: "https://www.bing.com/th/id/OIP.EXHTMia2dVTp1zTCP2kZfwHaE7?w=215&h=211&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2"
  },
  random: {
    keywords: ["who is wally bayola", "wallybayola", "wally"],
    info_en: "Wally Bayola is a Filipino comedian, actor, and television host known for his work on the variety show 'Eat Bulaga!'. He is famous for his comedic timing and versatile characters, making him a beloved figure in Philippine entertainment.",
    image: "/images/wallybayola.jpeg",
    info_tl: "Wally Bayola ay isang komedyante, aktor, at host ng telebisyon na kilala sa kanyang trabaho sa paligsahan na 'Eat Bulaga!'. Kilala siya sa kanyang komedyang timing at iba't ibang karakter, na nagpapahalaga sa kanya bilang isang paboritong tao sa Pilipinong entertainment.", 
    image: "/images/wallybayola.jpeg"
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
      const response = {
  reply: rephrase(info, lang)
};

if (topic.image) {
  response.image = topic.image;
}

return res.json(response);
    }
  }

  return res.json({
    reply:
      lang === "tl"
        ? "Paumanhin 😅 mga tanong lang na may kinalaman sa impormasyon ng paaralan ang maaari kong sagutin. Maaari mo ring subukang baguhin ang mga salitang o keyword na ginamit mo at tingnan kung may maling baybay, dahil isa lamang akong rule-based na AI at umaasa ako sa mga keyword. Pakiwasan ang maling baybay at mga typographical error. Salamat!"
        : "Sorry 😅 I can only answer questions related to school information. You may also try to change the words or keywords you used and check for wrong spellings, since im only a rule based AI i deoend on keywords. Please avoid wrong spellings and typographical errors thanks!"
  });
});

// ===============================
// START SERVER
// ===============================
app.listen(3000, () => {
  console.log("TalBot running at http://localhost:3000");
});









