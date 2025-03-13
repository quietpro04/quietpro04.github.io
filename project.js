projectsData = [
  {
    name: "Babygirl",
    client: "A24",
    year: "12/25/2024",
    image_url: "BabyGirl_DIGI_Teaser_Fin7.jpg",
    link: "https://a24films.com/films/babygirl",
    category: "VFX",
    blurb:
      "Working at Phosphene, I completed a number of invisible VFX shots for Babygirl. Reflection paint outs, beauty work, set augmentation, grip equipment removal, etc.",
  },
  {
    name: "Daredevil Born Again",
    client: "Marvel",
    year: "3/4/2025",
    image_url: "Daredevil.jpg",
    link: "",
    category: "VFX",
    blurb:
      "Working at Phosphene, I worked on and shadowed a number of small composting tasks for the project. Screen replacements, paintout, CG comps, and invisible VFX.",
  },
  {
    name: "Diarra From Detroit",
    client: "BET+",
    year: "3/21/2024",
    image_url: "DiarraFromDetroit_Poster.jpg",
    link: "",
    category: "VFX",
    blurb:
      "Working at Atlantic Pictures, I completed miscelanous VFX tasks screen comps, enviornment augmentation, and UI elements.",
  },
  {
    name: "Reminants of Nova",
    client: "-",
    year: "10/12/2024",
    image_url: "Reminants.jpg",
    link: "",
    category: "VFX",
    blurb:
      "Using NASA footage of the sun's surface as plates, I composited them in a way to match the established cinematic launguage of the film, and to make it appear as though it was shot on the same camera and lenses. Also created a few shots of a nebula though a telescope, all in comp in Nuke.",
  },
  {
    name: "The Mix",
    client: "Mad Max FX",
    year: "1/1/2025",
    image_url: "TheMix.jpg",
    link: "",
    category: "VFX",
    blurb: "Tracked and comped a logo onto a jar for a few shots.",
  },
  {
    name: "A Seat at the Table",
    client: "-",
    year: "1/1/2024",
    image_url: "",
    link: "",
    category: "VFX",
    blurb:
      "Mostly set augmenation (wallpaper seam removal) and other small paintout work.",
  },
  {
    name: "Anamorphia II",
    client: "MAKE ART NOW",
    year: "6/12/2021",
    image_url: "",
    link: "",
    category: "VFX",
    blurb:
      "Completed 70+ VFX shots in the span of two weeks, and managed a team of 15 remote VFX artists, establishing a simple pipeline to keep things organized. Created custom UI elements for O.T.I.S.",
  },
  {
    name: "Bankrupt Opener",
    client: "Bright Sun Films",
    year: "8/10/2022",
    image_url: "",
    link: "",
    category: "MoGraph",
    blurb:
      "Created in After Effects, this opening title sequence aimed at increasing the production quality of Jake William's Bankrupt series. It used the audio and soundtrack that accompianed the previous piece as a starting point, and has eight distinct segments.",
  },
  {
    name: "Under the Lights",
    client: "Miles Levin",
    year: "",
    image_url: "",
    link: "",
    category: "VFX",
    blurb:
      "Created a CG brain shot using geometry generated in Houdini, rendered in Blender, and comped in Nuke.",
  },
  {
    name: "Bridgewater 30th",
    client: "Bridgewater Advisors",
    year: "7/13/2023",
    image_url: "",
    link: "",
    category: "MoGraph",
    blurb:
      "Animated Bridgewater Advisors' logo into a 30th anniversay medalion to be used in a colection of client facing videos.",
  },
  {
    name: "Backlot Animations",
    client: "Atlantic Pictures",
    year: "7/13/2024",
    image_url: "",
    link: "",
    category: "MoGraph",
    blurb:
      "Determined a motion graphic style for Backlot, a compnay focused on connecting real estate developers with film sets.",
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
  projects.forEach(({ name, link, client, year, image_url, blurb }) => {
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
      openLightbox({ name, link, client, year, image_url, blurb });
    });

    projectsList.appendChild(projectElement);
    highlightCenterProject();
  });
}

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
  modalClient.textContent = project.client ? `${project.client} •\xa0` : "";
  modalYear.textContent = `${new Date(project.year).getFullYear()}`;
  modalBlurb.textContent = project.blurb;
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

