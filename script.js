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

// ============================================
// Skills Section Auto-Detection System
// ============================================

// Comprehensive Skills Database
const skillsDatabase = {
    designSimulation: [
        'OpenFOAM', 'ANSYS Fluent', 'STAR-CCM+', 'SU2', 'COMSOL Multiphysics', 'FEniCS', 'Firedrake',
        'Deal.II', 'MFEM', 'ANSYS Mechanical', 'APDL', 'Abaqus', 'LS-DYNA', 'SolidWorks', 'Fusion 360',
        'Siemens NX', 'CATIA', 'Onshape', 'FreeCAD', 'Granta Edupack', 'Computer Vision Studio', 'Tinkercad',
        'ParaView', 'VisIt', 'Tecplot', 'Gmsh', 'Salome Platform', 'EnergyPlus', 'eQuest', 'PVsyst',
        'ETAP', 'PSCAD', 'Plexim', 'Creo Parametric', 'Inventor', 'Mastercam', 'KiCAD'
    ],
    programming: [
        'Python', 'C++', 'C/C++', 'Fortran', 'Julia', 'Rust', 'MATLAB', 'Simulink', 'Mathematica',
        'HTML', 'GoLang', 'Verilog', 'VHDL'
    ],
    interest: [
        'Running', 'Badminton', 'Marathon', 'Ultra-running', 'Triathlon', 'Ironman', 'Mountaineering', 'Alpinism',
        'Rock Climbing', 'Volunteering', 'Science Outreach', 'STEM Workshops', 'Red Cross', 'Disaster Response',
        'Environmental Cleanups', 'Amateur Radio', 'HAM', 'Photography', 'Scientific Imaging', 'Speedcubing',
        'Rubik\'s', 'Chess', 'Piano', 'Musical Instrument', 'Meditation', 'Mindfulness', 'Yoga',
        'First-aid', 'Wilderness Medicine', 'Scuba Diving', 'PADI', 'Sailing', 'Beekeeping',
        'Urban Gardening', 'Hydroponics', 'Home Biotechnology', 'DIYbio', 'Open-source', 'Blogging',
        'Scientific Writing', 'Podcasting', 'Mechanical Keyboards', 'Coffee Roasting', 'Fermentation',
        'Sourdough', 'Microbiology', 'Home Lab Spectroscopy', 'Folding@Home', 'DreamLab',
        'Physics', 'Quantum Mechanics', 'General Relativity', 'Energy', 'Sustainability', 
        'Medicine', 'Finance', 'Trading', 'Valuation', 'Market Analysis'
    ],
    technicalLab: [
        'Qiskit', 'Cirq', 'OpenFermion', 'Pennylane', 'Strawberry Fields', 'Xanadu', 'TKET', 'pytket',
        'Quantum Error Correction', 'Quantum Mitigation', 'Qiskit Pulse', 'QuilC', 'VQE', 'QAOA',
        'Quantum Technology', 'Quantum Technologies', 'Quantum Computing', 'Quantum Machine Learning',
        'Machine Learning', 'Deep Learning',
        'Neural Networks', 'Scikit-Learn', 'TensorFlow', 'TF Quantum', 'JAX', 'Flax', 'NumPy', 'SciPy',
        'Pandas', 'Dask', 'Ray', 'Numba', 'CuPy', 'PyTorch', 'Git', 'GitHub', 'GitLab', 'Docker',
        'Singularity', 'Apptainer', 'Kubernetes', 'SLURM', 'PBS', 'LSF', 'MPI', 'OpenMP', 'CUDA',
        'LaTeX', 'Overleaf', 'BibTeX', 'Linux', 'Ubuntu', 'Rocky', 'Arch', 'Bash', 'Zsh', 'Conda',
        'Mamba', 'Pixi', 'Poetry', 'UV', 'JupyterLab', 'VS Code', 'Remote SSH', 'Neovim', 'Vim',
        'LabVIEW', 'RF Engineering', 'Microwave', 'Resonators', 'Cryogenics', 'Dilution Refrigerators',
        'Superconducting Qubits', 'Trapped-ion', 'Photonic Quantum', 'Neutral-atom', 'Pasqal', 'QuEra',
        'NV-center', 'Quantum Sensing', 'LAMMPS', 'GROMACS', 'OpenMM', 'PyBaMM', 'Cantera',
        'OpenMC', 'Serpent', 'MOOSE', 'DAGMC', 'Reduced-order Modelling', 'POD', 'DMD',
        'Gaussian Processes', 'Bayesian Optimization', 'BoTorch', 'Machine Learning for Physics',
        'Inverse Design', 'Topology Optimization', 'Arduino', 'Raspberry Pi', 'FPGA', 'ROS2',
        '3D Printing', 'Prusa', 'Bambu', 'Resin', 'PCB Design', 'Soldering', 'OriginPro',
        'AWS', 'ParallelCluster', 'GCP', 'Azure Quantum', 'GitHub Actions', 'CI/CD', 'Terraform',
        'QKD', 'Post-quantum Cryptography', 'Quantum Networking', 'Topological Qubits',
        'Majorana Zero Modes', 'QuTiP', 'ProjectQ', 'Yao.jl', 'CRISPR-Cas9', 'Gene Editing',
        'Gene-Therapy', 'microRNA', 'mRNA', 'Lipid Nanoparticles', 'AAV', 'Lentivirus',
        'Single-cell RNA Sequencing', 'scRNA-Seq', 'Bioinformatics', 'AlphaFold', 'ESMFold',
        'Molecular Dynamics', 'Biomolecules', 'Drug Discovery', 'Virtual Screening',
        'Synthetic Biology', 'Organ-on-chip', 'Microfluidics', 'Biopython', 'Nextflow',
        'Snakemake', 'Fusion Energy', 'Tokamak', 'Stellarator', 'ICF', 'Plasma Physics',
        'MHD', 'Gyrokinetic', 'Tritium', 'Hydrogen Economy', 'Electrolysis', 'Solid-state Batteries',
        'Flow Batteries', 'Carbon Capture', 'CCS', 'Geothermal', 'Reservoir Modelling',
        'Grid-scale Energy Storage', 'Power Electronics', 'CFD', 'FEA', 'Finite Element Analysis',
        'Structural Analysis', 'Vibration Analysis', 'Modal Analysis', 'Embedded Systems',
        'Robotics', 'Control Systems', 'Simulation', 'Ansys', 'Oil & Gas'
    ],
    languages: [
        'English (Fluent)', 'Malay (Native)', 'German (CEFR B1+)'
    ]
};

