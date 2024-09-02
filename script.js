console.log("hello World");
const CookieButton = document.getElementById("CookieButton");
const moreCookie = document.getElementById("moreCookie");
const CookieSpan = document.getElementById("CookieSpan");
const CPSSpan = document.getElementById("CPSSpan");

const stats = {
  cookie: 0,
  CPS: 0,
  tenCPS: 0,
};

const storageStats = JSON.parse(localStorage.getItem("stats"));

if (storageStats !== null) {
  stats.cookie = storageStats.cookie;
  stats.CPS = storageStats.CPS;
  stats.tenCPS = storageStats.tenCPS;
  updatePage();
}

function buyCookie() {
  stats.cookie++;
  CookieSpan.textContent = stats.cookie;
  updatePage();
  updateStorage();
}

function buyMore() {
  if (stats.cookie >= 10) {
    stats.CPS += 10;
    stats.cookie -= 10;
    updatePage();
    updateStorage();
  }
}


function updatePage() {
  CookieSpan.textContent = stats.cookie;
  CPSSpan.textContent = stats.CPS;
  MajorUpgradeCPSSpan.textContent = stats.tenCPS;
}
function updateStorage() {
  localStorage.setItem("stats", JSON.stringify(stats));
}

function resetGame() {
  stats.cookie = 0;
  stats.CPS = 0;
  stats.tenCPS = 0;
  updatePage();
  updateStorage();
}

CookieButton.addEventListener("click", buyCookie);
moreCookie.addEventListener("click", buyMore);

setInterval(function () {
  stats.cookie += stats.CPS;
  updatePage();
  updateStorage();
}, 1000);
