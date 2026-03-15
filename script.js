document.addEventListener("DOMContentLoaded", () => {

const isNewsPage = window.location.pathname.includes("/news/");
const jsonPath = isNewsPage ? "../news.json" : "news.json";

fetch(jsonPath)
.then(res => res.json())
.then(data => {

const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const category = params.get("category");


// =============================
// NEWS DETAIL PAGE
// =============================

if(id){

const news = data.find(n => n.id == id);
if(!news) return;

document.getElementById("title").innerText = news.title;

document.getElementById("meta").innerText =
(news.location || news.place || "") +
" | " + news.date +
" | " + news.reporter +
" | " + news.category;


// MAIN IMAGE
const image = document.getElementById("image");

if(image){
image.src = isNewsPage ? "../"+news.image : news.image;
}


// GALLERY
const gallery = document.getElementById("gallery");

if(gallery && news.gallery){

let html="";

news.gallery.forEach(img=>{

html += `
<div class="gallery-item">
<img src="${isNewsPage ? '../'+img : img}">
</div>
`;

});

gallery.innerHTML = html;

}


// CONTENT
let paragraphs = news.content.split("\n\n");

let contentHTML="";

paragraphs.forEach(p=>{
contentHTML += <p>${p}</p>;
});

document.getElementById("content").innerHTML = contentHTML;


// SHARE BUTTONS
const url = window.location.href;

const whatsappBtn = document.getElementById("whatsappShare");
const facebookBtn = document.getElementById("facebookShare");

if(whatsappBtn){
whatsappBtn.href =
"https://wa.me/?text="+encodeURIComponent(news.title+" - "+url);
}

if(facebookBtn){
facebookBtn.href =
"https://www.facebook.com/sharer/sharer.php?u="+encodeURIComponent(url);
}

}



// =============================
// HOME PAGE
// =============================

else{

let container = document.getElementById("news-container");

if(!container) return;

let filteredData = data;

if(category){
filteredData = data.filter(n =>
n.category.trim() == category.trim()
);
}

let html="";

filteredData.forEach(news=>{

html+=`

<div style="display:flex;gap:15px;margin-bottom:20px">

<a href="news/news.html?id=${news.id}" style="text-decoration:none;color:black">

<img src="${news.image}" style="width:120px;height:80px;object-fit:cover">

</a>

<div>

<a href="news/news.html?id=${news.id}" style="text-decoration:none;color:black">
<h4>${news.title}</h4>
</a>

</div>

</div>

`;

});

container.innerHTML = html;

}



// =============================
// BREAKING NEWS
// =============================

const breaking = document.getElementById("breakingNews");

if(breaking){

let text="";

data.slice(0,5).forEach(n=>{
text += " 🔴 "+n.title+" | ";
});

breaking.innerText = text;

}



// =============================
// BIG NEWS LAYOUT
// =============================

if(document.getElementById("big-news")){

let big = data[0];

document.getElementById("big-news").innerHTML =

`
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

<a href="news/news.html?id=${news.id}">

<img src="${news.image}">

<h4>${news.title}</h4>

</a>

</div>

`;

});

document.getElementById("side-news").innerHTML = sideHTML;



// GRID NEWS

let gridHTML="";

data.slice(5).forEach(news=>{

gridHTML+=`

<div class="grid-item">

<a href="news/news.html?id=${news.id}">

<img src="${news.image}">

<h3>${news.title}</h3>

</a>

</div>

`;

});

document.getElementById("news-grid").innerHTML = gridHTML;

}



})
.catch(err => console.log("Error loading news:",err));

});



// =============================
// DISABLE RIGHT CLICK
// =============================

document.addEventListener("contextmenu", e=>{
e.preventDefault();
});



// =============================
// DISABLE COPY
// =============================

document.addEventListener("keydown", e=>{

if(e.ctrlKey && (e.key=="c" || e.key=="u" || e.key=="s")){
e.preventDefault();
}

});
