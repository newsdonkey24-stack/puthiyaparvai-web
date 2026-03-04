document.addEventListener("DOMContentLoaded", function () {

 fetch(window.location.pathname.includes("/news/")
  ? "../news.json"
  : "news.json")
    .then(res => res.json())
    .then(data => {

      const params = new URLSearchParams(window.location.search);
      const id = params.get("id");
     const category = params.get("category");

      // ===============================
      // NEWS DETAIL PAGE
      // ===============================
      if (id) {

        const news = data.find(n => n.id === id);
        if (!news) return;

        document.getElementById("title").innerText = news.title;
        document.getElementById("meta").innerText =
          news.place + " | " +
          news.date + " | " +
          news.reporter + " | " +
          news.category;

      document.getElementById("image").src =
  window.location.pathname.includes("/news/")
    ? "../" + news.image
    : news.image;
       // ===== GALLERY SUPPORT =====
const gallery = document.getElementById("gallery");

if (gallery && news.images && news.images.length > 0) {
    let galleryHTML = "";

    news.images.forEach(img => {
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
      let paragraphs = news.content.split("\n\n");
let html = "";

paragraphs.forEach(p => {
  html += "<p>" + p + "</p>";
});

document.getElementById("content").innerHTML = html;
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
        news.category.trim() === category.trim()
    );
}

filteredData.forEach(news => {
          html += `
            <div style="margin-bottom:30px;">
              <a href="news/news.html?id=${news.id}">
                <img src="${news.image}" style="width:100%;height:auto;">
                <h2>${news.title}</h2>
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
// BREAKING NEWS TEXT

const breaking = document.getElementById("breakingNews");

fetch("news.json")
.then(response => response.json())
.then(data => {

let text = "";

data.slice(0,5).forEach(news=>{
text += " 🔴 " + news.title + " | ";
});

breaking.innerText = text;

});
// Disable right click
document.addEventListener("contextmenu", function(e){
e.preventDefault();
});
// Disable copy shortcut
document.addEventListener("keydown", function(e){

if(e.ctrlKey && (e.key === "c" || e.key === "u" || e.key === "s")){
e.preventDefault();
}

});
// COPY SOURCE ADD

document.addEventListener("copy", function(e){

let selectedText = window.getSelection().toString();

let source = "\n\nSource: புதுய பார்வை\nhttps://newsdonkey24-stack.github.io/pudhiyaparvai-web";

let finalText = selectedText + source;

e.clipboardData.setData("text/plain", finalText);

e.preventDefault();

});
// ===== MORE NEWS SECTION =====
document.addEventListener("DOMContentLoaded", function () {

const moreNews = document.getElementById("more-news");

if (moreNews) {

fetch("../news.json")
.then(res => res.json())
.then(data => {

let html = "";

data.slice(0,4).forEach(news => {

html += `
<div style="margin-bottom:20px;border-bottom:1px solid #ddd;padding-bottom:10px;">
<a href="../news/news.html?id=${news.id}" style="text-decoration:none;color:#000;">
<img src="../${news.image}" style="width:100%;max-height:200px;object-fit:cover;border-radius:6px;">
<h4 style="margin-top:8px;">${news.title}</h4>
</a>
</div>
`;

});

moreNews.innerHTML = html;

});

}

});
