# 🎨 Rogel's Portfolio

> A modern, minimalist portfolio showcasing web development projects and IoT solutions with stunning animations, 3D experiences, and a seamless user interface.

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen?style=for-the-badge)](https://rodjdevsec.vercel.app)

![Portfolio Preview](assets/img/preview.png)

---

## 📋 About This Portfolio

This is a **fully responsive digital portfolio** built to highlight my journey as an **Information Technology student** and **full-stack developer**. It showcases projects ranging from **IoT systems** to **modern web applications** with a focus on immersive user experiences.

### Key Features:
- 🌟 **Premium Design** - Dark mode aesthetic with glassmorphism and smooth animations.
- 🧊 **3D Gallery** - An immersive 3D photo gallery built with **Three.js** and gyroscope support for mobile.
- 🎙️ **Voice Message** - Interactive voice introduction on the About page.
- ⚡ **Performance Optimized** - Fast loading with optimized assets and clean architecture.
- 📱 **Fully Responsive** - Tailored experience for both desktop and mobile users.
- 🎭 **Interactive UI** - Engaging animations powered by **GSAP** and **ScrollTrigger**.
- 🎯 **Modern Stack** - Minimalist and maintainable codebase.

---

## 🛠️ Tech Stack

### Languages & Frameworks
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

### Libraries & 3D
![GSAP](https://img.shields.io/badge/GSAP-88CE02?style=for-the-badge&logo=greensock&logoColor=white)
![Three.js](https://img.shields.io/badge/Three.js-black?style=for-the-badge&logo=three.js&logoColor=white)

### Security & Deployment
![Cloudflare Turnstile](https://img.shields.io/badge/Turnstile-F38020?style=for-the-badge&logo=cloudflare&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

---

## 📁 Project Structure

```
portfolio/
├── api/                   # Serverless functions (Vercel Backend)
│   └── send-message.js    # Secure form submission & Turnstile verification
├── assets/                # Media & static assets
│   ├── cert/              # Certification images
│   ├── dlh/               # DLH project assets
│   ├── img/               # UI icons, backgrounds & assets (e.g. preview.png, hero-bg.png)
│   ├── poultryfi/          # Poultry-Fi project assets
│   ├── travouge/          # Travouge project assets
│   ├── whereintapat/      # WhereInTapat project assets
│   ├── vm.m4a             # Voice Message audio file
│   └── Rogel Jhon A Belinario - Resume.pdf
├── css/                   # Styling
│   └── styles.css         # Custom styles & Tailwind utilities
├── js/                    # JavaScript modules
│   ├── animations.js      # GSAP & ScrollTrigger logic
│   ├── config.js          # App configuration
│   ├── data.js            # Project & certificate data
│   ├── events.js          # UI event handlers
│   ├── main.js            # Application entry & routing
│   └── ui.js              # UI component logic (Modals, Nav)
├── index.html             # Landing page / Home
├── about.html             # About me, Experience & Education
├── gallery.html           # 3D Immersive Photo Gallery
├── projects.html          # Detailed projects collection (Live Preview)
├── certificates.html      # Professional certifications gallery
├── contactform.html       # Interactive contact page with Turnstile
├── thankyou.html          # Form submission confirmation page
├── vercel.json            # Deployment & routing configuration (Clean URLs)
└── README.md              # Project documentation
```

## 📦 Installation & Setup

```bash
# Clone the repository
git clone https://github.com/rodjdevsec/portfolio.git

# Navigate to the project directory
cd portfolio

# Use Vercel CLI for local development with API support
vercel dev
```

---

<div align="center">

### ⭐ Star this repo if you found it helpful!

**Made with ❤️ by Rogel Jhon Belinario**

*© 2026 Rogel Jhon. All rights reserved.*

</div>
