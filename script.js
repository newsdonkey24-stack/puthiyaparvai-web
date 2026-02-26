fetch('news.json')
  .then(response => response.json())
  .then(data => {
    const container = document.getElementById("news-container");
    data.reverse().forEach(news => {
      container.innerHTML += `
        <div class="news-card">
          <a href="news/news.html?id=${news.id}">
            <img src="${news.image}" alt="${news.title}">
            <h3>${news.title}</h3>
          </a>
          <p>${news.summary}</p>
        </div>
      `;
    });
  });
