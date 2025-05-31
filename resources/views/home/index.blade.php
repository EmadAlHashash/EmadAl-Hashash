@extends('layouts.main')

@section('title', 'Home')

@section('content')

    <!-- page loader -->
    <div class="page-loader">
        <div></div>
        <div></div>
        <div></div>
    </div>

    <!-- background circles -->
    <div class="bg-circles">
        <div class="circle-1"></div>
        <div class="circle-2"></div>
        <div class="circle-3"></div>
        <div class="circle-4"></div>
    </div>

    <!-- overlay -->
    <div class="overlay"></div>

    <!-- main content -->
    <main class="main hidden">

 <!-- header -->
        <header class="header">
            <div class="container">
                <div class="row flex-end">
                    <button type="button" class="nav-toggler">
                        <span></span>
                    </button>
                    <nav class="nav">
                        <div class="nav-inner">
                            <ul>
                                <li><a href="#home" class="nav-item link-item">home</a></li>
                                <li><a href="#about" class="nav-item link-item">about</a></li>
                                <li><a href="#portfolio" class="nav-item link-item">portfolio</a></li>
                                <li><a href="#contact" class="nav-item link-item">contact</a></li>
                            </ul>
                        </div>
                    </nav>
                </div>
            </div>
        </header>
        <!-- end  header -->

        <!-- home section -->
        <section class="home-section align-items-center " id="home">
            <div class="container">
                <div class="row align-items-center">
                    <div class="home-text">
                        <p>Hello , I'm</p>
                        <h1>Emad Al Hashash</h1>
                        <h2>Full Stack Web developer </h2>
                        <a href="#about" class="btn link-item">more about me</a>
                        <a href="#portfolio" class="btn link-item">portfolio</a>
                    </div>
                    <div class="home-img">
                        <div class="img-box">
                            <img src="./img/img1-removebg.png" alt="profile-img">
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!-- home section  end -->
        <!-- about section -->
        <section class="about-section sec-padding" id="about">
            <div class="container">
                <div class="row">
                    <div class="section-title">
                        <h2>about me</h2>
                    </div>
                </div>
                <div class="row">
                    <div class="about-img">
                        <div class="img-box">
                            <img src="./img/img1-removebg.png" alt="">
                        </div>
                    </div>
                    <div class="about-text">
                        <p>Self-motivated and dependent learner with experience in the latest Web Development
                            technologies, seeking for a position where I can apply my knowledge and grow in my career.
                        </p>
                        <h3>skills</h3>
                        <div class="skills">
                            <div class="skill-item">HTML</div>
                            <div class="skill-item">CSS</div>
                            <div class="skill-item">JavaScript</div>
                            <div class="skill-item">Bootstrap</div>
                            <div class="skill-item">React</div>
                            <div class="skill-item">PHP</div>
                            <div class="skill-item">Laravel</div>
                            <div class="skill-item">Laravel-livewire</div>
                            <div class="skill-item">Wordpress</div>
                            <div class="skill-item">UI/UX</div>
                        </div>
                        <div class="about-tabs">
                            <button type="button" class="tab-item active" data-target="#education">education</button>
                            <button type="button" class="tab-item" data-target="#experience">experience</button>
                        </div>
                        <!-- education -->
                        <div class="tab-content active" id="education">
                            <div class="timeline">
                                <div class="timeline-item">
                                    <span class="data">06/2022 - 01/2023</span>
                                    <h4>trainee at - <span>coding academy by orange</span></h4>
                                    <p>coding academy by orange 7 months full-stack bootcamp.</p>
                                </div>
                            </div>
                        </div>
                        <!-- end education -->
                        <!--  experience -->
                        <div class="tab-content" id="experience">
                            <div class="timeline">
                                <div class="timeline-item">
                                    <span class="data">06/2022 - 01/2023</span>
                                    <h4>web developer - <span>the webshala</span></h4>
                                    <p>coding academy by orange - amman ' joradn. <br>
                                        intensive course0 in full stack web development in collaboration with simplon.co
                                        and princess sumaya university for technology (PSUT).
                                    </p>
                                </div>
                            </div>
                        </div>
                        <!-- end experience -->
                        <a href="#" class="btn link-item">download cv</a>
                        <a href="#contact" class="btn  link-item">contact me</a>
                    </div>
                </div>
            </div>
        </section>
        <!-- about section end-->
        <!-- portfolio -->
        <section class="portfolio-section sec-padding" id="portfolio">
            <div class="container">
                <div class="row">
                    <div class="section-title">
                        <h2>recent work</h2>
                    </div>
                </div>
                <div class="row">
                    <!-- portfolio -->
                    <div class="portfolio-item">
                        <div class="portfolio-item-thumbnail">
                            <img src="./img/_C__Users_emadh_OneDrive_Desktop_Omnifood_index.html.png" alt="">
                        </div>
                        <h3 class="portfolio-item-title">Omnifood</h3>
                        <button type="button" class="btn view-project-btn">view project</button>
                        <div class="portfolio-item-details">
                            <div class="description">
                                <p>A healthy meal delivered to your door, every single day.</p>
                            </div>
                            <div class="general-info">
                                <ul>
                                    <li>Created - <span>4 Dec 2023</span></li>
                                    <li>technologies used - <span>Html, Css , JavaScript</span></li>
                                    <li>Role - <span>Frontend</span></li>
                                    <li>View Online - <span><a href="#">www.Omnifood.com</a></span></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <!-- end -->
                    <!-- portfolio -->
                    <div class="portfolio-item">
                        <div class="portfolio-item-thumbnail">
                            <img src="./img/_C__Users_emadh_OneDrive_Desktop_Omnifood_index.html.png" alt="">
                        </div>
                        <h3 class="portfolio-item-title">Omnifood</h3>
                        <button type="button" class="btn view-project-btn">view project</button>
                        <div class="portfolio-item-details">
                            <div class="description">
                                <p>A healthy meal delivered to your door, every single day.</p>
                            </div>
                            <div class="general-info">
                                <ul>
                                    <li>Created - <span>4 Dec 2023</span></li>
                                    <li>technologies used - <span>Html, Css , JavaScript</span></li>
                                    <li>Role - <span>Frontend</span></li>
                                    <li>View Online - <span><a href="#">www.Omnifood.com</a></span></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <!-- end -->
                    <!-- portfolio -->
                    <div class="portfolio-item">
                        <div class="portfolio-item-thumbnail">
                            <img src="./img/_C__Users_emadh_OneDrive_Desktop_Omnifood_index.html.png" alt="">
                        </div>
                        <h3 class="portfolio-item-title">Omnifood</h3>
                        <button type="button" class="btn view-project-btn">view project</button>
                        <div class="portfolio-item-details">
                            <div class="description">
                                <p>A healthy meal delivered to your door, every single day.</p>
                            </div>
                            <div class="general-info">
                                <ul>
                                    <li>Created - <span>4 Dec 2023</span></li>
                                    <li>technologies used - <span>Html, Css , JavaScript</span></li>
                                    <li>Role - <span>Frontend</span></li>
                                    <li>View Online - <span><a href="#">www.Omnifood.com</a></span></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <!-- end -->
                    <!-- portfolio -->
                    <div class="portfolio-item">
                        <div class="portfolio-item-thumbnail">
                            <img src="./img/_C__Users_emadh_OneDrive_Desktop_Omnifood_index.html.png" alt="">
                        </div>
                        <h3 class="portfolio-item-title">Omnifood</h3>
                        <button type="button" class="btn view-project-btn">view project</button>
                        <div class="portfolio-item-details">
                            <div class="description">
                                <p>A healthy meal delivered to your door, every single day.</p>
                            </div>
                            <div class="general-info">
                                <ul>
                                    <li>Created - <span>4 Dec 2023</span></li>
                                    <li>technologies used - <span>Html, Css , JavaScript</span></li>
                                    <li>Role - <span>Frontend</span></li>
                                    <li>View Online - <span><a href="#">www.Omnifood.com</a></span></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <!-- end -->
                    <!-- portfolio -->
                    <div class="portfolio-item">
                        <div class="portfolio-item-thumbnail">
                            <img src="./img/_C__Users_emadh_OneDrive_Desktop_Omnifood_index.html.png" alt="">
                        </div>
                        <h3 class="portfolio-item-title">Omnifood</h3>
                        <button type="button" class="btn view-project-btn">view project</button>
                        <div class="portfolio-item-details">
                            <div class="description">
                                <p>A healthy meal delivered to your door, every single day.</p>
                            </div>
                            <div class="general-info">
                                <ul>
                                    <li>Created - <span>4 Dec 2023</span></li>
                                    <li>technologies used - <span>Html, Css , JavaScript</span></li>
                                    <li>Role - <span>Frontend</span></li>
                                    <li>View Online - <span><a href="#">www.Omnifood.com</a></span></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <!-- end -->
                    <!-- portfolio -->
                    <div class="portfolio-item">
                        <div class="portfolio-item-thumbnail">
                            <img src="./img/_C__Users_emadh_OneDrive_Desktop_Omnifood_index.html.png" alt="">
                        </div>
                        <h3 class="portfolio-item-title">Omnifood</h3>
                        <button type="button" class="btn view-project-btn">view project</button>
                        <div class="portfolio-item-details">
                            <div class="description">
                                <p>A healthy meal delivered to your door, every single day.</p>
                            </div>
                            <div class="general-info">
                                <ul>
                                    <li>Created - <span>4 Dec 2023</span></li>
                                    <li>technologies used - <span>Html, Css , JavaScript</span></li>
                                    <li>Role - <span>Frontend</span></li>
                                    <li>View Online - <span><a href="#">www.Omnifood.com</a></span></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <!-- end -->
                </div>
            </div>
        </section>
        <!-- end portfolio -->

        <!-- contact  -->
        <section class="contact-section sec-padding" id="contact">
            <div class="container">
                <div class="row">
                    <div class="section-title">
                        <h2>contact me</h2>
                    </div>
                </div>
                <div class="row">
                    <div class="contact-form">
                        <form>
                            <div class="row">
                                <div class="input-group">
                                    <input type="text" class="input-control" placeholder="Name" name="name" required>
                                </div>
                                <div class="input-group">
                                    <input type="email" class="input-control" placeholder="Email" name="email" required>
                                </div>
                                <div class="input-group">
                                    <input type="text" class="input-control" placeholder="Subject" name="subject"
                                        required>
                                </div>
                                <div class="input-group">
                                    <textarea name="message" class="input-control" placeholder="Message"
                                        required></textarea>
                                </div>
                                <div class="submit-btn">
                                    <button type="submit" class="btn">send message</button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="contact-info">
                        <div class="contact-info-item">
                            <h3>Email</h3>
                            <p>emad@gmail.com</p>
                        </div>
                        <div class="contact-info-item">
                            <h3>Phone</h3>
                            <p>00962778084911</p>
                        </div>
                        <div class="contact-info-item">
                            <h3>Follow me </h3>
                            <div class="social-links">
                                <a href="#" target="_blank"><i class="fab fa-facebook-f"></i></a>
                                <a href="#" target="_blank"><i class="fab fa-twitter"></i></a>
                                <a href="#" target="_blank"><i class="fab fa-instagram"></i></a>
                                <a href="#" target="_blank"><i class="fab fa-linkedin-in"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!-- end contact  -->

    </main>

    <!-- portfolio-item-details -->
    <div class="portfolio-popup">
        <div class="pp-inner">
            <div class="pp-content">
                <div class="pp-header">
                    <button type="button" class="btn pp-close"><i class="fas fa-times"></i></button>
                    <div class="pp-thumbnail">
                        <img src="" alt="">
                    </div>
                    <h3></h3>
                </div>
                <div class="pp-body">
                    <!-- Details will be filled dynamically -->
                </div>
            </div>
        </div>
    </div>

@endsection
