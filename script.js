document.addEventListener("DOMContentLoaded", function () {

 fetch(window.location.pathname.includes("/news/")
  ? "../news.json"
  : "news.json")
    .then(res => res.json())
    .then(data => {

      const params = new URLSearchParams(window.location.search);
      const id = params.get("id");

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
      let paragraphs = news.content.split("\n\n");
let html = "";

paragraphs.forEach(p => {
  html += "<p>" + p + "</p>";
});

document.getElementById("content").innerHTML = html;

      }

      // ===============================
      // HOME PAGE
      // ===============================
      else {

        const container = document.getElementById("news-container");
        if (!container) return;

        let html = "";

        data.forEach(news => {
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
