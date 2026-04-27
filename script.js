// ==================== UTILITY FUNCTIONS ====================

// Set current year in footer
if (document.getElementById('currentYear')) {
    document.getElementById('currentYear').textContent = new Date().getFullYear();
}

// Load content from JSON file or localStorage
async function loadContentFromFile() {
    try {
        const response = await fetch('content.json');
        if (response.ok) {
            const content = await response.json();
            return content;
        }
    } catch (error) {
        // content.json doesn't exist, use localStorage
    }
    return null;
}

// Initialize content from file or localStorage
async function initializeContent() {
    const fileContent = await loadContentFromFile();
    
    if (fileContent) {
        // Content loaded from file, set defaults if localStorage is empty
        if (!localStorage.getItem('portfolioHero') && fileContent.hero) {
            localStorage.setItem('portfolioHero', JSON.stringify(fileContent.hero));
        }
        if (!localStorage.getItem('portfolioProjects') && fileContent.projects) {
            localStorage.setItem('portfolioProjects', JSON.stringify(fileContent.projects));
        }
        if (!localStorage.getItem('portfolioWebsites') && fileContent.websites) {
            localStorage.setItem('portfolioWebsites', JSON.stringify(fileContent.websites));
        }
        if (!localStorage.getItem('portfolioAbout') && fileContent.about) {
            localStorage.setItem('portfolioAbout', JSON.stringify(fileContent.about));
        }
        if (!localStorage.getItem('portfolioSkills') && fileContent.skills) {
            localStorage.setItem('portfolioSkills', JSON.stringify(fileContent.skills));
        }
        if (!localStorage.getItem('portfolioContact') && fileContent.contact) {
            localStorage.setItem('portfolioContact', JSON.stringify(fileContent.contact));
        }
    }
}

// Default data
const defaultContact = {
    email: 'your@email.com',
    github: 'https://github.com/yourusername',
    linkedin: 'https://linkedin.com/in/yourusername',
    twitter: 'https://twitter.com/yourusername'
};

const defaultAbout = {
    text1: "I'm a passionate digital creator and innovator with a deep love for crafting beautiful, functional, and user-centric web experiences. My journey in the world of technology has been driven by a relentless curiosity and a desire to push the boundaries of what's possible in the digital realm.",
    text2: "With expertise spanning from front-end development to system architecture, I thrive on transforming complex ideas into elegant solutions that make a real impact. Every project I undertake is an opportunity to blend creativity with technical excellence.",
    text3: "When I'm not coding, you can find me exploring the latest tech trends, contributing to open-source projects, or sharing knowledge with the developer community.",
    image: "",
    stats: {
        projects: 50,
        experience: 5,
        clients: 30,
        technologies: 10
    }
};

