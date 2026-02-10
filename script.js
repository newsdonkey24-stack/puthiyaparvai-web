fetch("../news.json")
  .then(res => res.json())
  .then(data => {

    const container = document.getElementById("news-container");
    if (!container) return;

    const page = window.location.pathname
      .split("/")
      .pop()
      .replace(".html", "");

    const currentCategory = page;

    const filteredNews = data.filter(
      news => news.category === currentCategory
    );

    if (filteredNews.length === 0) {
      container.innerHTML = "<p>இந்த பிரிவில் செய்திகள் இல்லை</p>";
      return;
    }

    filteredNews.forEach(news => {
      const div = document.createElement("div");
      div.className = "news-item";

     div.innerHTML = `
  ${news.breaking ? '<span class="breaking">முக்கிய செய்தி</span>' : ''}

  <img src="${news.image}" class="thumb" alt="${news.title}" />

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
  .catch(err => console.error("Category news load error:", err));
