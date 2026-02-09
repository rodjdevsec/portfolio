import { state, config } from './config.js';
import { projects as staticProjects, certificates as staticCertificates } from './data.js';

const projects = (JSON.parse(localStorage.getItem('portfolio_projects')) || staticProjects).map((p, i) => ({
    ...p,
    id: p.id ? Number(p.id) : (i + 1)
}));
const certificates = JSON.parse(localStorage.getItem('portfolio_certificates')) || staticCertificates;

export const UI = {
    elements: {
        projectsContainer: document.getElementById('projects-container'),
        certTrack: document.getElementById('horizontal-track'),
        menuBtn: document.getElementById('menu-btn'),
        mobileMenu: document.getElementById('mobile-menu'),
        mobileLinks: document.querySelectorAll('.mobile-link'),
        progressBar: document.getElementById('progress-bar'),
        scrollToTopBtn: document.getElementById('scroll-to-top'),
        projectModal: document.getElementById('project-modal'),
        modalContent: document.getElementById('modal-content'),
        modalBackdrop: document.getElementById('modal-backdrop'),
        modalClose: document.getElementById('modal-close'),
        modalImg: document.getElementById('modal-image'),
        modalTitle: document.getElementById('modal-title'),
        modalCategory: document.getElementById('modal-category'),
        modalYear: document.getElementById('modal-year'),
        modalDesc: document.getElementById('modal-desc'),
        carouselDots: document.getElementById('carousel-dots'),
        certModal: document.getElementById('cert-modal'),
        certModalImg: document.getElementById('cert-modal-img'),
        certModalBackdrop: document.getElementById('cert-modal-backdrop'),
        certModalContent: document.getElementById('cert-modal-content'),
        certModalClose: document.getElementById('cert-modal-close'),
        previewBtn: document.getElementById('preview-btn'),
        previewModal: document.getElementById('preview-modal'),
        previewModalBackdrop: document.getElementById('preview-modal-backdrop'),
        previewModalContent: document.getElementById('preview-modal-content'),
        previewModalClose: document.getElementById('preview-modal-close'),
        previewModalTitle: document.getElementById('preview-modal-title'),
        previewDevices: document.getElementById('preview-devices'),
        previewNoUrl: document.getElementById('preview-no-url'),
        desktopFrame: document.getElementById('desktop-frame'),
        mobileFrame: document.getElementById('mobile-frame'),
        desktopIframe: document.getElementById('desktop-iframe'),
        mobileIframe: document.getElementById('mobile-iframe'),
        desktopUrl: document.getElementById('desktop-url'),
        previewControls: document.getElementById('preview-controls'),
        btnViewDesktop: document.getElementById('btn-view-desktop'),
        btnViewMobile: document.getElementById('btn-view-mobile'),
        previewExternalLink: document.getElementById('preview-external-link'),
        typingText: document.getElementById('typing-text'),
        typingSubtitle: document.getElementById('typing-subtitle'),
        cursor1: document.getElementById('cursor-1'),
        cursor2: document.getElementById('cursor-2')
    },

    renderProjects() {
        if (!this.elements.projectsContainer) return;

        const homeProjects = projects.filter(p => p.showOnHome);
        homeProjects.forEach((project, index) => {
            const isMobile = window.innerWidth < 768;
            const topOffset = isMobile ? 80 + (index * 10) : 100 + (index * 40);

            const cardHTML = `
                <div class="project-card-wrapper sticky w-full mb-12 md:mb-24" style="top: ${topOffset}px; z-index: ${index};" data-index="${index}">
                    <div class="project-card relative bg-zinc-900 border border-white/10 overflow-hidden rounded-xl shadow-2xl origin-top will-change-transform">
                        <div class="flex flex-col md:flex-row h-auto md:h-[450px]">
                            <div class="w-full md:w-3/5 h-[220px] md:h-full relative overflow-hidden group cursor-pointer project-trigger" data-id="${project.id}">
                                <div class="project-img-inner relative origin-center h-[120%] md:h-[140%] w-full md:w-[110%] top-[-10%] md:top-[-20%] left-0">
                                    <img src="${project.image}" alt="${project.title}" loading="lazy" class="w-full h-full object-cover md:object-cover transition-transform duration-700 group-hover:scale-105">
                                </div>
                                <div class="absolute inset-0 bg-black pointer-events-none opacity-0 shadow-overlay"></div>
                                <div class="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500"></div>
                            </div>
                            <div class="w-full md:w-2/5 p-8 md:p-12 flex flex-col justify-between bg-zinc-900 relative min-h-[300px] md:min-h-0">
                                <div class="absolute inset-0 opacity-[0.03] pointer-events-none noise-bg"></div>
                                <div class="flex justify-between items-start">
                                </div>
                                <div class="relative z-10 project-text">
                                    <h3 class="text-3xl md:text-5xl font-heading font-bold text-white mb-6 leading-tight">${project.title}</h3>
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
            this.elements.projectsContainer.insertAdjacentHTML('beforeend', cardHTML);
        });
    },

    renderCertificates() {
        if (!this.elements.certTrack) return;

        const homeCerts = certificates.filter(c => c.showOnHome);
        homeCerts.forEach((cert, index) => {
            const certHTML = `
                <div class="process-card relative h-[35vh] md:h-[60vh] w-[90vw] md:w-[40vw] flex-shrink-0 bg-zinc-900 overflow-hidden group border border-white/10 cursor-pointer cert-trigger" data-img="${cert.image}">
                    <img src="${cert.image}" alt="${cert.title}" loading="lazy" class="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-40 group-hover:scale-110 transition-transform duration-700 ease-out">
                    <div class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                    <div class="absolute bottom-0 left-0 p-6 md:p-8 w-full">
                        <h3 class="text-xl md:text-3xl font-bold mb-1 md:mb-2 relative z-10 leading-tight">${cert.title}</h3>
                        <p class="text-[10px] md:text-xs uppercase tracking-widest text-zinc-400 relative z-10">${cert.issuer}</p>
                    </div>
                </div>
            `;
            this.elements.certTrack.insertAdjacentHTML('beforeend', certHTML);
        });
    },

    renderCertificateGrid() {
        const gridContainer = document.getElementById('certificates-grid');
        if (!gridContainer) return;

        certificates.forEach((cert, index) => {
            const certHTML = `
                <div class="cert-card relative aspect-[4/3] bg-zinc-900 overflow-hidden group border border-white/5 rounded-xl cursor-pointer cert-trigger opacity-0 translate-y-8" data-img="${cert.image}" style="animation: fadeUp 0.5s ease-out forwards ${index * 0.1}s">
                    <img src="${cert.image}" alt="${cert.title}" loading="lazy" class="absolute inset-0 w-full h-full object-cover md:object-cover transition-transform duration-700 ease-out will-change-transform">
                    
                    <div class="cert-overlay absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 md:group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-3 md:p-8">
                        <div class="translate-y-2 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                            <h3 class="text-white font-bold text-[10px] md:text-2xl mb-0.5 md:mb-2 leading-tight">${cert.title}</h3>
                            <p class="text-zinc-400 text-[7px] md:text-xs uppercase tracking-widest">${cert.issuer}</p>
                        </div>
                    </div>
                </div>
            `;
            gridContainer.insertAdjacentHTML('beforeend', certHTML);
        });
    },

    renderProjectsGrid() {
        const gridContainer = document.getElementById('projects-grid');
        if (!gridContainer) return;

        projects.forEach((project, index) => {
            const cardHTML = `
                <div class="project-grid-card relative aspect-[4/3] bg-zinc-900 overflow-hidden group border border-white/5 rounded-xl cursor-pointer project-trigger opacity-0 translate-y-8" data-id="${project.id}" style="animation: fadeUp 0.5s ease-out forwards ${index * 0.1}s">
                    <img src="${project.image}" alt="${project.title}" loading="lazy" class="absolute inset-0 w-full h-full object-cover md:object-cover transition-transform duration-700 ease-out will-change-transform">
                    
                    <div class="project-overlay absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 md:group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-3 md:p-8">
                        <div class="translate-y-2 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                            <h3 class="text-white font-bold text-[10px] md:text-2xl mb-0.5 md:mb-2 leading-tight">${project.title}</h3>
                            <p class="text-zinc-400 text-[7px] md:text-xs uppercase tracking-widest">${project.category}</p>
                        </div>
                    </div>
                </div>
            `;
            gridContainer.insertAdjacentHTML('beforeend', cardHTML);
        });
    },

    toggleMobileMenu() {
        state.isMenuOpen = !state.isMenuOpen;
        const { menuBtn, mobileMenu, mobileLinks } = this.elements;

        menuBtn.classList.toggle('active');

        if (state.isMenuOpen) {
            document.body.style.overflow = 'hidden';
            mobileMenu.classList.remove('translate-x-full');
            mobileMenu.classList.add('open');

            mobileLinks.forEach((link, idx) => {
                setTimeout(() => {
                    link.classList.remove('opacity-0', 'translate-y-8');
                    link.classList.add('transition-all', 'duration-700', 'ease-out');
                }, 200 + (idx * 150));
            });
        } else {
            document.body.style.overflow = '';
            mobileLinks.forEach(link => {
                link.classList.add('opacity-0', 'translate-y-8');
            });

            mobileMenu.classList.remove('open');
            mobileMenu.classList.add('translate-x-full');
        }
    },

    openProjectModal(projectId) {
        const project = projects.find(p => Number(p.id) === Number(projectId));
        if (!project) return;

        state.currentProject = project;

        const { modalTitle, modalCategory, modalYear, modalDesc, projectModal, modalBackdrop, modalContent, previewBtn } = this.elements;

        modalTitle.innerText = project.title;
        modalCategory.innerText = project.category;
        modalYear.innerText = project.year;
        modalDesc.innerText = project.description;

        if (project.liveUrl) {
            previewBtn.disabled = false;
            previewBtn.textContent = 'Live Preview';
        } else {
            previewBtn.disabled = true;
            previewBtn.textContent = 'No Preview Available';
        }

        projectModal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';

        setTimeout(() => {
            modalBackdrop.classList.add('opacity-100');
            modalContent.classList.add('opacity-100', 'translate-y-0', 'scale-100');
            document.querySelector('.modal-text-wrap').classList.add('opacity-100', 'translate-y-0');
        }, 10);

        this.startCarousel(project);
    },

    closeProjectModal() {
        const { modalBackdrop, modalContent, projectModal } = this.elements;

        modalBackdrop.classList.remove('opacity-100');
        modalContent.classList.remove('opacity-100', 'translate-y-0', 'scale-100');
        document.querySelector('.modal-text-wrap').classList.remove('opacity-100', 'translate-y-0');

        if (state.carousel.interval) clearInterval(state.carousel.interval);

        setTimeout(() => {
            projectModal.classList.add('hidden');
            if (!state.isMenuOpen) document.body.style.overflow = '';
        }, 500);
    },

    startCarousel(project) {
        const { modalImg, carouselDots } = this.elements;
        state.carousel.images = [project.image, ...(project.extraImages || [])];
        state.carousel.index = 0;

        modalImg.src = state.carousel.images[0];
        modalImg.classList.remove('fade-out');

        carouselDots.innerHTML = '';
        state.carousel.images.forEach((_, i) => {
            const dot = document.createElement('div');
            dot.className = `h-1 rounded-full transition-all duration-300 ${i === 0 ? 'w-4 bg-white' : 'w-1 bg-white/30'}`;
            carouselDots.appendChild(dot);
        });

        if (state.carousel.interval) clearInterval(state.carousel.interval);
        state.carousel.interval = setInterval(() => {
            modalImg.classList.add('fade-out');

            setTimeout(() => {
                state.carousel.index = (state.carousel.index + 1) % state.carousel.images.length;
                modalImg.src = state.carousel.images[state.carousel.index];
                modalImg.classList.remove('fade-out');

                Array.from(carouselDots.children).forEach((dot, i) => {
                    dot.className = `h-1 rounded-full transition-all duration-300 ${i === state.carousel.index ? 'w-4 bg-white' : 'w-1 bg-white/30'}`;
                });
            }, 500);
        }, config.carouselInterval);
    },

    openCertModal(imgSrc) {
        const { certModal, certModalImg, certModalBackdrop, certModalContent } = this.elements;
        certModalImg.src = imgSrc;
        certModal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';

        setTimeout(() => {
            certModalBackdrop.classList.add('opacity-100');
            certModalContent.classList.add('opacity-100', 'scale-100');
        }, 10);
    },

    closeCertModal() {
        const { certModalBackdrop, certModalContent, certModal, projectModal } = this.elements;
        certModalBackdrop.classList.remove('opacity-100');
        certModalContent.classList.remove('opacity-100', 'scale-100');

        setTimeout(() => {
            certModal.classList.add('hidden');

            let isProjectModalOpen = false;

            if (projectModal) {
                isProjectModalOpen = !projectModal.classList.contains('hidden');
            }

            if (!state.isMenuOpen && !isProjectModalOpen) {
                document.body.style.overflow = '';
            }
        }, 300);
    },

    updatePreviewScale() {
        const { desktopFrame, desktopIframe } = this.elements;
        if (!desktopFrame || !desktopIframe) return;

        const header = desktopFrame.firstElementChild;
        const iframeWrapper = desktopFrame.children[1];

        if (!header || !iframeWrapper) return;

        const screenWidth = window.innerWidth;

        const padding = 48;
        const availableWidth = Math.min(640, screenWidth - padding);

        const scale = availableWidth / 1280;

        header.style.width = `${availableWidth}px`;
        iframeWrapper.style.width = `${availableWidth}px`;
        iframeWrapper.style.height = `${800 * scale}px`;

        desktopIframe.style.transform = `scale(${scale})`;
    },

    openPreviewModal() {
        const project = state.currentProject;
        if (!project || !project.liveUrl) return;

        const {
            previewModal, previewModalBackdrop, previewModalContent, previewModalTitle,
            previewDevices, previewNoUrl, desktopFrame, mobileFrame,
            desktopIframe, mobileIframe, desktopUrl,
            previewControls, btnViewDesktop, btnViewMobile,
            previewExternalLink
        } = this.elements;

        if (previewModalTitle) previewModalTitle.textContent = `${project.title} - Live Preview`;
        if (previewExternalLink) previewExternalLink.href = project.liveUrl;
        if (desktopFrame) {
            desktopFrame.classList.add('hidden');
            desktopFrame.classList.remove('flex');
        }
        if (mobileFrame) {
            mobileFrame.classList.add('hidden');
            mobileFrame.classList.remove('flex');
        }
        if (previewDevices) previewDevices.classList.remove('hidden');
        if (previewNoUrl) previewNoUrl.classList.add('hidden');
        if (previewControls) {
            previewControls.classList.add('hidden');
            previewControls.classList.remove('flex');
        }

        const isMobile = window.innerWidth < 768;

        const setActiveButton = (btn) => {
            btn.classList.add('bg-white', 'text-black');
            btn.classList.remove('bg-zinc-800', 'text-white');
        };
        const setInactiveButton = (btn) => {
            btn.classList.remove('bg-white', 'text-black');
            btn.classList.add('bg-zinc-800', 'text-white');
        };

        if (isMobile) {
            if (project.previewType === 'both') {
                previewControls.classList.remove('hidden');
                previewControls.classList.add('flex');

                mobileFrame.classList.remove('hidden');
                mobileFrame.classList.add('flex');
                mobileIframe.src = project.liveUrl;

                setActiveButton(btnViewMobile);
                setInactiveButton(btnViewDesktop);

                desktopIframe.src = project.liveUrl;
                desktopUrl.textContent = project.liveUrl;

            } else if (project.previewType === 'mobile') {
                mobileFrame.classList.remove('hidden');
                mobileFrame.classList.add('flex');
                mobileIframe.src = project.liveUrl;
            } else if (project.previewType === 'desktop') {
                desktopFrame.classList.remove('hidden');
                desktopFrame.classList.add('flex');
                desktopIframe.src = project.liveUrl;
                desktopUrl.textContent = project.liveUrl;
            }
        } else {
            if (project.previewType === 'both' || project.previewType === 'desktop') {
                desktopFrame.classList.remove('hidden');
                desktopFrame.classList.add('flex');
                desktopIframe.src = project.liveUrl;
                desktopUrl.textContent = project.liveUrl;
            }

            if (project.previewType === 'both' || project.previewType === 'mobile') {
                mobileFrame.classList.remove('hidden');
                mobileFrame.classList.add('flex');
                mobileIframe.src = project.liveUrl;
            }
        }

        this.updatePreviewScale();

        previewModal.classList.remove('hidden');

        setTimeout(() => {
            previewModalBackdrop.classList.add('opacity-100');
            previewModalContent.classList.add('opacity-100', 'scale-100');
        }, 10);
    },

    closePreviewModal() {
        const { previewModal, previewModalBackdrop, previewModalContent, desktopIframe, mobileIframe } = this.elements;

        previewModalBackdrop.classList.remove('opacity-100');
        previewModalContent.classList.remove('opacity-100', 'scale-100');

        setTimeout(() => {
            previewModal.classList.add('hidden');
            desktopIframe.src = '';
            mobileIframe.src = '';
        }, 300);
    }
};

