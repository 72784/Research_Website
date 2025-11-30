// Load papers dynamically
fetch("./data/papers.json")
  .then(response => response.json())
  .then(papers => {
    const container = document.getElementById("papers-container");

    papers.forEach(paper => {
      const card = document.createElement("div");
      card.classList.add("pub-card");

      card.innerHTML = `
        <h3>${paper.title}</h3>

        <p class="pub-meta">
            <strong>Authors:</strong> ${paper.authors}<br>
            <strong>Venue:</strong> ${paper.venue}<br>
            <strong>Year:</strong> ${paper.year}
        </p>

        <p class="pub-abstract">${paper.abstract}</p>

        <a href="${paper.pdf_link}" class="pub-link" target="_blank">
            View PDF
        </a>
      `;

      container.appendChild(card);
    });
  })
  .catch(error => console.error("Error loading papers:", error));
