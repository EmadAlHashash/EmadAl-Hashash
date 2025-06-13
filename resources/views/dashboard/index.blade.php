@extends('layouts.dashboard')

@section('title', 'Dashboard')

@section('content')

    <div class="container">
        <!-- الشريط الجانبي الرئيسي -->
        <aside class="sidebar">
            <h2>Dashboard</h2>
            <ul>
                <li id="personalDataTab" class="active">Personal Data</li>
                <li id="projectsTab">Projects</li>
            </ul>
        </aside>

        <!-- المحتوى الرئيسي -->
        <main class="main-content">
            <!-- قسم البيانات الشخصية -->
            <section id="personalData" class="tab-content active">
                <h3>Personal Data</h3>

                <!-- الشريط الجانبي الفرعي للتنقل بين البيانات والدراسة والخبرة والمهارات -->
                <div class="inner-sidebar">
                    <ul>
                        <li class="inner-tab active" data-tab="personalInfo">
                            Personal Data
                        </li>
                        <li class="inner-tab" data-tab="educationTab">Education</li>
                        <li class="inner-tab" data-tab="experienceTab">Experience</li>
                        <li class="inner-tab" data-tab="skillsTabInner">Skills</li>
                        <li>
                            <form method="POST" action="{{ route('logout') }}">
                                @csrf
                                <button type="submit" class="Logout">Logout</button>
                            </form>
                        </li>
                    </ul>
                </div>

                <!-- محتوى تبويبات البيانات الشخصية -->
                <div id="personalInfo" class="inner-content-tab active">
                    <section class="personalInfoCards" id="personalInfoCard">
                        <div class="container">
                            <div class="row">
                                <div class="home-text">
                                    <h1></h1>
                                    <h2></h2>
                                    <p></p>
                                </div>
                                <div class="home-img">
                                    <div class="img-box">
                                        <img src="" alt="profile-img" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button id="addPersonalInfoBtn" class="save">Save</button>
                    </section>
                </div>

                <div id="educationTab" class="inner-content-tab">
                    <button id="addEducationBtn" class="add-btn">Add Education</button>
                    <table id="educationTable">
                        <thead>
                            <tr>
                                <th>Major</th>
                                <th>University Name</th>
                                <th>Details</th>
                                <th>Graduation Year</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody></tbody>
                    </table>
                    <div id="educationPagination" class="pagination"></div>

                </div>

                <div id="experienceTab" class="inner-content-tab">
                    <button id="addExperienceBtn" class="add-btn">add Experience</button>
                    <table id="experienceTable">
                        <thead>
                            <tr>
                                <th>Job Title</th>
                                <th>Company Name</th>
                                <th>Details</th>
                                <th>Number of Years of Experience</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody></tbody>
                    </table>
                    <div id="experiencePagination" class="pagination"></div>

                </div>

                <div id="skillsTabInner" class="inner-content-tab">
                    <button id="addSkillInnerBtn" class="add-btn">Add skill</button>
                    <table id="skillsInnerTable">
                        <thead>
                            <tr>
                                <th>Skill Name</th>
                                <th>Level</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody></tbody>
                    </table>
                    <div id="skillsPagination" class="pagination"></div>
                </div>
            </section>

            <!-- قسم المشاريع -->
            <section id="projects" class="tab-content">
                <nav class="projects-nav">
                    <div class="nav-buttons">
                        <button onclick="filterProjects('all')" id="all" class="active">
                            All
                        </button>
                        <button onclick="filterProjects('web')" id="webBtn">
                            Web Developer
                        </button>
                        <button onclick="filterProjects('qa')" id="qaBtn">QA</button>
                    </div>
                    <button class="add-project-btn" id="addProjectBtn">
                        Add Project +
                    </button>
                </nav>

                <div class="dashboard" id="projectContainer">
                    <!-- <div class="card" data-type="web">
                                              <img src="" alt="projectimage" />
                                              <div class="card-content">
                                                <h2></h2>
                                              </div>
                                            </div> -->

                </div>
                    <div id="projectsPagination" class="pagination"></div>

            </section>
        </main>
    </div>

    <!-- نافذة تعديل -->
    <div id="formModal" class="modal hidden">
        <div class="modal-content">
            <h3 id="formTitle">Form Title</h3>
            <form id="dataForm">
                <div id="formFields"></div>
                <div class="modal-buttons">
                    <button type="button" id="cancelBtn">Cancel</button>
                    <button type="submit" id="saveBtn">Save</button>
                </div>
            </form>
        </div>
    </div>

    <!-- نافذة تأكيد الحذف -->
    <div id="deleteModal" class="modal hidden">
        <div class="modal-content">
            <h3>Confirm deletion</h3>
            <p>Are you sure you want to delete this item?</p>
            <div class="modal-buttons">
                <button id="confirmDeleteBtn" style="background-color: red;">Yes, delete</button>
                <button id="cancelDeleteBtn">Cancel</button>
            </div>
        </div>
    </div>

@endsection
