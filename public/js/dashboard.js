// -------------------------------
// 1. التبويبات الرئيسية
// -------------------------------
const personalDataTab = document.getElementById("personalDataTab");
const projectsTab = document.getElementById("projectsTab");
const personalDataSection = document.getElementById("personalData");
const projectsSection = document.getElementById("projects");

function switchMainTab(activeTab, inactiveTab, activeSection, inactiveSection) {
    activeTab.classList.add("active");
    inactiveTab.classList.remove("active");
    activeSection.classList.add("active");
    inactiveSection.classList.remove("active");
    formModal.classList.add("hidden");
}

personalDataTab.addEventListener("click", () =>
    switchMainTab(
        personalDataTab,
        projectsTab,
        personalDataSection,
        projectsSection
    )
);
projectsTab.addEventListener("click", () =>
    switchMainTab(
        projectsTab,
        personalDataTab,
        projectsSection,
        personalDataSection
    )
);

// -------------------------------
// 2. التبويبات الفرعية
// -------------------------------
const innerTabs = document.querySelectorAll(".inner-tab");
const innerContentTabs = document.querySelectorAll(".inner-content-tab");

innerTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
        innerTabs.forEach((t) => t.classList.remove("active"));
        innerContentTabs.forEach((c) => c.classList.remove("active"));
        tab.classList.add("active");
        document
            .getElementById(tab.getAttribute("data-tab"))
            .classList.add("active");
        formModal.classList.add("hidden");
    });
});

// -------------------------------
// 3. المتغيرات العامة
// -------------------------------
const formModal = document.getElementById("formModal");
const deleteModal = document.getElementById("deleteModal");
const formTitle = document.getElementById("formTitle");
const dataForm = document.getElementById("dataForm");
const formFieldsContainer = document.getElementById("formFields");
const saveBtn = document.getElementById("saveBtn");
const cancelBtn = document.getElementById("cancelBtn");
const confirmDeleteBtn = document.getElementById("confirmDeleteBtn");
const cancelDeleteBtn = document.getElementById("cancelDeleteBtn");

const addPersonalInfoBtn = document.getElementById("addPersonalInfoBtn");
const addEducationBtn = document.getElementById("addEducationBtn");
const addExperienceBtn = document.getElementById("addExperienceBtn");
const addSkillInnerBtn = document.getElementById("addSkillInnerBtn");
const allBtn = document.getElementById("all");
const webBtn = document.getElementById("webBtn");
const qaBtn = document.getElementById("qaBtn");
const projectContainer = document.getElementById("projectContainer");
const addProjectBtn = document.getElementById("addProjectBtn");

let personalInfoData = [];
let educationData = [];
let experienceData = [];
let skillsInnerData = [];
let projectsData = [];

let currentInnerTab = "personalInfo";
let currentAction = null;
let currentEditId = null;
let currentDeleteTab = null;
let currentDeleteId = null;

// -------------------------------
// 4. جلب CSRF من meta tag
// -------------------------------
function getCSRF() {
    const tag = document.querySelector('meta[name="csrf-token"]');
    return tag ? tag.getAttribute("content") : "";
}

// -------------------------------
// 5. الأحداث الرئيسية للأزرار
// -------------------------------
addPersonalInfoBtn.addEventListener("click", () => {
    if (!Array.isArray(personalInfoData) || personalInfoData.length === 0) {
        openForm("add", "personalInfo");
    } else {
        openForm("edit", "personalInfo", personalInfoData[0].id);
    }
});
addEducationBtn.addEventListener("click", () =>
    openForm("add", "educationTab")
);
addExperienceBtn.addEventListener("click", () =>
    openForm("add", "experienceTab")
);
addSkillInnerBtn.addEventListener("click", () =>
    openForm("add", "skillsTabInner")
);
addProjectBtn.addEventListener("click", () => openProjectModal(null, "add"));

