fetch("/puthiyaparvai-web/news.json?nocache=" + new Date().getTime())
  .then(res => res.json())
  .then(data => {

    const main = document.getElementById("news-container");
    const breaking = document.getElementById("breaking-container");

    if (!main) return;

    main.innerHTML = "";
    if (breaking) breaking.innerHTML = "";

    data.forEach(news => {

      const div = document.createElement("div");
      div.className = "news-card";

      div.innerHTML = `
        ${news.breaking ? '<span class="breaking">முக்கிய செய்தி</span>' : ''}

        <img src="${news.image}" class="thumb" alt="${news.title}">

        <h2>
          <a href="${news.link}">
            ${news.title}
          </a>
        </h2>

        <p>${news.summary}</p>
      `;

      if (news.breaking && breaking) {
        breaking.appendChild(div.cloneNode(true));
      }

      main.appendChild(div);

    });

  })
  .catch(err => console.log(err));