// Flatten all skills for easier searching
const allSkills = [
    ...skillsDatabase.designSimulation,
    ...skillsDatabase.programming,
    ...skillsDatabase.interest,
    ...skillsDatabase.technicalLab,
    ...skillsDatabase.languages
];

// Function to find which category a skill belongs to
function getSkillCategory(skillName) {
    const skillLower = skillName.toLowerCase();
    for (const [category, skills] of Object.entries(skillsDatabase)) {
        // Check for exact match (case-insensitive)
        if (skills.some(s => s.toLowerCase() === skillLower)) {
            return category;
        }
        // Check for partial match (e.g., "Python" matches "Python" in list)
        if (skills.some(s => {
            const sLower = s.toLowerCase();
            return sLower === skillLower || 
                   sLower.includes(skillLower) || 
                   skillLower.includes(sLower);
        })) {
            return category;
        }
    }
    return null;
}

// Fuzzy matching function
function fuzzyMatchSkill(content, skillName) {
    if (!content || !skillName) return false;
    
    const contentLower = content.toLowerCase();
    const skillLower = skillName.toLowerCase();
    
    // Escape special regex characters
    const escapedSkill = skillLower.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    
    // Word boundary match (most reliable)
    const wordBoundaryRegex = new RegExp(`\\b${escapedSkill}\\b`, 'i');
    if (wordBoundaryRegex.test(content)) {
        return true;
    }
    
    // Handle variations with punctuation
    const variations = [
        skillLower + ' +',
        skillLower + '/',
        skillLower + ',',
        skillLower + ' (',
        '+' + skillLower,
        '/' + skillLower,
        ',' + skillLower,
        '(' + skillLower
    ];
    
    for (const variation of variations) {
        if (contentLower.includes(variation)) {
            return true;
        }
    }
    
    // Handle special cases
    if (skillName === 'C/C++' || skillName === 'C++') {
        if (contentLower.includes('c++') || contentLower.includes('c/c++') || contentLower.includes('c++')) {
            return true;
        }
    }
    if (skillName === 'MATLAB' || skillName === 'MATLAB + Simulink') {
        if (contentLower.includes('matlab')) {
            return true;
        }
    }
    if (skillName === 'Python') {
        if (contentLower.includes('python')) {
            return true;
        }
    }
    
    // Handle language variations
    if (skillName === 'English' || skillName === 'English (Fluent)') {
        if (contentLower.includes('english')) {
            return true;
        }
    }
    if (skillName === 'Malay' || skillName === 'Malay (Native)') {
        if (contentLower.includes('malay')) {
            return true;
        }
    }
    if (skillName === 'German' || skillName === 'German (CEFR B1+)') {
        if (contentLower.includes('german')) {
            return true;
        }
    }
    
    return false;
}