const defaultSkills = [
    { id: '1', name: 'Frontend Development', skills: ['React', 'Vue.js', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS', 'Sass'] },
    { id: '2', name: 'Backend Development', skills: ['Node.js', 'Python', 'Express', 'Django', 'REST APIs', 'GraphQL', 'MongoDB', 'PostgreSQL'] },
    { id: '3', name: 'DevOps & Tools', skills: ['Docker', 'AWS', 'Git', 'CI/CD', 'Jenkins', 'Nginx', 'Linux', 'Bash'] },
    { id: '4', name: 'Design & UX', skills: ['UI/UX Design', 'Figma', 'Adobe XD', 'Responsive Design', 'Accessibility', 'Performance', 'Animation', 'Prototyping'] }
];

const defaultHero = {
    avatar: '',
    title1: 'Creator',
    title2: 'Innovator',
    subtitle: 'Building the future with code, design, and innovation. Welcome to my digital playground.',
    btn1Text: 'Explore My Work',
    btn1Link: 'projects.html',
    btn2Text: 'Let\'s Connect',
    btn2Link: 'contact.html'
};

// ==================== LOAD PROJECTS ====================

function loadProjects() {
    const projectsGrid = document.getElementById('projectsGrid');
    if (!projectsGrid) return;

    const projects = JSON.parse(localStorage.getItem('portfolioProjects')) || [];

    if (projects.length === 0) {
        projectsGrid.innerHTML = `
            <div class="empty-state" style="grid-column: 1 / -1; text-align: center; padding: 60px 20px;">
                <div class="empty-state-icon" style="font-size: 5rem; margin-bottom: 20px; opacity: 0.5;">📭</div>
                <p style="color: var(--text-secondary); font-size: 1.1rem;">No projects yet. Add some from the admin panel!</p>
            </div>
        `;
        return;
    }

    projectsGrid.innerHTML = projects.map(project => `
        <div class="project-card" style="${project.liveUrl ? 'cursor: pointer;' : ''}">
            <div class="project-image-wrapper" onclick="${project.liveUrl ? `window.open('${project.liveUrl}', '_blank')` : ''}" style="${project.liveUrl ? 'cursor: pointer;' : ''}">
                <img src="${project.image || 'https://via.placeholder.com/400x300/667eea/ffffff?text=Project+Image'}"
                     alt="${project.title}" class="project-image"
                     onerror="this.src='https://via.placeholder.com/400x300/667eea/ffffff?text=Project+Image'">
                <div class="project-overlay">
                    ${project.liveUrl ? `<span class="live-btn">🚀 View Project</span>` : ''}
                </div>
            </div>
            <div class="project-content">
                <h3 onclick="${project.liveUrl ? `window.open('${project.liveUrl}', '_blank')` : ''}" style="${project.liveUrl ? 'cursor: pointer; transition: color 0.3s ease;' : ''}" class="project-title">
                    ${project.title}
                </h3>
                <p>${project.description}</p>
                ${project.tags ? `
                    <div class="project-tags">
                        ${project.tags.split(',').map(tag => `<span class="project-tag">${tag.trim()}</span>`).join('')}
                    </div>
                ` : ''}
            </div>
        </div>
    `).join('');

    // Add hover effect to project titles
    document.querySelectorAll('.project-title').forEach(title => {
        title.addEventListener('mouseover', function() {
            if (this.onclick) this.style.color = 'var(--accent-color)';
        });
        title.addEventListener('mouseout', function() {
            if (this.onclick) this.style.color = '';
        });
    });
}

// ==================== LOAD WEBSITES ====================

function loadWebsites() {
    const websitesGrid = document.getElementById('websitesGrid');
    if (!websitesGrid) return;

    const websites = JSON.parse(localStorage.getItem('portfolioWebsites')) || [];

    if (websites.length === 0) {
        websitesGrid.innerHTML = `
            <div class="empty-state" style="grid-column: 1 / -1; text-align: center; padding: 60px 20px;">
                <div class="empty-state-icon" style="font-size: 5rem; margin-bottom: 20px; opacity: 0.5;">🌐</div>
                <p style="color: var(--text-secondary); font-size: 1.1rem;">No websites yet. Add some from the admin panel!</p>
            </div>
        `;
        return;
    }

    websitesGrid.innerHTML = websites.map(website => `
        <div class="website-card">
            <div class="website-image">
                <img src="${website.image || 'https://via.placeholder.com/400x300/a78bfa/ffffff?text=' + encodeURIComponent(website.name)}" 
                     alt="${website.name}" 
                     style="width: 100%; height: 200px; object-fit: cover; border-radius: var(--radius);"
                     onerror="this.src='https://via.placeholder.com/400x300/a78bfa/ffffff?text=' + encodeURIComponent(website.name)">
            </div>
            <div class="website-content">
                <h3>${website.name}</h3>
                <p>${website.description}</p>
                <div class="website-links">
                    ${website.url ? `<a href="${website.url}" target="_blank" class="btn-primary">Visit Site</a>` : ''}
                    ${website.detailsUrl ? `<a href="${website.detailsUrl}" class="btn-secondary">View Details</a>` : ''}
                </div>
            </div>
        </div>
    `).join('');
}

// ==================== LOAD ABOUT SECTION ====================

function loadAbout() {
    const aboutText = document.querySelector('.about-text');
    const aboutImage = document.querySelector('.about-image');
    const statCards = document.querySelectorAll('.stat-card');
    
    const about = JSON.parse(localStorage.getItem('portfolioAbout')) || defaultAbout;

    if (aboutText) {
        aboutText.innerHTML = `
            <p>${about.text1}</p>
            <br>
            <p>${about.text2}</p>
            <br>
            <p>${about.text3}</p>
        `;
    }

    if (aboutImage && about.image) {
        aboutImage.innerHTML = `<img src="${about.image}" alt="About" style="width: 100%; height: 100%; object-fit: cover;">`;
    }

    if (statCards.length > 0) {
        const stats = [
            { number: about.stats.projects, label: 'Projects Completed' },
            { number: about.stats.experience, label: 'Years Experience' },
            { number: about.stats.clients, label: 'Happy Clients' },
            { number: about.stats.technologies, label: 'Technologies Mastered' }
        ];

        statCards.forEach((card, index) => {
            if (stats[index]) {
                card.innerHTML = `
                    <div class="stat-number">${stats[index].number}+</div>
                    <div class="stat-label">${stats[index].label}</div>
                `;
            }
        });
    }
}

// ==================== LOAD SKILLS SECTION ====================

function loadSkills() {
    const skillsGrid = document.querySelector('.skills-grid');
    if (!skillsGrid) return;

    const skills = JSON.parse(localStorage.getItem('portfolioSkills')) || defaultSkills;

    skillsGrid.innerHTML = skills.map(category => `
        <div class="skill-category">
            <h3>${category.name}</h3>
            <div class="skill-list">
                ${category.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
            </div>
        </div>
    `).join('');
}

// ==================== LOAD CONTACT SECTION ====================

function loadContact() {
    const contact = JSON.parse(localStorage.getItem('portfolioContact')) || defaultContact;

    // Update social links in all pages
    document.querySelectorAll('.social-links').forEach(socialContainer => {
        socialContainer.innerHTML = `
            ${contact.github ? `<a href="${contact.github}" target="_blank"><i class="fab fa-github"></i></a>` : ''}
            ${contact.linkedin ? `<a href="${contact.linkedin}" target="_blank"><i class="fab fa-linkedin"></i></a>` : ''}
            ${contact.twitter ? `<a href="${contact.twitter}" target="_blank"><i class="fab fa-twitter"></i></a>` : ''}
            ${contact.email ? `<a href="mailto:${contact.email}"><i class="fas fa-envelope"></i></a>` : ''}
        `;
    });

    // Update contact form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm && !contactForm.dataset.initialized) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const inputs = this.querySelectorAll('input');
            const message = {
                id: Date.now().toString(),
                name: inputs[0]?.value || '',
                email: inputs[1]?.value || '',
                subject: inputs[2]?.value || '',
                message: this.querySelector('textarea')?.value || '',
                date: new Date().toISOString()
            };

            // Save message to localStorage
            const messages = JSON.parse(localStorage.getItem('portfolioMessages')) || [];
            messages.push(message);
            localStorage.setItem('portfolioMessages', JSON.stringify(messages));

            showNotification('Thank you for your message! I will get back to you soon. 🚀');
            this.reset();
        });
        contactForm.dataset.initialized = 'true';
    }
}

