import { UI } from './ui.js';
import { Animations } from './animations.js';
import { Events } from './events.js';

document.addEventListener('DOMContentLoaded', () => {
    if (history.scrollRestoration) {
        history.scrollRestoration = 'manual';
    }

    const shouldScrollToCerts = sessionStorage.getItem('scrollToCerts');
    const shouldScrollToProjects = sessionStorage.getItem('scrollToProjects');
    const shouldScrollToContact = sessionStorage.getItem('scrollToContact');
    const shouldScrollToAbout = sessionStorage.getItem('scrollToAbout');

    if (shouldScrollToCerts) {
        sessionStorage.removeItem('scrollToCerts');
        setTimeout(() => {
            const certificatesSection = document.getElementById('certificates');
            if (certificatesSection) certificatesSection.scrollIntoView();
        }, 100);
    } else if (shouldScrollToProjects) {
        sessionStorage.removeItem('scrollToProjects');
        setTimeout(() => {
            const projectsSection = document.getElementById('projects');
            if (projectsSection) projectsSection.scrollIntoView();
        }, 100);
    } else if (shouldScrollToContact) {
        sessionStorage.removeItem('scrollToContact');
        setTimeout(() => {
            const contactSection = document.getElementById('contact');
            if (contactSection) contactSection.scrollIntoView();
        }, 100);
    } else if (shouldScrollToAbout) {
        sessionStorage.removeItem('scrollToAbout');
        setTimeout(() => {
            const aboutSection = document.getElementById('about');
            if (aboutSection) aboutSection.scrollIntoView();
        }, 100);
    } else {
        window.scrollTo(0, 0);
    }

    if (window.location.hash) {
        history.replaceState(null, null, window.location.pathname);
    }

    const isHomePage = !!document.getElementById('hero');
    const isProjectsPage = !!document.getElementById('projects-grid');

    if (isHomePage) {
        UI.renderProjects();
        UI.renderCertificates();
        Animations.init();
        Events.init();
    } else if (isProjectsPage) {
        UI.renderProjectsGrid();
        Events.initModals();
        Events.initScrollToTop();
        Events.initGlobalShortcuts();
    } else {
        UI.renderCertificateGrid();
        Events.initModals();
        Events.initScrollToTop();
        Events.initGlobalShortcuts();
    }

    document.body.style.opacity = '0';
    requestAnimationFrame(() => {
        document.body.style.transition = 'opacity 0.6s ease';
        document.body.style.opacity = '1';
    });
});

