fetch("news.json")
  .then(res => res.json())
  .then(data => {
    const container = document.querySelector(".container");
    if (!container) return;

    container.innerHTML = "";

    const breakingNews = data.filter(n => n.breaking === true);
    const normalNews = data.filter(n => !n.breaking);

    [...breakingNews, ...normalNews].forEach(news => {
      const div = document.createElement("div");
      div.className = "news-item";

      div.innerHTML =`
        ${news.breaking ? <span `class="breaking">முக்கிய செய்தி</span>` : ""}
        <img src="${news.image}" class="thumb" alt="${news.title}">
        <h2>
          <a href="${news.link}">
            ${news.title}
          </a>
        </h2>
        <p>${news.summary}</p>
      `;

      container.appendChild(div);
    });
  })
  .catch(err => console.error("News load error:", err));
