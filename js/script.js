/**
 * 3D Developer Portfolio Script — Highly Animated Edition
 * Engineered for Pavithran V
 */

document.addEventListener('DOMContentLoaded', () => {

    // 1. Navigation Scroll Effect & Active Link Highlight
    const header = document.querySelector('header');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 140;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // 2. Typewriter Effect
    const typewriterElement = document.getElementById('typewriter-text');
    if (typewriterElement) {
        const words = [
            "Full-Stack Web Developer",
            "Python & Django Specialist",
            "Backend Engineer",
            "REST API Architect"
        ];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 90;

        function type() {
            const currentWord = words[wordIndex];
            
            if (isDeleting) {
                typewriterElement.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 45;
            } else {
                typewriterElement.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 95;
            }

            if (!isDeleting && charIndex === currentWord.length) {
                typingSpeed = 1800; // Pause at end of word
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                typingSpeed = 350; // Pause before typing new word
            }

            setTimeout(type, typingSpeed);
        }

        type();
    }

    // 3. 3D Tilt Effect on Mouse Move (for Hero Card)
    const tiltCard = document.getElementById('tilt-card');
    if (tiltCard) {
        tiltCard.addEventListener('mousemove', (e) => {
            const rect = tiltCard.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * -16;
            const rotateY = ((x - centerX) / centerX) * 16;

            tiltCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`;
        });

        tiltCard.addEventListener('mouseleave', () => {
            tiltCard.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
            tiltCard.style.transition = 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)';
        });

        tiltCard.addEventListener('mouseenter', () => {
            tiltCard.style.transition = 'none';
        });
    }

    // 3D Tilt for Cyber Sentry Spotlight Card
    const spotlightCard = document.querySelector('.project-spotlight-card');
    if (spotlightCard) {
        spotlightCard.addEventListener('mousemove', (e) => {
            const rect = spotlightCard.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -5;
            const rotateY = ((x - centerX) / centerX) * 5;
            spotlightCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
        });

        spotlightCard.addEventListener('mouseleave', () => {
            spotlightCard.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
            spotlightCard.style.transition = 'transform 0.4s ease';
        });

        spotlightCard.addEventListener('mouseenter', () => {
            spotlightCard.style.transition = 'none';
        });
    }

    // 4. Background 3D Particle Mesh Canvas
    const canvas = document.getElementById('bg-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        window.addEventListener('resize', () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            initParticles();
        });

        let mouse = { x: width / 2, y: height / 2 };
        window.addEventListener('mousemove', (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        });

        let particles = [];
        const count = Math.min(Math.floor((width * height) / 15000), 80);

        class Particle3D {
            constructor() {
                this.x = (Math.random() - 0.5) * width * 1.2;
                this.y = (Math.random() - 0.5) * height * 1.2;
                this.z = Math.random() * 800 + 100;
                this.size = Math.random() * 2 + 1;
                this.vx = (Math.random() - 0.5) * 0.45;
                this.vy = (Math.random() - 0.5) * 0.45;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                if (this.x < -width / 2) this.x = width / 2;
                if (this.x > width / 2) this.x = -width / 2;
                if (this.y < -height / 2) this.y = height / 2;
                if (this.y > height / 2) this.y = -height / 2;
            }

            draw() {
                const fov = 400;
                const scale = fov / (fov + this.z);
                const projX = (this.x - (mouse.x - width / 2) * 0.08) * scale + width / 2;
                const projY = (this.y - (mouse.y - height / 2) * 0.08) * scale + height / 2;
                const projRadius = this.size * scale;

                if (projX > 0 && projX < width && projY > 0 && projY < height) {
                    ctx.beginPath();
                    ctx.arc(projX, projY, Math.max(projRadius, 0.5), 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(99, 102, 241, ${0.45 * scale})`;
                    ctx.fill();
                }

                return { projX, projY, scale };
            }
        }

        function initParticles() {
            particles = [];
            for (let i = 0; i < count; i++) {
                particles.push(new Particle3D());
            }
        }

        function animate() {
            ctx.clearRect(0, 0, width, height);

            const projected = [];
            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                projected.push(particles[i].draw());
            }

            // Draw connecting lines between close points
            for (let i = 0; i < projected.length; i++) {
                for (let j = i + 1; j < projected.length; j++) {
                    const dx = projected[i].projX - projected[j].projX;
                    const dy = projected[i].projY - projected[j].projY;
                    const dist = Math.hypot(dx, dy);

                    if (dist < 115) {
                        const alpha = (1 - dist / 115) * 0.18 * projected[i].scale;
                        ctx.beginPath();
                        ctx.moveTo(projected[i].projX, projected[i].projY);
                        ctx.lineTo(projected[j].projX, projected[j].projY);
                        ctx.strokeStyle = `rgba(129, 140, 248, ${alpha})`;
                        ctx.lineWidth = 0.75;
                        ctx.stroke();
                    }
                }
            }

            requestAnimationFrame(animate);
        }

        initParticles();
        animate();
    }

    // 5. Scroll Reveal Observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.about-card, .soft-skill-card, .edu-card, .skill-category-card, .project-spotlight-card, .cert-card, .interest-card, .contact-card, .contact-form-card').forEach(el => {
        el.classList.add('reveal-item');
        revealObserver.observe(el);
    });

    // 6. Toast Notification
    const toast = document.getElementById('toast');
    window.showToast = function (msg) {
        if (!toast) return;
        toast.textContent = msg;
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    };

    // 7. Copy to Clipboard
    document.querySelectorAll('.btn-copy').forEach(btn => {
        btn.addEventListener('click', () => {
            const copyText = btn.getAttribute('data-copy');
            if (copyText) {
                navigator.clipboard.writeText(copyText).then(() => {
                    showToast(`Copied ${copyText} to clipboard!`);
                }).catch(() => {
                    showToast(`Contact: ${copyText}`);
                });
            }
        });
    });

    // 8. Modals (ATS Resume & Cyber Sentry Algorithm Demo)
    const resumeModal = document.getElementById('resume-modal');
    const openResumeBtns = document.querySelectorAll('.open-resume-btn');
    const closeResumeBtns = document.querySelectorAll('.close-resume-btn');

    openResumeBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            if (resumeModal) {
                resumeModal.classList.add('open');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    closeResumeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (resumeModal) {
                resumeModal.classList.remove('open');
                document.body.style.overflow = '';
            }
        });
    });

    // Cyber Sentry Demo Modal
    const demoModal = document.getElementById('demo-modal');
    const openDemoBtns = document.querySelectorAll('.open-demo-btn');
    const closeDemoBtns = document.querySelectorAll('.close-demo-btn');

    openDemoBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            if (demoModal) {
                demoModal.classList.add('open');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    closeDemoBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (demoModal) {
                demoModal.classList.remove('open');
                document.body.style.overflow = '';
            }
        });
    });

    // Close on backdrop click or ESC
    [resumeModal, demoModal].forEach(modal => {
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.classList.remove('open');
                    document.body.style.overflow = '';
                }
            });
        }
    });

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (resumeModal) resumeModal.classList.remove('open');
            if (demoModal) demoModal.classList.remove('open');
            document.body.style.overflow = '';
        }
    });

    // Print Resume
    const printBtn = document.getElementById('print-resume-btn');
    if (printBtn) {
        printBtn.addEventListener('click', () => {
            window.print();
        });
    }

    // 9. Interactive Algorithm logic in Demo Modal
    const verhoeffD = [
        [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        [1, 2, 3, 4, 0, 6, 7, 8, 9, 5],
        [2, 3, 4, 0, 1, 7, 8, 9, 5, 6],
        [3, 4, 0, 1, 2, 8, 9, 5, 6, 7],
        [4, 0, 1, 2, 3, 9, 5, 6, 7, 8],
        [5, 9, 8, 7, 6, 0, 4, 3, 2, 1],
        [6, 5, 9, 8, 7, 1, 0, 4, 3, 2],
        [7, 6, 5, 9, 8, 2, 1, 0, 4, 3],
        [8, 7, 6, 5, 9, 3, 2, 1, 0, 4],
        [9, 8, 7, 6, 5, 4, 3, 2, 1, 0]
    ];
    const verhoeffP = [
        [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
        [1, 5, 7, 6, 2, 8, 3, 0, 9, 4],
        [5, 8, 0, 3, 7, 9, 6, 1, 4, 2],
        [8, 9, 1, 6, 0, 4, 3, 5, 2, 7],
        [9, 4, 5, 3, 1, 2, 6, 8, 7, 0],
        [4, 2, 8, 6, 5, 7, 3, 9, 0, 1],
        [2, 7, 9, 3, 8, 0, 6, 4, 1, 5],
        [7, 0, 4, 6, 9, 1, 3, 2, 5, 8]
    ];

    function validateVerhoeff(numStr) {
        let c = 0;
        const reversed = numStr.replace(/\s+/g, '').split('').reverse().map(Number);
        for (let i = 0; i < reversed.length; i++) {
            c = verhoeffD[c][verhoeffP[i % 8][reversed[i]]];
        }
        return c === 0;
    }

    const testVerhoeffBtn = document.getElementById('test-verhoeff-btn');
    const verhoeffInput = document.getElementById('verhoeff-input');
    const verhoeffOutput = document.getElementById('verhoeff-output');

    if (testVerhoeffBtn && verhoeffInput && verhoeffOutput) {
        testVerhoeffBtn.addEventListener('click', () => {
            const val = verhoeffInput.value.trim();
            if (!val) {
                verhoeffOutput.innerHTML = '<span style="color:#f59e0b">Please enter a number.</span>';
                return;
            }
            const isValid = validateVerhoeff(val);
            if (isValid) {
                verhoeffOutput.innerHTML = '<span style="color:#10b981">✓ Valid Verhoeff Checksum (c === 0). No transposition or substitution error.</span>';
            } else {
                verhoeffOutput.innerHTML = '<span style="color:#ef4444">✕ Invalid Checksum. Alteration or forgery detected.</span>';
            }
        });
    }

    // 10. Contact Form Email Launcher
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('form-name').value.trim();
            const email = document.getElementById('form-email').value.trim();
            const message = document.getElementById('form-message').value.trim();

            const subject = encodeURIComponent(`Opportunity for Pavithran V from ${name}`);
            const body = encodeURIComponent(`Hi Pavithran,\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);

            window.location.href = `mailto:pavithranpavithran112@gmail.com?subject=${subject}&body=${body}`;
            showToast('Opening your email client to message Pavithran!');
            contactForm.reset();
        });
    }

    // Mobile menu toggle
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinksContainer = document.querySelector('.nav-links');
    if (mobileToggle && navLinksContainer) {
        mobileToggle.addEventListener('click', () => {
            const isFlex = navLinksContainer.style.display === 'flex';
            navLinksContainer.style.display = isFlex ? 'none' : 'flex';
            if (!isFlex) {
                navLinksContainer.style.flexDirection = 'column';
                navLinksContainer.style.position = 'absolute';
                navLinksContainer.style.top = '100%';
                navLinksContainer.style.left = '0';
                navLinksContainer.style.width = '100%';
                navLinksContainer.style.background = '#080b12';
                navLinksContainer.style.padding = '20px';
                navLinksContainer.style.borderBottom = '1px solid var(--border-subtle)';
            }
        });
    }
});

    // Mouse Spotlight Effect on Cards
    document.querySelectorAll('.spotlight-card, .about-card, .soft-skill-card, .edu-card, .skill-category-card, .project-spotlight-card, .cert-card').forEach(card => {
        card.classList.add('spotlight-card');
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });
