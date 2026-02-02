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
    keywords: ["enroll", "how to enroll", "enrollment", "register", "admission", "mag enroll", "mag-enroll", "pag enroll"],
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
  principal: {
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
  organization1: {
    keywords: ["tdlc", "talipan drum and lyre corps", "drum and lyre corps", "talipan drum corps", "talipan band", "talipan banda"],
    info_en: "Talipan Drum and lyre is an organization composed of different students who loves to play in a band. They play different instrument such as different kind of drums, lyres, and marimbas while the other members are majorettes and flags/ color guards.\n\n"+
    "Band Advisers: Maam Mylene P. Lucila\n"+
    "               Maam Joana E. Salumbides\n"+
    "Band Master:   Christian Joshua Ayala\n"+
    "Trainors:      Glady Mae Belbis\n"+
    "               Joshua L. Hosana\n"+
    "               Cindy Margarete\n"+
    "               Michael Eubanas\n"+
    "               Justine Merto\n",
    info_tl: "Ang Talipan Drum and Lyre ay isang organisasyon na binubuo ng iba't ibang mag-aaral na nagsasayang ng oras sa paglalaro ng band. Naglalaro sila ng iba't ibang instrumentong tulad ng iba't ibang uri ng tambol, lyres, at marimbas habang ang iba pang miyembro ay mga majorette at mga flag/color guards.\n\n"+
    "Band Advisers: Maam Mylene P. Lucila\n"+
    "               Maam Joana E. Salumbides\n"+
    "Band Master:   Christian Joshua Ayala\n"+
    "Trainors:      Glady Mae Belbis\n"+
    "               Joshua L. Hosana\n"+
    "               Cindy Margarete\n"+
    "               Michael Eubanas\n"+
    "               Justine Merto\n",
    image: "https://i.postimg.cc/v8gZ9Y9J/FB-IMG-1769916076188.jpg"
  },
  random1: {
    keywords: ["how do i help", "pano ako tutulong", "tulong", "help"],
    info_en: "Help however you can.",
    info_tl: "Tumulong sa abot ng iyong makakaya.",
    image: "https://www.bing.com/th/id/OIP.EXHTMia2dVTp1zTCP2kZfwHaE7?w=215&h=211&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2"
  },
  organization2: {
    keywords: ["el/ang talipeno", "el ang talipeno"],
    info_en: "El/ang Talipeño is an organization consisting of young journalists that document sports, news, events happening inside of the campus. They are composed of young and talented students that earned many achievements and continue growing.",
    info_tl: "El/ang Talipeño is an organization consisting of young journalists that document sports, news, events happening inside of the campus. They are composed of young and talented students that earned many achievements and continue growing.",
    image: "/images/wallybayola.jpeg"
  },
  organization3: {
    keywords: ["yes o", "yes-o"],
    info_en: "Yes-O is an organization consisting of students who protects the school environment. They are students who is responsible for the cleanliness of campus.",
    info_tl: "Yes-O is an organization consisting of students who protects the school environment. They are students who is responsible for the cleanliness of campus.",
    image: "/images/wallybayola.jpeg"
  },
  organization4: {
    keywords: ["koro talipeno","koro talipeño"],
    info_en: "Koro Talipeño is an organization that is known as the voice of Talipan. They are young talented singers that perform different Filipino folk songs and OPM. They are mentored by Juan Carlo Villanueva and through the years different students with the passion to sing, join them and with the help of their mentor they enhance their singing.",
    info_tl: "Koro Talipeño is an organization that is known as the voice of Talipan. They are young talented singers that perform different Filipino folk songs and OPM. They are mentored by Juan Carlo Villanueva and through the years different students with the passion to sing, join them and with the help of their mentor they enhance their singing.",
    image: "/images/wallybayola.jpeg"
  },
  organization5: {
   keywords: ["ssg", "student supreme government", "student council", "supreme student government"],
   info_en: "SSG is an organization in Talipan National High school that is a set of student council which is the highest governing body and the primary voice of the studentry, working to promote student welfare, leadership, and responsible citizenship.",
   info_tl: "SSG is an organization in Talipan National High school that is a set of student council which is the highest governing body and the primary voice of the studentry, working to promote student welfare, leadership, and responsible citizenship.",
   image: ""
  },
  organization6: {
   keywords: ["indayog", "dance"],
   info_en: "Indayog is an organization which is composed of student dancers. They represent the school in dance competition and through the years they competed and achieve many awards.",
   info_tl: "Indayog is an organization which is composed of student dancers. They represent the school in dance competition and through the years they competed and achieve many awards.",
   image: "",
  },
  rules_and_regulations: {
   keywords: ["rules, regulations", "rules and regulation", "school rules", "school regulations", "patakaran ng paaralan", "mga patakaran ng paaralan"],
   info_en: "Rules and Regulation:\nProtocols:\nTalipan National High School's rules and regulations require students to wear a complete and proper uniform, adhere to a No ID, No Entry policy, and maintain an appropriate haircut and hair color/n."+
   "Prohibited activities include wearing earrings (for boys), coming to school under the influence of liquor, smoking, jumping over the fence, anti-littering, and loitering.\n"+
   "Violations for certain offenses, such as being under the influence or smoking, lead to a warning and a promissory note for a first offense, a ₱500 fine for a second offense, and seven-day suspension for a third offense.\n"+
   "Uniform:\n"+
   "Students must wear the complete and proper school uniform when entering the campus.\n"+
   "No ID, No Entry:\n"+
   "A strict policy mandates that students must have their ID to enter the campus.\n"+
   "Haircut and Hair Color:\n"+
   "Students are expected to observe appropriate and proper haircuts and hair colors.\n"+
   "Prohibited Conduct:\n"+
   "Liquor and Smoking: Coming to school under the influence of liquor or smoking inside the campus is strictly prohibited.\n"+
   "Jumping Over the Fence: Students are not allowed to jump over the fence.\n"+
   "Anti-Littering/Loitering: Actions such as littering and loitering within the school campus are not permitted.\n"+
   "Initiating Conflicts: Starting fights or conflicts within the school grounds is forbidden.\n"+
   "Disciplinary Measures: \n"+
   "First Offense:\n"+
   "For certain offenses (e.g., being under the influence of liquor, smoking, jumping over the fence, initiating conflicts), the student is reported to the guidance office and required to sign a promissory note.\n"+
   "Second Offense:\n"+
   "A fine of ₱500.00 is imposed for a second offense.\n"+
   "Third Offense:\n"+
   "Students may face a suspension from school for seven (7) days for a third offense.\n"+
   "Initiating Conflicts:\n"+
   "For initiating conflicts, a parent and child will be called to the guidance office for disciplinary action for the first offense.\n"+
   "Dress Code:\n"+
   "All students must wear proper attire and uniform but there is the list of dresses that are allowed inside the campus:\n"+
   "•	Top Dresses:\n"+
   "•	T – shirts or Poloshirt , Blouses or Cropped Tops nit exposing belly skin\n"+
   "•	Long sleeves\n"+
   "•	Pants or Jeans\n"+
   "•	Knee-length/ long dresses and skirts.\n"+
   "•	Footwear\n"+
   "•	Rubber Shoes, sneakers, strappy sandals, and other closed shoes.\n"+
   "Things that aren’t allowed to wear inside the campus:\n"+
   "•	Cropped tops exposing belly, sleeveless, off-shoulders, spaghetti straps, knitted shears, shirts with inappropriate messages and any revealing outfits.\n"+
   "•	Ripped jeans, shorts or miniskirts\n"+
   "•	Slippers, Flipflops\n",
   info_tl: "Rules and Regulation:\nProtocols:\nTalipan National High School's rules and regulations require students to wear a complete and proper uniform, adhere to a No ID, No Entry policy, and maintain an appropriate haircut and hair color/n."+
   "Prohibited activities include wearing earrings (for boys), coming to school under the influence of liquor, smoking, jumping over the fence, anti-littering, and loitering.\n"+
   "Violations for certain offenses, such as being under the influence or smoking, lead to a warning and a promissory note for a first offense, a ₱500 fine for a second offense, and seven-day suspension for a third offense.\n"+
   "Uniform:\n"+
   "Students must wear the complete and proper school uniform when entering the campus.\n"+
   "No ID, No Entry:\n"+
   "A strict policy mandates that students must have their ID to enter the campus.\n"+
   "Haircut and Hair Color:\n"+
   "Students are expected to observe appropriate and proper haircuts and hair colors.\n"+
   "Prohibited Conduct:\n"+
   "Liquor and Smoking: Coming to school under the influence of liquor or smoking inside the campus is strictly prohibited.\n"+
   "Jumping Over the Fence: Students are not allowed to jump over the fence.\n"+
   "Anti-Littering/Loitering: Actions such as littering and loitering within the school campus are not permitted.\n"+
   "Initiating Conflicts: Starting fights or conflicts within the school grounds is forbidden.\n"+
   "Disciplinary Measures: \n"+
   "First Offense:\n"+
   "For certain offenses (e.g., being under the influence of liquor, smoking, jumping over the fence, initiating conflicts), the student is reported to the guidance office and required to sign a promissory note.\n"+
   "Second Offense:\n"+
   "A fine of ₱500.00 is imposed for a second offense.\n"+
   "Third Offense:\n"+
   "Students may face a suspension from school for seven (7) days for a third offense.\n"+
   "Initiating Conflicts:\n"+
   "For initiating conflicts, a parent and child will be called to the guidance office for disciplinary action for the first offense.\n"+
   "Dress Code:\n"+
   "All students must wear proper attire and uniform but there is the list of dresses that are allowed inside the campus:\n"+
   "•	Top Dresses:\n"+
   "•	T – shirts or Poloshirt , Blouses or Cropped Tops nit exposing belly skin\n"+
   "•	Long sleeves\n"+
   "•	Pants or Jeans\n"+
   "•	Knee-length/ long dresses and skirts.\n"+
   "•	Footwear\n"+
   "•	Rubber Shoes, sneakers, strappy sandals, and other closed shoes.\n"+
   "Things that aren’t allowed to wear inside the campus:\n"+
   "•	Cropped tops exposing belly, sleeveless, off-shoulders, spaghetti straps, knitted shears, shirts with inappropriate messages and any revealing outfits.\n"+
   "•	Ripped jeans, shorts or miniskirts\n"+
   "•	Slippers, Flipflops\n",
   image: ""
  },
  schedule: {
   keywords: ["class schedule", "school schedule", "class time", "school time", "oras ng klase", "iskedyul ng klase"],
   info_en: "Talipan Class Schedules\n\n"+
   "For Grade 7 to 10:\n"+
   "7am to 12pm, then an hour break then the class resumes at 1pm until 4pm\n\n"+
   "For G11:\n"+
   "6am to 12 pm, it is affected by the shift system among SHS students\n\n"+
   "For G12:\n"+
   "12pm until 6 pm",
   info_tl: "Talipan Class Schedules\n\n"+
   "For Grade 7 to 10:\n"+
   "7am to 12pm, then an hour break then the class resumes at 1pm until 4pm\n\n"+
   "For G11:\n"+
   "6am to 12 pm, it is affected by the shift system among SHS students\n\n"+
   "For G12:\n"+
   "12pm until 6 pm",
   image: ""
  },
  building: {
    keywords: ["shs building", "senior high school building"],
    info_en: "SHS building is located at the right corner of the campus, it is near the entrance of Talipan. It is the first fourth-floored building here in our campus. There are plenty of classrooms in this building but because of the rise of Senior high school enrollees, the school implement a shift system among SHS students, the schedule of students may vary on their curriculum level. G11 students class schedule is at 6 am to 12 am on Monday to Friday while G12 students class schedule is at 12pm to 6 pm on Monday to Friday.\n\n"+
   "on the first floor of the building you can find three teacher's faculty and classrooms such as:\n"+
   "For G11 section - TVL EPAS JSR, STEM ARO, HUMMS LBD and STEM JD.\n"+
   "For G12 section - TVL EPAS JZM, STEM SCP, HUMMS GDP and STEM CPS.\n"+
   "On the second floor of the building you can find three teacher's faculty and classrooms such as:\n"+
   "For G11 section- TVL HE NAA, TVL HE WMS, and TVL HE LEP\n"+
   "For G12 section- TVL HE LAT, TVL HE JBP, and TVL HE KOA\n"+
   "On the third floor of the building you can find three teachers' faculty and classrooms such as:\n"+
   "For G11 section- ABM MSD, HUMSS JLE, and TVL CSS JDC\n"+
   "For G12 section- ABM VLP, HUMSS DR, and TVL CSS LAV\n"+
   "On the fourth floor you can find two teachers' faculty and 4 classrooms such as:\n"+
   "For G11 section- HUMMS JQP, HUMMS ABZ, HUMSS SMR, and HUMSS IDG\n"+
   "For G12 section- HUMSS LSL, HUMSS JRA, HUMSS JDD, and HUMSS RJL",
    info_tl: "SHS building is located at the right corner of the campus, it is near the entrance of Talipan. It is the first fourth-floored building here in our campus. There are plenty of classrooms in this building but because of the rise of Senior high school enrollees, the school implement a shift system among SHS students, the schedule of students may vary on their curriculum level. G11 students class schedule is at 6 am to 12 am on Monday to Friday while G12 students class schedule is at 12pm to 6 pm on Monday to Friday.\n\n"+
   "on the first floor of the building you can find three teacher's faculty and classrooms such as:\n"+
   "For G11 section - TVL EPAS JSR, STEM ARO, HUMMS LBD and STEM JD.\n"+
   "For G12 section - TVL EPAS JZM, STEM SCP, HUMMS GDP and STEM CPS.\n"+
   "On the second floor of the building you can find three teacher's faculty and classrooms such as:\n"+
   "For G11 section- TVL HE NAA, TVL HE WMS, and TVL HE LEP\n"+
   "For G12 section- TVL HE LAT, TVL HE JBP, and TVL HE KOA\n"+
   "On the third floor of the building you can find three teachers' faculty and classrooms such as:\n"+
   "For G11 section- ABM MSD, HUMSS JLE, and TVL CSS JDC\n"+
   "For G12 section- ABM VLP, HUMSS DR, and TVL CSS LAV\n"+
   "On the fourth floor you can find two teachers' faculty and 4 classrooms such as:\n"+
   "For G11 section- HUMMS JQP, HUMMS ABZ, HUMSS SMR, and HUMSS IDG\n"+
   "For G12 section- HUMSS LSL, HUMSS JRA, HUMSS JDD, and HUMSS RJL",
    image: ""
  },
  building1: {
    keywords: ["jica building", "grade 9 building"],
    info_en: "JICA building is building that is consisting of Grade 9 classrooms such as G9 ACR, G9 JPM, G9 EL, G9 AED, G9 EV, G9 KC, G9 AM, G9 MKL, and G9 ABD. To go to JICA building, head towards the middle of the campus or the acacia and you can see the covered court, when you reach the covered court, you can see it in the left side of the covered court.",
    info_tl: "JICA building is building that is consisting of Grade 9 classrooms such as G9 ACR, G9 JPM, G9 EL, G9 AED, G9 EV, G9 KC, G9 AM, G9 MKL, and G9 ABD. To go to JICA building, head towards the middle of the campus or the acacia and you can see the covered court, when you reach the covered court, you can see it in the left side of the covered court.",
    image: ""
  },
  building2: {
    keywords: ["nantes building", "grade 8 building"],
    info_en: "Nantes building is a two-storey building that is consisting of grade 8 classrooms. On the first floor the classrooms of G8 ROM, G8 MID and G8 ARN is located while on the second floor G8 MRL, G8 PS and G8 ICJ is located. To go to Nantes building head towards the acacia and you can see the N-type logo on that building.",
    info_tl: "Nantes building is a two-storey building that is consisting of grade 8 classrooms. On the first floor the classrooms of G8 ROM, G8 MID and G8 ARN is located while on the second floor G8 MRL, G8 PS and G8 ICJ is located. To go to Nantes building head towards the acacia and you can see the N-type logo on that building.",
    image: ""
  },
  building3: {
    keywords: ["portes building"],
    info_en: "Portes building is a two-storey building that is consisting of two single rooms. On the first floor you can find the MFL and AQG classroom. To go to this building head towards to acacia and you can find a two-storey building in the middle.",
    info_tl: "Portes building is a two-storey building that is consisting of two single rooms. On the first floor you can find the MFL and AQG classroom. To go to this building head towards to acacia and you can find a two-storey building in the middle.",
    image: ""
  },
  building: {
    keywords: ["napocor building", "grade 7 building"],
    info_en: "Napocor building is a building that is consisting of 5 rooms. There are 4 grade 7 classrooms such as G7 ILH, G7 JM, G7 JC and G7 CED, and one science faculty. To go to this building head towards the acacia and you can see the covered court, got to covered court and it is located at the right corner of it, it is placed higher than ground floor.",
    info_tl: "Napocor building is a building that is consisting of 5 rooms. There are 4 grade 7 classrooms such as G7 ILH, G7 JM, G7 JC and G7 CED, and one science faculty. To go to this building head towards the acacia and you can see the covered court, got to covered court and it is located at the right corner of it, it is placed higher than ground floor.",
    image: ""
  },
  building: {
    keywords: ["esf building", "grade 10 building"],
    info_en: "ESF building is a two-storey building consisting of grade 10 classrooms. On the first floor G10 ACA, G10 MEC, G10 MUM, G10 IRA and the math faculty is located, while on the second floor you can find G10 JMP, G10 CAS, G10 MAS, and G10 MGO. To go to this building head towards the acacia and you can see a building that had an embedded letters says the name of out campus.",
    info_tl: "ESF building is a two-storey building consisting of grade 10 classrooms. On the first floor G10 ACA, G10 MEC, G10 MUM, G10 IRA and the math faculty is located, while on the second floor you can find G10 JMP, G10 CAS, G10 MAS, and G10 MGO. To go to this building head towards the acacia and you can see a building that had an embedded letters says the name of out campus.",
    image: ""
  },
  building: {
    keywords: ["pilot building"],
    info_en: "Pilot building, this building is a two-storey building consisting of 4 classrooms that is room for the excelling students of 4 different JHS curriculum. To go to this building from the entrance walk straight until you see a building that has a stair.",
    info_tl: "Pilot building, this building is a two-storey building consisting of 4 classrooms that is room for the excelling students of 4 different JHS curriculum. To go to this building from the entrance walk straight until you see a building that has a stair.",
    image: ""
  },
  building: {
    keywords: ["deped admins building", "admin building", "principal office", "mapeh faculty", "mapeh room", "guidance office", "news room", "el ang talipeno news room", "finance office", "school clinic", "clinic", "records office", "records", "smb office"],
    info_en: "DepEd ADMINS BUILDING\n"+
   "This building is separated into two different building, left side and right side and it is connected by a bridge on the second floor, although it has two building it is the same . On the first floor of the left side of this building you can find the Guidance Office, MAPEH faculty and G8 JGM while on the second floor you can find the MTR, El/ ang Talipe, El/ ang Talipeño’s newsroom and the finance office. While on the right side of the building on the first floor the school clinic and records office is located while above them is the SMB office and the Principal’s office.",
    info_tl: "DepEd ADMINS BUILDING\n"+
   "This building is separated into two different building, left side and right side and it is connected by a bridge on the second floor, although it has two building it is the same . On the first floor of the left side of this building you can find the Guidance Office, MAPEH faculty and G8 JGM while on the second floor you can find the MTR, El/ ang Talipe, El/ ang Talipeño’s newsroom and the finance office. While on the right side of the building on the first floor the school clinic and records office is located while above them is the SMB office and the Principal’s office.",
    image: ""
  },
  building: {
    keywords: [""],
    info_en: "",
    info_tl: "",
    image: ""
  },
  building: {
    keywords: [""],
    info_en: "",
    info_tl: "",
    image: ""
  },
  building: {
    keywords: [""],
    info_en: "",
    info_tl: "",
    image: ""
  },
  building: {
    keywords: [""],
    info_en: "",
    info_tl: "",
    image: ""
  },
  building: {
    keywords: [""],
    info_en: "",
    info_tl: "",
    image: ""
  },
  building: {
    keywords: [""],
    info_en: "",
    info_tl: "",
    image: ""
  },
  building: {
    keywords: [""],
    info_en: "",
    info_tl: "",
    image: ""
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
    let score = similarity(message, normalize(kw));

    // ✅ NEW: exact keyword inside long sentence
    if (message.includes(normalize(kw))) {
      score = 1;
    }

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
















