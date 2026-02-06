export const config = {
    typingSpeed: 100,
    erasingSpeed: 80,
    typingDelay: 2000,
    carouselInterval: 2500,
    scrollThreshold: 300
};

export const state = {
    isMenuOpen: false,
    currentProject: null,
    carousel: {
        interval: null,
        index: 0,
        images: []
    }
};

