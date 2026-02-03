// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// --- Data ---
const projects = [
    {
        id: 1,
        title: "Poultry-Fi",
        category: "IoT & Firebase / C++",
        image: "assets/poultryfi/iot1.jpg",
        extraImages: [
            "assets/poultryfi/dashboard.png",
            "assets/poultryfi/login.png",
            "assets/poultryfi/iot2.jpg",
            "assets/poultryfi/iot3.jpg",
            "assets/poultryfi/iot4.jpg"
        ],
        year: "2024",
        description: "An IoT-based automated water and feed management system using Firebase and C++. Designed to optimize poultry farm monitoring and resource management."
    },
    {
        id: 2,
        title: "Travouge",
        category: "Travel Guide / React.js",
        image: "assets/travouge/tv1.png",
        extraImages: [
            "assets/travouge/tv2.png",
            "assets/travouge/tv3.png",
            "assets/travouge/tv4.png",
            "assets/travouge/tv5.png"
        ],
        year: "2024",
        description: "A PH Travel Guide application designed for foreign tourists using React. It features destination guides, interactive maps, and travel tips."
    },
    {
        id: 3,
        title: "Where-in-Tapat",
        category: "Local Guide",
        image: "assets/whereintapat/1.png",
        extraImages: [
            "assets/whereintapat/2.png",
            "assets/whereintapat/3.png",
            "assets/whereintapat/4.png"
        ],
        year: "2023",
        description: "A destination guide specifically for Taguig and Pateros. It helps users discover local attractions, food spots, and hidden gems."
    },
    {
        id: 4,
        title: "PTC Digital Learning Hub",
        category: "File Management / Web",
        image: "assets/dlh/landingpage.png",
        extraImages: [
            "assets/dlh/admin.png",
            "assets/dlh/tc.png"
        ],
        year: "2023",
        description: "A centralized file management platform for college instructors at Pateros Technological College to streamline educational resources."
    }
];

// --- Render Projects ---
const projectsContainer = document.getElementById('projects-container');

