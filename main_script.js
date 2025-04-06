const container = document.getElementById("projectsContainer");
const API_URL = "https://api.npoint.io/86c5397204c6e579cd2b"; // Replace this with your actual API URL

fetch(API_URL)
  .then(response => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then(projects => {
    projects.forEach(project => {
      const card = document.createElement("a");
      card.className = "card";
      card.href = project.link;
      card.innerHTML = `
        <div class="card-title">${project.title}</div>
        <div class="card-description">${project.description}</div>
      `;
      container.appendChild(card);
    });
  })
  .catch(error => {
    console.error("Error fetching project data:", error);
    container.innerHTML = `<p style="color: red;">Failed to load projects from the API.</p>`;
  });