// ==================== LOAD HERO SECTION ====================

function loadHero() {
    const heroContent = document.querySelector('.hero-content');
    if (!heroContent) return;

    const hero = JSON.parse(localStorage.getItem('portfolioHero')) || defaultHero;

    const avatarEl = heroContent.querySelector('.hero-avatar');
    const h1El = heroContent.querySelector('h1');
    const subtitleEl = heroContent.querySelector('.hero-subtitle');
    const buttonsEl = heroContent.querySelector('.hero-buttons');

    // Update avatar - show photo if available, otherwise emoji
    if (avatarEl) {
        if (hero.avatar) {
            avatarEl.innerHTML = `<img src="${hero.avatar}" alt="Avatar" style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover;">`;
        } else {
            avatarEl.innerHTML = '<span>🚀</span>';
        }
    }

    if (h1El) {
        h1El.innerHTML = `Digital <span style="color: var(--accent-color)">${hero.title1}</span> & <span style="color: var(--accent-2)">${hero.title2}</span>`;
    }

    if (subtitleEl) {
        subtitleEl.textContent = hero.subtitle;
    }

    if (buttonsEl) {
        buttonsEl.innerHTML = `
            <a href="${hero.btn1Link}" class="btn-primary">${hero.btn1Text}</a>
            <a href="${hero.btn2Link}" class="btn-secondary">${hero.btn2Text}</a>
        `;
    }
}

// ==================== NOTIFICATION ====================

function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        background: linear-gradient(135deg, var(--accent-color), var(--accent-2));
        color: white;
        border-radius: 12px;
        font-weight: 600;
        z-index: 2000;
        animation: slideIn 0.3s ease;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
    `;
    document.body.appendChild(notification);
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);

// ==================== INITIALIZE ON PAGE LOAD ====================

document.addEventListener('DOMContentLoaded', async function() {
    // First, load content from file if available
    await initializeContent();
    
    // Then load all sections
    loadProjects();
    loadWebsites();
    loadAbout();
    loadSkills();
    loadContact();
    loadHero();

    // Listen for storage changes
    window.addEventListener('storage', function() {
        loadProjects();
        loadWebsites();
        loadAbout();
        loadSkills();
        loadContact();
        loadHero();
    });
    
    // Keyboard shortcut to open admin panel (customizable)
    document.addEventListener('keydown', function(e) {
        // Get saved shortcut or use default
        const savedShortcut = localStorage.getItem('adminShortcut');
        const shortcut = savedShortcut ? JSON.parse(savedShortcut) : { ctrl: true, shift: true, alt: false, key: 'A' };
        
        // Check if the right modifier keys are pressed
        const modifiersMatch = 
            (e.ctrlKey === shortcut.ctrl) &&
            (e.shiftKey === shortcut.shift) &&
            (e.altKey === shortcut.alt);
        
        // Check if the key matches (case-insensitive)
        const keyMatches = e.key.toUpperCase() === shortcut.key.toUpperCase();
        
        if (modifiersMatch && keyMatches) {
            e.preventDefault();
            window.location.href = 'admin.html';
        }
    });
});
