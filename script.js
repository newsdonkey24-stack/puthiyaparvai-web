document.addEventListener("DOMContentLoaded", function () {

// ===============================
// LOAD NEWS DATA
// ===============================
fetch(window.location.pathname.includes("/news/")
? "../news.json"
: "news.json"
)

.then(res => res.json())

.then(data => {

const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const category = params.get("category");

// ===============================
// NEWS DETAIL PAGE
// ===============================
if (id) {

  const news = data.find(n => n.id == id);
  if (!news) return;

  document.getElementById("title").innerText = news.title;

document.getElementById("meta").innerText =
(news.location || news.place) + " | " +
news.date + " | " +
news.reporter + " | " +
news.category;

  // Main Image
  const image = document.getElementById("image");
  if (image) {
    image.src = window.location.pathname.includes("/news/")
      ? "../" + news.image
      : news.image;
  }

  // Gallery
  const gallery = document.getElementById("gallery");

  if (gallery && news.gallery && news.gallery.length > 0) {

    let galleryHTML = "";

    news.gallery.forEach(img => {

      galleryHTML += `
      <div class="gallery-item">
        <img src="${
          window.location.pathname.includes("/news/")
          ? "../" + img
          : img
        }">
      </div>
      `;

    });

    gallery.innerHTML = galleryHTML;
  }

  // Content
  let paragraphs = news.content.split("\n\n");

  let html = "";

  paragraphs.forEach(p => {
    html += "<p>" + p + "</p>";
  });

  document.getElementById("content").innerHTML = html;

  // Share Buttons
  const url = window.location.href;

  const whatsappBtn = document.getElementById("whatsappShare");
  const facebookBtn = document.getElementById("facebookShare");

  if (whatsappBtn) {
    whatsappBtn.href =
      "https://wa.me/?text=" +
      encodeURIComponent(news.title + " - " + url);
  }

  if (facebookBtn) {
    facebookBtn.href =
      "https://www.facebook.com/sharer/sharer.php?u=" +
      encodeURIComponent(url);
  }

}

// ===============================
// HOME PAGE
// ===============================
else {

  const container = document.getElementById("news-container");

  if (!container) return;

  let html = "";

  let filteredData = data;

  if (category) {
    filteredData = data.filter(news =>
      news.category.trim() == category.trim()
    );
  }

  filteredData.forEach(news => {

    html += `
    <div style="display:flex;gap:15px;margin-bottom:20px;border-bottom:1px solid #ddd;padding-bottom:10px;align-items:center;">

    <a href="news/news.html?id=${news.id}" style="text-decoration:none;color:#000;display:flex;gap:15px;align-items:center;">

    <img src="${news.image}" style="width:120px;height:80px;object-fit:cover;border-radius:6px;">

    <h4 style="margin:0;font-size:18px;line-height:1.4;">
    ${news.title}
    </h4>

    </a>
    </div>
    `;

  });

  container.innerHTML = html;

}

})

.catch(err => {
console.log("Error loading news:", err);
});

});

// ===============================
// BREAKING NEWS
// ===============================

const breaking = document.getElementById("breakingNews");

if (breaking) {

fetch("news.json")

.then(res => res.json())

.then(data => {

let text = "";

data.slice(0,5).forEach(news => {

  text += " 🔴 " + news.title + " | ";

});

breaking.innerText = text;

});

}

// ===============================
// MORE NEWS SECTION
// ===============================

document.addEventListener("DOMContentLoaded", function () {

const moreNews = document.getElementById("more-news");

if (!moreNews) return;

fetch("https://newsdonkey24-stack.github.io/puthiyaparvai-web/news.json")

.then(res => res.json())

.then(data => {

let html = "";

data.slice(0,4).forEach(news => {

  html += `
  <div style="display:flex;gap:15px;margin-bottom:20px;border-bottom:1px solid #ddd;padding-bottom:10px;align-items:center;">

  <a href="news.html?id=${news.id}" style="text-decoration:none;color:#000;display:flex;gap:15px;align-items:center;">

  <img src="../${news.image}" style="width:120px;height:80px;object-fit:cover;border-radius:6px;">

  <h4 style="margin:0;font-size:18px;line-height:1.4;">
  ${news.title}
  </h4>

  </a>
  </div>
  `;

});

moreNews.innerHTML = html;

});

});

// ===============================
// DISABLE RIGHT CLICK
// ===============================

document.addEventListener("contextmenu", function(e){
e.preventDefault();
});

// ===============================
// DISABLE COPY SHORTCUT
// ===============================

document.addEventListener("keydown", function(e){

if (e.ctrlKey && (e.key === "c" || e.key === "u" || e.key === "s")) {
e.preventDefault();
}

});
// HOMEPAGE NEWS LAYOUT

if(document.getElementById("big-news")){

fetch("news.json")
.then(res=>res.json())
.then(data=>{

// BIG NEWS
let big=data[0];

document.getElementById("big-news").innerHTML=`

<a href="news/news.html?id=${big.id}" style="text-decoration:none;color:black">

<img src="${big.image}">

<h2>${big.title}</h2>

</a>

`;


// SIDE NEWS

let sideHTML="";

data.slice(1,5).forEach(news=>{

sideHTML+=`

<div class="side-item">

<a href="news/news.html?id=${news.id}" style="text-decoration:none;color:black">

<img src="${news.image}">

<h4>${news.title}</h4>

</a>

</div>

`;

});

document.getElementById("side-news").innerHTML=sideHTML;


// GRID NEWS

let gridHTML="";

data.slice(5).forEach(news=>{

gridHTML+=`

<div class="grid-item">

<a href="news/news.html?id=${news.id}" style="text-decoration:none;color:black">

<img src="${news.image}">

<h3>${news.title}</h3>

</a>

</div>

`;

});

document.getElementById("news-grid").innerHTML=gridHTML;

});

}
function updateDateTime(){
  const now = new Date();

  const day = now.toLocaleDateString('ta-IN', { weekday: 'long' });
  const date = now.toLocaleDateString('ta-IN');
  const time = now.toLocaleTimeString('ta-IN');

  const el = document.getElementById("datetime");
  if(el){
    el.innerHTML = "📅 " + day + " | " + date + " | ⏰ " + time;
  }
}

setInterval(updateDateTime, 1000);
updateDateTime();