// -------------------------------
// 6. جلب البيانات من API
// -------------------------------
async function fetchPersonalInfo() {
    try {
        const response = await fetch("/api/personal-info");
        const data = await response.json();
        if (Array.isArray(data)) {
            personalInfoData = data;
        } else if (Array.isArray(data.data)) {
            personalInfoData = data.data;
        } else if (typeof data === "object" && data !== null) {
            personalInfoData = [data];
        } else {
            personalInfoData = [];
        }
        updatePersonalInfoCard();
    } catch (error) {
        console.error("Error fetching personal info:", error);
        personalInfoData = [];
        updatePersonalInfoCard();
    }
}
async function fetchEducation() {
    try {
        const response = await fetch("/api/education");
        const data = await response.json();
        if (Array.isArray(data)) {
            educationData = data;
        } else if (Array.isArray(data.data)) {
            educationData = data.data;
        } else if (typeof data === "object" && data !== null) {
            educationData = [data];
        } else {
            educationData = [];
        }
        renderEducationTable();
    } catch (error) {
        educationData = [];
        renderEducationTable();
    }
}
async function fetchExperience() {
    try {
        const response = await fetch("/api/experience");
        const data = await response.json();
        experienceData = Array.isArray(data) ? data : data.data || [];
        renderExperienceTable();
    } catch (error) {
        experienceData = [];
        renderExperienceTable();
    }
}
async function fetchSkills() {
    try {
        const response = await fetch("/api/skills");
        const data = await response.json();
        skillsInnerData = Array.isArray(data) ? data : data.data || [];
        renderSkillsInnerTable();
    } catch (error) {
        skillsInnerData = [];
        renderSkillsInnerTable();
    }
}
async function fetchProjects() {
    try {
        const response = await fetch("/api/projects");
        const data = await response.json();
        projectsData = Array.isArray(data) ? data : data.data || [];
        renderProjects(projectsData);
        filterProjects("all");
    } catch (error) {
        projectsData = [];
        renderProjects([]);
    }
}

// -------------------------------
// 7. تحديث وعرض بيانات Personal Info
// -------------------------------
function updatePersonalInfoCard() {
    const container = document.getElementById("personalInfoCard");
    if (!container) return;

    if (!Array.isArray(personalInfoData) || personalInfoData.length === 0) {
        container.innerHTML = `
      <div style="text-align: center; color: #f66; font-size: 18px; padding: 30px;">
No data
</div>
<div style="text-align: center; margin-top: 15px;">
<button id="addPersonalInfoBtn" class="save">Add your data</button>
</div>
    `;
        const addBtn = document.getElementById("addPersonalInfoBtn");
        if (addBtn) {
            addBtn.addEventListener("click", () => {
                openForm("add", "personalInfo");
            });
        }
        return;
    }

    const info = personalInfoData[0];

    container.innerHTML = `
    <div class="container">
      <div class="row">
        <div class="home-text">
          <h1>${info.fullName || "الاسم غير متوفر"}</h1>
          <h2>${info.jobTitles || "المسمى غير متوفر"}</h2>
          <p>${info.bio || ""}</p>
        </div>
        <div class="home-img">
          <div class="img-box">
            <img src="${info.image || ""}" alt="profile-img" style="display: ${
        info.image ? "block" : "none"
    };" />
          </div>
        </div>
      </div>
    </div>
    <div style="text-align: center; margin-top: 15px;">
      <button id="addPersonalInfoBtn" class="save">Edit</button>
    </div>
  `;

    const editBtn = document.getElementById("addPersonalInfoBtn");
    if (editBtn) {
        editBtn.addEventListener("click", () => {
            openForm("edit", "personalInfo", info.id);
        });
    }
}

// -------------------------------
// 8. إعداد معاينة الصورة
// -------------------------------
function setupImagePreview(fileInputId, previewImageId, iconId = null) {
    const fileInput = document.getElementById(fileInputId);
    const previewImage = document.getElementById(previewImageId);
    const icon = iconId ? document.getElementById(iconId) : null;

    if (!fileInput || !previewImage) return;

    fileInput.addEventListener("change", (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                previewImage.src = e.target.result;
                previewImage.style.display = "block";
                if (icon) icon.style.display = "none";
            };
            reader.readAsDataURL(file);
        }
    });
}

