projectsData = [
  {
    name: "Babygirl",
    client: "A24",
    year: "12/25/2024",
    image_url: "BabyGirl_DIGI_Teaser_Fin7.jpg",
    link: "https://a24films.com/films/babygirl",
    category: "VFX",
    blurb: "",
  },
  {
    name: "Daredevil Born Again",
    client: "Marvel",
    year: "3/4/2025",
    image_url: "Daredevil.jpg",
    link: "",
    category: "VFX",
    blurb: "",
  },
  {
    name: "Diarra From Detroit",
    client: "BET+",
    year: "3/21/2024",
    image_url: "DiarraFromDetroit_Poster.jpg",
    link: "",
    category: "VFX",
    blurb: "",
  },
  {
    name: "Reminants of Nova",
    client: "-",
    year: "10/12/2024",
    image_url: "Reminants.jpg",
    link: "",
    category: "VFX",
    blurb: "",
  },
  {
    name: "The Mix",
    client: "-",
    year: "1/1/2025",
    image_url: "TheMix.jpg",
    link: "",
    category: "VFX",
    blurb: "",
  },
  {
    name: "A Seat at the Table",
    client: "-",
    year: "1/1/2024",
    image_url: "",
    link: "",
    category: "VFX",
    blurb: "",
  },
  {
    name: "Anamorphia II",
    client: "MAKE ART NOW",
    year: "6/12/2021",
    image_url: "",
    link: "",
    category: "VFX",
    blurb: "",
  },
  {
    name: "Bankrupt Opener",
    client: "Bright Sun Films",
    year: "8/10/2022",
    image_url: "",
    link: "",
    category: "MoGraph",
    blurb: "",
  },
  {
    name: "Swim Chicken",
    client: "",
    year: "",
    image_url: "",
    link: "",
    category: "",
    blurb: "",
  },
  {
    name: "Shitfly",
    client: "",
    year: "",
    image_url: "",
    link: "",
    category: "",
    blurb: "",
  },
  {
    name: "Under the Lights",
    client: "",
    year: "",
    image_url: "",
    link: "",
    category: "",
    blurb: "",
  },
  {
    name: "Bridgewater 30th",
    client: "",
    year: "",
    image_url: "",
    link: "",
    category: "",
    blurb: "",
  },
  {
    name: "Popcaan",
    client: "",
    year: "",
    image_url: "",
    link: "",
    category: "",
    blurb: "",
  },
];

const projectsList = document.getElementById("projectsList");
const hoverImage = document.getElementById("hoverImage");
const filterVFX = document.getElementById("filter-vfx");
const filterMoGraph = document.getElementById("filter-mograph");

renderProjects(projectsData);

// Function to render projects
function renderProjects(projects) {
  projectsList.innerHTML = ""; // Clear existing content
  projects.forEach(({ name, link, client, year, image_url }) => {
    const projectElement = document.createElement("a");
    projectElement.href = link;
    projectElement.classList.add("project");
    projectElement.innerHTML = `
      ${name} 
      ${client && client !== "-" ? `(<span>${client}</span>)` : ""} 
      <sup>${new Date(year).getFullYear()}</sup>
    `;

    if (image_url?.trim()) {
      const imagePath = `images/posters/${image_url}`;
      projectElement.addEventListener("mouseenter", () => {
        hoverImage.src = imagePath;
        hoverImage.style.display = "block";
      });
      projectElement.addEventListener("mouseleave", () => {
        hoverImage.style.display = "none";
      });
      projectElement.addEventListener("mousemove", (e) => {
        hoverImage.style.left = `${e.pageX}px`;
        hoverImage.style.top = `${e.pageY}px`;
      });
    }

    projectElement.addEventListener("click", (e) => {
      e.preventDefault();
      openLightbox({ name, link, client, year, image_url });
    });

    projectsList.appendChild(projectElement);
  });
}

// while testing lightbox to auto open

openLightbox({
  name: "Babygirl",
  link: "https://a24films.com/films/babygirl",
  client: "A24",
  year: "12/25/2024",
  image_url: "BabyGirl_DIGI_Teaser_Fin7.jpg",
});

// Function to filter projects based on checkboxes
function filterProjects() {
  const showVFX = filterVFX.checked;
  const showMoGraph = filterMoGraph.checked;

  const filteredProjects = projectsData.filter(({ category }) => {
    const isVFX = category === "VFX";
    const isMoGraph = category === "MoGraph";
    return (showVFX && isVFX) || (showMoGraph && isMoGraph);
  });

  renderProjects(filteredProjects); // Render filtered projects
}

// Ensure at least one filter is checked
filterVFX.addEventListener("change", () => {
  if (!filterVFX.checked && !filterMoGraph.checked) {
    filterVFX.checked = true; // Recheck "VFX" if both are unchecked
  }
  filterProjects();
});

filterMoGraph.addEventListener("change", () => {
  if (!filterMoGraph.checked && !filterVFX.checked) {
    filterMoGraph.checked = true; // Recheck "MoGraph" if both are unchecked
  }
  filterProjects();
});

// Lightbox (Modal) Code
function openLightbox(project) {
  const modal = document.getElementById("lightbox");
  const modalTitle = document.getElementById("lightbox-title");
  const modalClient = document.getElementById("lightbox-client");
  const modalYear = document.getElementById("lightbox-year");
  const modalImage = document.getElementById("lightbox-image");
  const modalBlurb = document.getElementById("lightbox-blurb");
  const closeButton = document.getElementById("lightbox-close");

  modalTitle.textContent = project.name;
  modalClient.style.display = project.client !== "-" ? "block" : "none";
  modalClient.textContent = `${project.client}`;
  modalYear.textContent = `${new Date(project.year).getFullYear()}`;
  modalBlurb.textContent =
    project.blurb ||
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut maximus nec diam nec hendrerit. Proin in pulvinar ipsum, quis ullamcorper erat. Nam erat est, viverra id ligula ac, porta laoreet ligula. Etiam posuere tortor metus, id viverra tellus tristique in. Morbi orci nisl, lobortis ut nulla a, tempor laoreet ligula. Sed maximus, dolor ac faucibus consectetur, sapien mi bibendum nunc, sit amet efficitur velit quam non leo. Nulla efficitur tempus neque, in ullamcorper nunc dignissim quis. Aenean enim diam, rutrum et commodo auctor, tincidunt eget turpis. Fusce efficitur, turpis ac elementum consectetur, odio libero sagittis augue, in fringilla massa odio sed eros.";
  closeButton.addEventListener("click", closeLightbox);
  // Close the lightbox if you click outside the modal content
  modal.addEventListener("click", (e) => {
    // Check if the click is outside the modal content
    if (e.target === modal) {
      closeLightbox();
    }
  });

  if (project.image_url?.trim()) {
    modalImage.src = `images/posters/${project.image_url}`;
    modalImage.style.display = "block";
  } else {
    modalImage.style.display = "none";
  }

  modal.style.display = "flex";
}

function closeLightbox() {
  document.getElementById("lightbox").style.display = "none";
}