projects.forEach((project, index) => {
    const isMobile = window.innerWidth < 768;
    // Sticky positioning calculation
    const topOffset = isMobile ? 80 + (index * 10) : 100 + (index * 40);

    const cardHTML = `
                <div class="project-card-wrapper sticky w-full mb-12 md:mb-24" style="top: ${topOffset}px; z-index: ${index};" data-index="${index}">
                    <div class="project-card relative bg-zinc-900 border border-white/10 overflow-hidden rounded-xl shadow-2xl origin-top will-change-transform">
                        <div class="flex flex-col md:flex-row h-auto md:h-[600px]">
                            <!-- Image -->
                            <div class="w-full md:w-3/5 h-[300px] md:h-full relative overflow-hidden group cursor-pointer project-trigger" data-id="${project.id}">
                                <div class="project-img-inner relative origin-center h-[120%] md:h-[140%] w-full md:w-[110%] top-[-10%] md:top-[-20%] left-0">
                                    <img src="${project.image}" alt="${project.title}" loading="lazy" class="w-full h-full object-cover md:object-cover transition-transform duration-700 group-hover:scale-105">
                                </div>
                                <div class="absolute inset-0 bg-black pointer-events-none opacity-0 shadow-overlay"></div>
                                <div class="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500"></div>
                            </div>

                            <!-- Content -->
                            <div class="w-full md:w-2/5 p-8 md:p-12 flex flex-col justify-between bg-zinc-900 relative min-h-[300px] md:min-h-0">
                                <div class="absolute inset-0 opacity-[0.03] pointer-events-none" style="background-image: url('https://grainy-gradients.vercel.app/noise.svg');"></div>
                                
                                <div class="flex justify-between items-start">
                                    <span class="text-4xl md:text-6xl font-bold text-white/10 select-none">0${index + 1}</span>
                                    <div class="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center">
                                        <div class="w-2 h-2 bg-white rounded-full"></div>
                                    </div>
                                </div>

                                <div class="relative z-10 project-text">
                                    <div class="flex items-center gap-4 mb-4">
                                        <div class="h-[1px] w-8 bg-zinc-500"></div>
                                        <span class="text-xs uppercase tracking-[0.25em] text-zinc-400">${project.category}</span>
                                    </div>
                                    <h3 class="text-3xl md:text-5xl font-serif italic text-white mb-6 leading-[0.9]">${project.title}</h3>
                                    <p class="text-zinc-500 text-sm leading-relaxed max-w-xs">${project.description.slice(0, 100)}...</p>
                                </div>

                                <div class="mt-6 md:mt-0">
                                    <button class="project-trigger text-xs uppercase tracking-widest text-white border-b border-white/30 pb-1 hover:border-white transition-colors" data-id="${project.id}">View Project</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
    projectsContainer.insertAdjacentHTML('beforeend', cardHTML);
});

// --- Animations ---

// 1. Navbar Animation
gsap.to('.nav-logo', { opacity: 1, duration: 1, delay: 0.2 });
gsap.to('.nav-links', { opacity: 1, duration: 1, delay: 0.4 });

// 2. Typing Effect for Hero Name (with loop)
function typeWriter(element, text, speed, callback) {
    let i = 0;
    element.textContent = '';

    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else if (callback) {
            callback();
        }
    }
    type();
}

function eraseText(element, speed, callback) {
    let text = element.textContent;
    let i = text.length;

    function erase() {
        if (i > 0) {
            element.textContent = text.substring(0, i - 1);
            i--;
            setTimeout(erase, speed);
        } else if (callback) {
            callback();
        }
    }
    erase();
}

function startTypingLoop() {
    const typingText = document.getElementById('typing-text');
    const typingSubtitle = document.getElementById('typing-subtitle');
    const cursor1 = document.getElementById('cursor-1');
    const cursor2 = document.getElementById('cursor-2');

    function typeSequence() {
        // Show cursor on first line, hide second
        cursor1.style.display = 'inline';
        cursor2.style.display = 'none';

        // Type main name
        typeWriter(typingText, 'ROGEL JHON', 100, () => {
            // Switch cursor to second line
            cursor1.style.display = 'none';
            cursor2.style.display = 'inline';

            // Type subtitle after delay
            setTimeout(() => {
                typeWriter(typingSubtitle, 'Belinario', 120, () => {
                    // Pause before erasing
                    setTimeout(() => {
                        // Keep cursor on second line while erasing subtitle
                        eraseText(typingSubtitle, 80, () => {
                            // Switch cursor back to first line
                            cursor2.style.display = 'none';
                            cursor1.style.display = 'inline';

                            // Erase main name
                            setTimeout(() => {
                                eraseText(typingText, 60, () => {
                                    // Restart loop after short delay
                                    setTimeout(typeSequence, 500);
                                });
                            }, 200);
                        });
                    }, 2000); // Wait 2 seconds before erasing
                });
            }, 300);
        });
    }

    typeSequence();
}

// Start typing effect after initial fade in
setTimeout(startTypingLoop, 1200);

// Hero Animations
const heroTl = gsap.timeline();
heroTl.to('.hero-name', { opacity: 1, x: 0, duration: 1.2, ease: "power3.out" })
    .to('.hero-tagline', { opacity: 1, x: 0, duration: 1, ease: "power2.out" }, "-=0.9")
    .to('.hero-credentials', { opacity: 1, x: 0, duration: 1, ease: "power2.out" }, "-=0.7");

// Hero Parallax on Scroll
gsap.to('.hero-bg', {
    scrollTrigger: {
        trigger: '#hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true
    },
    y: 300,
    scale: 1.2,
    rotateZ: 2
});

gsap.to('.hero-text-container', {
    scrollTrigger: {
        trigger: '#hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true
    },
    y: -150,
    opacity: 0
});

// 3. Content Section Fade
gsap.to('.content-text', {
    scrollTrigger: {
        trigger: '.content-section',
        start: 'top 70%',
        end: 'bottom 40%',
        scrub: true
    },
    y: 0,
    opacity: 1,
    scale: 1
});

// 4. Horizontal Scroll
const horizontalSection = document.getElementById('horizontal-section');
const track = document.getElementById('horizontal-track');

// Calculate needed scroll amount based on content width
const getScrollAmount = () => {
    let trackWidth = track.scrollWidth;
    return -(trackWidth - window.innerWidth);
};

const tween = gsap.to(track, {
    x: getScrollAmount,
    ease: "none",
    scrollTrigger: {
        trigger: horizontalSection,
        start: "top top",
        end: () => `+=${getScrollAmount() * -1}`,
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true
    }
});

// 5. Project Cards Parallax
const cardWrappers = document.querySelectorAll('.project-card-wrapper');
cardWrappers.forEach((card, i) => {
    // Scale down effect as you scroll past
    gsap.to(card.querySelector('.project-card'), {
        scale: 0.95,
        scrollTrigger: {
            trigger: card,
            start: "top 10%",
            end: "bottom top",
            scrub: true
        }
    });

    // Shadow overlay darkening
    gsap.to(card.querySelector('.shadow-overlay'), {
        opacity: 0.6,
        scrollTrigger: {
            trigger: card,
            start: "top 10%",
            end: "bottom top",
            scrub: true
        }
    });

    // Image Parallax Inside Card
    gsap.to(card.querySelector('.project-img-inner'), {
        y: "10%",
        scrollTrigger: {
            trigger: card,
            start: "top bottom",
            end: "bottom top",
            scrub: true
        }
    });
});

// 6. Footer
gsap.to('.footer-cta', {
    scrollTrigger: {
        trigger: 'footer',
        start: 'top 70%'
    },
    opacity: 1,
    y: 0,
    duration: 1,
    ease: "power2.out"
});

gsap.to('.footer-grid', {
    scrollTrigger: {
        trigger: 'footer',
        start: 'top 60%'
    },
    opacity: 1,
    y: 0,
    duration: 1,
    delay: 0.2,
    ease: "power2.out"
});

// 7. Progress Bar
gsap.to('#progress-bar', {
    width: '100%',
    scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0
    },
    ease: 'none'
});

// --- Mobile Menu Logic ---
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-link');
let isMenuOpen = false;

menuBtn.addEventListener('click', () => {
    isMenuOpen = !isMenuOpen;
    if (isMenuOpen) {
        document.body.style.overflow = 'hidden';
        mobileMenu.classList.remove('translate-y-[-100%]', 'opacity-0');
        mobileMenu.classList.add('translate-y-0', 'opacity-100', 'transition-all', 'duration-500', 'ease-in-out');

        // Staggered animation for links with smoother timing
        mobileLinks.forEach((link, idx) => {
            setTimeout(() => {
                link.classList.remove('opacity-0', 'translate-y-8');
                link.classList.add('transition-all', 'duration-700', 'ease-out');
            }, 200 + (idx * 150));
        });

        // Footer animation
        setTimeout(() => {
            document.querySelector('.mobile-footer').classList.remove('opacity-0');
            document.querySelector('.mobile-footer').classList.add('transition-opacity', 'duration-500');
        }, 650);

    } else {
        document.body.style.overflow = 'auto';

        // Reset links first
        mobileLinks.forEach(link => {
            link.classList.remove('transition-all', 'duration-700', 'ease-out');
            link.classList.add('opacity-0', 'translate-y-8');
        });
        document.querySelector('.mobile-footer').classList.add('opacity-0');

        // Then close menu
        setTimeout(() => {
            mobileMenu.classList.remove('translate-y-0', 'opacity-100');
            mobileMenu.classList.add('translate-y-[-100%]', 'opacity-0');
        }, 100);
    }
});

// Close menu when clicking a link
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (isMenuOpen) {
            // Close the menu
            isMenuOpen = false;
            document.body.style.overflow = 'auto';

            // Reset links first
            mobileLinks.forEach(link => {
                link.classList.remove('transition-all', 'duration-700', 'ease-out');
                link.classList.add('opacity-0', 'translate-y-8');
            });
            document.querySelector('.mobile-footer').classList.add('opacity-0');

            // Then close menu
            setTimeout(() => {
                mobileMenu.classList.remove('translate-y-0', 'opacity-100');
                mobileMenu.classList.add('translate-y-[-100%]', 'opacity-0');
            }, 100);
        }
    });
});


// --- Modal Logic with Image Carousel ---
const modal = document.getElementById('project-modal');
const modalContent = document.getElementById('modal-content');
const modalBackdrop = document.getElementById('modal-backdrop');
const modalClose = document.getElementById('modal-close');
const modalImg = document.getElementById('modal-image');

let carouselInterval;
let currentImgIndex = 0;
let currentCarouselImages = [];

function startCarousel(projectId) {
    const project = projects.find(p => p.id === projectId);
    if (!project) return;

    currentCarouselImages = [project.image, ...(project.extraImages || [])];
    currentImgIndex = 0;
    modalImg.src = currentCarouselImages[0];
    modalImg.classList.remove('fade-out');

    // Render dots
    const dotsContainer = document.getElementById('carousel-dots');
    dotsContainer.innerHTML = '';
    currentCarouselImages.forEach((_, i) => {
        const dot = document.createElement('div');
        dot.className = `h-1 rounded-full transition-all duration-300 ${i === 0 ? 'w-4 bg-white' : 'w-1 bg-white/30'}`;
        dotsContainer.appendChild(dot);
    });

    // Start Timer (1.5s interval as requested, adjusted for feel)
    if (carouselInterval) clearInterval(carouselInterval);
    carouselInterval = setInterval(() => {
        // Crossfade logic
        modalImg.classList.add('fade-out');

        setTimeout(() => {
            currentImgIndex = (currentImgIndex + 1) % currentCarouselImages.length;
            modalImg.src = currentCarouselImages[currentImgIndex];
            modalImg.classList.remove('fade-out');

            // Update dots
            Array.from(dotsContainer.children).forEach((dot, i) => {
                dot.className = `h-1 rounded-full transition-all duration-300 ${i === currentImgIndex ? 'w-4 bg-white' : 'w-1 bg-white/30'}`;
            });
        }, 500);

    }, 2000);
}

// --- Open Modal ---
function openModal(projectId) {
    const project = projects.find(p => p.id === projectId);
    if (!project) return;

    document.getElementById('modal-title').innerText = project.title;
    document.getElementById('modal-category').innerText = project.category;
    document.getElementById('modal-year').innerText = project.year;
    document.getElementById('modal-desc').innerText = project.description;

    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';

    // Animation
    setTimeout(() => {
        modalBackdrop.classList.add('opacity-100');
        modalContent.classList.add('opacity-100', 'translate-y-0', 'scale-100');
        document.querySelector('.modal-text-wrap').classList.add('opacity-100', 'translate-y-0');
    }, 10);

    startCarousel(projectId);
}

// --- Close Modal ---
function closeModal() {
    modalBackdrop.classList.remove('opacity-100');
    modalContent.classList.remove('opacity-100', 'translate-y-0', 'scale-100');
    document.querySelector('.modal-text-wrap').classList.remove('opacity-100', 'translate-y-0');

    if (carouselInterval) clearInterval(carouselInterval);

    setTimeout(() => {
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }, 500);
}

modalClose.addEventListener('click', closeModal);
modalBackdrop.addEventListener('click', closeModal);

// --- Event Listeners and Triggers ---
document.addEventListener('click', (e) => {
    const trigger = e.target.closest('.project-trigger');
    if (trigger) {
        const id = parseInt(trigger.dataset.id);
        openModal(id);
    }
});

// Escape key to close
document.addEventListener('keydown', (e) => {
    if (e.key === "Escape") closeModal();
});
