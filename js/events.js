import { UI } from './ui.js';
import { state, config } from './config.js';

export const Events = {
    init() {
        this.initMobileMenu();
        this.initModals();
        this.initScrollToTop();
        this.initGlobalShortcuts();
    },

    initMobileMenu() {
        if (!UI.elements.menuBtn) return;
        UI.elements.menuBtn.addEventListener('click', () => UI.toggleMobileMenu());
        if (UI.elements.mobileLinks) {
            UI.elements.mobileLinks.forEach(link => {
                link.addEventListener('click', () => {
                    if (state.isMenuOpen) UI.toggleMobileMenu();
                });
            });
        }
    },

    initModals() {
        document.addEventListener('click', (e) => {
            const trigger = e.target.closest('.project-trigger');
            if (trigger) UI.openProjectModal(parseInt(trigger.dataset.id));

            const certTrigger = e.target.closest('.cert-trigger');
            if (certTrigger) UI.openCertModal(certTrigger.dataset.img);
        });

        if (UI.elements.modalClose) {
            UI.elements.modalClose.addEventListener('click', () => UI.closeProjectModal());
        }
        if (UI.elements.modalBackdrop) {
            UI.elements.modalBackdrop.addEventListener('click', () => UI.closeProjectModal());
        }

        if (UI.elements.certModalClose) {
            UI.elements.certModalClose.addEventListener('click', () => UI.closeCertModal());
        }
        if (UI.elements.certModalBackdrop) {
            UI.elements.certModalBackdrop.addEventListener('click', () => UI.closeCertModal());
        }

        if (UI.elements.previewBtn) {
            UI.elements.previewBtn.addEventListener('click', () => UI.openPreviewModal());
        }
        if (UI.elements.previewModalClose) {
            UI.elements.previewModalClose.addEventListener('click', () => UI.closePreviewModal());
        }
        if (UI.elements.previewModalBackdrop) {
            UI.elements.previewModalBackdrop.addEventListener('click', () => UI.closePreviewModal());
        }

        if (UI.elements.btnViewDesktop) {
            UI.elements.btnViewDesktop.addEventListener('click', () => {
                UI.elements.desktopFrame.classList.remove('hidden');
                UI.elements.desktopFrame.classList.add('flex');
                UI.elements.mobileFrame.classList.add('hidden');
                UI.elements.mobileFrame.classList.remove('flex');

                UI.elements.btnViewDesktop.classList.add('bg-white', 'text-black');
                UI.elements.btnViewDesktop.classList.remove('bg-zinc-800', 'text-white');
                UI.elements.btnViewMobile.classList.remove('bg-white', 'text-black');
                UI.elements.btnViewMobile.classList.add('bg-zinc-800', 'text-white');
            });
        }

        if (UI.elements.btnViewMobile) {
            UI.elements.btnViewMobile.addEventListener('click', () => {
                UI.elements.mobileFrame.classList.remove('hidden');
                UI.elements.mobileFrame.classList.add('flex');
                UI.elements.desktopFrame.classList.add('hidden');
                UI.elements.desktopFrame.classList.remove('flex');

                UI.elements.btnViewMobile.classList.add('bg-white', 'text-black');
                UI.elements.btnViewMobile.classList.remove('bg-zinc-800', 'text-white');
                UI.elements.btnViewDesktop.classList.remove('bg-white', 'text-black');
                UI.elements.btnViewDesktop.classList.add('bg-zinc-800', 'text-white');
            });
        }
    },

    initScrollToTop() {
        if (!UI.elements.scrollToTopBtn) return;
        window.addEventListener('scroll', () => {
            if (window.scrollY > config.scrollThreshold) {
                UI.elements.scrollToTopBtn.classList.add('visible');
            } else {
                UI.elements.scrollToTopBtn.classList.remove('visible');
            }
        });

        UI.elements.scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    },

    initGlobalShortcuts() {
        document.addEventListener('keydown', (e) => {
            if (e.key === "Escape") {
                UI.closePreviewModal();
                UI.closeProjectModal();
                UI.closeCertModal();
            }
        });

        window.addEventListener('resize', () => {

            if (UI.elements.previewModal && !UI.elements.previewModal.classList.contains('hidden')) {
                UI.updatePreviewScale();
            }
        });
    }
};

