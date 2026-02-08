const titleText = document.getElementById("titleText");
const msg = document.getElementById("msg");

const yesBtn = document.getElementById("yesBtn");
const noBtn  = document.getElementById("noBtn");

const firstRow = document.getElementById("firstRow");
const finalRow = document.getElementById("finalRow");
const yes2Btn = document.getElementById("yes2Btn");
const yes3Btn = document.getElementById("yes3Btn");

const confetti = document.getElementById("confetti");
const flash = document.getElementById("flash");

// ชัวร์ว่าเริ่มต้นซ่อนปุ่มชุดสอง
finalRow.hidden = true;

const finalText = "Pen Fan Pom Dai Mai Krub\nKun Ratiya Thiankhunthod";

let noCount = 0;

const noMessages = [
  "คิดดี ๆ นะคร้าบ 😼",
  "เอาดี ๆ ไม่ได้จิงหนอ",
  "อายูชัว???",
  "ขอร้องงง 🙏",
  "กด ได้ แล้วจะไม่ขออะไรเลย",
  "พลีสส กด ได้เถอะ",
  "ต่อไปผมจะมัดมือชกละนะ",
];

function setMsg(text) {
  msg.textContent = text;
}

function shake(el) {
  el.classList.remove("shake");
  void el.offsetWidth;
  el.classList.add("shake");
}

function wiggleNoButton() {
  const dx = Math.floor(Math.random() * 90) - 45;
  const dy = Math.floor(Math.random() * 40) - 20;
  noBtn.style.transform = `translate(${dx}px, ${dy}px)`;
}

function resetNoButton() {
  noBtn.style.transform = "translate(0,0)";
}

/* ===== เอฟเฟกต์เต็มหน้าจอ ===== */
function burstConfettiFull(){
  confetti.innerHTML = "";
  const n = 220;

  for(let i=0;i<n;i++){
    const p = document.createElement("div");
    p.className = "piece";
    p.style.left = Math.random()*100 + "vw";
    p.style.top  = (-10 - Math.random()*30) + "vh";
    p.style.background = `hsl(${Math.floor(Math.random()*360)}, 90%, 60%)`;
    p.style.animationDuration = (2.6 + Math.random()*2.6) + "s";
    p.style.animationDelay = (Math.random()*0.25) + "s";
    p.style.width  = (6 + Math.random()*10) + "px";
    p.style.height = (8 + Math.random()*14) + "px";
    confetti.appendChild(p);
  }

  setTimeout(() => { confetti.innerHTML = ""; }, 4200);
}

function flashScreen(){
  flash.classList.remove("show");
  void flash.offsetWidth;
  flash.classList.add("show");
}

/* ===== flow ===== */
function goFinal() {
  resetNoButton();
  setMsg("");

  // ขึ้น 2 บรรทัด
  titleText.textContent = finalText;

  // ซ่อนชุดแรก แล้วโชว์ปุ่ม “ได้/ได้”
  firstRow.style.display = "none";
  finalRow.hidden = false;

  setMsg("อิอิอิอิอิอิอิอิอิอิอิอิอิอิอิอิ");
}

function finishWithFX(){
  flashScreen();
  burstConfettiFull();

  finalRow.style.display = "none";
  setMsg("congratulation to ไอหมาเอิ้ด");
}

yesBtn.addEventListener("click", goFinal);

noBtn.addEventListener("click", () => {
  noCount++;

  shake(noBtn);
  wiggleNoButton();

  setMsg(noMessages[(noCount - 1) % noMessages.length]);

  if (noCount === 1) noBtn.textContent = "ไม่ได้จริงอะ 🙅";
  if (noCount === 2) noBtn.textContent = "ไม่ได้ (มั้ง)";
  if (noCount === 3) noBtn.textContent = "ยังจะไม่ได้อีกเรอะ";
  if (noCount === 4) noBtn.textContent = "พอแล้ว อุส่าทำ";
  if (noCount === 5) noBtn.textContent = "จะร้องไห้แล้วนะ";

  // บังคับไปต่อ: หลัง 6 ครั้ง ปุ่ม “ไม่ได้” กลายเป็น “ได้”
  if (noCount >= 6) {
    setMsg("ต้องบังคับกันหน่อยละ 😼");
    noBtn.textContent = "ได้";
    noBtn.classList.add("forced");
    noBtn.onclick = goFinal;
  }
});

// ได้/ได้ ทั้งคู่ไปเอฟเฟกต์เหมือนกัน
yes2Btn.addEventListener("click", finishWithFX);
yes3Btn.addEventListener("click", finishWithFX);
