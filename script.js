// Navigation scroll effect
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Animated counter for stats
const animateCounter = (element) => {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;

    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };

    updateCounter();
};

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
            
            // Animate skill bars
            if (entry.target.classList.contains('skill-progress')) {
                const width = entry.target.getAttribute('data-width');
                entry.target.style.width = width + '%';
            }
            
            // Animate counters
            if (entry.target.classList.contains('stat-number')) {
                if (!entry.target.classList.contains('animated')) {
                    entry.target.classList.add('animated');
                    animateCounter(entry.target);
                }
            }
            
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    // Observe skill progress bars
    document.querySelectorAll('.skill-progress').forEach(bar => {
        observer.observe(bar);
    });
    
    // Observe stat numbers
    document.querySelectorAll('.stat-number').forEach(stat => {
        observer.observe(stat);
    });
    
    // Observe project cards
    document.querySelectorAll('.project-card').forEach(card => {
        observer.observe(card);
    });
    
    // Observe about content
    document.querySelectorAll('.about-text, .about-image').forEach(element => {
        observer.observe(element);
    });
});

// Form submission handler
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');
        
        // Here you would typically send this to a server
        // For now, we'll just show an alert
        alert(`Thank you for your message, ${name}! I'll get back to you soon.`);
        
        // Reset form
        contactForm.reset();
    });
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const shapes = hero.querySelectorAll('.shape');
        shapes.forEach((shape, index) => {
            const speed = 0.5 + (index * 0.1);
            shape.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
        });
    }
});

// Add active state to navigation links based on scroll position
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// Initialize on page load
window.addEventListener('load', () => {
    // Add fade-in animation to hero content
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.animation = 'fadeInUp 0.8s ease-out forwards';
    }
});

// Show More/Less Certifications functionality
const showMoreCertsBtn = document.getElementById('showMoreCerts');
const showLessCertsBtn = document.getElementById('showLessCerts');
const hiddenCerts = document.querySelectorAll('.cert-hidden');

