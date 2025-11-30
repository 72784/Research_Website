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
                photoContent = `<img src="data/${member.photo}" alt="${member.name}">`;
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
