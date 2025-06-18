@extends('layouts.main')

{{-- @section('title', 'Home') --}}

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
                                <li><a href="{{ route('home') }}" class="nav-item link-item">home</a></li>
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
                        <h1>{{ $personal->fullName ?? 'Your Name' }}</h1>
                        <h2>{{ $personal->jobTitles ?? 'Your Job Title' }}</h2>
                        <a href="#about" class="btn link-item">more about me</a>
                        <a href="#portfolio" class="btn link-item">portfolio</a>
                    </div>
                    <div class="home-img">
                        <div class="img-box">
                            <img src="{{ $personal->image ?? asset('img/default.png') }}" alt="profile-img">
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
                            <img src="{{ $personal->image ?? asset('img/default.png') }}" alt="">
                        </div>
                    </div>
                    <div class="about-text">
                        <p>{{ $personal->bio ?? '' }}</p>
                        <h3>skills</h3>
                        <div class="skills">
                            @foreach ($skills as $skill)
                                <div class="skill-item">
                                    {{ $skill->skillName }} <span
                                        style="font-size: 12px; color: #888;">({{ $skill->level }})</span></div>
                            @endforeach
                        </div>
                        <div class="skills-pagination-wrapper">
                            <button class="skills-pagination-btn prev" disabled>Previous</button>
                            <button class="skills-pagination-btn next">Next</button>
                        </div>
                        <div class="about-tabs">
                            <button type="button" class="tab-item active" data-target="#education">education</button>
                            <button type="button" class="tab-item" data-target="#experience">experience</button>
                        </div>
                        <!-- education -->
                        <div class="tab-content active" id="education">
                            <div class="timeline">
                                @foreach ($educations as $education)
                                    <div class="timeline-item">
                                        <span class="data">
                                            {{ $education->graduationYear ?? '' }}
                                        </span>
                                        <h4>
                                            {{ $education->degree ?? '' }} -
                                            <span>{{ $education->university ?? '' }}</span>
                                        </h4>
                                        <p>{{ $education->thedetails ?? '' }}</p>
                                    </div>
                                @endforeach
                            </div>
                        </div>
                        <!-- end education -->
                        <!--  experience -->
                        <div class="tab-content" id="experience">
                            <div class="timeline">
                                @foreach ($experiences as $exp)
                                    <div class="timeline-item">
                                        <span class="data">
                                            {{ $exp->years ?? '' }}
                                        </span>
                                        <h4>
                                            {{ $exp->jobTitle ?? '' }} -
                                            <span>{{ $exp->company ?? '' }}</span>
                                        </h4>
                                        <p>{{ $exp->Details ?? '' }}</p>
                                    </div>
                                @endforeach
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
                <div class="portfolio-filter">
                    <button class="filter-btn active" data-filter="all">All</button>
                    <button class="filter-btn" data-filter="web">Web</button>
                    <button class="filter-btn" data-filter="qa">QA</button>
                </div>
                <div class="row" id="project-list">
                    <!-- سيتم تعبئة المشاريع ديناميكيًا هنا -->
                </div>

            </div>
            <div class="pagination-wrapper">
                <button class="pagination-btn prev" disabled>Previous</button>
                <button class="pagination-btn next">Next</button>
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
                        @if (session('success'))
                            <div class="alert alert-success">
                                {{ session('success') }}
                            </div>
                        @endif
                        @if ($errors->any())
                            <div class="alert alert-danger">
                                <ul style="margin:0;">
                                    @foreach ($errors->all() as $error)
                                        <li>{{ $error }}</li>
                                    @endforeach
                                </ul>
                            </div>
                        @endif
                        <form method="POST" action="{{ route('contact.send') }}">
                            @csrf
                            <div class="row">
                                <div class="input-group">
                                    <input type="text" class="input-control" placeholder="Name" name="name"
                                        value="{{ old('name') }}" required>
                                </div>
                                <div class="input-group">
                                    <input type="email" class="input-control" placeholder="Email" name="email"
                                        value="{{ old('email') }}" required>
                                </div>
                                <div class="input-group">
                                    <input type="text" class="input-control" placeholder="Subject" name="subject"
                                        value="{{ old('subject') }}" required>
                                </div>
                                <div class="input-group">
                                    <textarea name="message" class="input-control" placeholder="Message" required>{{ old('message') }}</textarea>
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
                            <p>{{ $personal->email ?? 'emadhashash76@gmail.com' }}</p>
                        </div>
                        <div class="contact-info-item">
                            <h3>Phone</h3>
                            <p>{{ $personal->phone ?? '00962771222383' }}</p>
                        </div>
                        <div class="contact-info-item">
                            <h3>Follow me </h3>
                            <div class="social-links">
                                @if (!empty($personal->facebook))
                                    <a href="{{ $personal->facebook }}" target="_blank"><i
                                            class="fab fa-facebook-f"></i></a>
                                @endif
                                @if (!empty($personal->twitter))
                                    <a href="{{ $personal->twitter }}" target="_blank"><i
                                            class="fab fa-twitter"></i></a>
                                @endif
                                @if (!empty($personal->instagram))
                                    <a href="{{ $personal->instagram }}" target="_blank"><i
                                            class="fab fa-instagram"></i></a>
                                @endif
                                @if (!empty($personal->linkedin))
                                    <a href="{{ $personal->linkedin }}" target="_blank"><i
                                            class="fab fa-linkedin-in"></i></a>
                                @endif
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

    @if (session('success'))
        <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
        <script>
            Swal.fire({
                icon: 'success',
                title: 'Message sent successfully!',
                text: '{{ session('success') }}',
                confirmButtonText: 'إغلاق'
            });
        </script>
    @endif
@endsection