// for scrolling
function scrollToSection(id) {
  var section = document.getElementById(id);
  section.scrollIntoView({ behavior: "smooth" });
}

// function highlightCenterProject() {
//   if (window.innerWidth > 790) return;

//   const projects = document.querySelectorAll(".project");
//   const projectsContainer = document.querySelector(".projects-container");
//   let middleProject = null;
//   let minDistance = Infinity;

//   projects.forEach((project) => {
//     const rect = project.getBoundingClientRect();
//     const centerDistance = Math.abs(
//       rect.top + rect.height / 2 - window.innerHeight / 2
//     );

//     if (centerDistance < minDistance) {
//       minDistance = centerDistance;
//       middleProject = project;
//     }
//   });

//   // Reset all projects' font-weight
//   projects.forEach((project) => (project.style.fontWeight = "normal"));

//   // Apply bold font and background image for the centered project
//   if (middleProject) {
//     middleProject.style.fontWeight = "bold";

//     const projectIndex = Array.from(projects).indexOf(middleProject);
//     const projectsData = window.projectsData || []; // Store project data globally
//     const selectedProject = projectsData[projectIndex];

//     if (selectedProject && selectedProject.image_url) {
//       // const imagePath = `images/posters/${selectedProject.image_url}`;
//       const imagePath = `images/posters/BabyGirl_DIGI_Teaser_Fin7.jpg`;
//       projectsContainer.style.backgroundImage = `url(${imagePath})`;
//       projectsContainer.style.backgroundSize = "cover";
//       projectsContainer.style.backgroundPosition = "center";
//       projectsContainer.style.backgroundRepeat = "no-repeat";
//     }
//   } else {
//     // Reset background if no project is centered
//     projectsContainer.style.backgroundImage = "none";
//   }
// }

function highlightCenterProject() {
  // Check if the viewport width is less than or equal to a mobile screen width (e.g., 768px)
  if (window.innerWidth > 790) return;

  const projects = document.querySelectorAll(".project");
  const projectsContainer = document.querySelector(".projects-container");
  let middleProject = null;
  let minDistance = Infinity;

  projects.forEach((project) => {
    const rect = project.getBoundingClientRect();
    const centerDistance = Math.abs(
      rect.top + rect.height / 2 - window.innerHeight / 2
    );

    if (centerDistance < minDistance) {
      minDistance = centerDistance;
      middleProject = project;
    }
  });

  // Reset all projects' font-weight
  projects.forEach((project) => {
    project.style.fontWeight = "normal";
    project.style.color = "";
  });

  // Apply bold font and display the centered project's image
  if (middleProject) {
    middleProject.style.fontWeight = "bold";

    const projectIndex = Array.from(projects).indexOf(middleProject);
    const projectsData = window.projectsData || []; // Store project data globally
    const selectedProject = projectsData[projectIndex];

    // Check if there is an image to display
    if (selectedProject && selectedProject.image_url) {
      middleProject.style.color = "white";
      // Remove existing image if present
      const existingImage = projectsContainer.querySelector("img");
      if (existingImage) {
        existingImage.remove();
      }

      // Apply the background image to the projects container
      projectsContainer.style.backgroundImage = `url(images/posters/${selectedProject.image_url})`;
      projectsContainer.style.backgroundSize = "contain"; // Ensure the image fits within the container without distortion
      projectsContainer.style.backgroundPosition = "center";
      projectsContainer.style.backgroundRepeat = "no-repeat";
    } else {
      // Reset background if no project is centered
      projectsContainer.style.backgroundImage = "none";
    }
  } else {
    // Reset background if no project is centered
    projectsContainer.style.backgroundImage = "none";
  }
}

// Run the function on scroll
window.addEventListener("scroll", highlightCenterProject);

// Run once on page load
document.addEventListener("DOMContentLoaded", highlightCenterProject);
