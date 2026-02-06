import { UI } from './ui.js';
import { config } from './config.js';

export const Animations = {
    init() {
        gsap.registerPlugin(ScrollTrigger);
        this.initNavbar();
        this.initTypingEffect();
        this.initHero();
        this.initContentSections();
        this.initHorizontalScroll();
        this.initProjectParallax();
        this.initProgressBar();
        this.initFooter();
    },

    initNavbar() {
        const logo = document.querySelector('.nav-logo');
        if (!logo) return;

        gsap.to('.nav-logo', { opacity: 1, duration: 1, delay: 0.2 });
        gsap.to('.nav-links', { opacity: 1, duration: 1, delay: 0.4 });

        ScrollTrigger.create({
            trigger: 'body',
            start: 'top -50',
            onEnter: () => logo.classList.add('logo-hidden'),
            onLeaveBack: () => logo.classList.remove('logo-hidden')
        });
    },

    initTypingEffect() {
        const { typingText, typingSubtitle, cursor1, cursor2 } = UI.elements;
        if (!typingText || !cursor1) return;

        const type = (el, text, speed) => {
            return new Promise(resolve => {
                let i = 0;
                el.textContent = '';
                const timer = setInterval(() => {
                    if (i < text.length) {
                        el.textContent += text.charAt(i);
                        i++;
                    } else {
                        clearInterval(timer);
                        resolve();
                    }
                }, speed);
            });
        };

        const erase = (el, speed) => {
            return new Promise(resolve => {
                let text = el.textContent;
                let i = text.length;
                const timer = setInterval(() => {
                    if (i > 0) {
                        el.textContent = text.substring(0, i - 1);
                        i--;
                    } else {
                        clearInterval(timer);
                        resolve();
                    }
                }, speed);
            });
        };

        const startTyping = async () => {
            if (cursor1) cursor1.style.display = 'inline';
            if (cursor2) cursor2.style.display = 'none';

            await type(typingText, 'ROGEL JHON', config.typingSpeed);

            if (cursor1) cursor1.style.display = 'none';
            if (cursor2) cursor2.style.display = 'inline';

            await new Promise(r => setTimeout(r, 300));
            if (typingSubtitle) await type(typingSubtitle, 'Belinario', config.typingSpeed + 20);

        };

        setTimeout(startTyping, 400);
    },

    initHero() {
        if (!document.querySelector('.hero-name')) return;

        const tl = gsap.timeline();
        tl.to('.hero-name', { opacity: 1, x: 0, duration: 1.2, ease: "power3.out" })
            .to('.hero-credentials', { opacity: 1, x: 0, duration: 1, ease: "power2.out" }, "-=0.7");

        if (document.querySelector('.hero-bg')) {
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
        }

        if (document.querySelector('.hero-text-container')) {
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
        }
    },

    initContentSections() {
        if (!document.querySelector('.content-section')) return;
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
    },

    initHorizontalScroll() {
        const section = document.getElementById('certificates');
        const track = document.getElementById('horizontal-track');
        if (!section || !track) return;

        const getScrollAmount = () => -(track.scrollWidth - window.innerWidth);
        const scrollDistance = () => Math.abs(getScrollAmount()) * 1.2;

        gsap.to(track, {
            x: getScrollAmount,
            ease: "none",
            scrollTrigger: {
                trigger: section,
                start: "top top",
                end: () => `+=${scrollDistance()}`,
                pin: true,
                scrub: 0.5,
                invalidateOnRefresh: true
            }
        });
    },

    initProjectParallax() {
        document.querySelectorAll('.project-card-wrapper').forEach(card => {
            const inner = card.querySelector('.project-card');
            const overlay = card.querySelector('.shadow-overlay');
            const img = card.querySelector('.project-img-inner');

            gsap.to(inner, {
                scale: 0.95,
                scrollTrigger: { trigger: card, start: "top 10%", end: "bottom top", scrub: true }
            });

            gsap.to(overlay, {
                opacity: 0.6,
                scrollTrigger: { trigger: card, start: "top 10%", end: "bottom top", scrub: true }
            });

            gsap.to(img, {
                y: "10%",
                scrollTrigger: { trigger: card, start: "top bottom", end: "bottom top", scrub: true }
            });
        });
    },

    initProgressBar() {
        if (!document.getElementById('progress-bar')) return;
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
    },

    initFooter() {
        if (!document.querySelector('footer')) return;
        gsap.to('.footer-cta', {
            scrollTrigger: { trigger: 'footer', start: 'top 70%' },
            opacity: 1, y: 0, duration: 1, ease: "power2.out"
        });

        gsap.to('.footer-grid', {
            scrollTrigger: { trigger: 'footer', start: 'top 60%' },
            opacity: 1, y: 0, duration: 1, delay: 0.2, ease: "power2.out"
        });
    }
};

