document.addEventListener('DOMContentLoaded', () => {

    // Preloader fade out
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        });
    }

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Scroll-triggered animations
    const animateOnScrollElements = document.querySelectorAll('.animate-on-scroll');
    const projectCards = document.querySelectorAll('.project-card');
    const timelineItems = document.querySelectorAll('.timeline-item');
    const skillBarItems = document.querySelectorAll('.skill-bar-item');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // If it's a skill bar, trigger fill animation
                if (entry.target.classList.contains('skill-bar-item')) {
                    const skillLevel = entry.target.dataset.skillLevel;
                    const skillFill = entry.target.querySelector('.skill-fill');
                    if (skillFill) {
                        skillFill.style.width = `${skillLevel}%`;
                    }
                }
                observer.unobserve(entry.target);
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    animateOnScrollElements.forEach(element => observer.observe(element));
    projectCards.forEach(element => observer.observe(element));
    timelineItems.forEach(element => observer.observe(element));
    skillBarItems.forEach(element => observer.observe(element));


    // Particle.js initialization
    particlesJS('particles-js', {
        "particles": {
            "number": {
                "value": 80,
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": {
                "value": "#7c3aed"
            },
            "shape": {
                "type": "circle",
                "stroke": {
                    "width": 0,
                    "color": "#000000"
                },
                "polygon": {
                    "nb_sides": 5
                },
                "image": {
                    "src": "img/github.svg",
                    "width": 100,
                    "height": 100
                }
            },
            "opacity": {
                "value": 0.5,
                "random": false,
                "anim": {
                    "enable": false,
                    "speed": 1,
                    "opacity_min": 0.1,
                    "sync": false
                }
            },
            "size": {
                "value": 3,
                "random": true,
                "anim": {
                    "enable": false,
                    "speed": 40,
                    "size_min": 0.1,
                    "sync": false
                }
            },
            "line_linked": {
                "enable": true,
                "distance": 150,
                "color": "#06b6d4",
                "opacity": 0.4,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 3,
                "direction": "none",
                "random": false,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
                "attract": {
                    "enable": false,
                    "rotateX": 600,
                    "rotateY": 1200
                }
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": "grab"
                },
                "onclick": {
                    "enable": true,
                    "mode": "push"
                },
                "resize": true
            },
            "modes": {
                "grab": {
                    "distance": 140,
                    "line_linked": {
                        "opacity": 1
                    }
                },
                "bubble": {
                    "distance": 400,
                    "size": 40,
                    "duration": 2,
                    "opacity": 8,
                    "speed": 3
                },
                "repulse": {
                    "distance": 200,
                    "duration": 0.4
                },
                "push": {
                    "particles_nb": 4
                },
                "remove": {
                    "particles_nb": 2
                }
            }
        },
        "retina_detect": true
    });

    // Lightbox functionality
    const lightbox = document.getElementById('lightbox');
    const closeBtn = document.querySelector('.close-btn');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxImageContainer = document.getElementById('lightbox-image-container');
    const lightboxDescription = document.getElementById('lightbox-description');

    const projectDetails = {
        easyshop: {
            title: 'Project EasyShop: Cloud-Native CI/CD',
            image: 'https://via.placeholder.com/600x400/06B6D4/FFFFFF?text=EasyShop+Architecture+Diagram',
            description: 'A detailed view of the EasyShop microservices architecture, showing a basic Kubernetes (EKS) cluster, ArgoCD for GitOps, and persistent storage solutions on AWS. This robust design demonstrates my ability to build and deploy applications with a focus on continuous delivery.'
        },
        nopcommerce: {
            title: 'Secure & Scalable Deployment of nopCommerce on AWS',
            image: 'https://via.placeholder.com/600x400/7C3AED/FFFFFF?text=nopCommerce+AWS+Diagram',
            description: 'Illustrates the deployment of nopCommerce on AWS, featuring EC2 instances behind an Application Load Balancer, Amazon RDS for a resilient database, and a Virtual Private Cloud (VPC) for secure networking. This project highlights my skill in using core AWS services to create a functional and reliable environment.'
        },
        monitoring: {
            title: 'Comprehensive Observability Stack Implementation',
            image: 'https://via.placeholder.com/600x400/06B6D4/FFFFFF?text=Monitoring+Dashboards+Screenshot',
            description: 'Screenshots of custom Grafana dashboards visualizing metrics from Prometheus and logs from Loki. These dashboards provide real-time insights into system health and demonstrate my ability to set up and manage a full observability stack.'
        }
    };

    document.querySelectorAll('.view-details-btn').forEach(button => {
        button.addEventListener('click', function() {
            const projectId = this.dataset.projectId;
            const details = projectDetails[projectId];

            if (details) {
                lightboxTitle.textContent = details.title;
                lightboxDescription.textContent = details.description;
                
                lightboxImageContainer.innerHTML = '';
                const img = document.createElement('img');
                img.src = details.image;
                img.alt = details.title;
                lightboxImageContainer.appendChild(img);

                lightbox.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            }
        });
    });

    closeBtn.addEventListener('click', () => {
        lightbox.style.display = 'none';
        document.body.style.overflow = '';
    });

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.style.display = 'none';
            document.body.style.overflow = '';
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.style.display === 'flex') {
            lightbox.style.display = 'none';
            document.body.style.overflow = '';
        }
    });
});