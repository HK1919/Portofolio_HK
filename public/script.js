// Data
const skills = [
  { name: "HTML", level: 90 },
  { name: "CSS", level: 85 },
  { name: "JavaScript", level: 80 },
  { name: "PHP", level: 65 },
  { name: "UI/UX Design", level: 75 },
  { name: "Figma", level: 70 },
];

const categories = ["All", "Web Development", "Mobile Apps", "UI/UX Design"];

const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    category: "Web Development",
    description:
      "A full-stack e-commerce platform built with React and Node.js",
    image:
      "https://images.unsplash.com/photo-1661956602116-aa6865609028?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 2,
    title: "Fitness Tracking App",
    category: "Mobile Apps",
    description: "Mobile application for tracking workouts and nutrition",
    image:
      "https://images.unsplash.com/photo-1674574124649-778f9afc0e9c?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 3,
    title: "Banking Dashboard",
    category: "UI/UX Design",
    description: "Modern banking dashboard design with data visualization",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
  },
];

// Mobile menu functionality
const menuButton = document.getElementById("menuButton");
const mobileMenu = document.getElementById("mobileMenu");
let isMenuOpen = false;

menuButton.addEventListener("click", () => {
  isMenuOpen = !isMenuOpen;
  mobileMenu.classList.toggle("hidden");
  menuButton.innerHTML = isMenuOpen
    ? '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>'
    : '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>';
});

// Scroll to section functionality
function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId);
  element.scrollIntoView({ behavior: "smooth" });
  if (isMenuOpen) {
    mobileMenu.classList.add("hidden");
    isMenuOpen = false;
    menuButton.innerHTML =
      '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>';
  }
}

// Active section highlighting
const sections = ["home", "about", "projects", "contact"];
const navLinks = document.querySelectorAll(".nav-link");
const mobileNavLinks = document.querySelectorAll(".mobile-nav-link");

function updateActiveSection() {
  const currentSection = sections.find((section) => {
    const element = document.getElementById(section);
    const rect = element.getBoundingClientRect();
    return rect.top <= 100 && rect.bottom >= 100;
  });

  if (currentSection) {
    navLinks.forEach((link) => {
      link.classList.toggle("active", link.dataset.section === currentSection);
    });
    mobileNavLinks.forEach((link) => {
      link.classList.toggle("active", link.dataset.section === currentSection);
    });
  }
}

window.addEventListener("scroll", updateActiveSection);

// Skills progress bars
function renderSkills() {
  const skillsContainer = document.getElementById("skills-container");
  skillsContainer.innerHTML = skills
    .map(
      (skill) => `
          <div class="space-y-2">
              <div class="flex justify-between">
                  <span class="text-sm font-medium text-gray-700">${skill.name}</span>
                  <span class="text-sm text-gray-500">${skill.level}%</span>
              </div>
              <div class="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div class="skill-progress h-full bg-blue-600 rounded-full" style="width: 0%"></div>
              </div>
          </div>
      `
    )
    .join("");

  // Animate progress bars when they come into view
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const progressBars = entry.target.querySelectorAll(".skill-progress");
          progressBars.forEach((bar, index) => {
            setTimeout(() => {
              bar.style.width = `${skills[index].level}%`;
            }, index * 100);
          });
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  observer.observe(skillsContainer);
}

// Project filtering
let activeCategory = "All";

function renderCategories() {
  const categoryFilters = document.getElementById("category-filters");
  categoryFilters.innerHTML = categories
    .map(
      (category) => `
          <button
              onclick="filterProjects('${category}')"
              class="category-filter px-4 py-2 rounded-full transition-all transform hover:scale-105 ${
                activeCategory === category
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-600 hover:bg-gray-100"
              }"
          >
              ${category}
          </button>
      `
    )
    .join("");
}

function filterProjects(category) {
  activeCategory = category;
  renderCategories();
  renderProjects();
}

function renderProjects() {
  const projectsGrid = document.getElementById("projects-grid");
  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((project) => project.category === activeCategory);

  projectsGrid.innerHTML = filteredProjects
    .map(
      (project) => `
          <div class="project-card bg-white rounded-lg shadow-md overflow-hidden">
              <img
                  src="${project.image}"
                  alt="${project.title}"
                  class="w-full h-48 object-cover"
              />
              <div class="p-6">
                  <h3 class="text-xl font-semibold mb-2">${project.title}</h3>
                  <p class="text-gray-600 mb-4">${project.description}</p>
                  <span class="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                      ${project.category}
                  </span>
              </div>
          </div>
      `
    )
    .join("");
}

// Initialize everything
document.addEventListener("DOMContentLoaded", () => {
  renderSkills();
  renderCategories();
  renderProjects();
  updateActiveSection();
});
