fetch("news.json?v=" + new Date().getTime())
  .then(res => res.json())
  .then(data => {

    // HOMEPAGE NEWS LIST
    const container = document.getElementById("news-container");
    if (container) {
      container.innerHTML = "";

      data.forEach(news => {
        const div = document.createElement("div");
        div.className = "news-item";

        div.innerHTML = `
          <a href="news/news.html?id=${news.id}">
            <img src="${news.image}" style="width:100%;height:auto;">
            <h3>${news.title}</h3>
            <p>${news.summary}</p>
          </a>
        `;

        container.appendChild(div);
      });
    }

    // SINGLE NEWS PAGE
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    if (id) {
      const article = data.find(n => n.id === id);
      if (!article) return;

      document.getElementById("title").innerText = article.title;
      document.getElementById("meta").innerText =
        article.date + " | " + article.place + " | " + article.reporter;

      document.getElementById("image").src = "../" + article.image;
      document.getElementById("content").innerText = article.content;
    }

  })
  .catch(err => {
    console.log("Error loading news", err);
  });