// Extract skills from content
function extractSkillsFromContent() {
    const skillCounts = new Map();
    // Exclude languages from extraction (they are static)
    const skillsToExtract = allSkills.filter(skill => !skillsDatabase.languages.includes(skill));
    
    // Extract from Experiences (timeline descriptions)
    const timelineDescriptions = document.querySelectorAll('.timeline-description');
    timelineDescriptions.forEach(desc => {
        const text = desc.textContent || '';
        skillsToExtract.forEach(skill => {
            if (fuzzyMatchSkill(text, skill)) {
                skillCounts.set(skill, (skillCounts.get(skill) || 0) + 1);
            }
        });
    });
    
    // Extract from Projects (descriptions and tags)
    const projectDescriptions = document.querySelectorAll('.project-description');
    projectDescriptions.forEach(desc => {
        const text = desc.textContent || '';
        skillsToExtract.forEach(skill => {
            if (fuzzyMatchSkill(text, skill)) {
                skillCounts.set(skill, (skillCounts.get(skill) || 0) + 1);
            }
        });
    });
    
    const projectTags = document.querySelectorAll('.project-tag');
    projectTags.forEach(tag => {
        const text = tag.textContent.trim();
        // Direct match first (exact or case-insensitive)
        let matched = false;
        for (const skill of skillsToExtract) {
            if (text.toLowerCase() === skill.toLowerCase() || fuzzyMatchSkill(text, skill)) {
                skillCounts.set(skill, (skillCounts.get(skill) || 0) + 1);
                matched = true;
                break; // Only count once per tag
            }
        }
    });
    
    // Extract from Certifications (tags)
    const certTags = document.querySelectorAll('.cert-tag');
    certTags.forEach(tag => {
        const text = tag.textContent.trim();
        // Direct match first (exact or case-insensitive)
        let matched = false;
        for (const skill of skillsToExtract) {
            if (text.toLowerCase() === skill.toLowerCase() || fuzzyMatchSkill(text, skill)) {
                skillCounts.set(skill, (skillCounts.get(skill) || 0) + 1);
                matched = true;
                break; // Only count once per tag
            }
        }
    });
    
    // Extract from Awards (titles and events)
    const awardTitles = document.querySelectorAll('.award-title');
    const awardEvents = document.querySelectorAll('.award-event');
    [...awardTitles, ...awardEvents].forEach(elem => {
        const text = elem.textContent || '';
        skillsToExtract.forEach(skill => {
            if (fuzzyMatchSkill(text, skill)) {
                skillCounts.set(skill, (skillCounts.get(skill) || 0) + 1);
            }
        });
    });
    
    return skillCounts;
}

// Render skills section
function renderSkillsSection() {
    const skillCounts = extractSkillsFromContent();
    const skillsGrid = document.querySelector('.skills-grid');
    
    if (!skillsGrid) return;
    
    // Group skills by category
    const categorizedSkills = {
        designSimulation: [],
        programming: [],
        interest: [],
        technicalLab: [],
        languages: []
    };
    
    skillCounts.forEach((count, skill) => {
        const category = getSkillCategory(skill);
        // Skip languages - they will be added statically
        if (category && categorizedSkills[category] && category !== 'languages') {
            categorizedSkills[category].push({ skill, count });
        }
    });
    
    // Add languages statically (not extracted from content)
    skillsDatabase.languages.forEach(lang => {
        categorizedSkills.languages.push({ skill: lang, count: 1 });
    });
    
    // Sort by count (descending), then alphabetically
    Object.keys(categorizedSkills).forEach(category => {
        if (category === 'interest') {
            // Special sorting for interest: Running first, then by count, then alphabetically
            categorizedSkills[category].sort((a, b) => {
                if (a.skill.toLowerCase() === 'running') return -1;
                if (b.skill.toLowerCase() === 'running') return 1;
                if (b.count !== a.count) return b.count - a.count;
                return a.skill.localeCompare(b.skill);
            });
        } else if (category === 'languages') {
            // Languages: maintain order (English, Malay, German)
            const langOrder = ['English (Fluent)', 'Malay (Native)', 'German (CEFR B1+)'];
            categorizedSkills[category].sort((a, b) => {
                const aIndex = langOrder.indexOf(a.skill);
                const bIndex = langOrder.indexOf(b.skill);
                if (aIndex === -1 && bIndex === -1) return 0;
                if (aIndex === -1) return 1;
                if (bIndex === -1) return -1;
                return aIndex - bIndex;
            });
        } else {
            categorizedSkills[category].sort((a, b) => {
                if (b.count !== a.count) return b.count - a.count;
                return a.skill.localeCompare(b.skill);
            });
        }
    });
    
    // Category display names
    const categoryNames = {
        designSimulation: 'Design/Simulation Software',
        programming: 'Programming Languages',
        interest: 'Interest',
        technicalLab: 'Technical',
        languages: 'Languages'
    };
    
    // Generate HTML
    let html = '';
    Object.keys(categorizedSkills).forEach(category => {
        const skills = categorizedSkills[category];
        // Always show languages, skip other empty categories
        if (skills.length === 0 && category !== 'languages') return;
        
        const categoryName = categoryNames[category];
        const visibleSkills = skills.slice(0, 5);
        const hiddenSkills = skills.slice(5);
        const hasMore = hiddenSkills.length > 0;
        // Convert camelCase to kebab-case for IDs
        const categoryId = category.replace(/([A-Z])/g, '-$1').toLowerCase().replace(/^-/, '');
        
        html += `
            <div class="skill-category">
                <h3 class="skill-category-title">${categoryName}</h3>
                <div class="skill-tags">
        `;
        
        // Visible skills
        visibleSkills.forEach(({ skill, count }) => {
            // Languages don't show counts
            if (category === 'languages') {
                html += `<span class="skill-tag">${skill}</span>`;
            } else {
                html += `<span class="skill-tag">${skill}${count > 1 ? ` (${count})` : ''}</span>`;
            }
        });
        
        // Hidden skills
        if (hasMore) {
            hiddenSkills.forEach(({ skill, count }) => {
                // Languages don't show counts
                if (category === 'languages') {
                    html += `<span class="skill-tag skill-tag-hidden">${skill}</span>`;
                } else {
                    html += `<span class="skill-tag skill-tag-hidden">${skill}${count > 1 ? ` (${count})` : ''}</span>`;
                }
            });
        }
        
        html += `
                </div>
        `;
        
        // Show More/Less buttons
        if (hasMore) {
            html += `
                <div class="skills-more">
                    <button id="showMore${categoryId}" class="btn btn-secondary">Show More</button>
                    <button id="showLess${categoryId}" class="btn btn-secondary" style="display: none;">Show Less</button>
                </div>
            `;
        }
        
        html += `</div>`;
    });
    
    skillsGrid.innerHTML = html;
    
    // Re-attach event listeners for Show More/Less
    attachSkillsMoreLessListeners();
}

