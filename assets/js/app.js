// ======================================
// DOM Elements
// ======================================

const projectsContainer =
    document.getElementById("projectsContainer");

const searchInput =
    document.getElementById("searchProject");

const filterButtons =
    document.querySelectorAll(".filter-btn");

// ======================================
// State
// ======================================

let currentCategory = "All";

let currentSearch = "";

let filteredProjects = [...projects];

// ======================================
// Create Project Card
// ======================================

function createProjectCard(project) {

    const card = document.createElement("div");

    card.className =
        "bg-white dark:bg-zinc-900 rounded-3xl shadow-lg overflow-hidden hover:-translate-y-2 transition duration-300";

    card.innerHTML = `

        <img
            src="${project.image}"
            alt="${project.title}"
            class="w-full h-56 object-cover">

        <div class="p-6">

            <span class="text-primary text-sm font-semibold">

                ${project.category}

            </span>

            <h3 class="text-2xl font-bold mt-3">

                ${project.title}

            </h3>

            <p class="text-grayText mt-4 leading-7">

                ${project.description}

            </p>

            <div class="flex flex-wrap gap-2 mt-5">

                ${project.technologies
                    .map(
                        tech => `
                        <span class="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">
                            ${tech}
                        </span>`
                    )
                    .join("")}

            </div>

            <div class="flex gap-4 mt-8">

            <a
                   href="${project.github}"
                   target="_blank"
                   rel="noopener noreferrer"
                   class="bg-primary text-white px-5 py-3 rounded-full btn-primary hover:scale-105 transition">
                   
                   GitHub
                
                </a>

                <a
                    href="${project.details}"
                    class="border px-5 py-3 rounded-full btn-primary">

                    Details

                </a>

            </div>

        </div>

    `;

    return card;

}

// ======================================
// Render Projects
// ======================================

function renderProjects(projectList = filteredProjects) {

    if (!projectsContainer) return;

    projectsContainer.innerHTML = "";

    const visible =
        projectList.slice(0, visibleProjects);

    visible.forEach(project => {

        projectsContainer.appendChild(

            createProjectCard(project)

        );

    });

    if (!loadMoreButton) return;

    if (visibleProjects >= projectList.length) {

        loadMoreButton.classList.add("hidden");

    } else {

        loadMoreButton.classList.remove("hidden");

    }

}

// ======================================
// Filter Projects
// ======================================

function filterProjects() {

    filteredProjects = [...projects];

    if (currentCategory !== "All") {

        filteredProjects = filteredProjects.filter(project =>

            project.category === currentCategory

        );

    }

    if (currentSearch.trim() !== "") {

        filteredProjects = filteredProjects.filter(project =>

            project.title
                .toLowerCase()
                .includes(currentSearch.toLowerCase())

            ||

            project.description
                .toLowerCase()
                .includes(currentSearch.toLowerCase())

            ||

            project.category
                .toLowerCase()
                .includes(currentSearch.toLowerCase())

            ||

            project.technologies.some(tech =>

                tech
                    .toLowerCase()
                    .includes(currentSearch.toLowerCase())

            )

        );

    }

    visibleProjects = PROJECTS_PER_PAGE;

    renderProjects(filteredProjects);

}

// ======================================
// Initialize
// ======================================

document.addEventListener("DOMContentLoaded", () => {

    filterProjects();

    // Search

    if (searchInput) {

        searchInput.addEventListener("input", event => {

            currentSearch = event.target.value;

            filterProjects();

        });

    }

    // Category Buttons

    filterButtons.forEach(button => {

        button.addEventListener("click", () => {

            currentCategory = button.dataset.category;

            filterButtons.forEach(btn => {

                btn.classList.remove(
                    "bg-primary",
                    "text-white"
                );

                btn.classList.add("border");

            });

            button.classList.remove("border");

            button.classList.add(
                "bg-primary",
                "text-white"
            );

            filterProjects();

        });

    });

    // Load More

    if (loadMoreButton) {

        loadMoreButton.addEventListener("click", () => {

            visibleProjects += PROJECTS_PER_PAGE;

            renderProjects(filteredProjects);

        });

    }

});