// -------------------------------
// 9. فتح النموذج حسب التبويب
// -------------------------------
function openForm(action, tab, id = null) {
    currentAction = action;
    currentInnerTab = tab;
    currentEditId = id;
    formFieldsContainer.innerHTML = "";

    // personalInfo
    if (tab === "personalInfo") {
        formTitle.textContent =
            action === "add"
                ? "Add Personal Information"
                : "Edit Personal Information";
        formFieldsContainer.innerHTML = `
    <div id="imageBox" class="image-upload-box">
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
    </label>
`;
        const previewImage = document.getElementById("previewImages");
        if (action === "edit" && id !== null) {
            const data = personalInfoData.find((item) => item.id === id);
            if (data) {
                previewImage.src = data.image || "";
                previewImage.style.display = data.image ? "block" : "none";
                document.getElementById("fullNameInput").value = data.fullName;
                document.getElementById("jobTitles").value = data.jobTitles;
                document.getElementById("bioInput").value = data.bio;
            }
        }
        document.getElementById("imageBox").addEventListener("click", () => {
            document.getElementById("imageFiles").click();
        });
        setupImagePreview("imageFiles", "previewImages", "uploadIcon");
    }

    // educationTab
    if (tab === "educationTab") {
        formTitle.textContent = action === "add" ? "Add Study" : "Edit Study";
        formFieldsContainer.innerHTML = `
    <label>Educational Qualification:
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
    </label>
`;
        if (action === "edit" && id !== null) {
            const data = educationData.find((item) => item.id === id);
            if (data) {
                document.getElementById("degreeInput").value = data.degree;
                document.getElementById("universityInput").value = data.university;
                document.getElementById("theDetailsInput").value = data.thedetails;
                document.getElementById("graduationYearInput").value = data.graduationYear;
            }
        }
    }

    // experienceTab
    if (tab === "experienceTab") {
        formTitle.textContent =
            action === "add" ? "Add Experience" : "Edit Experience";
        formFieldsContainer.innerHTML = `
    <label>Job Title:
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
    </label>
`;
        if (action === "edit" && id !== null) {
            const data = experienceData.find((item) => item.id === id);
            if (data) {
                document.getElementById("jobTitleInput").value = data.jobTitle;
                document.getElementById("companyInput").value = data.company;
                document.getElementById("DetailsInput").value = data.Details;
                document.getElementById("yearsInput").value = data.years;
            }
        }
    }

    // skillsTabInner
    if (tab === "skillsTabInner") {
        formTitle.textContent = action === "add" ? "Add Skill" : "Edit Skill";
        formFieldsContainer.innerHTML = `
    <label>Skill Name:
      <input type="text" id="skillNameInput" required />
    </label>
    <label>Level:
    <select id="levelInput" required>
      <option value="">Select Level</option>
      <option value="Beginner">Beginner</option>
      <option value="Intermediate">Intermediate</option>
      <option value="Advanced">Advanced</option>
    </select>
    </label>
`;
        if (action === "edit" && id !== null) {
            const data = skillsInnerData.find((item) => item.id === id);
            if (data) {
                document.getElementById("skillNameInput").value = data.skillName;
                document.getElementById("levelInput").value = data.level;
            }
        }
    }

    formModal.classList.remove("hidden");
}

// -------------------------------
// 10. فتح نافذة إضافة/تعديل مشروع
// -------------------------------
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
    formFieldsContainer.innerHTML = `
        <label>Project Image:</label>
        <div id="projectBox" class="image-upload-box">
          <span id="projectIcon">➕</span>
          <img id="previewImage" />
        </div>
        <input type="file" id="projectImageFile" accept="image/*" style="display:none;" />
        <div class="inputspro">
          <label>Project Title:
            <input type="text" id="projectTitle" value="${project.title}" required />
          </label>
          <label>Details:
            <textarea id="details" required>${project.details}</textarea>
          </label>
          <label>Technologies Used:
            <input type="text" id="technologiesused" value="${project.technologiesused}" required />
          </label>
          <label>Role:
            <input type="text" id="Role" value="${project.Role}" required />
          </label>
          <label>View Online:
            <input type="url" id="ViewOnline" value="${project.ViewOnline}" required />
          </label>
          <label>Project Type:
            <select id="projectType" required>
              <option value="">Select Type</option>
              <option value="web" ${project.type === "web" ? "selected" : ""}>Web Developer</option>
              <option value="qa" ${project.type === "qa" ? "selected" : ""}>QA</option>
            </select>
          </label>
        </div>
        ${
            isEdit
                ? `<div class="centered-delete">
                     <button type="button" id="deleteProjectBtn">Delete Project</button>
                   </div>`
                : ""
        }
      `;
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

