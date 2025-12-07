async function loadPublications() {
    const url = "https://api.semanticscholar.org/graph/v1/author/1774674/papers?fields=title,year,venue,authors,url";

    const response = await fetch(url);
    const data = await response.json();

    const container = document.getElementById("pub-list");

    data.data
        .sort((a,b) => b.year - a.year)
        .forEach(paper => {
            const item = document.createElement("div");
            item.classList.add("paper-item");

            item.innerHTML = `
                <h3>${paper.title}</h3>
                <p><strong>${paper.venue || "—"}</strong>, ${paper.year}</p>
                <a href="${paper.url}" target="_blank">View Paper</a>
            `;

            container.appendChild(item);
        });
}
loadPublications();
