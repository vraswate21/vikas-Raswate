document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS
    AOS.init({
        duration: 800,
        once: true,
        offset: 100
    });

    // Preloader
    const preloader = document.querySelector('.preloader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }, 1000);
    });

    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navHeight = document.querySelector('.main-nav').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navigation scroll effect
    const nav = document.querySelector('.main-nav');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });

    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
        });
    }

    // Particle.js initialization
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 60,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: '#00D9FF'
                },
                shape: {
                    type: 'circle'
                },
                opacity: {
                    value: 0.3,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 2,
                        size_min: 0.1,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#00D9FF',
                    opacity: 0.2,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: 'none',
                    random: true,
                    straight: false,
                    out_mode: 'out',
                    bounce: false
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: true,
                        mode: 'grab'
                    },
                    onclick: {
                        enable: true,
                        mode: 'push'
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 140,
                        line_linked: {
                            opacity: 0.5
                        }
                    },
                    push: {
                        particles_nb: 4
                    }
                }
            },
            retina_detect: true
        });
    }

    // Lightbox functionality
    const lightbox = document.getElementById('lightbox');
    const closeBtns = document.querySelectorAll('.close-btn');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxImageContainer = document.getElementById('lightbox-image-container');
    const lightboxDescription = document.getElementById('lightbox-description');

    const projectDetails = {
        easyshop: {
            title: 'Project EasyShop: Cloud-Native CI/CD Pipeline',
            image: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&h=500&fit=crop',
            description: 'Comprehensive microservices architecture deployed on AWS EKS with complete GitOps workflow using ArgoCD. This project demonstrates enterprise-grade CI/CD automation with zero-downtime deployments, automated rollbacks, and full observability through Prometheus and Grafana. The infrastructure is 100% reproducible using Terraform and follows DevSecOps best practices with vulnerability scanning, secrets management, and comprehensive monitoring.'
        },
        nopcommerce: {
            title: 'Secure & Scalable nopCommerce Deployment on AWS',
            image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=500&fit=crop',
            description: 'High-availability e-commerce platform deployment featuring AWS EC2 instances behind an Application Load Balancer with Amazon RDS for database resilience. Implemented comprehensive VPC security with multiple availability zones, auto-scaling groups, and CloudWatch monitoring. The architecture ensures 99.9% uptime with automated backups, disaster recovery procedures, and strict security controls including IAM policies, security groups, and encryption at rest and in transit.'
        },
        monitoring: {
            title: 'Enterprise Observability Stack Implementation',
            image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop',
            description: 'Complete observability solution for containerized microservices using Prometheus for metrics collection, Grafana for visualization, and Loki for centralized log aggregation. Features custom dashboards for real-time performance monitoring, intelligent alerting with Alertmanager, and integration with Slack for incident notifications. The stack provides full visibility into system health, application performance, and infrastructure metrics with historical data retention and trend analysis capabilities.'
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

    closeBtns.forEach(btn => {
        btn.addEventListener('click', closeLightbox);
    });

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.style.display === 'flex') {
            closeLightbox();
        }
    });

    function closeLightbox() {
        lightbox.style.display = 'none';
        document.body.style.overflow = '';
    }

    // Typing effect for terminal
    const terminalText = document.querySelector('.terminal-text');
    if (terminalText) {
        const text = terminalText.textContent;
        terminalText.textContent = '';
        let i = 0;
        
        function typeWriter() {
            if (i < text.length) {
                terminalText.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        }
        
        typeWriter();
    }

    // Form submission handling
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;

            // The form will handle the actual submission to Formspree
            // This is just for UI feedback
            setTimeout(() => {
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Sent!';
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }, 2000);
            }, 1000);
        });
    }

    // Add scroll reveal animations for timeline items
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.timeline-item, .project-card, .skill-category').forEach(el => {
        observer.observe(el);
    });

    // Add cursor follower effect (optional enhancement)
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateCursor() {
        const speed = 0.2;
        cursorX += (mouseX - cursorX) * speed;
        cursorY += (mouseY - cursorY) * speed;
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        requestAnimationFrame(animateCursor);
    }

    if (window.innerWidth > 768) {
        animateCursor();
    }

    // Add interactive hover effects to project cards
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Console easter egg
    console.log('%c👋 Hello there!', 'font-size: 20px; font-weight: bold; color: #00D9FF;');
    console.log('%cInterested in DevOps? Let\'s connect!', 'font-size: 14px; color: #7C3AED;');
    console.log('%cEmail: vikasraswate711@gmail.com', 'font-size: 12px; color: #9CA3AF;');
});
