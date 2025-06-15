window.addEventListener("load", () => {
    document.querySelector(".main").classList.remove("hidden");
    document.querySelector(".home-section").classList.add("active");
    // ********** page loader ********** //
    document.querySelector(".page-loader").classList.add("fade-out");
    setTimeout(() => {
        document.querySelector(".page-loader").style.display = "none    ";
    }, 600);
});

// toggle navbar //
const navToggler = document.querySelector(".nav-toggler");
navToggler.addEventListener("click", () => {
    hideSection();
    toggleNavbar();
    document.body.classList.toggle("hide-scrolling");
});
function hideSection() {
    document.querySelector("section.active").classList.toggle("fade-out");
}
function toggleNavbar() {
    document.querySelector(".header").classList.toggle("active");
}

// active section //

document.addEventListener("click", (e) => {
    if (e.target.classList.contains("link-item") && e.target.hash !== "") {
        // const hash = e.target.hash;
        // activate the overlay to prevent multiple clicks
        document.querySelector(".overlay").classList.add("active");
        navToggler.classList.add("hide");
        if (e.target.classList.contains("nav-item")) {
            // console.log(true);
            toggleNavbar();
        } else {
            hideSection();
            document.body.classList.add("hide-scrolling");
        }
        setTimeout(() => {
            document
                .querySelector("section.active")
                .classList.remove("active", "fade-out");
            document.querySelector(e.target.hash).classList.add("active");
            window.scrollTo(0, 0);
            document.body.classList.remove("hide-scrolling");
            navToggler.classList.remove("hide");
            document.querySelector(".overlay").classList.remove("active");
        }, 500);
    }
});

// about tabs //
const tabsContainer = document.querySelector(".about-tabs"),
    aboutSection = document.querySelector(".about-section");
tabsContainer.addEventListener("click", (e) => {
    if (
        e.target.classList.contains("tab-item") &&
        !e.target.classList.contains("active")
    ) {
        tabsContainer.querySelector(".active").classList.remove("active");
        e.target.classList.add("active");
        const target = e.target.getAttribute("data-target");
        console.log(target);
        aboutSection
            .querySelector(".tab-content.active")
            .classList.remove("active");
        aboutSection.querySelector(target).classList.add("active");
    }
});

// portfolio-item-details popup //
document.addEventListener("click", (e) => {
    if (e.target.classList.contains("view-project-btn")) {
        togglePortfolioPopup();
        document.querySelector(".portfolio-popup").scrollTo(0, 0);
        portfolioItemDetails(e.target.parentElement);
    }
});
function togglePortfolioPopup() {
    document.querySelector(".portfolio-popup").classList.toggle("open");
    document.body.classList.toggle("hide-scrolling");
    document.querySelector(".main").classList.toggle("fade-out");
}
document
    .querySelector(".pp-close")
    .addEventListener("click", togglePortfolioPopup);

// hide popup when clicking outside of it
document.addEventListener("click", (e) => {
    if (e.target.classList.contains("pp-inner")) {
        togglePortfolioPopup();
    }
});

function portfolioItemDetails(portfolioItem) {
    document.querySelector(".pp-thumbnail img").src =
        portfolioItem.querySelector(".portfolio-item-thumbnail img").src;

    document.querySelector(".pp-header h3").innerHTML =
        portfolioItem.querySelector(".portfolio-item-title").innerHTML;

    document.querySelector(".pp-body").innerHTML = portfolioItem.querySelector(
        ".portfolio-item-details"
    ).innerHTML;
}
let currentPage = 1;
let lastPage = 1;
let currentFilter = "all";

const container = document.querySelector(".portfolio-section .row:last-of-type");
const buttons = document.querySelectorAll(".portfolio-filter .filter-btn");
const prevBtn = document.querySelector(".pagination-btn.prev");
const nextBtn = document.querySelector(".pagination-btn.next");