// Attach Show More/Less event listeners
function attachSkillsMoreLessListeners() {
    const categories = ['designSimulation', 'programming', 'interest', 'technicalLab', 'languages'];
    
    categories.forEach(category => {
        // Convert camelCase to kebab-case for IDs
        const categoryId = category.replace(/([A-Z])/g, '-$1').toLowerCase().replace(/^-/, '');
        const showMoreBtn = document.getElementById(`showMore${categoryId}`);
        const showLessBtn = document.getElementById(`showLess${categoryId}`);
        
        if (showMoreBtn && showLessBtn) {
            // Find the parent skill-category and then find hidden tags within it
            const skillCategory = showMoreBtn.closest('.skill-category');
            if (skillCategory) {
                const hiddenTags = skillCategory.querySelectorAll('.skill-tag-hidden');
                
                if (hiddenTags.length > 0) {
                    // Remove existing listeners by cloning
                    const newShowMoreBtn = showMoreBtn.cloneNode(true);
                    const newShowLessBtn = showLessBtn.cloneNode(true);
                    showMoreBtn.parentNode.replaceChild(newShowMoreBtn, showMoreBtn);
                    showLessBtn.parentNode.replaceChild(newShowLessBtn, showLessBtn);
                    
                    newShowMoreBtn.addEventListener('click', () => {
                        hiddenTags.forEach(tag => {
                            tag.classList.add('show');
                        });
                        newShowMoreBtn.style.display = 'none';
                        newShowLessBtn.style.display = 'inline-block';
                    });
                    
                    newShowLessBtn.addEventListener('click', () => {
                        hiddenTags.forEach(tag => {
                            tag.classList.remove('show');
                        });
                        newShowMoreBtn.style.display = 'inline-block';
                        newShowLessBtn.style.display = 'none';
                    });
                }
            }
        }
    });
}

// Debounce function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Initialize skills section
function initializeSkillsSection() {
    // Debounced render function
    const debouncedRender = debounce(renderSkillsSection, 300);
    
    // Render on page load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            setTimeout(renderSkillsSection, 200);
        });
    } else {
        setTimeout(renderSkillsSection, 200);
    }
    
    // Auto-update when DOM changes (using MutationObserver)
    const observer = new MutationObserver(() => {
        debouncedRender();
    });
    
    // Observe changes to relevant sections
    const observeSection = (selector) => {
        const section = document.querySelector(selector);
        if (section) {
            observer.observe(section, {
                childList: true,
                subtree: true,
                characterData: true
            });
        }
    };
    
    observeSection('#experience');
    observeSection('#projects');
    observeSection('#certifications');
    observeSection('#awards');
}

// Start the skills section system
initializeSkillsSection();

