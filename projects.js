const SHEETDB_API = "https://sheetdb.io/api/v1/0as1n39t5hczo";
const projectsList = document.getElementById("projectsList");
const hoverImage = document.getElementById("hoverImage");

// Filter checkboxes
const filterVFX = document.getElementById("filter-vfx");
const filterMoGraph = document.getElementById("filter-mograph");

let projectsData = []; // Store the fetched projects

async function fetchProjects() {
    try {
        const response = await fetch(SHEETDB_API);
        projectsData = await response.json(); // Store the data globally
        renderProjects(projectsData); // Render all projects initially
    } catch (error) {
        console.error("Error fetching projects:", error);
    }
}

function renderProjects(projects) {
    projectsList.innerHTML = ""; // Clear existing content

    projects.forEach(project => {
        const projectElement = document.createElement("a");
        projectElement.href = project.link;
        projectElement.classList.add("project");
        projectElement.innerHTML = `
            ${project.name} (<span>${project.client}</span>)<sup>${new Date(project.year).getFullYear()}</sup>
`;

projectElement.innerHTML = `
    ${project.name} 
    ${project.client !== "-" ? `(<span>${project.client}</span>)` : ""} 
    <sup>${new Date(project.year).getFullYear()}</sup>
`;


projectElement.addEventListener("mouseenter", () => {
    if (project.image_url && project.image_url.trim() !== "") {
        const imagePath = `images/posters/${project.image_url}`;  // Prepend path to the image name
        hoverImage.src = imagePath;
        hoverImage.style.display = "block";
    }
});


        projectElement.addEventListener("mouseleave", () => {
            hoverImage.style.display = "none";
        });

        projectElement.addEventListener("mousemove", (e) => {
            hoverImage.style.left = `${e.clientX }px`;
            hoverImage.style.top = `${e.clientY + 400}px`;
        });

        projectElement.addEventListener("click", (e) => {
            e.preventDefault(); // Prevent anchor navigation
            openLightbox(project);
        });
    

        projectsList.appendChild(projectElement);
    });
}


//Filter System

function filterProjects() {
    const showVFX = filterVFX.checked;
    const showMoGraph = filterMoGraph.checked;

    const filteredProjects = projectsData.filter(project => {
        const isVFX = project.category === "VFX"; // Assuming your API has a "category" field
        const isMoGraph = project.category === "MoGraph"; // Assuming your API has a "category" field

        if (showVFX && isVFX) return true; // Show VFX projects
        if (showMoGraph && isMoGraph) return true; // Show MoGraph projects
        return false; // Hide the project if it doesn't match any filter
    });

    renderProjects(filteredProjects); // Render the filtered projects
}

// Handle "VFX" and "MoGraph" checkbox clicks
filterVFX.addEventListener("change", () => {
    // If the other checkbox is unchecked, ensure the current checkbox is rechecked
    if (!filterVFX.checked && !filterMoGraph.checked) {
        filterVFX.checked = true; // Recheck "VFX" if both are unchecked
    }
    filterProjects(); // Update the displayed projects
});

filterMoGraph.addEventListener("change", () => {
    // If the other checkbox is unchecked, ensure the current checkbox is rechecked
    if (!filterMoGraph.checked && !filterVFX.checked) {
        filterMoGraph.checked = true; // Recheck "MoGraph" if both are unchecked
    }
    filterProjects(); // Update the displayed projects
});

// Fetch projects on page load
fetchProjects();


// --- Modal (Lightbox) Code Start ---

// Function to open the lightbox with project details
function openLightbox(project) {
    const modal = document.getElementById("lightbox");
    const modalTitle = document.getElementById("lightbox-title");
    const modalClient = document.getElementById("lightbox-client");
    const modalYear = document.getElementById("lightbox-year");
    const modalImage = document.getElementById("lightbox-image");
    const modalBlurb = document.getElementById("lightbox-blurb");

    modalTitle.textContent = project.name;

    if (project.client !== "-") {
        modalClient.textContent = `Client: ${project.client}`;
        modalClient.style.display = "block";
    } else {
        modalClient.style.display = "none";
    }

    modalYear.textContent = `Year: ${new Date(project.year).getFullYear()}`;
    modalBlurb.textContent = project.blurb || "";

    // Only set an image if provided
    if (project.image_url && project.image_url.trim() !== "") {
        modalImage.src = `images/posters/${project.image_url}`;
        modalImage.style.display = "block";
    } else {
        modalImage.style.display = "none";
    }

    // Show the modal (using flex here; adjust as needed in your CSS)
    modal.style.display = "flex";
}

// Close the lightbox when the close button is clicked
document.getElementById("lightbox-close").addEventListener("click", () => {
    console.log("clicked");
    closeLightbox();
});

// Close the lightbox when clicking outside the modal content
document.getElementById("lightbox").addEventListener("click", (e) => {
    if (e.target === document.getElementById("lightbox")) {
        closeLightbox();
    }
});

// Function to close the lightbox
function closeLightbox() {
    const modal = document.getElementById("lightbox");
    modal.style.display = "none";
}

// --- Modal (Lightbox) Code End ---