// -------------------------------
// 11. حفظ النموذج لأي تبويب
// -------------------------------
dataForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const csrfToken = getCSRF();

    switch (currentInnerTab) {
        case "personalInfo": {
            const imageInput = document.getElementById("imageFiles");
            const fullName = document.getElementById("fullNameInput").value;
            const bio = document.getElementById("bioInput").value;
            const jobTitles = document.getElementById("jobTitles").value;
            const formData = new FormData();
            formData.append("fullName", fullName);
            formData.append("bio", bio);
            formData.append("jobTitles", jobTitles);
            if (imageInput.files[0]) {
                formData.append("image", imageInput.files[0]);
            }
            let url = "/api/personal-info";
            let method = "POST";
            if (currentAction === "edit" && currentEditId) {
                url = `/api/personal-info/${currentEditId}`;
                method = "POST";
                formData.append("_method", "PUT");
            }
            fetch(url, {
                method,
                headers: {
                    Accept: "application/json",
                    "X-CSRF-TOKEN": csrfToken,
                },
                body: formData,
            })
                .then((res) => res.json())
                .then(() => fetchPersonalInfo())
                .then(() => {
                    formModal.classList.add("hidden");
                    dataForm.reset();
                });
            break;
        }
        case "educationTab": {
            const degree = document.getElementById("degreeInput").value;
            const university = document.getElementById("universityInput").value;
            const graduationYear = document.getElementById("graduationYearInput").value;
            const thedetails = document.getElementById("theDetailsInput").value;
            const newEntry = { degree, university, graduationYear, thedetails };
            let url = "/api/education";
            let method = "POST";
            if (currentAction === "edit" && currentEditId) {
                url = `/api/education/${currentEditId}`;
                method = "PUT";
            }
            fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    "X-CSRF-TOKEN": csrfToken,
                },
                body: JSON.stringify(newEntry),
            })
                .then((res) => res.json())
                .then(() => fetchEducation())
                .then(() => {
                    formModal.classList.add("hidden");
                    dataForm.reset();
                });
            break;
        }
        case "experienceTab": {
            const jobTitle = document.getElementById("jobTitleInput").value;
            const company = document.getElementById("companyInput").value;
            const Details = document.getElementById("DetailsInput").value;
            const years = document.getElementById("yearsInput").value;
            const newEntry = { jobTitle, company, years, Details };
            let url = "/api/experience";
            let method = "POST";
            if (currentAction === "edit" && currentEditId) {
                url = `/api/experience/${currentEditId}`;
                method = "PUT";
            }
            fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    "X-CSRF-TOKEN": csrfToken,
                },
                body: JSON.stringify(newEntry),
            })
                .then((res) => res.json())
                .then(() => fetchExperience())
                .then(() => {
                    formModal.classList.add("hidden");
                    dataForm.reset();
                });
            break;
        }
        case "skillsTabInner": {
            const skillName = document.getElementById("skillNameInput").value;
            const level = document.getElementById("levelInput").value;
            const newEntry = { skillName, level };
            let url = "/api/skills";
            let method = "POST";
            if (currentAction === "edit" && currentEditId) {
                url = `/api/skills/${currentEditId}`;
                method = "PUT";
            }
            fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    "X-CSRF-TOKEN": csrfToken,
                },
                body: JSON.stringify(newEntry),
            })
                .then((res) => res.json())
                .then(() => fetchSkills())
                .then(() => {
                    formModal.classList.add("hidden");
                    dataForm.reset();
                });
            break;
        }
        case "projectTab": {
            const title = document.getElementById("projectTitle").value;
            const details = document.getElementById("details").value;
            const technologiesused = document.getElementById("technologiesused").value;
            const Role = document.getElementById("Role").value;
            const ViewOnline = document.getElementById("ViewOnline").value;
            const type = document.getElementById("projectType").value;
            const file = document.getElementById("projectImageFile").files[0];
            const formData = new FormData();
            formData.append("title", title);
            formData.append("details", details);
            formData.append("technologiesused", technologiesused);
            formData.append("Role", Role);
            formData.append("ViewOnline", ViewOnline);
            formData.append("type", type);
            if (file) {
                formData.append("image", file);
            }
            let url = "/api/projects";
            let method = "POST";
            if (currentAction === "edit" && currentEditId) {
                url = `/api/projects/${currentEditId}`;
                method = "POST";
                formData.append("_method", "PUT");
            }
            fetch(url, {
                method,
                headers: {
                    Accept: "application/json",
                    "X-CSRF-TOKEN": csrfToken,
                },
                body: formData,
            })
                .then((res) => res.json())
                .then(() => fetchProjects())
                .then(() => {
                    formModal.classList.add("hidden");
                    dataForm.reset();
                });
            break;
        }
    }
});