async function filterProjects(type = "all", page = 1) {
    currentFilter = type;
    currentPage = page;
    setActiveProjectFilter(type);
    container.innerHTML = `
        <div class="page-loader">
            <div></div>
            <div></div>
            <div></div>
        </div>`;

    try {
        // إضافة معامل dashboard=true للتأكد من استخدام paginate(3) في الكود بالخلفية
        const response = await fetch(`/api/projects?type=${type}&page=${page}&dashboard=true`);
        const data = await response.json();

        if (!data || !data.data || !data.data.length) {
            container.innerHTML = `
                <div style="
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    text-align: center;
                    color: var(--main-color);
                    font-size: 18px;
                    padding: 10px;
                    height: 100%;
                    min-height: 100px;
                    width: 100%;
                ">
                    No projects found.
                </div>`;
            updatePaginationButtons();
            return;
        }

        lastPage = data.last_page;

        const html = data.data
            .map((project) => `
                <div class="portfolio-item">
                    <div class="portfolio-item-thumbnail">
                        <img src="${project.image || "/img/default.png"}" alt="">
                    </div>
                    <h3 class="portfolio-item-title">${project.title}</h3>
                    <button type="button" class="btn view-project-btn">view project</button>
                    <div class="portfolio-item-details">
                        <div class="description">
                            <p>${project.details}</p>
                        </div>
                        <div class="general-info">
                            <ul>
                                <li>Created - <span>${formatDate(project.created_at)}</span></li>
                                <li>technologies used - <span>${project.technologiesused}</span></li>
                                <li>Role - <span>${project.Role}</span></li>
                                <li>View Online - <span><a href="${project.ViewOnline}" target="_blank">${project.ViewOnline}</a></span></li>
                            </ul>
                        </div>
                    </div>
                </div>
            `)
            .join("");

        container.innerHTML = html;
        updatePaginationButtons();
    } catch (error) {
        console.error(error);
        container.innerHTML = "<p>Error loading projects.</p>";
    }
}

function setActiveProjectFilter(type) {
    buttons.forEach((btn) => {
        btn.classList.toggle("active", btn.dataset.filter === type);
    });
}

function formatDate(dateStr) {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
}

function updatePaginationButtons() {
    if (prevBtn) prevBtn.disabled = currentPage <= 1;
    if (nextBtn) nextBtn.disabled = currentPage >= lastPage;
}

// ربط أزرار الفلترة
buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
        filterProjects(btn.dataset.filter, 1);
    });
});

// ربط أزرار التالي والسابق
if (prevBtn) {
    prevBtn.addEventListener("click", () => {
        if (currentPage > 1) filterProjects(currentFilter, currentPage - 1);
    });
}
if (nextBtn) {
    nextBtn.addEventListener("click", () => {
        if (currentPage < lastPage)
            filterProjects(currentFilter, currentPage + 1);
    });
}

// تحميل أولي عند تحميل الصفحة
document.addEventListener("DOMContentLoaded", () => {
    filterProjects("all", 1);
});

document.addEventListener("DOMContentLoaded", () => {
    const skillsPerPage = 8;
    let currentSkillPage = 1;

    const skillItems = Array.from(document.querySelectorAll(".skill-item"));
    const skillPrevBtn = document.querySelector(".skills-pagination-btn.prev");
    const skillNextBtn = document.querySelector(".skills-pagination-btn.next");

    const totalSkillPages = Math.ceil(skillItems.length / skillsPerPage);

    function updateSkillsPagination() {
        skillItems.forEach((item, index) => {
            item.style.display = (index >= (currentSkillPage - 1) * skillsPerPage &&
                                  index < currentSkillPage * skillsPerPage)
                                ? "flex"
                                : "none";
        });

        skillPrevBtn.disabled = currentSkillPage === 1;
        skillNextBtn.disabled = currentSkillPage === totalSkillPages;
    }

    skillPrevBtn.addEventListener("click", () => {
        if (currentSkillPage > 1) {
            currentSkillPage--;
            updateSkillsPagination();
        }
    });

    skillNextBtn.addEventListener("click", () => {
        if (currentSkillPage < totalSkillPages) {
            currentSkillPage++;
            updateSkillsPagination();
        }
    });

    updateSkillsPagination();
});