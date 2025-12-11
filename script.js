// Load RECENT RESEARCH Papers dynamically (recent_research.json)
fetch("./data/recent_research.json")
  .then(response => response.json())
  .then(papers => {
    const container = document.getElementById("papers-container");

    papers.forEach(paper => {
      const card = document.createElement("div");
      card.classList.add("pub-card");

      card.innerHTML = `
  <div class="pub-card-inner">
      <img class="pub-image" src="${paper.image || 'data/icons/paper_default.png'}" alt="Paper Image">

      <div class="pub-content">
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
      </div>
  </div>
`;


      container.appendChild(card);
    });
  })
  .catch(error => console.error("Error loading papers:", error));


// Load ALL PUBLICATIONS dynamically (publications.json)
async function loadPubs() {
    try {
        const response = await fetch("data/publications.json");
        const pubs = await response.json();

        renderCategory("journal", "journal-list", pubs);
        renderCategory("conference", "conference-list", pubs);
        renderCategory("other", "other-list", pubs);

    } catch (error) {
        console.error("Failed to load publications.json:", error);
    }
}

function renderCategory(category, elementId, pubs) {
    const container = document.getElementById(elementId);
    if (!container) return;

    const filtered = pubs
        .filter(p => p.category === category)
        .sort((a, b) => Number(b.year) - Number(a.year));

    filtered.forEach(p => {
        const li = document.createElement("li");

        // Authors: handle string OR array
        const authors = Array.isArray(p.authors)
            ? p.authors.join(", ")
            : p.authors;

        const venue = p.venue ? `<em>${p.venue}</em>` : "";

        const doi = p.doi
            ? ` doi: <a href="https://doi.org/${p.doi}" target="_blank">${p.doi}</a>`
            : "";

        li.innerHTML = `${authors}, “${p.title},” ${venue}, ${p.year}.${doi}`;
        container.appendChild(li);
    });
}

loadPubs();

// Load TEAM DETAILS dynamically (team.json)
fetch("data/team.json")
    .then(response => response.json())
    .then(teamMembers => {
        const container = document.getElementById("team-container");

        teamMembers.forEach(member => {
            const card = document.createElement("div");
            card.className = "team-card";

            // Photo or initials placeholder
            let photoContent = "";
            if (!member.photo || member.photo.trim() === "") {
                const initials = member.name.split(" ").map(n => n[0]).join("").toUpperCase();
                photoContent = `<div class="placeholder">${initials}</div>`;
            } else {
                photoContent = `<img src="data/team_images/${member.photo}" alt="${member.name}">`;
            }

            // LinkedIn icon (only if link is provided)
            const linkedin = member.linkedin
            ? `<a href="${member.linkedin}" target="_blank" class="linkedin-inline">
                    <img src="icons/linkedin.png" alt="LinkedIn">
            </a>`
            : "";


            card.innerHTML = `
                <div class="team-photo">${photoContent}</div>

                <div class="name-row">
                    <h3>${member.name}</h3>
                    ${linkedin}
                </div>

                <p class="role">${member.role}</p>
            `;

            container.appendChild(card);
        });
    });
