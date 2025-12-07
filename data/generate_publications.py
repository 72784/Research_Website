from pathlib import Path
from pybtex.database import parse_file

# -----------------------------
#  Load BibTeX
# -----------------------------
BASE = Path(__file__).resolve().parent
bib_path = BASE / "bibtex" / "publications.bib"
bib = parse_file(str(bib_path))

# -----------------------------
# Helper: Format authors like R. W. Heath, M. E. Eltayeb
# -----------------------------
def format_authors(persons):
    names = []
    for p in persons:
        initials = " ".join(f"{n[0]}." for n in p.first_names)
        lastname = " ".join(p.last_names)
        names.append(f"{initials} {lastname}")
    return ", ".join(names)

# -----------------------------
# Categorization
# -----------------------------
journal_entries = []
conference_entries = []
other_entries = []

for key, entry in bib.entries.items():
    if "journal" in entry.fields:
        journal_entries.append(entry)
    elif "booktitle" in entry.fields:
        conference_entries.append(entry)
    else:
        other_entries.append(entry)

# Sort newest → oldest
journal_entries = sorted(journal_entries, key=lambda e: e.fields.get("year", "0"), reverse=True)
conference_entries = sorted(conference_entries, key=lambda e: e.fields.get("year", "0"), reverse=True)
other_entries = sorted(other_entries, key=lambda e: e.fields.get("year", "0"), reverse=True)

# -----------------------------
# Build HTML
# -----------------------------
html = """
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Publications – Research Group</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>

<header class="navbar">
    <div class="container nav-flex">
        <img class="uni-logo" src="icons/university_logo.jpg" alt="University Logo">
        <nav class="nav-links">
            <a href="index.html">Home</a>
            <a href="research.html">Research</a>
            <a href="publications.html" class="active">Publications</a>
            <a href="team.html">Team</a>
            <a href="contact.html">Contact</a>
        </nav>
    </div>
</header>

<section class="section padded">
<div class="container">

<h2 class="section-title">Research Publications</h2>
"""

# -----------------------------
# Section generator
# -----------------------------
def append_section(title, entries):
    global html
    if not entries:
        return

    html += f"<h3>{title}</h3>\n<ol>\n"

    for entry in entries:
        title = entry.fields.get("title", "").replace("{", "").replace("}", "")
        year = entry.fields.get("year", "")
        journal = entry.fields.get("journal", "")
        booktitle = entry.fields.get("booktitle", "")
        venue = journal or booktitle or ""
        doi = entry.fields.get("doi", "")
        arxiv = entry.fields.get("eprint", "") if "arxiv" in entry.fields.get("archiveprefix", "").lower() else ""

        authors = format_authors(entry.persons.get("author", []))

        citation = f"{authors}, “{title},” <em>{venue}</em>, {year}."

        if doi:
            citation += f" doi: {doi}"
        if arxiv:
            citation += f" arXiv:{arxiv}"

        html += f"<li>{citation}</li>\n"

    html += "</ol><br>\n"


# -----------------------------
# Add all sections (in Prof-style)
# -----------------------------
append_section("Journal Articles", journal_entries)
append_section("Conference Papers", conference_entries)
append_section("Other Publications", other_entries)

# -----------------------------
# Footer + close page
# -----------------------------
html += """
</div>
</section>

<footer class="footer">
    <p>© 2025 Research Group of Dr. Mohammed E. Eltayeb • California State University, Sacramento</p>
</footer>

</body>
</html>
"""

# -----------------------------
# Write file
# -----------------------------
output_path = BASE.parent / "publications.html"
with open(output_path, "w", encoding="utf-8") as f:
    f.write(html)

print("Generated publications.html successfully!")
