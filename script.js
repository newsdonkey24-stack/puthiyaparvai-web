fetch('./news.json?v=' + new Date().getTime())
  .then(response => response.json())
  .then(data => {

    const container = document.getElementById("news-container");
    if (!container) return;

    container.innerHTML = "";

    data.slice().reverse().forEach(news => {

      const div = document.createElement("div");
      div.className = "news-item";

      div.innerHTML = `
        <a href="news/news.html?id=${news.id}">
          <img src="${news.image}" style="width:100%;max-height:250px;object-fit:cover;">
          <h3>${news.title}</h3>
        </a>
        <p>${news.summary}</p>
        <hr>
      `;

      container.appendChild(div);

    });

  })
  .catch(error => {
    console.error("News loading error:", error);
  });
