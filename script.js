// Load news.json with cache bypass
fetch("/puthiyaparvai-web/news.json?nocache=" + new Date().getTime())
  .then(res => res.json())
  .then(data => {

    // Containers
    const main = document.getElementById("news-container");
    const breaking = document.getElementById("breakingNews");

    if (!main) return;

    // Clear old content
    main.innerHTML = "";
    if (breaking) breaking.innerHTML = "";

    // ============================
    // 🔴 BREAKING NEWS BAR
    // ============================
    data.forEach(news => {
      if (news.breaking === true && breaking) {
        breaking.innerHTML += " 🔴 " + news.title + " | ";
      }
    });

    // ============================
    // 📰 NORMAL NEWS LIST
    // ============================
    data.forEach(news => {

      const div = document.createElement("div");
      div.className = "news-item";

     div.innerHTML = `
  <div class="news-card">
    <a href="${news.link}">
      <img src="${news.image}" alt="${news.title}" class="news-image">

      <h2 class="news-title">${news.title}</h2>

      <p class="news-summary">
        ${news.summary}
      </p>

      <span class="read-more">முழு செய்தி</span>
    </a>
  </div>
`;

      main.appendChild(div);

    });

  })
  .catch(err => console.log("Error loading news:", err));
