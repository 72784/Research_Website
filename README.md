# 🌐 Wireless Systems & AI Lab – Research Group Website
### California State University, Sacramento

---

## 📘 Overview

This repository hosts the official website of the **Wireless Systems & AI Lab**, led by **Dr. Mohammed E. Eltayeb** at California State University, Sacramento.

The website serves as a hub for the lab's academic contributions, highlighting:
* **Research Areas:** mmWave, THz communication, and AI in wireless systems.
* **Publications:** Automated lists of journals and conference papers.
* **Team:** Profiles of current researchers and alumni.
* **Lab Info:** Contact details and collaboration opportunities.

Developed by **Parth Shiroya**, the site is built for **speed, modularity, and easy maintenance**. It uses a JSON-driven architecture, allowing the research team to update content without touching HTML code.

---

## ✨ Key Features

### 🔹 JSON-Driven Content (No HTML Editing)
All dynamic content is stored in the `/data` folder. Updating these JSON files automatically updates the website UI.
* `publications.json` → Populates the Publications page.
* `team.json` → Populates the Team page.
* `recent_research.json` → Stores metadata for recent research papers.

### 🔹 Modular & Fast
* **Separation of Concerns:** HTML for structure, CSS for style, and Custom JS modules for logic.
* **Vanilla JavaScript:** Lightweight and fast, with no heavy framework overhead.
* **Responsive:** Mobile-first design optimized for academic readability.

### 🔹 Global Deployment
* Hosted on **Vercel** for global edge performance.
* Automatic HTTPS and caching.
* Instant builds and rollbacks on git commit.

---

## 🗂️ Project Structure

```text
Research_Website
├── index.html            # Home / Landing Page
├── research.html         # Recent Research Focus Areas
├── publications.html     # Dynamic Publications List
├── team.html             # Dynamic Team Grid
├── contact.html          # Contact Info
├── style.css             # Global Stylesheet
├── script.js             # Main Logic
│
├── data                  #  Dynamic CONTENT DATABASE
│   ├── publications.json
│   ├── team.json
│   └── recent_research.json
│                         
└── images                #  Website Images
    ├── paper_images
    ├── team_images
    └── icons
```
## 📝 Updating Content
To update the website, you simply need to edit the files inside the data/ folder.

1. Adding a Publication
Open data/publications.json and add a new entry to the list:
```json
{
  "category": "journal",
  "title": "Compressive Sensing for Millimeter Wave Antenna Array Diagnosis",
  "authors": ["M. Eltayeb", "T. Al-Naffouri", "R. Heath"],
  "venue": "IEEE Transactions on Communications",
  "year": 2018
}
```
2. Adding a Team Member
Open data/team.json and add a new member object. Ensure their image is uploaded to images/team_images/.

## 🚀 Deployment
The website is fully configured for Vercel.

Push changes to the GitHub repository.

Vercel detects the commit and triggers a build.

The site is live within seconds.

## 👨‍💻 Credits
Website Developer: Parth Shiroya

Principal Investigator: Dr. Mohammed E. Eltayeb

Lab: Wireless Systems & AI Lab

Institution: California State University, Sacramento