if (showMoreCertsBtn && showLessCertsBtn && hiddenCerts.length > 0) {
    showMoreCertsBtn.addEventListener('click', () => {
        hiddenCerts.forEach(cert => {
            cert.classList.add('show');
        });
        showMoreCertsBtn.classList.add('hide');
        showLessCertsBtn.classList.add('show');
        // Smooth scroll to show less button
        setTimeout(() => {
            showLessCertsBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 300);
    });
    
    showLessCertsBtn.addEventListener('click', () => {
        hiddenCerts.forEach(cert => {
            cert.classList.remove('show');
        });
        showMoreCertsBtn.classList.remove('hide');
        showLessCertsBtn.classList.remove('show');
        // Smooth scroll back to certifications section
        setTimeout(() => {
            document.getElementById('certifications').scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 300);
    });
} else if (showMoreCertsBtn && hiddenCerts.length === 0) {
    // Hide button if there are no hidden certifications
    showMoreCertsBtn.style.display = 'none';
    if (showLessCertsBtn) {
        showLessCertsBtn.style.display = 'none';
    }
}

// Update certificate count dynamically
function updateCertificateCount() {
    const certificateCount = document.querySelectorAll('.cert-card').length;
    const certCountElement = document.getElementById('certificate-count');
    if (certCountElement) {
        certCountElement.setAttribute('data-target', certificateCount);
        // Animate the counter
        if (certCountElement.classList.contains('animated')) {
            certCountElement.textContent = certificateCount;
        } else {
            animateCounter(certCountElement);
        }
    }
}

// Update project count dynamically
function updateProjectCount() {
    const projectCount = document.querySelectorAll('.project-card').length;
    const projectCountElement = document.getElementById('project-count');
    if (projectCountElement) {
        projectCountElement.setAttribute('data-target', projectCount);
        // Animate the counter
        if (projectCountElement.classList.contains('animated')) {
            projectCountElement.textContent = projectCount;
        } else {
            animateCounter(projectCountElement);
        }
    }
}

// Experience More/Less functionality
document.addEventListener('DOMContentLoaded', () => {
    const timelineMoreBtns = document.querySelectorAll('.timeline-more-btn');
    const timelineLessBtns = document.querySelectorAll('.timeline-less-btn');
    
    timelineMoreBtns.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            const timelineItem = btn.closest('.timeline-item');
            const extraContent = timelineItem.querySelectorAll('.timeline-extra');
            const lessBtn = timelineItem.querySelector('.timeline-less-btn');
            
            extraContent.forEach(p => {
                p.style.display = 'block';
            });
            btn.style.display = 'none';
            if (lessBtn) {
                lessBtn.style.display = 'inline-block';
            }
        });
    });
    
    timelineLessBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
            const timelineItem = btn.closest('.timeline-item');
            const extraContent = timelineItem.querySelectorAll('.timeline-extra');
            const moreBtn = timelineItem.querySelector('.timeline-more-btn');
            
            extraContent.forEach(p => {
                p.style.display = 'none';
            });
            btn.style.display = 'none';
            if (moreBtn) {
                moreBtn.style.display = 'inline-block';
            }
        });
    });
    
    // Awards More/Less functionality
    const showMoreAwardsBtn = document.getElementById('showMoreAwards');
    const showLessAwardsBtn = document.getElementById('showLessAwards');
    const hiddenAwards = document.querySelectorAll('.award-hidden');
    
    if (showMoreAwardsBtn && showLessAwardsBtn && hiddenAwards.length > 0) {
        showMoreAwardsBtn.addEventListener('click', () => {
            hiddenAwards.forEach(award => {
                award.classList.remove('award-hidden');
                award.classList.add('fade-in-up');
            });
            showMoreAwardsBtn.style.display = 'none';
            showLessAwardsBtn.style.display = 'inline-block';
            setTimeout(() => {
                showLessAwardsBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }, 300);
        });
        
        showLessAwardsBtn.addEventListener('click', () => {
            hiddenAwards.forEach(award => {
                award.classList.add('award-hidden');
                award.classList.remove('fade-in-up');
            });
            showMoreAwardsBtn.style.display = 'inline-block';
            showLessAwardsBtn.style.display = 'none';
            setTimeout(() => {
                document.getElementById('awards').scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 300);
        });
    } else if (showMoreAwardsBtn && hiddenAwards.length === 0) {
        showMoreAwardsBtn.style.display = 'none';
        if (showLessAwardsBtn) {
            showLessAwardsBtn.style.display = 'none';
        }
    }
    
    // Project Description More/Less functionality
    const projectMoreBtns = document.querySelectorAll('.project-more-btn');
    const projectLessBtns = document.querySelectorAll('.project-less-btn');
    
    projectMoreBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
            const projectCard = btn.closest('.project-card');
            const extraContent = projectCard.querySelectorAll('.project-description-extra');
            const lessBtn = projectCard.querySelector('.project-less-btn');
            
            extraContent.forEach(p => {
                p.style.display = 'block';
            });
            btn.style.display = 'none';
            if (lessBtn) {
                lessBtn.style.display = 'inline-block';
            }
        });
    });
    
    projectLessBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
            const projectCard = btn.closest('.project-card');
            const extraContent = projectCard.querySelectorAll('.project-description-extra');
            const moreBtn = projectCard.querySelector('.project-more-btn');
            
            extraContent.forEach(p => {
                p.style.display = 'none';
            });
            btn.style.display = 'none';
            if (moreBtn) {
                moreBtn.style.display = 'inline-block';
            }
        });
    });
    
    // Experience Show More/Less functionality
    const showMoreExperiencesBtn = document.getElementById('showMoreExperiences');
    const showLessExperiencesBtn = document.getElementById('showLessExperiences');
    const hiddenExperiences = document.querySelectorAll('.experience-hidden');
    
    if (showMoreExperiencesBtn && showLessExperiencesBtn && hiddenExperiences.length > 0) {
        showMoreExperiencesBtn.addEventListener('click', () => {
            hiddenExperiences.forEach(exp => {
                exp.style.display = 'grid';
                exp.classList.add('fade-in-up');
            });
            showMoreExperiencesBtn.style.display = 'none';
            showLessExperiencesBtn.style.display = 'inline-block';
            setTimeout(() => {
                showLessExperiencesBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }, 300);
        });
        
        showLessExperiencesBtn.addEventListener('click', () => {
            hiddenExperiences.forEach(exp => {
                exp.style.display = 'none';
                exp.classList.remove('fade-in-up');
            });
            showMoreExperiencesBtn.style.display = 'inline-block';
            showLessExperiencesBtn.style.display = 'none';
            setTimeout(() => {
                document.getElementById('experience').scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 300);
        });
    } else if (showMoreExperiencesBtn && hiddenExperiences.length === 0) {
        showMoreExperiencesBtn.style.display = 'none';
        if (showLessExperiencesBtn) {
            showLessExperiencesBtn.style.display = 'none';
        }
    }
    
    // Projects More/Less functionality
    const showMoreProjectsBtn = document.getElementById('showMoreProjects');
    const showLessProjectsBtn = document.getElementById('showLessProjects');
    const hiddenProjects = document.querySelectorAll('.project-hidden');
    
    if (showMoreProjectsBtn && showLessProjectsBtn && hiddenProjects.length > 0) {
        showMoreProjectsBtn.addEventListener('click', () => {
            hiddenProjects.forEach(project => {
                project.classList.remove('project-hidden');
            });
            showMoreProjectsBtn.style.display = 'none';
            showLessProjectsBtn.style.display = 'inline-block';
            setTimeout(() => {
                showLessProjectsBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }, 300);
        });
        
        showLessProjectsBtn.addEventListener('click', () => {
            hiddenProjects.forEach(project => {
                project.classList.add('project-hidden');
            });
            showMoreProjectsBtn.style.display = 'inline-block';
            showLessProjectsBtn.style.display = 'none';
            setTimeout(() => {
                document.getElementById('projects').scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 300);
        });
    } else if (showMoreProjectsBtn && hiddenProjects.length === 0) {
        showMoreProjectsBtn.style.display = 'none';
        if (showLessProjectsBtn) {
            showLessProjectsBtn.style.display = 'none';
        }
    }
    
    // Update certificate count on page load
    updateCertificateCount();
    
    // Update project count on page load
    updateProjectCount();
    
    // Observe certificate grid for changes
    const certGrid = document.getElementById('certificationsGrid');
    if (certGrid) {
        const certObserver = new MutationObserver(() => {
            updateCertificateCount();
        });
        certObserver.observe(certGrid, { childList: true, subtree: true });
    }
    
    // Observe project grid for changes
    const projectGrid = document.querySelector('.projects-grid');
    if (projectGrid) {
        const projectObserver = new MutationObserver(() => {
            updateProjectCount();
        });
        projectObserver.observe(projectGrid, { childList: true, subtree: true });
    }
    
    // Technical Skills More/Less functionality
    const showMoreTechnicalSkillsBtn = document.getElementById('showMoreTechnicalSkills');
    const showLessTechnicalSkillsBtn = document.getElementById('showLessTechnicalSkills');
    const technicalSkillTags = document.querySelectorAll('.skill-category:first-of-type .skill-tag-hidden');
    
    if (showMoreTechnicalSkillsBtn && showLessTechnicalSkillsBtn && technicalSkillTags.length > 0) {
        showMoreTechnicalSkillsBtn.addEventListener('click', () => {
            technicalSkillTags.forEach(tag => {
                tag.classList.add('show');
            });
            showMoreTechnicalSkillsBtn.style.display = 'none';
            showLessTechnicalSkillsBtn.style.display = 'inline-block';
        });
        
        showLessTechnicalSkillsBtn.addEventListener('click', () => {
            technicalSkillTags.forEach(tag => {
                tag.classList.remove('show');
            });
            showMoreTechnicalSkillsBtn.style.display = 'inline-block';
            showLessTechnicalSkillsBtn.style.display = 'none';
        });
    } else if (showMoreTechnicalSkillsBtn && technicalSkillTags.length === 0) {
        showMoreTechnicalSkillsBtn.style.display = 'none';
        if (showLessTechnicalSkillsBtn) {
            showLessTechnicalSkillsBtn.style.display = 'none';
        }
    }
    
    // Soft Skills More/Less functionality
    const showMoreSoftSkillsBtn = document.getElementById('showMoreSoftSkills');
    const showLessSoftSkillsBtn = document.getElementById('showLessSoftSkills');
    const softSkillTags = document.querySelectorAll('.skill-category:last-of-type .skill-tag-hidden');
    
    if (showMoreSoftSkillsBtn && showLessSoftSkillsBtn && softSkillTags.length > 0) {
        showMoreSoftSkillsBtn.addEventListener('click', () => {
            softSkillTags.forEach(tag => {
                tag.classList.add('show');
            });
            showMoreSoftSkillsBtn.style.display = 'none';
            showLessSoftSkillsBtn.style.display = 'inline-block';
        });
        
        showLessSoftSkillsBtn.addEventListener('click', () => {
            softSkillTags.forEach(tag => {
                tag.classList.remove('show');
            });
            showMoreSoftSkillsBtn.style.display = 'inline-block';
            showLessSoftSkillsBtn.style.display = 'none';
        });
    } else if (showMoreSoftSkillsBtn && softSkillTags.length === 0) {
        showMoreSoftSkillsBtn.style.display = 'none';
        if (showLessSoftSkillsBtn) {
            showLessSoftSkillsBtn.style.display = 'none';
        }
    }
    
    // Timeline line positioning - center on dots and span from first to last
    const timeline = document.querySelector('.timeline');
    if (timeline) {
        const updateTimelineLine = () => {
            // Get all timeline items (including hidden ones)
            const allItems = Array.from(timeline.querySelectorAll('.timeline-item'));
            
            // Get visible items (not hidden and actually displayed)
            const visibleItems = allItems.filter(item => {
                const style = window.getComputedStyle(item);
                return style.display !== 'none' && !item.classList.contains('experience-hidden');
            });
            
            // Get the last item overall (oldest experience - Oct - Dec 2020)
            const lastItemOverall = allItems[allItems.length - 1];
            
            // Check if there are hidden items that are not displayed
            const hiddenItems = allItems.filter(item => item.classList.contains('experience-hidden'));
            const hasHiddenItems = hiddenItems.some(item => {
                const style = window.getComputedStyle(item);
                return style.display === 'none';
            });
            
            if (visibleItems.length > 0) {
                const firstItem = visibleItems[0];
                const lastVisibleItem = visibleItems[visibleItems.length - 1];
                
                // Get positions relative to timeline container
                const timelineRect = timeline.getBoundingClientRect();
                const firstItemRect = firstItem.getBoundingClientRect();
                const lastVisibleItemRect = lastVisibleItem.getBoundingClientRect();
                
                // Calculate top position (center of first dot - dots are at 50% of item height)
                const topPosition = firstItemRect.top - timelineRect.top + (firstItemRect.height / 2);
                
                // Calculate height
                let lineHeight;
                if (hasHiddenItems) {
                    // If there are hidden items, extend the line just a bit past the last visible dot
                    // Extend the entire line length by 40%
                    const lastVisibleDotCenter = lastVisibleItemRect.top - timelineRect.top + (lastVisibleItemRect.height / 2);
                    const baseLineHeight = (lastVisibleDotCenter - topPosition) + 25; // Base extension
                    lineHeight = baseLineHeight * 1.4; // Extend entire line by 40%
                } else {
                    // If all items are visible, end at the center of the last (oldest) dot
                    const lastItemRect = lastItemOverall.getBoundingClientRect();
                    const lastDotCenter = lastItemRect.top - timelineRect.top + (lastItemRect.height / 2);
                    lineHeight = lastDotCenter - topPosition;
                }
                
                // Set line position using CSS custom properties
                timeline.style.setProperty('--timeline-top', `${topPosition}px`);
                timeline.style.setProperty('--timeline-height', `${lineHeight}px`);
            }
        };
        
        // Update on load
        setTimeout(updateTimelineLine, 200);
        
        // Update when hidden items are shown/hidden
        const showMoreExperiencesBtn = document.getElementById('showMoreExperiences');
        const showLessExperiencesBtn = document.getElementById('showLessExperiences');
        
        if (showMoreExperiencesBtn) {
            showMoreExperiencesBtn.addEventListener('click', () => {
                setTimeout(updateTimelineLine, 400);
            });
        }
        
        if (showLessExperiencesBtn) {
            showLessExperiencesBtn.addEventListener('click', () => {
                setTimeout(updateTimelineLine, 400);
            });
        }
        
        // Update on window resize
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(updateTimelineLine, 250);
        });
        
        // Also update when page is fully loaded
        window.addEventListener('load', () => {
            setTimeout(updateTimelineLine, 300);
        });
    }
});

