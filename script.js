document.addEventListener("DOMContentLoaded", function () {

fetch("news.json")
.then(res => res.json())
.then(data => {

const params = new URLSearchParams(window.location.search);
const id = params.get("id");


// =============================
// SINGLE NEWS PAGE
// =============================

if(id){

let news = data.find(n => n.id === id);

if(news){

document.getElementById("news-title").innerText = news.title;

document.getElementById("news-meta").innerText =
${news.location} | ${news.date} | ${news.reporter} | ${news.category};

document.getElementById("news-image").src = news.image;

document.getElementById("news-summary").innerText = news.summary;

document.getElementById("news-content").innerText = news.content;


// ===== GALLERY =====

if(news.gallery){

let galleryHTML="";

news.gallery.forEach(img=>{

galleryHTML+=`
<div class="gallery-item">
<img src="${img}">
</div>
`;

});

document.getElementById("news-gallery").innerHTML = galleryHTML;

}

}

}



// =============================
// HOMEPAGE BIG NEWS
// =============================

if(document.getElementById("big-news")){

let big = data[0];

document.getElementById("big-news").innerHTML = `
<a href="news/news.html?id=${big.id}" style="text-decoration:none;color:black">

<img src="${big.image}">

<h2>${big.title}</h2>

</a>
`;

}



// =============================
// SIDE NEWS
// =============================

if(document.getElementById("side-news")){

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

}



// =============================
// NEWS GRID
// =============================

if(document.getElementById("news-grid")){

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

}



// =============================
// BREAKING NEWS TICKER
// =============================

if(document.getElementById("breakingNews")){

let breaking="";

data.slice(0,5).forEach(news=>{

breaking+=` 🔴 ${news.title} &nbsp;&nbsp;&nbsp;`;

});

document.getElementById("breakingNews").innerHTML=breaking;

}

});

});
