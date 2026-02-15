fetch("/puthiyaparvai-web/news.json")
  .then(res => res.json())
  .then(data => {

    const container = document.getElementById("news-container");
    if (!container) return;

    // Body-ல இருந்து category எடு
    const category = document.body.dataset.category;

    // Filter
    const filtered = category
      ? data.filter(n => n.category === category)
      : data;

    filtered.forEach(news => {

      const div = document.createElement("div");
      div.className = "news-item";

      div.innerHTML = `
        <a href="${news.link}">
          <img src="${news.image}" alt="${news.title}">
          <h2>${news.title}</h2>
          <p>${news.summary}</p>
        </a>
      `;

      container.appendChild(div);
    });

  })
  .catch(err => console.log("Error:", err));
// ===== Breaking News Ticker =====

const breakingText = document.getElementById("breakingNews");

// ===== Breaking News Ticker =====

const breakingText = document.getElementById("breakingNews");

if (breakingText) {

  fetch("/puthiyaparvai-web/news.json")
    .then(res => res.json())
    .then(data => {

      let breakingNews = "";

      data.forEach(news => {
        if (news.breaking === true) {
          breakingNews += " 🔴 " + news.title + " | ";
        }
      });

      if (breakingNews === "") {
        breakingNews = "🔴 தற்போது முக்கிய செய்திகள் இல்லை";
      }

      breakingText.innerText = breakingNews;

    })
    .catch(err => {
      console.log("Breaking Error:", err);
      breakingText.innerText = "🔴 செய்திகள் ஏற்றப்படவில்லை";
    });

}
