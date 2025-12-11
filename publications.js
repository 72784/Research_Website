// Load publications.json
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
