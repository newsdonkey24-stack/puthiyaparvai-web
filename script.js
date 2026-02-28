fetch('news.json?v=' + new Date().getTime())
.then(response => response.json())
.then(data => {

    const container = document.getElementById("news-container");
    if (!container) return;

    container.innerHTML = "";

    data.forEach(news => {
        if(!news.id) return;

        const div = document.createElement("div");
        div.className = "news-item";

        div.innerHTML = `
        <a href="news/news.html?id=${news.id}">
        <img src="${news.image}" style="width:100%;height:auto;display:block;">
        <h3>${news.title}</h3>
        </a>
        <p>${news.summary}</p>
        `;

        container.appendChild(div);
    });

})
.catch(error => {
    console.error("News loading error:", error);
});
