const express = require("express");
const cors = require("cors");
const path = require("path");

console.log("Server File Loaded");

const app = express();
app.use(cors());
app.use(express.json());

// Serve frontend
app.use(express.static(__dirname + "/public"));

const rules = [
  {
    keywords: ["enroll", "enrollment"],
    reply: "To enroll, prepare your report card, birth certificate, and visit the registrar."
  },
  {
    keywords: ["tuition", "fees"],
    reply: "Our school fees depend on the grade level."
  },
  {
    keywords: ["principal"],
    reply: "Our principal is maam abueva"
  },
  {
    keywords: ["Angeline"],
    reply: "Angeline is a hardworking student known for her beauty"
  },
  {
    keywords: ["Kuya Cj Cantilado"],
    reply: "Cj is Gay"
  }
];

// Chat endpoint
app.post("/chat", (req, res) => {
  const msg = req.body.message.toLowerCase();
  let reply = "Sorry, I can only answer school-related questions.";

  for (let rule of rules) {
    if (rule.keywords.some(k => msg.includes(k))) {
      reply = rule.reply;
      break;
    }
  }

  res.json({ reply });
});

// Root route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`TalBot running on port ${PORT}`);
});