// -------------------------------
// 12. تعديل/حذف سجل
// -------------------------------
function editItem(tab, id) {
    openForm("edit", tab, id);
}
function confirmDelete(tab, id) {
    currentDeleteTab = tab;
    currentDeleteId = id;
    deleteModal.classList.remove("hidden");
}
confirmDeleteBtn.addEventListener("click", () => {
    if (currentDeleteTab && currentDeleteId !== null) {
        let apiURL = "";
        let reloadFunction = null;
        let method = "DELETE";
        const csrfToken = getCSRF();

        switch (currentDeleteTab) {
            case "educationTab":
                apiURL = `/api/education/${currentDeleteId}`;
                reloadFunction = fetchEducation;
                break;
            case "experienceTab":
                apiURL = `/api/experience/${currentDeleteId}`;
                reloadFunction = fetchExperience;
                break;
            case "skillsTabInner":
                apiURL = `/api/skills/${currentDeleteId}`;
                reloadFunction = fetchSkills;
                break;
            case "projectTab":
                apiURL = `/api/projects/${currentDeleteId}`;
                reloadFunction = fetchProjects;
                break;
        }

        fetch(apiURL, {
            method,
            headers: {
                Accept: "application/json",
                "X-CSRF-TOKEN": csrfToken,
            },
        }).then(() => {
            deleteModal.classList.add("hidden");
            formModal.classList.add("hidden");
            dataForm.reset();
            currentDeleteTab = null;
            currentDeleteId = null;
            if (reloadFunction) reloadFunction();
        });
    }
});
cancelDeleteBtn.addEventListener("click", () => {
    deleteModal.classList.add("hidden");
    currentDeleteTab = null;
    currentDeleteId = null;
});
cancelBtn.addEventListener("click", () => {
    formModal.classList.add("hidden");
    dataForm.reset();
});

// -------------------------------
// 13. عرض الجداول (تعليم/خبرة/مهارات)
// -------------------------------
function renderEducationTable() {
    const tbody = document.querySelector("#educationTable tbody");
    tbody.innerHTML = "";
    educationData.forEach((item) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
    <td>${item.degree}</td>
     <td>${item.university}</td>
      <td>${item.thedetails}</td>
      <td>${item.graduationYear}</td>
       <td> <button class="edit" onclick="editItem('educationTab', ${item.id})">تعديل</button>
       <button class="delete" onclick="confirmDelete('educationTab', ${item.id})">حذف</button> </td>
    `;
        tbody.appendChild(tr);
    });
}
function renderExperienceTable() {
    const tbody = document.querySelector("#experienceTable tbody");
    tbody.innerHTML = "";
    experienceData.forEach((item) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
    <td>${item.jobTitle}</td>
     <td>${item.company}</td>
     <td>${item.Details}</td>
      <td>${item.years}</td>
       <td> <button class="edit" onclick="editItem('experienceTab', ${item.id})">تعديل</button>
       <button class="delete" onclick="confirmDelete('experienceTab', ${item.id})">حذف</button> </td>
       `;
        tbody.appendChild(tr);
    });
}
function renderSkillsInnerTable() {
    const tbody = document.querySelector("#skillsInnerTable tbody");
    tbody.innerHTML = "";
    skillsInnerData.forEach((item) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
    <td>${item.skillName}</td>
    <td>${item.level}</td> 
    <td> <button class="edit" onclick="editItem('skillsTabInner', ${item.id})">تعديل</button>
    <button class="delete" onclick="confirmDelete('skillsTabInner', ${item.id})">حذف</button> </td>`;
        tbody.appendChild(tr);
    });
}

// -------------------------------
// 14. المشاريع (العرض والتصفية)
// -------------------------------
function renderProjects(data) {
    projectContainer.innerHTML = "";

    if (!data || data.length === 0) {
        projectContainer.innerHTML = `
      <div style="text-align: center; color: #888; padding: 20px;">
          There are no projects yet.
      </div>
    `;
        return;
    }

    data.forEach((project) => {
        const imgSrc = project.image || "default-project.png";
        const title = project.title || "No Title";

        const card = document.createElement("div");
        card.classList.add("card");
        card.setAttribute("data-type", project.type);
        card.dataset.id = project.id;

        card.innerHTML = `
      <div class="card-image">
        <img src="${imgSrc}" alt="${title}" />
      </div>
      <div class="card-body">
        <h2>${title}</h2>
        <p>${project.details || ""}</p>
      </div>
    `;

        card.addEventListener("click", () => openProjectModal(project, "edit"));

        projectContainer.appendChild(card);
    });
}
function filterProjects(type) {
    const cards = projectContainer.querySelectorAll(".card");
    cards.forEach((card) => {
        card.style.display =
            type === "all" || card.getAttribute("data-type") === type
                ? "block"
                : "none";
    });
    allBtn.classList.remove("active");
    webBtn.classList.remove("active");
    qaBtn.classList.remove("active");

    if (type === "all") allBtn.classList.add("active");
    else if (type === "web") webBtn.classList.add("active");
    else if (type === "qa") qaBtn.classList.add("active");
}

// -------------------------------
// 15. عند تحميل الصفحة: جلب كل البيانات مرة واحدة
// -------------------------------
document.addEventListener("DOMContentLoaded", () => {
    fetchPersonalInfo();
    fetchEducation();
    fetchExperience();
    fetchSkills();
    fetchProjects();
});