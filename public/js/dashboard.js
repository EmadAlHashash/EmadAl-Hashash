document.addEventListener("DOMContentLoaded", () => {
    // DOM Elements
    const personalDataTab = document.getElementById("personalDataTab"),
        projectsTab = document.getElementById("projectsTab"),
        personalDataSection = document.getElementById("personalData"),
        projectsSection = document.getElementById("projects"),
        formModal = document.getElementById("formModal"),
        deleteModal = document.getElementById("deleteModal"),
        formTitle = document.getElementById("formTitle"),
        dataForm = document.getElementById("dataForm"),
        formFieldsContainer = document.getElementById("formFields"),
        saveBtn = document.getElementById("saveBtn"),
        cancelBtn = document.getElementById("cancelBtn"),
        confirmDeleteBtn = document.getElementById("confirmDeleteBtn"),
        cancelDeleteBtn = document.getElementById("cancelDeleteBtn"),
        addPersonalInfoBtn = document.getElementById("addPersonalInfoBtn"),
        addEducationBtn = document.getElementById("addEducationBtn"),
        addExperienceBtn = document.getElementById("addExperienceBtn"),
        addSkillInnerBtn = document.getElementById("addSkillInnerBtn"),
        allBtn = document.getElementById("all"),
        webBtn = document.getElementById("webBtn"),
        qaBtn = document.getElementById("qaBtn"),
        projectContainer = document.getElementById("projectContainer"),
        addProjectBtn = document.getElementById("addProjectBtn"),
        innerTabs = document.querySelectorAll(".inner-tab"),
        innerContentTabs = document.querySelectorAll(".inner-content-tab");

    // Data
    let personalInfoData = [],
        educationData = [],
        experienceData = [],
        skillsInnerData = [],
        projectsData = [],
        filteredProjectsData = [],
        currentInnerTab = "personalInfo",
        currentAction = null,
        currentEditId = null,
        currentDeleteTab = null,
        currentDeleteId = null;

    // Pagination
    let currentProjectPage = 1,
        projectsPerPage = 3;
    let currentEducationPage = 1,
        educationPerPage = 5;
    let currentExperiencePage = 1,
        experiencePerPage = 5;
    let currentSkillsPage = 1,
        skillsPerPage = 5;

    // Loader
    function showLoader() {
        const loader = document.getElementById("pageLoader");
        const container = document.querySelector(".container");
        if (loader) {
            loader.classList.remove("fade-out");
            loader.style.display = "flex";
        }
        if (container) container.classList.add("loading");
    }
    function hideLoader() {
        const loader = document.getElementById("pageLoader");
        const container = document.querySelector(".container");
        if (loader) {
            loader.classList.add("fade-out");
            setTimeout(() => {
                loader.style.display = "none";
            }, 400);
        }
        if (container) container.classList.remove("loading");
    }

    // Main Tabs
    function switchMainTab(
        activeTab,
        inactiveTab,
        activeSection,
        inactiveSection
    ) {
        activeTab.classList.add("active");
        inactiveTab.classList.remove("active");
        activeSection.classList.add("active");
        inactiveSection.classList.remove("active");
        formModal.classList.add("hidden");
    }
    if (
        personalDataTab &&
        projectsTab &&
        personalDataSection &&
        projectsSection
    ) {
        personalDataTab.onclick = () =>
            switchMainTab(
                personalDataTab,
                projectsTab,
                personalDataSection,
                projectsSection
            );
        projectsTab.onclick = () =>
            switchMainTab(
                projectsTab,
                personalDataTab,
                projectsSection,
                personalDataSection
            );
    }

    // Inner Tabs
    innerTabs.forEach((tab) => {
        tab.addEventListener("click", () => {
            innerTabs.forEach((t) => t.classList.remove("active"));
            innerContentTabs.forEach((c) => c.classList.remove("active"));
            tab.classList.add("active");
            const tabId = tab.getAttribute("data-tab");
            if (tabId) {
                const contentTab = document.getElementById(tabId);
                if (contentTab) contentTab.classList.add("active");
            }
            formModal.classList.add("hidden");
        });
    });

    // CSRF
    function getCSRF() {
        const tag = document.querySelector('meta[name="csrf-token"]');
        return tag ? tag.getAttribute("content") : "";
    }

    // Add Buttons
    if (addPersonalInfoBtn) {
        addPersonalInfoBtn.onclick = () => {
            if (
                !Array.isArray(personalInfoData) ||
                personalInfoData.length === 0
            ) {
                openForm("add", "personalInfo");
            } else {
                openForm("edit", "personalInfo", personalInfoData[0].id);
            }
        };
    }
    if (addEducationBtn)
        addEducationBtn.onclick = () => openForm("add", "educationTab");
    if (addExperienceBtn)
        addExperienceBtn.onclick = () => openForm("add", "experienceTab");
    if (addSkillInnerBtn)
        addSkillInnerBtn.onclick = () => openForm("add", "skillsTabInner");
    if (addProjectBtn)
        addProjectBtn.onclick = () => openProjectModal(null, "add");

    // Fetch Data
    async function fetchPersonalInfo() {
        showLoader();
        try {
            const response = await fetch("/api/personal-info");
            const data = await response.json();
            personalInfoData = Array.isArray(data)
                ? data
                : Array.isArray(data.data)
                ? data.data
                : typeof data === "object" && data !== null
                ? [data]
                : [];
            updatePersonalInfoCard();
        } catch {
            personalInfoData = [];
            updatePersonalInfoCard();
        }
        hideLoader();
    }
    async function fetchEducation() {
        showLoader();
        try {
            const response = await fetch("/api/education");
            const data = await response.json();
            educationData = Array.isArray(data)
                ? data
                : Array.isArray(data.data)
                ? data.data
                : typeof data === "object" && data !== null
                ? [data]
                : [];
            currentEducationPage = 1;
            renderEducationTable();
        } catch {
            educationData = [];
            renderEducationTable();
        }
        hideLoader();
    }
    async function fetchExperience() {
        showLoader();
        try {
            const response = await fetch("/api/experience");
            const data = await response.json();
            experienceData = Array.isArray(data) ? data : data.data || [];
            currentExperiencePage = 1;
            renderExperienceTable();
        } catch {
            experienceData = [];
            renderExperienceTable();
        }
        hideLoader();
    }
    async function fetchSkills() {
        showLoader();
        try {
            const response = await fetch("/api/skills");
            const data = await response.json();
            skillsInnerData = Array.isArray(data) ? data : data.data || [];
            currentSkillsPage = 1;
            renderSkillsInnerTable();
        } catch {
            skillsInnerData = [];
            renderSkillsInnerTable();
        }
        hideLoader();
    }
    async function fetchProjects() {
        showLoader();
        try {
            const response = await fetch("/api/projects");
            const data = await response.json();
            projectsData = Array.isArray(data) ? data : data.data || [];
            filteredProjectsData = projectsData;
            currentProjectPage = 1;
            renderProjects(filteredProjectsData);
            setActiveProjectFilter("all");
        } catch {
            projectsData = [];
            filteredProjectsData = [];
            renderProjects([]);
        }
        hideLoader();
    }

    // Status Modal
    function showStatusModal(message, type = "success") {
        let statusModal = document.getElementById("statusModal");
        if (!statusModal) {
            statusModal = document.createElement("div");
            statusModal.id = "statusModal";
            statusModal.style.position = "fixed";
            statusModal.style.top = "50%";
            statusModal.style.left = "50%";
            statusModal.style.transform = "translate(-50%, -50%)";
            statusModal.style.zIndex = "9999";
            statusModal.style.minWidth = "280px";
            statusModal.style.maxWidth = "90vw";
            statusModal.style.padding = "32px 28px";
            statusModal.style.borderRadius = "14px";
            statusModal.style.fontSize = "20px";
            statusModal.style.fontWeight = "bold";
            statusModal.style.textAlign = "center";
            statusModal.style.color = "#fff";
            statusModal.style.boxShadow = "0 4px 32px #0004";
            statusModal.style.transition = "opacity 0.3s";
            statusModal.style.opacity = "0";
            statusModal.style.display = "none";
            document.body.appendChild(statusModal);
        }
        statusModal.style.background =
            type === "success" ? "#2ecc71" : "#e74c3c";
        statusModal.textContent = message;
        statusModal.style.opacity = "1";
        statusModal.style.display = "block";
        setTimeout(() => {
            statusModal.style.opacity = "0";
            setTimeout(() => {
                statusModal.style.display = "none";
            }, 400);
        }, 1400);
    }

    // Update Personal Info Card
    function updatePersonalInfoCard() {
        const container = document.getElementById("personalInfoCard");
        if (!container) return;
        // تحقق أن personalInfoData مصفوفة وبها عنصر واحد على الأقل وله قيمة
        if (
            !Array.isArray(personalInfoData) ||
            personalInfoData.length === 0 ||
            !personalInfoData[0] ||
            Object.keys(personalInfoData[0]).length === 0
        ) {
            container.innerHTML = `
      <div style="text-align: center; color: #f66; font-size: 18px; padding: 30px;">No data</div>
      <div style="text-align: center; margin-top: 15px;">
        <button id="addPersonalInfoBtn" class="save">Add your data</button>
      </div>
    `;
            const btn = container.querySelector("#addPersonalInfoBtn");
            if (btn) btn.onclick = () => openForm("add", "personalInfo");
            return;
        }
        const info = personalInfoData[0] || {};
        container.innerHTML = `<div class="container"><div class="row"><div class="home-text">
    <h1>${info.fullName ? info.fullName : "الاسم غير متوفر"}</h1>
    <h2>${info.jobTitles ? info.jobTitles : "المسمى غير متوفر"}</h2>
    <p>${info.bio ? info.bio : ""}</p>
    </div>
    <div class="home-img"><div class="img-box">
    <img src="${
        info.image ? info.image : ""
    }" loading="lazy" alt="profile-img" style="display:${
            info.image ? "block" : "none"
        };" />
    </div></div></div></div>
    <div style="text-align: center; margin-top: 15px;">
      <button id="addPersonalInfoBtn" class="save">Edit</button>
    </div>`;
        const btn = container.querySelector("#addPersonalInfoBtn");
        if (btn) btn.onclick = () => openForm("edit", "personalInfo", info.id);
    }

    // Image Preview
    function setupImagePreview(fileInputId, previewImageId, iconId = null) {
        const fileInput = document.getElementById(fileInputId),
            previewImage = document.getElementById(previewImageId),
            icon = iconId ? document.getElementById(iconId) : null;
        if (!fileInput || !previewImage) return;
        fileInput.addEventListener("change", (e) => {
            const file = e.target.files[0];
            if (file) {
                const url = URL.createObjectURL(file);
                previewImage.src = url;
                previewImage.style.display = "block";
                if (icon) icon.style.display = "none";
                previewImage.onload = () => URL.revokeObjectURL(url);
            }
        });
    }

    // Pagination
    function renderPagination(
        container,
        total,
        perPage,
        currentPage,
        goToPageFn
    ) {
        if (!container) return;
        const totalPages = Math.ceil(total / perPage);
        if (totalPages <= 1) {
            container.innerHTML = "";
            return;
        }
        let html = "";
        html += `<button ${
            currentPage === 1 ? "disabled" : ""
        } onclick="window._goToPage_${container.id}(${
            currentPage - 1
        })">&lt; Prev</button>`;
        html += `<button ${
            currentPage === totalPages ? "disabled" : ""
        } onclick="window._goToPage_${container.id}(${
            currentPage + 1
        })">Next &gt;</button>`;
        container.innerHTML = html;
        window[`_goToPage_${container.id}`] = goToPageFn;
    }

    // Projects with Filtering and Pagination
    function renderProjects(data) {
        const pagination = document.getElementById("projectsPagination");
        projectContainer.innerHTML = "";
        if (!data || data.length === 0) {
            projectContainer.innerHTML = `
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
      There are no projects yet.
    </div>
      
      `;
            if (pagination) pagination.innerHTML = "";
            return;
        }
        const start = (currentProjectPage - 1) * projectsPerPage;
        const end = start + projectsPerPage;
        const pageData = data.slice(start, end);

        const fragment = document.createDocumentFragment();
        for (let i = 0; i < pageData.length; i++) {
            const project = pageData[i];
            const imgSrc = project.image || "default-project.png",
                title = project.title || "No Title",
                card = document.createElement("div");
            card.classList.add("card");
            card.setAttribute("data-type", project.type);
            card.dataset.id = project.id;
            card.innerHTML = `<div class="card-image">
        <img src="${imgSrc}" loading="lazy" alt="${title}" style="background:#f8f8f8;min-height:120px;max-height:180px;object-fit:cover;width:100%;" />
      </div>
      <div class="card-body">
        <h2>${title}</h2>
        <p>${project.details || ""}</p>
      </div>`;
            card.addEventListener("click", () =>
                openProjectModal(project, "edit")
            );
            fragment.appendChild(card);
        }
        projectContainer.appendChild(fragment);

        renderPagination(
            pagination,
            data.length,
            projectsPerPage,
            currentProjectPage,
            goToProjectPage
        );
    }
    function goToProjectPage(page) {
        currentProjectPage = page;
        renderProjects(filteredProjectsData);
    }

    // Filtering for Projects
    function filterProjects(type) {
        if (type === "all") {
            filteredProjectsData = projectsData;
        } else {
            filteredProjectsData = projectsData.filter((p) => p.type === type);
        }
        currentProjectPage = 1;
        renderProjects(filteredProjectsData);
        setActiveProjectFilter(type);
    }
    function setActiveProjectFilter(type) {
        if (allBtn) allBtn.classList.toggle("active", type === "all");
        if (webBtn) webBtn.classList.toggle("active", type === "web");
        if (qaBtn) qaBtn.classList.toggle("active", type === "qa");
    }
    if (allBtn) allBtn.onclick = () => filterProjects("all");
    if (webBtn) webBtn.onclick = () => filterProjects("web");
    if (qaBtn) qaBtn.onclick = () => filterProjects("qa");

    // Education Table
    function renderEducationTable() {
        const tbody = document.querySelector("#educationTable tbody");
        const pagination = document.getElementById("educationPagination");
        tbody.innerHTML = "";
        const start = (currentEducationPage - 1) * educationPerPage;
        const end = start + educationPerPage;
        const pageData = educationData.slice(start, end);

        const fragment = document.createDocumentFragment();
        for (let i = 0; i < pageData.length; i++) {
            const item = pageData[i];
            const tr = document.createElement("tr");
            tr.innerHTML = `<td>${item.degree}</td>
      <td>${item.university}</td>
      <td>${item.thedetails}</td>
      <td>${item.graduationYear}</td>
      <td class="action"><button class="edit" onclick="editItem('educationTab',${item.id})">تعديل</button>
      <button class="delete" onclick="confirmDelete('educationTab',${item.id})">حذف</button></td>`;
            fragment.appendChild(tr);
        }
        tbody.appendChild(fragment);

        renderPagination(
            pagination,
            educationData.length,
            educationPerPage,
            currentEducationPage,
            goToEducationPage
        );
    }
    function goToEducationPage(page) {
        currentEducationPage = page;
        renderEducationTable();
    }

    // Experience Table
    function renderExperienceTable() {
        const tbody = document.querySelector("#experienceTable tbody");
        const pagination = document.getElementById("experiencePagination");
        tbody.innerHTML = "";
        const start = (currentExperiencePage - 1) * experiencePerPage;
        const end = start + experiencePerPage;
        const pageData = experienceData.slice(start, end);

        const fragment = document.createDocumentFragment();
        for (let i = 0; i < pageData.length; i++) {
            const item = pageData[i];
            const tr = document.createElement("tr");
            tr.innerHTML = `<td>${item.jobTitle}</td>
      <td>${item.company}</td>
      <td>${item.Details}</td>
      <td>${item.years}</td>
      <td class="action"><button class="edit" onclick="editItem('experienceTab',${item.id})">تعديل</button>
      <button class="delete" onclick="confirmDelete('experienceTab',${item.id})">حذف</button></td>`;
            fragment.appendChild(tr);
        }
        tbody.appendChild(fragment);

        renderPagination(
            pagination,
            experienceData.length,
            experiencePerPage,
            currentExperiencePage,
            goToExperiencePage
        );
    }
    function goToExperiencePage(page) {
        currentExperiencePage = page;
        renderExperienceTable();
    }

    // Skills Table
    function renderSkillsInnerTable() {
        const tbody = document.querySelector("#skillsInnerTable tbody");
        const pagination = document.getElementById("skillsPagination");
        tbody.innerHTML = "";
        const start = (currentSkillsPage - 1) * skillsPerPage;
        const end = start + skillsPerPage;
        const pageData = skillsInnerData.slice(start, end);

        const fragment = document.createDocumentFragment();
        for (let i = 0; i < pageData.length; i++) {
            const item = pageData[i];
            const tr = document.createElement("tr");
            tr.innerHTML = `<td>${item.skillName}</td>
      <td>${item.level}</td>
      <td class="action"><button class="edit" onclick="editItem('skillsTabInner',${item.id})">تعديل</button>
      <button class="delete" onclick="confirmDelete('skillsTabInner',${item.id})">حذف</button></td>`;
            fragment.appendChild(tr);
        }
        tbody.appendChild(fragment);

        renderPagination(
            pagination,
            skillsInnerData.length,
            skillsPerPage,
            currentSkillsPage,
            goToSkillsPage
        );
    }
    function goToSkillsPage(page) {
        currentSkillsPage = page;
        renderSkillsInnerTable();
    }

    // Open Forms
    function openForm(action, tab, id = null) {
        currentAction = action;
        currentInnerTab = tab;
        currentEditId = id;
        formFieldsContainer.innerHTML = "";
        if (tab === "personalInfo") {
            formTitle.textContent =
                action === "add"
                    ? "Add Personal Information"
                    : "Edit Personal Information";
            formFieldsContainer.innerHTML = `<div id="imageBox" class="image-upload-box">
        <span id="uploadIcon">➕</span>
        <img id="previewImages" />
      </div>
      <input type="file" id="imageFiles" accept="image/*" style="display: none;" />
      <label>Full Name: </label>
      <input type="text" id="fullNameInput" required />
      <label>Job Titles Name:
        <input type="text" id="jobTitles" required />
      </label>
      <label>Brief:
        <textarea id="bioInput" required></textarea>
      </label>`;
            const previewImage = document.getElementById("previewImages");
            if (action === "edit" && id !== null) {
                const data = personalInfoData.find((item) => item.id === id);
                if (data) {
                    previewImage.src = data.image || "";
                    previewImage.style.display = data.image ? "block" : "none";
                    document.getElementById("fullNameInput").value =
                        data.fullName;
                    document.getElementById("jobTitles").value = data.jobTitles;
                    document.getElementById("bioInput").value = data.bio;
                }
            }
            document.getElementById("imageBox").onclick = () =>
                document.getElementById("imageFiles").click();
            setupImagePreview("imageFiles", "previewImages", "uploadIcon");
        }
        if (tab === "educationTab") {
            formTitle.textContent =
                action === "add" ? "Add Study" : "Edit Study";
            formFieldsContainer.innerHTML = `<label>Major:
        <input type="text" id="degreeInput" required />
      </label>
      <label>Name of university or academy:
        <input type="text" id="universityInput" required />
      </label>
      <label>Details:
        <textarea id="theDetailsInput" required></textarea>
      </label>
      <label>Graduation Year:
        <input type="text" id="graduationYearInput" required />
      </label>`;
            if (action === "edit" && id !== null) {
                const data = educationData.find((item) => item.id === id);
                if (data) {
                    document.getElementById("degreeInput").value = data.degree;
                    document.getElementById("universityInput").value =
                        data.university;
                    document.getElementById("theDetailsInput").value =
                        data.thedetails;
                    document.getElementById("graduationYearInput").value =
                        data.graduationYear;
                }
            }
        }
        if (tab === "experienceTab") {
            formTitle.textContent =
                action === "add" ? "Add Experience" : "Edit Experience";
            formFieldsContainer.innerHTML = `<label>Job Title:
        <input type="text" id="jobTitleInput" required />
      </label>
      <label>Company Name:
        <input type="text" id="companyInput" required />
      </label>
      <label>Details:
      <textarea id="DetailsInput" required></textarea>
      </label>
      <label>Number of Years:
        <input type="text" id="yearsInput" min="0" required />
      </label>`;
            if (action === "edit" && id !== null) {
                const data = experienceData.find((item) => item.id === id);
                if (data) {
                    document.getElementById("jobTitleInput").value =
                        data.jobTitle;
                    document.getElementById("companyInput").value =
                        data.company;
                    document.getElementById("DetailsInput").value =
                        data.Details;
                    document.getElementById("yearsInput").value = data.years;
                }
            }
        }
        if (tab === "skillsTabInner") {
            formTitle.textContent =
                action === "add" ? "Add Skill" : "Edit Skill";
            formFieldsContainer.innerHTML = `<label>Skill Name:
        <input type="text" id="skillNameInput" required />
      </label>
      <label>Level:
      <select id="levelInput" required>
        <option value="">Select Level</option>
        <option value="Beginner">Beginner</option>
        <option value="Intermediate">Intermediate</option>
        <option value="Advanced">Advanced</option>
      </select>
      </label>`;
            if (action === "edit" && id !== null) {
                const data = skillsInnerData.find((item) => item.id === id);
                if (data) {
                    document.getElementById("skillNameInput").value =
                        data.skillName;
                    document.getElementById("levelInput").value = data.level;
                }
            }
        }
        formModal.classList.remove("hidden");
    }
    window.openForm = openForm;

    // Open Project Modal
    function openProjectModal(project = null, action = "add") {
        const isEdit = action === "edit";
        const defaultProject = {
            id: null,
            title: "",
            details: "",
            technologiesused: "",
            Role: "",
            ViewOnline: "",
            image: "",
            type: "",
        };
        project = project || defaultProject;
        currentInnerTab = "projectTab";
        currentAction = action;
        currentEditId = project.id;
        formTitle.textContent = isEdit ? "Edit Project" : "Add Project";
        formFieldsContainer.innerHTML = `<label>Project Image:</label>
      <div id="projectBox" class="image-upload-box">
        <span id="projectIcon">➕</span>
        <img id="previewImage" />
      </div>
      <input type="file" id="projectImageFile" accept="image/*" style="display:none;" />
      <div class="inputspro">
        <label>Project Title:
          <input type="text" id="projectTitle" value="${
              project.title
          }" required />
        </label>
        <label>Technologies Used:
          <input type="text" id="technologiesused" value="${
              project.technologiesused
          }" required />
        </label>
        <label>Role:
          <input type="text" id="Role" value="${project.Role}" required />
        </label>
        <label>View Online:
          <input type="url" id="ViewOnline" value="${
              project.ViewOnline
          }" required />
        </label>
         <label>Details:
          <textarea id="details" required>${project.details}</textarea>
        </label>
        <label>Project Type:
          <select id="projectType" required>
            <option value="">Select Type</option>
            <option value="web" ${
                project.type === "web" ? "selected" : ""
            }>Web Developer</option>
            <option value="qa" ${
                project.type === "qa" ? "selected" : ""
            }>QA</option>
          </select>
        </label>
      </div>
      ${
          isEdit
              ? `<div class="centered-delete"><button type="button" id="deleteProjectBtn">Delete Project</button></div>`
              : ""
      }`;
        document.getElementById("previewImage").src = project.image || "";
        document.getElementById("previewImage").style.display = project.image
            ? "block"
            : "none";
        document.getElementById("projectBox").onclick = () =>
            document.getElementById("projectImageFile").click();
        setupImagePreview("projectImageFile", "previewImage", "projectIcon");
        if (isEdit) {
            const delBtn = document.getElementById("deleteProjectBtn");
            if (delBtn) {
                delBtn.onclick = () => {
                    currentDeleteTab = "projectTab";
                    currentDeleteId = project.id;
                    deleteModal.classList.remove("hidden");
                };
            }
        }
        formModal.classList.remove("hidden");
    }

    // Fast Add/Edit/Delete (optimistic update)
    dataForm.onsubmit = async (e) => {
        e.preventDefault();
        const csrfToken = getCSRF();
        let updateUI = () => {};
        let actionType = currentAction === "add" ? "add" : "edit";
        switch (currentInnerTab) {
            case "personalInfo": {
                const imageInput = document.getElementById("imageFiles"),
                    fullName = document.getElementById("fullNameInput").value,
                    bio = document.getElementById("bioInput").value,
                    jobTitles = document.getElementById("jobTitles").value,
                    formData = new FormData();
                formData.append("fullName", fullName);
                formData.append("bio", bio);
                formData.append("jobTitles", jobTitles);
                if (imageInput.files[0])
                    formData.append("image", imageInput.files[0]);
                let url = "/api/personal-info",
                    method = "POST";
                if (currentAction === "edit" && currentEditId) {
                    url = `/api/personal-info/${currentEditId}`;
                    method = "POST";
                    formData.append("_method", "PUT");
                }
                updateUI = () => {
                    personalInfoData = [
                        {
                            id: currentEditId || Date.now(),
                            fullName,
                            bio,
                            jobTitles,
                            image: imageInput.files[0]
                                ? URL.createObjectURL(imageInput.files[0])
                                : personalInfoData[0]?.image || "",
                        },
                    ];
                    updatePersonalInfoCard();
                };
                fetch(url, {
                    method,
                    headers: {
                        Accept: "application/json",
                        "X-CSRF-TOKEN": csrfToken,
                    },
                    body: formData,
                }).then(() => fetchPersonalInfo());
                break;
            }
            case "educationTab": {
                const degree = document.getElementById("degreeInput").value,
                    university =
                        document.getElementById("universityInput").value,
                    graduationYear = document.getElementById(
                        "graduationYearInput"
                    ).value,
                    thedetails =
                        document.getElementById("theDetailsInput").value,
                    newEntry = {
                        degree,
                        university,
                        graduationYear,
                        thedetails,
                    };
                let url = "/api/education",
                    method = "POST";
                if (currentAction === "edit" && currentEditId) {
                    url = `/api/education/${currentEditId}`;
                    method = "PUT";
                }
                updateUI = () => {
                    if (currentAction === "add") {
                        educationData.unshift({ ...newEntry, id: Date.now() });
                    } else {
                        const idx = educationData.findIndex(
                            (e) => e.id === currentEditId
                        );
                        if (idx > -1)
                            educationData[idx] = {
                                ...educationData[idx],
                                ...newEntry,
                            };
                    }
                    renderEducationTable();
                };
                fetch(url, {
                    method,
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                        "X-CSRF-TOKEN": csrfToken,
                    },
                    body: JSON.stringify(newEntry),
                }).then(() => fetchEducation());
                break;
            }
            case "experienceTab": {
                const jobTitle = document.getElementById("jobTitleInput").value,
                    company = document.getElementById("companyInput").value,
                    Details = document.getElementById("DetailsInput").value,
                    years = document.getElementById("yearsInput").value,
                    newEntry = { jobTitle, company, years, Details };
                let url = "/api/experience",
                    method = "POST";
                if (currentAction === "edit" && currentEditId) {
                    url = `/api/experience/${currentEditId}`;
                    method = "PUT";
                }
                updateUI = () => {
                    if (currentAction === "add") {
                        experienceData.unshift({ ...newEntry, id: Date.now() });
                    } else {
                        const idx = experienceData.findIndex(
                            (e) => e.id === currentEditId
                        );
                        if (idx > -1)
                            experienceData[idx] = {
                                ...experienceData[idx],
                                ...newEntry,
                            };
                    }
                    renderExperienceTable();
                };
                fetch(url, {
                    method,
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                        "X-CSRF-TOKEN": csrfToken,
                    },
                    body: JSON.stringify(newEntry),
                }).then(() => fetchExperience());
                break;
            }
            case "skillsTabInner": {
                const skillName =
                        document.getElementById("skillNameInput").value,
                    level = document.getElementById("levelInput").value,
                    newEntry = { skillName, level };
                let url = "/api/skills",
                    method = "POST";
                if (currentAction === "edit" && currentEditId) {
                    url = `/api/skills/${currentEditId}`;
                    method = "PUT";
                }
                updateUI = () => {
                    if (currentAction === "add") {
                        skillsInnerData.unshift({
                            ...newEntry,
                            id: Date.now(),
                        });
                    } else {
                        const idx = skillsInnerData.findIndex(
                            (e) => e.id === currentEditId
                        );
                        if (idx > -1)
                            skillsInnerData[idx] = {
                                ...skillsInnerData[idx],
                                ...newEntry,
                            };
                    }
                    renderSkillsInnerTable();
                };
                fetch(url, {
                    method,
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                        "X-CSRF-TOKEN": csrfToken,
                    },
                    body: JSON.stringify(newEntry),
                }).then(() => fetchSkills());
                break;
            }
            case "projectTab": {
                const title = document.getElementById("projectTitle").value,
                    details = document.getElementById("details").value,
                    technologiesused =
                        document.getElementById("technologiesused").value,
                    Role = document.getElementById("Role").value,
                    ViewOnline = document.getElementById("ViewOnline").value,
                    type = document.getElementById("projectType").value,
                    file = document.getElementById("projectImageFile").files[0],
                    formData = new FormData();
                formData.append("title", title);
                formData.append("details", details);
                formData.append("technologiesused", technologiesused);
                formData.append("Role", Role);
                formData.append("ViewOnline", ViewOnline);
                formData.append("type", type);
                if (file) formData.append("image", file);
                let url = "/api/projects",
                    method = "POST";
                if (currentAction === "edit" && currentEditId) {
                    url = `/api/projects/${currentEditId}`;
                    method = "POST";
                    formData.append("_method", "PUT");
                }
                updateUI = () => {
                    if (currentAction === "add") {
                        const newProj = {
                            id: Date.now(),
                            title,
                            details,
                            technologiesused,
                            Role,
                            ViewOnline,
                            type,
                            image: file ? URL.createObjectURL(file) : "",
                        };
                        projectsData.unshift(newProj);
                        filteredProjectsData = projectsData;
                    } else {
                        const idx = projectsData.findIndex(
                            (p) => p.id === currentEditId
                        );
                        if (idx > -1)
                            projectsData[idx] = {
                                ...projectsData[idx],
                                title,
                                details,
                                technologiesused,
                                Role,
                                ViewOnline,
                                type,
                                image: file
                                    ? URL.createObjectURL(file)
                                    : projectsData[idx].image,
                            };
                        filteredProjectsData = projectsData;
                    }
                    renderProjects(filteredProjectsData);
                };
                fetch(url, {
                    method,
                    headers: {
                        Accept: "application/json",
                        "X-CSRF-TOKEN": csrfToken,
                    },
                    body: formData,
                }).then(() => fetchProjects());
                break;
            }
        }
        // Optimistic UI update
        updateUI();
        formModal.classList.add("hidden");
        dataForm.reset();
        showStatusModal(
            actionType === "add" ? "تمت الإضافة بنجاح" : "تم التعديل بنجاح",
            "success"
        );
    };

    // Edit/Delete
    window.editItem = (tab, id) => openForm("edit", tab, id);
    window.confirmDelete = (tab, id) => {
        currentDeleteTab = tab;
        currentDeleteId = id;
        deleteModal.classList.remove("hidden");
    };
    confirmDeleteBtn.onclick = () => {
        if (currentDeleteTab && currentDeleteId !== null) {
            let apiURL = "",
                reloadFunction = null,
                method = "DELETE",
                csrfToken = getCSRF();
            switch (currentDeleteTab) {
                case "educationTab":
                    apiURL = `/api/education/${currentDeleteId}`;
                    reloadFunction = fetchEducation;
                    educationData = educationData.filter(
                        (e) => e.id !== currentDeleteId
                    );
                    renderEducationTable();
                    break;
                case "experienceTab":
                    apiURL = `/api/experience/${currentDeleteId}`;
                    reloadFunction = fetchExperience;
                    experienceData = experienceData.filter(
                        (e) => e.id !== currentDeleteId
                    );
                    renderExperienceTable();
                    break;
                case "skillsTabInner":
                    apiURL = `/api/skills/${currentDeleteId}`;
                    reloadFunction = fetchSkills;
                    skillsInnerData = skillsInnerData.filter(
                        (e) => e.id !== currentDeleteId
                    );
                    renderSkillsInnerTable();
                    break;
                case "projectTab":
                    apiURL = `/api/projects/${currentDeleteId}`;
                    reloadFunction = fetchProjects;
                    projectsData = projectsData.filter(
                        (p) => p.id !== currentDeleteId
                    );
                    filteredProjectsData = projectsData;
                    renderProjects(filteredProjectsData);
                    break;
            }
            deleteModal.classList.add("hidden");
            formModal.classList.add("hidden");
            dataForm.reset();
            showStatusModal("تم الحذف بنجاح", "success");
            fetch(apiURL, {
                method,
                headers: {
                    Accept: "application/json",
                    "X-CSRF-TOKEN": csrfToken,
                },
            })
                .then((res) => {
                    if (!res.ok && reloadFunction) {
                        showStatusModal("حدث خطأ أثناء الحذف", "error");
                        reloadFunction();
                    }
                    currentDeleteTab = null;
                    currentDeleteId = null;
                })
                .catch(() => {
                    if (reloadFunction) reloadFunction();
                    showStatusModal("حدث خطأ أثناء الحذف", "error");
                    currentDeleteTab = null;
                    currentDeleteId = null;
                });
        }
    };
    cancelDeleteBtn.onclick = () => {
        deleteModal.classList.add("hidden");
        currentDeleteTab = null;
        currentDeleteId = null;
    };
    cancelBtn.onclick = () => {
        formModal.classList.add("hidden");
        dataForm.reset();
    };

    // Initial Data Load
    fetchPersonalInfo();
    fetchEducation();
    fetchExperience();
    fetchSkills();
    fetchProjects();
});
