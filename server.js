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
"For new students.\n"+
"Clear Photocopy of Student's birth certificate (PSA/NSO)\n"+
"Original copy of student's report card (SF9)\n"+
"Ballpen\n"+
"\n"+
"For old students\n"+
"Original copy of student's report card (SF9)\n"+
"Ballpen\n"+
"For Transferees or Balik Aral\n"+
"Clear Photocopy of Student's birth certificate (PSA/NSO)\n"+
"Original Copy of Students report card (SF9) or A&E/PEPT/PVT Result or Certificate \n"+
"Ballpen\n"+
"For G11:  Look for G11 teachers, advisers, headteachers--n-charge and bring the following requirements:\n"+
"For new students.\n"+
"Clear Photocopy of Student's birth certificate (PSA/NSO)\n"+
"Original copy of student's report card (SF9)\n"+
"Ballpen\n"+
"For old students\n"+
"Original copy of student's report card (SF9)\n"+
"Ballpen\n"+
"For Transferees or Balik Aral\n"+
"Clear Photocopy of Student's birth certificate (PSA/NSO)\n"+
"Original Copy of Students report card (SF9) or A&E/PEPT/PVT Result or Certificate \n"+
"Ballpen\n\n"+
"For G7-10: Look for G7-G10 teachers, advisers, headteachers in charge and bring the following requirements:\n"+
"For new students.\n"+
"Clear Photocopy of Student's birth certificate (PSA/NSO)\n"+
"Original copy of student's report card (SF9)\n"+
"Ballpen\n"+
"For old students\n"+
"Original copy of student's report card (SF9)\n"+
"Ballpen\n"+
"For Transferees or Balik Aral\n"+
"Clear Photocopy of Student's birth certificate (PSA/NSO)\n"+
"Original Copy of Students report card (SF9) or A&E/PEPT/PVT Result or Certificate \n"+
"Ballpen\n\n"+
"For ALS: Look or contact Mrs. Lorna C. Arenal and bring the following requirements:\n"+
"Photocopy of PSA Birth Certificate\n"+
"Photocopy of Married Certificate (if married)\n"+
"Photocopy of Report Card (if graduated from formal school)\n"+
"AF5 (if graduated from ALS-JHS)\n"+
"19 years old and above\n\n"+
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
    keywords: ["how do i help", "pano ako tutulong", "tulong"],
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
   keywords: ["rules","regulations", "rules and regulation", "school rules", "school regulations", "patakaran ng paaralan", "mga patakaran ng paaralan"],
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
   "Things that aren't allowed to wear inside the campus:\n"+
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
   "Things that aren't allowed to wear inside the campus:\n"+
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
  building_shs: {
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
  building_jica: {
    keywords: ["jica building", "grade 9 building"],
    info_en: "JICA building is building that is consisting of Grade 9 classrooms such as G9 ACR, G9 JPM, G9 EL, G9 AED, G9 EV, G9 KC, G9 AM, G9 MKL, and G9 ABD. To go to JICA building, head towards the middle of the campus or the acacia and you can see the covered court, when you reach the covered court, you can see it in the left side of the covered court.",
    info_tl: "JICA building is building that is consisting of Grade 9 classrooms such as G9 ACR, G9 JPM, G9 EL, G9 AED, G9 EV, G9 KC, G9 AM, G9 MKL, and G9 ABD. To go to JICA building, head towards the middle of the campus or the acacia and you can see the covered court, when you reach the covered court, you can see it in the left side of the covered court.",
    image: ""
  },
  building_nantes: {
    keywords: ["nantes building", "grade 8 building"],
    info_en: "Nantes building is a two-storey building that is consisting of grade 8 classrooms. On the first floor the classrooms of G8 ROM, G8 MID and G8 ARN is located while on the second floor G8 MRL, G8 PS and G8 ICJ is located. To go to Nantes building head towards the acacia and you can see the N-type logo on that building.",
    info_tl: "Nantes building is a two-storey building that is consisting of grade 8 classrooms. On the first floor the classrooms of G8 ROM, G8 MID and G8 ARN is located while on the second floor G8 MRL, G8 PS and G8 ICJ is located. To go to Nantes building head towards the acacia and you can see the N-type logo on that building.",
    image: ""
  },
  building_portes: {
    keywords: ["portes building"],
    info_en: "Portes building is a two-storey building that is consisting of two single rooms. On the first floor you can find the MFL and AQG classroom. To go to this building head towards to acacia and you can find a two-storey building in the middle.",
    info_tl: "Portes building is a two-storey building that is consisting of two single rooms. On the first floor you can find the MFL and AQG classroom. To go to this building head towards to acacia and you can find a two-storey building in the middle.",
    image: ""
  },
  building_napocor: {
    keywords: ["napocor building", "grade 7 building"],
    info_en: "Napocor building is a building that is consisting of 5 rooms. There are 4 grade 7 classrooms such as G7 ILH, G7 JM, G7 JC and G7 CED, and one science faculty. To go to this building head towards the acacia and you can see the covered court, got to covered court and it is located at the right corner of it, it is placed higher than ground floor.",
    info_tl: "Napocor building is a building that is consisting of 5 rooms. There are 4 grade 7 classrooms such as G7 ILH, G7 JM, G7 JC and G7 CED, and one science faculty. To go to this building head towards the acacia and you can see the covered court, got to covered court and it is located at the right corner of it, it is placed higher than ground floor.",
    image: ""
  },
  building_esf: {
    keywords: ["esf building", "grade 10 building"],
    info_en: "ESF building is a two-storey building consisting of grade 10 classrooms. On the first floor G10 ACA, G10 MEC, G10 MUM, G10 IRA and the math faculty is located, while on the second floor you can find G10 JMP, G10 CAS, G10 MAS, and G10 MGO. To go to this building head towards the acacia and you can see a building that had an embedded letters says the name of out campus.",
    info_tl: "ESF building is a two-storey building consisting of grade 10 classrooms. On the first floor G10 ACA, G10 MEC, G10 MUM, G10 IRA and the math faculty is located, while on the second floor you can find G10 JMP, G10 CAS, G10 MAS, and G10 MGO. To go to this building head towards the acacia and you can see a building that had an embedded letters says the name of out campus.",
    image: ""
  },
  building_pilot: {
    keywords: ["pilot building"],
    info_en: "Pilot building, this building is a two-storey building consisting of 4 classrooms that is room for the excelling students of 4 different JHS curriculum. To go to this building from the entrance walk straight until you see a building that has a stair.",
    info_tl: "Pilot building, this building is a two-storey building consisting of 4 classrooms that is room for the excelling students of 4 different JHS curriculum. To go to this building from the entrance walk straight until you see a building that has a stair.",
    image: ""
  },
  building_deped: {
    keywords: ["deped admins building", "admin building", "principal office", "mapeh faculty", "mapeh room", "guidance office", "news room", "el ang talipeno news room", "finance office", "school clinic", "clinic", "records office", "records", "smb office"],
    info_en: "DepEd ADMINS BUILDING\n"+
   "This building is separated into two different building, left side and right side and it is connected by a bridge on the second floor, although it has two building it is the same . On the first floor of the left side of this building you can find the Guidance Office, MAPEH faculty and G8 JGM while on the second floor you can find the MTR, El/ ang Talipe, El/ ang Talipeño's newsroom and the finance office. While on the right side of the building on the first floor the school clinic and records office is located while above them is the SMB office and the Principal's office.",
    info_tl: "DepEd ADMINS BUILDING\n"+
   "This building is separated into two different building, left side and right side and it is connected by a bridge on the second floor, although it has two building it is the same . On the first floor of the left side of this building you can find the Guidance Office, MAPEH faculty and G8 JGM while on the second floor you can find the MTR, El/ ang Talipe, El/ ang Talipeño's newsroom and the finance office. While on the right side of the building on the first floor the school clinic and records office is located while above them is the SMB office and the Principal's office.",
    image: ""
  },
  
  // GRADE 7 TEACHERS
  teacher_roselyn_acesor: {
    keywords: ["roselyn acesor", "roselyn s acesor", "ma'am roselyn", "maam roselyn", "acesor g7 head", "g7 head teacher"],
    info_en: "Ma'am Roselyn S. Acesor\n" +
    "Position: Head Teacher-in-Charge for Grade 7 curriculum\n" +
    "Designation: Head Teacher I, Head Teacher of Filipino\n" +
    "Grade Level: Grade 7",
    image: ""
  },
  teacher_michelle_torres: {
    keywords: ["michelle torres", "michelle r torres", "ma'am michelle torres", "maam michelle torres", "torres g7 mtr", "g7 mtr spj adviser"],
    info_en: "Ma'am Michelle R. Torres\n" +
    "Position: Adviser of G7 MTR SPJ\n" +
    "Grade Level: Grade 7",
    image: ""
  },
  teacher_emerita_marquez: {
    keywords: ["emerita marquez", "emerita r marquez", "ma'am emerita", "maam emerita", "marquez g7 erm", "g7 erm adviser"],
    info_en: "Ma'am Emerita R. Marquez\n" +
    "Position: Adviser of G7 ERM\n" +
    "Grade Level: Grade 7",
    image: ""
  },
  teacher_ivy_hicana: {
    keywords: ["ivy hicana", "ivy l hicana", "ma'am ivy hicana", "maam ivy hicana", "hicana g7", "g7 ilh adviser"],
    info_en: "Ma'am Ivy L. Hicana\n" +
    "Position: Adviser of G7 ILH\n" +
    "Grade Level: Grade 7",
    image: ""
  },
  teacher_jenny_marquez: {
    keywords: ["jenny apple marquez", "jenny marquez", "ma'am jenny", "maam jenny apple", "marquez g7 jm", "g7 jm adviser"],
    info_en: "Ma'am Jenny Apple E. Marquez\n" +
    "Position: Adviser of G7 JM\n" +
    "Grade Level: Grade 7",
    image: ""
  },
  teacher_edzen_vallesteros: {
    keywords: ["edzen vallesteros", "edzen nyl vallesteros", "sir edzen", "vallesteros g7", "g7 ev adviser"],
    info_en: "Sir Edzen Nyl A. Vallesteros\n" +
    "Position: Adviser of G7 EV\n" +
    "Grade Level: Grade 7",
    image: ""
  },
  teacher_arly_delos_santos: {
    keywords: ["arly delos santos", "arly b delos santos", "ma'am arly", "maam arly", "delos santos g7", "g7 abd adviser"],
    info_en: "Ma'am Arly B. Delos Santos\n" +
    "Position: Adviser of G7 ABD\n" +
    "Grade Level: Grade 7",
    image: ""
  },
  teacher_jeanalyn_martinez: {
    keywords: ["jeanalyn martinez", "jeanalyn g martinez", "ma'am jeanalyn", "maam jeanalyn", "martinez g7 jgm", "g7 jgm adviser"],
    info_en: "Ma'am Jeanalyn G. Martinez\n" +
    "Position: Adviser of G7 JGM\n" +
    "Grade Level: Grade 7",
    image: ""
  },
  teacher_judith_chan: {
    keywords: ["judith chan", "judith m chan", "ma'am judith chan", "maam judith chan", "chan g7", "g7 jc adviser"],
    info_en: "Ma'am Judith M. Chan\n" +
    "Position: Adviser of G7 JC\n" +
    "Grade Level: Grade 7",
    image: ""
  },
  teacher_charise_daa: {
    keywords: ["charise daa", "charise joy daa", "ma'am charise", "maam charise", "daa g7", "g7 ced adviser"],
    info_en: "Ma'am Charise Joy E. Daa\n" +
    "Position: Adviser of G7 CED\n" +
    "Grade Level: Grade 7",
    image: ""
  },
  teacher_amelia_demesa: {
    keywords: ["amelia de mesa", "amelia demesa", "ma'am amelia", "maam amelia", "de mesa g7", "g7 aed adviser"],
    info_en: "Ma'am Amelia E. De Mesa\n" +
    "Position: Adviser of G7 AED\n" +
    "Grade Level: Grade 7",
    image: ""
  },
  teacher_mark_merle: {
    keywords: ["mark andrew merle", "mark merle", "sir mark andrew", "sir mark merle", "merle g7", "g7 am adviser"],
    info_en: "Sir Mark Andrew O. Merle\n" +
    "Position: Adviser of G7 AM\n" +
    "Grade Level: Grade 7",
    image: ""
  },
  teacher_kaycelyn_casuco: {
    keywords: ["kaycelyn casuco", "kaycelyn j casuco", "ma'am kaycelyn", "maam kaycelyn", "casuco g7", "g7 kc adviser"],
    info_en: "Ma'am Kaycelyn J. Casuco\n" +
    "Position: Adviser of G7 KC\n" +
    "Grade Level: Grade 7",
    image: ""
  },

  // GRADE 8 TEACHERS
  teacher_maria_tagon: {
    keywords: ["maria teresa tagon", "maria tagon", "ma'am maria tagon", "maam tagon", "tagon g8 head", "g8 head teacher", "head teacher mapeh"],
    info_en: "Ma'am Maria Teresa C. Tagon\n" +
    "Position: Head Teacher-in-Charge for Grade 8 curriculum\n" +
    "Designation: Head Teacher III, Head Teacher of MAPEH\n" +
    "Grade Level: Grade 8",
    image: ""
  },
  teacher_maria_delacruz: {
    keywords: ["maria louella dela cruz", "maria dela cruz", "ma'am maria dela cruz", "maam dela cruz md", "dela cruz g8 md", "g8 md adviser"],
    info_en: "Ma'am Maria Louella Madel D. Dela Cruz\n" +
    "Position: Adviser of G8 MD\n" +
    "Grade Level: Grade 8",
    image: ""
  },
  teacher_kristina_langilao: {
    keywords: ["maria kristina langilao", "kristina langilao", "ma'am kristina", "maam langilao", "langilao g8", "g8 mkl adviser"],
    info_en: "Ma'am Maria Kristina O. Langilao\n" +
    "Position: Adviser of G8 MKL\n" +
    "Grade Level: Grade 8",
    image: ""
  },
  teacher_mary_jimenez: {
    keywords: ["mary angeli jimenez", "mary jimenez", "ma'am mary angeli", "maam jimenez", "jimenez g8", "g8 maj adviser"],
    info_en: "Ma'am Mary Angeli L. Jimenez\n" +
    "Position: Adviser of G8 MAJ\n" +
    "Grade Level: Grade 8",
    image: ""
  },
  teacher_marylyn_logmao: {
    keywords: ["mary lyn logmao", "marylyn logmao", "ma'am mary lyn", "maam logmao", "logmao g8", "g8 mfl spj adviser"],
    info_en: "Ma'am Mary Lyn F. Logmao\n" +
    "Position: Adviser of G8 MFL SPJ\n" +
    "Grade Level: Grade 8",
    image: ""
  },
  teacher_eunice_longakit: {
    keywords: ["eunice grace longakit", "eunice longakit", "ma'am eunice", "maam longakit", "longakit g8", "g8 el adviser"],
    info_en: "Ma'am Eunice Grace O. Longakit\n" +
    "Position: Adviser of G8 EL\n" +
    "Grade Level: Grade 8",
    image: ""
  },
  teacher_chelsea_deleon: {
    keywords: ["chelsea de leon", "chelsea deleon", "ma'am chelsea", "maam chelsea", "de leon g8", "g8 cmd adviser"],
    info_en: "Ma'am Chelsea M. De Leon\n" +
    "Position: Adviser of G8 CMD\n" +
    "Grade Level: Grade 8",
    image: ""
  },
  teacher_ian_jalbuena: {
    keywords: ["ian chris jalbuena", "ian jalbuena", "sir ian chris", "sir jalbuena", "jalbuena g8", "g8 icj adviser"],
    info_en: "Sir Ian Chris R. Jalbuena\n" +
    "Position: Adviser of G8 ICJ\n" +
    "Grade Level: Grade 8",
    image: ""
  },
  teacher_rodel_acesor: {
    keywords: ["rodel acesor", "rodel l acesor", "sir rodel", "sir acesor g8", "acesor g8 arn", "g8 arn adviser"],
    info_en: "Sir Rodel L. Acesor\n" +
    "Position: Adviser of G8 ARN\n" +
    "Grade Level: Grade 8",
    image: ""
  },
  teacher_raymark_monteverde: {
    keywords: ["raymark monteverde", "raymark vincent monteverde", "sir raymark", "monteverde g8", "g8 rom adviser"],
    info_en: "Sir Raymark Vincent O. Monteverde\n" +
    "Position: Adviser of G8 ROM\n" +
    "Grade Level: Grade 8",
    image: ""
  },
  teacher_marc_mancenido: {
    keywords: ["marc art mancenido", "marc mancenido", "sir marc art", "sir mancenido", "mancenido g8", "g8 ps adviser"],
    info_en: "Sir Marc Art Merril B. Mancenido\n" +
    "Position: Adviser of G8 PS\n" +
    "Grade Level: Grade 8",
    image: ""
  },

  // GRADE 9 TEACHERS
  teacher_rodante_decastro: {
    keywords: ["rodante de castro", "dr rodante", "dr de castro", "de castro g9 head", "g9 head teacher", "head teacher araling panlipunan"],
    info_en: "Dr. Rodante C. De Castro\n" +
    "Position: Head Teacher-in-Charge for Grade 9 curriculum\n" +
    "Designation: Head Teacher III, Head Teacher of Araling Panlipunan\n" +
    "Grade Level: Grade 9",
    image: ""
  },
  teacher_jessa_maranan: {
    keywords: ["jessa maranan", "jessa p maranan", "ma'am jessa maranan", "maam jessa", "maranan g9", "g9 jpm adviser"],
    info_en: "Ma'am Jessa P. Maranan\n" +
    "Position: Adviser of G9 JPM\n" +
    "Grade Level: Grade 9",
    image: ""
  },
  teacher_edgar_ramirez: {
    keywords: ["edgar ramirez", "edgar m ramirez", "dr edgar ramirez", "dr ramirez", "ramirez g9", "g9 emr adviser"],
    info_en: "Dr. Edgar M. Ramirez\n" +
    "Position: Adviser of G9 EMR\n" +
    "Grade Level: Grade 9",
    image: ""
  },
  teacher_joanna_martinez: {
    keywords: ["joanna paula martinez", "joanna martinez", "ma'am joanna paula", "maam martinez g9 jp", "martinez g9 jp", "g9 jp adviser"],
    info_en: "Ma'am Joanna Paula Portes Martinez\n" +
    "Position: Adviser of G9 JP\n" +
    "Grade Level: Grade 9",
    image: ""
  },
  teacher_abigael_grezula: {
    keywords: ["abigael grezula", "abigael q grezula", "ma'am abigael", "maam grezula g9", "grezula g9 aqg", "g9 aqg adviser"],
    info_en: "Ma'am Abigael Q. Grezula\n" +
    "Position: Adviser of G9 AQG\n" +
    "Grade Level: Grade 9",
    image: ""
  },
  teacher_catherine_vales: {
    keywords: ["catherine ruz vales", "catherine vales", "ma'am catherine", "maam vales", "vales g9", "g9 crv adviser"],
    info_en: "Ma'am Catherine Ruz Vales\n" +
    "Position: Adviser of G9 CRV\n" +
    "Grade Level: Grade 9",
    image: ""
  },
  teacher_kristine_leoparte: {
    keywords: ["kristine may leoparte", "kristine leoparte", "ma'am kristine may", "maam leoparte", "leoparte g9", "g9 kpl adviser"],
    info_en: "Ma'am Kristine May P. Leoparte\n" +
    "Position: Adviser of G9 KPL\n" +
    "Grade Level: Grade 9",
    image: ""
  },
  teacher_abigail_gus: {
    keywords: ["abigail gus", "abigail r gus", "ma'am abigail gus", "maam gus", "gus g9", "g9 arj adviser"],
    info_en: "Ma'am Abigail R. Gus\n" +
    "Position: Adviser of G9 ARJ\n" +
    "Grade Level: Grade 9",
    image: ""
  },
  teacher_andrew_rubico: {
    keywords: ["andrew carmelo rubico", "andrew rubico", "sir andrew carmelo", "sir rubico", "rubico g9", "g9 acr adviser"],
    info_en: "Sir Andrew Carmelo A. Rubico\n" +
    "Position: Adviser of G9 ACR\n" +
    "Grade Level: Grade 9",
    image: ""
  },
  teacher_edward_ayala: {
    keywords: ["edward ryan ayala", "edward ayala", "sir edward ryan", "sir ayala g9", "ayala g9", "g9 era adviser"],
    info_en: "Sir Edward Ryan V. Ayala\n" +
    "Position: Adviser of G9 ERA\n" +
    "Grade Level: Grade 9",
    image: ""
  },

  // GRADE 10 TEACHERS
  teacher_rowena_albaran: {
    keywords: ["rowena albaran", "rowena p albaran", "ma'am rowena", "maam albaran", "albaran g10 head", "g10 head teacher", "head teacher science"],
    info_en: "Ma'am Rowena P. Albaran\n" +
    "Position: Head Teacher-in-Charge for Grade 10 curriculum\n" +
    "Designation: Head Teacher III, Head Teacher of Science\n" +
    "Grade Level: Grade 10",
    image: ""
  },
  teacher_lirio_parale: {
    keywords: ["lirio parale", "lirio g parale", "ma'am lirio", "maam parale", "parale g10", "g10 lp adviser"],
    info_en: "Ma'am Lirio G. Parale\n" +
    "Position: Adviser of G10 LP\n" +
    "Grade Level: Grade 10",
    image: ""
  },
  teacher_jeffrey_palas: {
    keywords: ["jeffrey palas", "jeffrey m palas", "sir jeffrey palas", "sir palas", "palas g10", "g10 jmp adviser"],
    info_en: "Sir Jeffrey M. Palas\n" +
    "Position: Adviser of G10 JMP\n" +
    "Grade Level: Grade 10",
    image: ""
  },
  teacher_mildred_medenilla: {
    keywords: ["mildred medenilla", "mildred u medenilla", "ma'am mildred", "maam medenilla", "medenilla g10", "g10 mum adviser"],
    info_en: "Ma'am Mildred U. Medenilla\n" +
    "Position: Adviser of G10 MUM\n" +
    "Grade Level: Grade 10",
    image: ""
  },
  teacher_marialyn_tinana: {
    keywords: ["marialyn tinana", "marialyn p tinana", "ma'am marialyn tinana", "maam tinana", "tinana g10", "g10 mpt adviser"],
    info_en: "Ma'am Marialyn P. Tiñana\n" +
    "Position: Adviser of G10 MPT\n" +
    "Grade Level: Grade 10",
    image: ""
  },
  teacher_cassandra_sinio: {
    keywords: ["maria cassandra sinio", "cassandra sinio", "ma'am cassandra", "maam sinio", "sinio g10", "g10 cas adviser"],
    info_en: "Ma'am Maria Cassandra C. Sinio\n" +
    "Position: Adviser of G10 CAS\n" +
    "Grade Level: Grade 10",
    image: ""
  },
  teacher_iris_adigan: {
    keywords: ["iris jean adigan", "iris adigan", "ma'am iris jean", "maam adigan", "adigan g10", "g10 ira adviser"],
    info_en: "Ma'am Iris Jean R. Adigan\n" +
    "Position: Adviser of G10 IRA\n" +
    "Grade Level: Grade 10",
    image: ""
  },
  teacher_marietta_capistrano: {
    keywords: ["marietta capistrano", "marietta e capistrano", "ma'am marietta", "maam capistrano", "capistrano g10", "g10 mec adviser"],
    info_en: "Ma'am Marietta E. Capistrano\n" +
    "Position: Adviser of G10 MEC\n" +
    "Grade Level: Grade 10",
    image: ""
  },
  teacher_maricel_sadili: {
    keywords: ["maricel sadili", "maricel a sadili", "ma'am maricel sadili", "maam sadili g10", "sadili g10", "g10 mas adviser"],
    info_en: "Ma'am Maricel A. Sadili\n" +
    "Position: Adviser of G10 MAS\n" +
    "Grade Level: Grade 10",
    image: ""
  },
  teacher_myla_go: {
    keywords: ["myla cecilia go", "myla go", "ma'am myla", "maam go", "go g10", "g10 mgo adviser"],
    info_en: "Ma'am Myla Cecilia E. Go\n" +
    "Position: Adviser of G10 MGo\n" +
    "Grade Level: Grade 10",
    image: ""
  },

  // GRADE 11 TEACHERS
  teacher_gina_grezula: {
    keywords: ["gina grezula", "gina a grezula", "ma'am gina grezula", "maam grezula g11", "grezula g11 head", "g11 head teacher", "head teacher english"],
    info_en: "Ma'am Gina A. Grezula\n" +
    "Position: Head Teacher-in-Charge for Grade 11 curriculum\n" +
    "Designation: Head Teacher I, Head Teacher of English\n" +
    "Grade Level: Grade 11",
    image: ""
  },
  teacher_crizel_ventocilla: {
    keywords: ["crizel ventocilla", "crizel m ventocilla", "ma'am crizel", "maam ventocilla", "ventocilla g11", "g11 chief adviser"],
    info_en: "Ma'am Crizel M. Ventocilla\n" +
    "Position: Chief Adviser of G11 curriculum\n" +
    "Grade Level: Grade 11",
    image: ""
  },
  teacher_ailyn_ocomen: {
    keywords: ["ailyn ocomen", "ailyn r ocomen", "ma'am ailyn ocomen", "maam ocomen", "ocomen g11", "g11 stem aro adviser"],
    info_en: "Ma'am Ailyn R. Ocomen\n" +
    "Position: Adviser of G11 STEM ARO\n" +
    "Grade Level: Grade 11",
    image: ""
  },
  teacher_ivy_gaasis: {
    keywords: ["ivy gaasis", "ivy d gaasis", "ma'am ivy gaasis", "maam gaasis", "gaasis g11", "g11 humss idg adviser"],
    info_en: "Ma'am Ivy D. Gaasis\n" +
    "Position: Adviser of G11 HUMSS IDG\n" +
    "Grade Level: Grade 11",
    image: ""
  },
  teacher_winalyn_sulit: {
    keywords: ["winalyn sulit", "winalyn m sulit", "ma'am winalyn", "maam sulit", "sulit g11", "g11 tvl he wms adviser"],
    info_en: "Ma'am Winalyn M. Sulit\n" +
    "Position: Adviser of G11 TVL HE WMS\n" +
    "Grade Level: Grade 11",
    image: ""
  },
  teacher_lorna_arsenal: {
    keywords: ["lorna arsenal", "lorna c arsenal", "ma'am lorna arsenal", "maam arsenal g11", "arsenal g11", "g11 als epas adviser"],
    info_en: "Ma'am Lorna C. Arsenal\n" +
    "Position: Adviser of ALS EPAS (G11)\n" +
    "Grade Level: Grade 11",
    image: ""
  },
  teacher_jocelyn_enriquez: {
    keywords: ["jocelyn enriquez", "jocelyn l enriquez", "ma'am jocelyn", "maam enriquez", "enriquez g11", "g11 humss jle adviser"],
    info_en: "Ma'am Jocelyn L. Enriquez\n" +
    "Position: Adviser of G11 HUMSS JLE\n" +
    "Grade Level: Grade 11",
    image: ""
  },
  teacher_liberty_paz: {
    keywords: ["liberty paz", "liberty e paz", "ma'am liberty", "maam paz g11", "paz g11", "g11 tvl he lep adviser"],
    info_en: "Ma'am Liberty E. Paz\n" +
    "Position: Adviser of G11 TVL HE LEP\n" +
    "Grade Level: Grade 11",
    image: ""
  },
  teacher_natharin_adarna: {
    keywords: ["natharin adarna", "natharin a adarna", "ma'am natharin", "maam adarna", "adarna g11", "g11 tvl he naa adviser"],
    info_en: "Ma'am Natharin A. Adarna\n" +
    "Position: Adviser of G11 TVL HE NAA\n" +
    "Grade Level: Grade 11",
    image: ""
  },
  teacher_lanilyn_diala: {
    keywords: ["lanilyn diala", "lanilyn b diala", "ma'am lanilyn", "maam diala g11 lbd", "diala g11 lbd", "g11 humss lbd adviser"],
    info_en: "Ma'am Lanilyn B. Diala\n" +
    "Position: Adviser of G11 HUMSS LBD\n" +
    "Grade Level: Grade 11",
    image: ""
  },
  teacher_maricel_diala: {
    keywords: ["maricel diala", "maricel s diala", "ma'am maricel diala", "maam diala g11 msd", "diala g11 abm", "g11 abm msd adviser"],
    info_en: "Ma'am Maricel S. Diala\n" +
    "Position: Adviser of G11 ABM MSD\n" +
    "Grade Level: Grade 11",
    image: ""
  },
  teacher_joemar_pornobi: {
    keywords: ["joe mar levi pornobi", "joemar pornobi", "sir joe mar", "sir pornobi", "pornobi g11", "g11 humms jqp adviser"],
    info_en: "Sir Joe-Mar Levi Q. Pornobi\n" +
    "Position: Adviser of G11 HUMMS JQP\n" +
    "Grade Level: Grade 11",
    image: ""
  },
  teacher_jean_caraig: {
    keywords: ["jean may caraig", "jean caraig", "ma'am jean may", "maam caraig", "caraig g11", "g11 tvl css jdc adviser"],
    info_en: "Ma'am Jean May D. Caraig\n" +
    "Position: Adviser of G11 TVL CSS JDC\n" +
    "Grade Level: Grade 11",
    image: ""
  },
  teacher_jomel_remot: {
    keywords: ["jomel remot", "jomel s remot", "sir jomel", "sir remot", "remot g11", "g11 tvl epas jsr adviser"],
    info_en: "Sir Jomel S. Remot\n" +
    "Position: Adviser of G11 TVL EPAS JSR\n" +
    "Grade Level: Grade 11",
    image: ""
  },
  teacher_janine_deguzman: {
    keywords: ["janine charlotte de guzman", "janine de guzman", "ma'am janine charlotte", "maam de guzman g11", "de guzman g11", "g11 stem jd adviser"],
    info_en: "Ma'am Janine Charlotte D. De Guzman\n" +
    "Position: Adviser of G11 STEM JD\n" +
    "Grade Level: Grade 11",
    image: ""
  },
  teacher_angelica_zaide: {
    keywords: ["angelica zaide", "angelica b zaide", "ma'am angelica", "maam zaide", "zaide g11", "g11 humss abz adviser"],
    info_en: "Ma'am Angelica B. Zaide\n" +
    "Position: Adviser of G11 HUMSS ABZ\n" +
    "Grade Level: Grade 11",
    image: ""
  },
  teacher_sandra_ranola: {
    keywords: ["sandra lei ranola", "sandra ranola", "ma'am sandra lei", "maam ranola", "ranola g11", "g11 humss smr adviser"],
    info_en: "Ma'am Sandra Lei M. Rañola\n" +
    "Position: Adviser of G11 HUMSS SMR\n" +
    "Grade Level: Grade 11",
    image: ""
  },
  teacher_dennis_lopez: {
    keywords: ["dennis lopez", "dennis a lopez", "sir dennis lopez", "lopez g11"],
    info_en: "Dennis A. Lopez\n" +
    "Position: Teacher\n" +
    "Grade Level: Grade 11",
    image: ""
  },
  teacher_ailyn_agudilla: {
    keywords: ["ailyn agudilla", "ailyn m agudilla", "ma'am ailyn agudilla", "maam agudilla g11", "agudilla g11"],
    info_en: "Ailyn M. Agudilla\n" +
    "Position: Teacher\n" +
    "Grade Level: Grade 11",
    image: ""
  },
  teacher_michelle_fontanosa: {
    keywords: ["michelle fontanosa", "michelle l fontanosa", "ma'am michelle fontanosa", "maam fontanosa", "fontanosa g11"],
    info_en: "Michelle L. Fontanosa\n" +
    "Position: Teacher\n" +
    "Grade Level: Grade 11",
    image: ""
  },
  teacher_dhavie_ruz_g11: {
    keywords: ["dhavie ruz g11", "dhavie d ruz g11", "ma'am dhavie g11", "maam ruz g11"],
    info_en: "Dhavie D. Ruz\n" +
    "Position: Teacher\n" +
    "Grade Level: Grade 11",
    image: ""
  },
  teacher_kristy_alfuen_g11: {
    keywords: ["kristy lane alfuen g11", "kristy alfuen g11", "ma'am kristy g11", "maam alfuen g11"],
    info_en: "Kristy Lane O. Alfuen\n" +
    "Position: Teacher\n" +
    "Grade Level: Grade 11",
    image: ""
  },
  teacher_mylene_flavier: {
    keywords: ["mylene flavier", "mylene n flavier", "ma'am mylene flavier", "maam flavier", "flavier g11"],
    info_en: "Mylene N. Flavier\n" +
    "Position: Teacher\n" +
    "Grade Level: Grade 11",
    image: ""
  },
  teacher_becca_roperez: {
    keywords: ["becca ericka roperez", "becca roperez", "ma'am becca", "maam roperez", "roperez g11"],
    info_en: "Becca Ericka C. Roperez\n" +
    "Position: Teacher\n" +
    "Grade Level: Grade 11",
    image: ""
  },

  // GRADE 12 TEACHERS
  teacher_edna_adel: {
    keywords: ["edna adel", "edna g adel", "ma'am edna adel", "maam adel g12", "adel g12 head", "g12 head teacher", "head teacher mathematics"],
    info_en: "Ma'am Edna G. Adel\n" +
    "Position: Head Teacher-in-Charge for Grade 12 curriculum\n" +
    "Designation: Head Teacher III, Head Teacher of Mathematics and ESP\n" +
    "Grade Level: Grade 12",
    image: ""
  },
  teacher_edeson_marquez: {
    keywords: ["edeson marquez", "edeson a marquez", "sir edeson", "sir marquez g12", "marquez g12 chief", "g12 chief adviser"],
    info_en: "Sir Edeson A. Marquez\n" +
    "Position: Chief Adviser of G12 curriculum\n" +
    "Grade Level: Grade 12",
    image: ""
  },
  teacher_levin_valdez: {
    keywords: ["levin vowie valdez", "levin valdez", "sir levin vowie", "sir valdez", "valdez g12", "g12 tvl css lav adviser"],
    info_en: "Sir Levin Vowie A. Valdez\n" +
    "Position: Adviser of G12 TVL CSS LAV\n" +
    "Grade Level: Grade 12",
    image: ""
  },
  teacher_dhavie_ruz_g12: {
    keywords: ["dhavie ruz g12", "dhavie d ruz g12", "ma'am dhavie g12", "maam ruz g12", "ruz g12 humss", "g12 humss dr adviser"],
    info_en: "Ma'am Dhavie D. Ruz\n" +
    "Position: Adviser of G12 HUMSS DR\n" +
    "Grade Level: Grade 12",
    image: ""
  },
  teacher_kristy_alfuen_g12: {
    keywords: ["kristy lane alfuen g12", "kristy alfuen g12", "ma'am kristy g12", "maam alfuen g12", "alfuen g12 tvl", "g12 tvl he koa adviser"],
    info_en: "Ma'am Kristy Lane O. Alfuen\n" +
    "Position: Adviser of G12 TVL HE KOA\n" +
    "Grade Level: Grade 12",
    image: ""
  },
  teacher_grace_palines: {
    keywords: ["maria grace palines", "grace palines", "ma'am maria grace", "maam palines", "palines g12", "g12 humss gdp adviser"],
    info_en: "Ma'am Maria Grace D. Palines\n" +
    "Position: Adviser of G12 HUMSS GDP\n" +
    "Grade Level: Grade 12",
    image: ""
  },
  teacher_renebeth_ladines: {
    keywords: ["renebeth ladines", "renebeth j ladines", "ma'am renebeth", "maam ladines", "ladines g12", "g12 humss rjl adviser"],
    info_en: "Ma'am Renebeth J. Ladines\n" +
    "Position: Adviser of G12 HUMSS RJL\n" +
    "Grade Level: Grade 12",
    image: ""
  },
  teacher_victoria_perez: {
    keywords: ["maria victoria perez", "victoria perez", "ma'am maria victoria", "maam perez g12", "perez g12", "g12 abm vlp adviser"],
    info_en: "Ma'am Maria Victoria L. Perez\n" +
    "Position: Adviser of G12 ABM VLP\n" +
    "Grade Level: Grade 12",
    image: ""
  },
  teacher_laurice_tadiosa: {
    keywords: ["laurice tadiosa", "laurice a tadiosa", "ma'am laurice", "maam tadiosa", "tadiosa g12", "g12 tvl he lat adviser"],
    info_en: "Ma'am Laurice A. Tadiosa\n" +
    "Position: Adviser of G12 TVL HE LAT\n" +
    "Grade Level: Grade 12",
    image: ""
  },
  teacher_shane_porte: {
    keywords: ["shane marie porte", "shane porte", "ma'am shane marie", "maam porte", "porte g12", "g12 stem scp adviser"],
    info_en: "Ma'am Shane Marie C. Porte\n" +
    "Position: Adviser of G12 STEM SCP\n" +
    "Grade Level: Grade 12",
    image: ""
  },
  teacher_janice_montalbo: {
    keywords: ["janice montalbo", "janice z montalbo", "ma'am janice montalbo", "maam montalbo", "montalbo g12", "g12 tvl epas jzm adviser"],
    info_en: "Ma'am Janice Z. Montalbo\n" +
    "Position: Adviser of G12 TVL EPAS JZM\n" +
    "Grade Level: Grade 12",
    image: ""
  },
  teacher_john_dator: {
    keywords: ["john emerson dator", "john dator", "sir john emerson", "sir dator g12", "dator g12 humss", "g12 humss jdd adviser"],
    info_en: "Sir John Emerson D. Dator\n" +
    "Position: Adviser of G12 HUMSS JDD\n" +
    "Grade Level: Grade 12",
    image: ""
  },
  teacher_clarrise_sangalang: {
    keywords: ["clarrise alyssa sangalang", "clarrise sangalang", "ma'am clarrise", "maam sangalang", "sangalang g12", "g12 stem cps adviser"],
    info_en: "Ma'am Clarrise Alyssa P. Sangalang\n" +
    "Position: Adviser of G12 STEM CPS\n" +
    "Grade Level: Grade 12",
    image: ""
  },
  teacher_lorna_arenal: {
    keywords: ["lorna arenal", "lorna c arenal", "ma'am lorna arenal", "maam arenal g12", "arenal g12", "g12 als epas adviser"],
    info_en: "Ma'am Lorna C. Arenal\n" +
    "Position: Adviser of G12 ALS EPAS\n" +
    "Grade Level: Grade 12",
    image: ""
  },
  teacher_joel_arcamo: {
    keywords: ["joel arcamo", "joel r arcamo", "sir joel arcamo", "sir arcamo", "arcamo g12", "g12 humss jra adviser"],
    info_en: "Sir Joel R. Arcamo\n" +
    "Position: Adviser of G12 HUMSS JRA\n" +
    "Grade Level: Grade 12",
    image: ""
  },
  teacher_joel_pornela: {
    keywords: ["joel pornela", "joel b pornela", "sir joel pornela", "sir pornela", "pornela g12", "g12 tvl je jbp adviser"],
    info_en: "Sir Joel B. Pornela\n" +
    "Position: Adviser of G12 TVL JE JBP\n" +
    "Grade Level: Grade 12",
    image: ""
  },
  teacher_lea_leonardo: {
    keywords: ["lea leonardo", "lea s leonardo", "ma'am lea", "maam leonardo", "leonardo g12", "g12 humss lsl adviser"],
    info_en: "Ma'am Lea S. Leonardo\n" +
    "Position: Adviser of G12 HUMSS LSL\n" +
    "Grade Level: Grade 12",
    image: ""
  },
  teacher_sherwin_diala: {
    keywords: ["sherwin diala", "sherwin s diala", "sir sherwin diala", "diala g12 sherwin"],
    info_en: "Sherwin S. Diala\n" +
    "Position: Teacher\n" +
    "Grade Level: Grade 12",
    image: ""
  },
  teacher_marion_dator: {
    keywords: ["marion joy dator", "marion dator", "ma'am marion joy", "maam dator g12", "dator g12 marion"],
    info_en: "Marion Joy M. Dator\n" +
    "Position: Teacher\n" +
    "Grade Level: Grade 12",
    image: ""
  },
  teacher_leovino_merle: {
    keywords: ["leovino merle", "leovino a merle", "sir leovino", "merle g12 leovino"],
    info_en: "Leovino A. Merle\n" +
    "Position: Teacher\n" +
    "Grade Level: Grade 12",
    image: ""
  },
  teacher_rosemarie_nolasco: {
    keywords: ["rosemarie nolasco", "rosemarie b nolasco", "ma'am rosemarie", "maam nolasco", "nolasco g12"],
    info_en: "Rosemarie B. Nolasco\n" +
    "Position: Teacher\n" +
    "Grade Level: Grade 12",
    image: ""
  },
  teacher_jesus_delossantos: {
    keywords: ["jesus delos santos", "jesus q delos santos", "sir jesus", "delos santos g12 jesus"],
    info_en: "Jesus Q. Delos Santos\n" +
    "Position: Teacher\n" +
    "Grade Level: Grade 12",
    image: ""
  },
  teacher_gear_arellano: {
    keywords: ["gear arellano", "gear g arellano", "sir gear", "arellano g12 gear"],
    info_en: "Gear G. Arellano II\n" +
    "Position: Teacher\n" +
    "Grade Level: Grade 12",
    image: ""
  },
  teacher_jhon_adel: {
    keywords: ["jhon glendon adel", "jhon adel", "sir jhon glendon", "adel g12 jhon"],
    info_en: "Jhon Glendon D. Adel\n" +
    "Position: Teacher\n" +
    "Grade Level: Grade 12",
    image: ""
  },
  teacher_joy_adamos: {
    keywords: ["joy adamos", "joy c adamos", "ma'am joy adamos", "maam adamos", "adamos g12"],
    info_en: "Joy C. Adamos\n" +
    "Position: Teacher\n" +
    "Grade Level: Grade 12",
    image: ""
  },
  teacher_hernando_corte: {
    keywords: ["hernando corte", "hernando g corte", "sir hernando", "corte g12"],
    info_en: "Hernando G. Corte\n" +
    "Position: Teacher\n" +
    "Grade Level: Grade 12",
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
    `Here's what I know: ${info}`,
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
// CASUAL CHAT - FIXED PROPERLY
// ===============================
function casualReply(message, lang) {
  // Check only at word boundaries - entire message must be greeting
  const greetings = ["hi", "hello", "hey", "kumusta", "kamusta"];
  const thanks = ["salamat", "thank you", "thanks"];
  
  // Only match if message is JUST a greeting (with optional punctuation)
  const cleanMsg = message.replace(/[^a-z\s]/g, '').trim();
  
  if (lang === "tl") {
    if (greetings.includes(cleanMsg))
      return "Kumusta! 👋 Ako si TalBot. Paano ako makakatulong?";
    if (thanks.some(t => cleanMsg === t || cleanMsg.startsWith(t + " ")))
      return "Walang anuman! 💙 Nandito lang ako para tumulong.";
  } else {
    if (greetings.includes(cleanMsg))
      return "Hello! 👋 I'm TalBot. How can I help you today?";
    if (thanks.some(t => cleanMsg === t || cleanMsg.startsWith(t + " ")))
      return "You're welcome! 💙 I'm always here to help.";
  }
  return null;
}

// ===============================
// CHAT ENDPOINT (SMART MATCHING)
// ===============================
function keywordLengthScore(keyword) {
  return keyword.split(" ").length;
}

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
const kwNorm = normalize(kw);

// Strong exact phrase match (prefer longer phrases)
if (message.includes(kwNorm)) {
  score = 1 + keywordLengthScore(kw) * 0.2;
}


// Reject very short keywords unless exact
if (kwNorm.length < 5 && score < 1) {
  continue;
}

if (score > bestScore && score >= 0.7) {
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

  // FALLBACK
  return res.json({
    reply:
      lang === "tl"
        ? "Paumanhin 😅 wala pa akong impormasyon tungkol diyan. Magtanong lang tungkol sa paaralan."
        : "Sorry 😅 I don't have information about that yet. Please ask questions about school information."
  });
});

// ===============================
// START SERVER
// ===============================
app.listen(3000, () => {
  console.log("TalBot running at http://localhost:3000");
});















