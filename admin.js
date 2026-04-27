// ==================== UTILITY FUNCTIONS ====================

// Password Protection (CHANGE THIS!)
const ADMIN_PASSWORD = "admin123"; // Change to your own password!

// Check password
function checkPassword() {
    const password = document.getElementById('adminPassword')?.value;
    const errorEl = document.getElementById('loginError');
    const storedPassword = localStorage.getItem('adminPassword') || ADMIN_PASSWORD;
    
    if (password === storedPassword) {
        // Correct password - hide login overlay
        document.getElementById('loginOverlay').style.display = 'none';
        sessionStorage.setItem('adminAuthenticated', 'true');
        
        // Initialize admin panel
        initializeAdminPanel();
    } else {
        // Wrong password
        if (errorEl) errorEl.style.display = 'block';
    }
}

// Check if already authenticated
function checkAuth() {
    if (sessionStorage.getItem('adminAuthenticated') === 'true') {
        document.getElementById('loginOverlay').style.display = 'none';
        initializeAdminPanel();
    }
}

// Initialize admin panel (load all content)
function initializeAdminPanel() {
    loadHero();
    loadProjects();
    loadWebsites();
    loadAbout();
    loadSkills();
    loadContact();
    loadSettings();
}

// Set current year in footer
if (document.getElementById('currentYear')) {
    document.getElementById('currentYear').textContent = new Date().getFullYear();
}

// Generate unique ID
function generateId() {
    return Date.now().toString();
}

// Show notification
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        background: ${type === 'success' ? 'linear-gradient(135deg, var(--accent-color), var(--accent-2))' : 'linear-gradient(135deg, #ff6b6b, #ff8787)'};
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

// ==================== NAVIGATION TABS ====================

const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
const adminTabs = document.querySelectorAll('.admin-tab');

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        
        // Update nav active state
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        
        // Show corresponding tab
        adminTabs.forEach(tab => {
            tab.classList.remove('active');
            if (tab.id === targetId) {
                tab.classList.add('active');
            }
        });
        
        // Scroll to section
        document.getElementById(targetId).scrollIntoView({ behavior: 'smooth' });
    });
});

// ==================== HERO SECTION MANAGEMENT ====================

const editHeroBtn = document.getElementById('editHeroBtn');
const heroModal = document.getElementById('heroModal');
const heroModalClose = document.getElementById('heroModalClose');
const heroCancelBtn = document.getElementById('heroCancelBtn');
const heroForm = document.getElementById('heroForm');
const heroPreview = document.getElementById('heroPreview');

// Hero form elements
const heroTitle1 = document.getElementById('heroTitle1');
const heroTitle2 = document.getElementById('heroTitle2');
const heroSubtitle = document.getElementById('heroSubtitle');
const heroAvatar = document.getElementById('heroAvatar');
const heroBtn1Text = document.getElementById('heroBtn1Text');
const heroBtn1Link = document.getElementById('heroBtn1Link');
const heroBtn2Text = document.getElementById('heroBtn2Text');
const heroBtn2Link = document.getElementById('heroBtn2Link');

// Default hero content
const defaultHero = {
    title1: 'Creator',
    title2: 'Innovator',
    subtitle: 'Building the future with code, design, and innovation. Welcome to my digital playground.',
    btn1Text: 'Explore My Work',
    btn1Link: 'projects.html',
    btn2Text: 'Let\'s Connect',
    btn2Link: 'contact.html'
};

// Load hero section
function loadHero() {
    const hero = JSON.parse(localStorage.getItem('portfolioHero')) || defaultHero;
    
    if (heroPreview) {
        const avatarDisplay = hero.avatar 
            ? `<img src="${hero.avatar}" alt="Avatar" style="width: 160px; height: 160px; border-radius: 50%; object-fit: cover; border: 3px solid var(--accent-color); box-shadow: var(--neon-glow);">`
            : `<div style="font-size: 5rem; margin-bottom: 20px;">🚀</div>`;
        
        heroPreview.innerHTML = `
            <div style="text-align: center; padding: 40px 20px;">
                ${avatarDisplay}
                <h2 style="font-size: 2.5rem; margin-bottom: 20px; background: linear-gradient(135deg, var(--text-primary), var(--accent-color)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">
                    Digital <span style="color: var(--accent-color)">${hero.title1}</span> & <span style="color: var(--accent-2)">${hero.title2}</span>
                </h2>
                <p style="color: var(--text-secondary); font-size: 1.2rem; max-width: 600px; margin: 0 auto 30px;">${hero.subtitle}</p>
                <div style="display: flex; gap: 15px; justify-content: center; flex-wrap: wrap;">
                    <span style="padding: 12px 24px; background: linear-gradient(135deg, var(--accent-color), var(--accent-2)); color: white; border-radius: 50px; font-weight: 600;">${hero.btn1Text}</span>
                    <span style="padding: 12px 24px; background: transparent; color: var(--text-primary); border: 2px solid var(--accent-color); border-radius: 50px; font-weight: 600;">${hero.btn2Text}</span>
                </div>
            </div>
        `;
    }
}

// Open hero modal
function openHeroModal() {
    const hero = JSON.parse(localStorage.getItem('portfolioHero')) || defaultHero;
    
    heroTitle1.value = hero.title1;
    heroTitle2.value = hero.title2;
    heroSubtitle.value = hero.subtitle;
    heroAvatar.value = hero.avatar || '';
    heroBtn1Text.value = hero.btn1Text;
    heroBtn1Link.value = hero.btn1Link;
    heroBtn2Text.value = hero.btn2Text;
    heroBtn2Link.value = hero.btn2Link;
    
    heroModal.classList.add('show');
}

// Close hero modal
function closeHeroModal() {
    heroModal.classList.remove('show');
}

// Save hero section
function saveHero(heroData) {
    localStorage.setItem('portfolioHero', JSON.stringify(heroData));
    loadHero();
    closeHeroModal();
    showNotification('Hero section updated successfully!', 'success');
}

// Hero modal events
if (editHeroBtn) {
    editHeroBtn.addEventListener('click', openHeroModal);
}

if (heroModalClose) {
    heroModalClose.addEventListener('click', closeHeroModal);
}

if (heroCancelBtn) {
    heroCancelBtn.addEventListener('click', closeHeroModal);
}

if (heroForm) {
    heroForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const hero = {
            avatar: heroAvatar.value,
            title1: heroTitle1.value,
            title2: heroTitle2.value,
            subtitle: heroSubtitle.value,
            btn1Text: heroBtn1Text.value,
            btn1Link: heroBtn1Link.value,
            btn2Text: heroBtn2Text.value,
            btn2Link: heroBtn2Link.value
        };
        
        saveHero(hero);
    });
}

// Close hero modal on outside click
window.addEventListener('click', (e) => {
    if (e.target === heroModal) {
        closeHeroModal();
    }
});

// ==================== PROJECTS MANAGEMENT ====================

const addProjectBtn = document.getElementById('addProjectBtn');
const projectModal = document.getElementById('projectModal');
const projectModalClose = document.getElementById('projectModalClose');
const projectCancelBtn = document.getElementById('projectCancelBtn');
const projectForm = document.getElementById('projectForm');
const projectsGrid = document.getElementById('projectsGrid');

// Project form elements
const projectId = document.getElementById('projectId');
const projectTitle = document.getElementById('projectTitle');
const projectDescription = document.getElementById('projectDescription');
const projectImage = document.getElementById('projectImage');

const projectLiveUrl = document.getElementById('projectLiveUrl');
const projectTags = document.getElementById('projectTags');
const projectFeatured = document.getElementById('projectFeatured');
const projectModalTitle = document.getElementById('projectModalTitle');
const projectSubmitBtnText = document.getElementById('projectSubmitBtnText');

// Load projects
function loadProjects() {
    const projects = JSON.parse(localStorage.getItem('portfolioProjects')) || [];
    
    if (projects.length === 0) {
        projectsGrid.innerHTML = `
            <div class="empty-admin-state">
                <div class="empty-admin-icon">📭</div>
                <p>No projects yet. Create your first project!</p>
                <button class="btn-primary" onclick="openProjectModal()">
                    <i class="fas fa-plus"></i> Add Project
                </button>
            </div>
        `;
        return;
    }
    
    projectsGrid.innerHTML = projects.map(project => `
        <div class="admin-item">
            <img src="${project.image || 'https://via.placeholder.com/400x300/667eea/ffffff?text=Project'}" 
                 alt="${project.title}" 
                 class="admin-item-image"
                 onerror="this.src='https://via.placeholder.com/400x300/667eea/ffffff?text=Project'">
            <div class="admin-item-content">
                ${project.featured ? '<span class="featured-badge">⭐ Featured</span>' : ''}
                <h4>${project.title}</h4>
                <p>${project.description.substring(0, 80)}${project.description.length > 80 ? '...' : ''}</p>
                ${project.tags ? `
                    <div class="admin-item-tags">
                        ${project.tags.split(',').slice(0, 3).map(tag => `<span class="admin-item-tag">${tag.trim()}</span>`).join('')}
                    </div>
                ` : ''}
                <div class="admin-item-actions">
                    <button class="btn-edit-item" onclick="editProject('${project.id}')">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button class="btn-delete-item" onclick="deleteProject('${project.id}')">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Open project modal
function openProjectModal(isEdit = false) {
    projectModal.classList.add('show');
    if (!isEdit) {
        projectModalTitle.innerHTML = '<i class="fas fa-plus-circle"></i> Add New Project';
        projectSubmitBtnText.textContent = 'Create Project';
        resetProjectForm();
    }
}

// Close project modal
function closeProjectModal() {
    projectModal.classList.remove('show');
}

// Reset project form
function resetProjectForm() {
    projectForm.reset();
    projectId.value = '';
}

// Edit project
function editProject(id) {
    const projects = JSON.parse(localStorage.getItem('portfolioProjects')) || [];
    const project = projects.find(p => p.id === id);
    
    if (project) {
        projectId.value = project.id;
        projectTitle.value = project.title;
        projectDescription.value = project.description;
        projectImage.value = project.image || '';
        projectLiveUrl.value = project.liveUrl || '';
        projectTags.value = project.tags || '';
        projectFeatured.checked = project.featured || false;
        
        projectModalTitle.innerHTML = '<i class="fas fa-edit"></i> Edit Project';
        projectSubmitBtnText.textContent = 'Update Project';
        openProjectModal(true);
    }
}

// Delete project
function deleteProject(id) {
    if (confirm('Are you sure you want to delete this project?')) {
        const projects = JSON.parse(localStorage.getItem('portfolioProjects')) || [];
        const filtered = projects.filter(p => p.id !== id);
        localStorage.setItem('portfolioProjects', JSON.stringify(filtered));
        loadProjects();
        showNotification('Project deleted successfully!', 'success');
    }
}

// Save project
function saveProject(formData) {
    const projects = JSON.parse(localStorage.getItem('portfolioProjects')) || [];
    const index = projects.findIndex(p => p.id === formData.id);
    
    if (index > -1) {
        projects[index] = formData;
        showNotification('Project updated successfully!', 'success');
    } else {
        projects.push(formData);
        showNotification('Project created successfully!', 'success');
    }
    
    localStorage.setItem('portfolioProjects', JSON.stringify(projects));
    loadProjects();
    closeProjectModal();
}

// Project modal events
if (addProjectBtn) {
    addProjectBtn.addEventListener('click', () => openProjectModal());
}

if (projectModalClose) {
    projectModalClose.addEventListener('click', closeProjectModal);
}

if (projectCancelBtn) {
    projectCancelBtn.addEventListener('click', closeProjectModal);
}

if (projectForm) {
    projectForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const project = {
            id: projectId.value || generateId(),
            title: projectTitle.value,
            description: projectDescription.value,
            image: projectImage.value,
            liveUrl: projectLiveUrl.value,
            tags: projectTags.value,
            featured: projectFeatured.checked
        };
        
        saveProject(project);
    });
}

// Close modal on outside click
window.addEventListener('click', (e) => {
    if (e.target === projectModal) {
        closeProjectModal();
    }
});

// ==================== WEBSITES MANAGEMENT ====================

const addWebsiteBtn = document.getElementById('addWebsiteBtn');
const websiteModal = document.getElementById('websiteModal');
const websiteModalClose = document.getElementById('websiteModalClose');
const websiteCancelBtn = document.getElementById('websiteCancelBtn');
const websiteForm = document.getElementById('websiteForm');
const websitesGrid = document.getElementById('websitesGrid');

// Website form elements
const websiteId = document.getElementById('websiteId');
const websiteName = document.getElementById('websiteName');
const websiteDescription = document.getElementById('websiteDescription');
const websiteImage = document.getElementById('websiteImage');
const websiteUrl = document.getElementById('websiteUrl');
const websiteDetailsUrl = document.getElementById('websiteDetailsUrl');
const websiteModalTitle = document.getElementById('websiteModalTitle');
const websiteSubmitBtnText = document.getElementById('websiteSubmitBtnText');

// Load websites
function loadWebsites() {
    const websites = JSON.parse(localStorage.getItem('portfolioWebsites')) || [];
    
    if (websites.length === 0) {
        websitesGrid.innerHTML = `
            <div class="empty-admin-state">
                <div class="empty-admin-icon">🌐</div>
                <p>No websites yet. Create your first website!</p>
                <button class="btn-primary" onclick="openWebsiteModal()">
                    <i class="fas fa-plus"></i> Add Website
                </button>
            </div>
        `;
        return;
    }
    
    websitesGrid.innerHTML = websites.map(website => `
        <div class="admin-item">
            <img src="${website.image || 'https://via.placeholder.com/400x300/a78bfa/ffffff?text=Website'}" 
                 alt="${website.name}" 
                 class="admin-item-image"
                 onerror="this.src='https://via.placeholder.com/400x300/a78bfa/ffffff?text=Website'">
            <div class="admin-item-content">
                <h4>${website.name}</h4>
                <p>${website.description.substring(0, 80)}${website.description.length > 80 ? '...' : ''}</p>
                <div class="admin-item-tags">
                    <span class="admin-item-tag">🔗 ${website.url}</span>
                </div>
                <div class="admin-item-actions">
                    <button class="btn-edit-item" onclick="editWebsite('${website.id}')">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button class="btn-delete-item" onclick="deleteWebsite('${website.id}')">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Open website modal
function openWebsiteModal(isEdit = false) {
    websiteModal.classList.add('show');
    if (!isEdit) {
        websiteModalTitle.innerHTML = '<i class="fas fa-plus-circle"></i> Add New Website';
        websiteSubmitBtnText.textContent = 'Create Website';
        resetWebsiteForm();
    }
}

// Close website modal
function closeWebsiteModal() {
    websiteModal.classList.remove('show');
}

// Reset website form
function resetWebsiteForm() {
    websiteForm.reset();
    websiteId.value = '';
}

// Edit website
function editWebsite(id) {
    const websites = JSON.parse(localStorage.getItem('portfolioWebsites')) || [];
    const website = websites.find(w => w.id === id);
    
    if (website) {
        websiteId.value = website.id;
        websiteName.value = website.name;
        websiteDescription.value = website.description;
        websiteImage.value = website.image || '';
        websiteUrl.value = website.url || '';
        websiteDetailsUrl.value = website.detailsUrl || '';
        
        websiteModalTitle.innerHTML = '<i class="fas fa-edit"></i> Edit Website';
        websiteSubmitBtnText.textContent = 'Update Website';
        openWebsiteModal(true);
    }
}

// Delete website
function deleteWebsite(id) {
    if (confirm('Are you sure you want to delete this website?')) {
        const websites = JSON.parse(localStorage.getItem('portfolioWebsites')) || [];
        const filtered = websites.filter(w => w.id !== id);
        localStorage.setItem('portfolioWebsites', JSON.stringify(filtered));
        loadWebsites();
        showNotification('Website deleted successfully!', 'success');
    }
}

// Save website
function saveWebsite(websiteData) {
    const websites = JSON.parse(localStorage.getItem('portfolioWebsites')) || [];
    const index = websites.findIndex(w => w.id === websiteData.id);
    
    if (index > -1) {
        websites[index] = websiteData;
        showNotification('Website updated successfully!', 'success');
    } else {
        websites.push(websiteData);
        showNotification('Website created successfully!', 'success');
    }
    
    localStorage.setItem('portfolioWebsites', JSON.stringify(websites));
    loadWebsites();
    closeWebsiteModal();
}

// Website modal events
if (addWebsiteBtn) {
    addWebsiteBtn.addEventListener('click', () => openWebsiteModal());
}

if (websiteModalClose) {
    websiteModalClose.addEventListener('click', closeWebsiteModal);
}

if (websiteCancelBtn) {
    websiteCancelBtn.addEventListener('click', closeWebsiteModal);
}

if (websiteForm) {
    websiteForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const website = {
            id: websiteId.value || generateId(),
            name: websiteName.value,
            description: websiteDescription.value,
            image: websiteImage.value,
            url: websiteUrl.value,
            detailsUrl: websiteDetailsUrl.value
        };
        
        saveWebsite(website);
    });
}

// Close website modal on outside click
window.addEventListener('click', (e) => {
    if (e.target === websiteModal) {
        closeWebsiteModal();
    }
});

// ==================== ABOUT SECTION MANAGEMENT ====================

const editAboutBtn = document.getElementById('editAboutBtn');
const aboutModal = document.getElementById('aboutModal');
const aboutModalClose = document.getElementById('aboutModalClose');
const aboutCancelBtn = document.getElementById('aboutCancelBtn');
const aboutForm = document.getElementById('aboutForm');
const aboutPreview = document.getElementById('aboutPreview');

// About form elements
const aboutText1 = document.getElementById('aboutText1');
const aboutText2 = document.getElementById('aboutText2');
const aboutText3 = document.getElementById('aboutText3');
const aboutImage = document.getElementById('aboutImage');
const statProjects = document.getElementById('statProjects');
const statExperience = document.getElementById('statExperience');
const statClients = document.getElementById('statClients');
const statTechnologies = document.getElementById('statTechnologies');

// Default about content
const defaultAbout = {
    text1: "I'm a passionate digital creator and innovator with a deep love for crafting beautiful, functional, and user-centric web experiences. My journey in the world of technology has been driven by curiosity and a relentless pursuit of excellence.",
    text2: "With expertise spanning from front-end development to system architecture, I thrive on transforming complex ideas into elegant solutions that make a real impact. Every project I undertake is a new challenge and an opportunity to learn, grow, and push the boundaries of what's possible.",
    text3: "When I'm not coding, you can find me exploring the latest tech trends, contributing to open-source projects, or sharing knowledge with the developer community.",
    image: "",
    stats: {
        projects: 50,
        experience: 5,
        clients: 30,
        technologies: 10
    }
};

// Load about section
function loadAbout() {
    const about = JSON.parse(localStorage.getItem('portfolioAbout')) || defaultAbout;
    
    if (aboutPreview) {
        aboutPreview.innerHTML = `
            <p>${about.text1}</p>
            <p>${about.text2}</p>
            <p>${about.text3}</p>
            <div class="about-preview-stats">
                <div class="about-preview-stat">
                    <span class="number">${about.stats.projects}+</span>
                    <span class="label">Projects Completed</span>
                </div>
                <div class="about-preview-stat">
                    <span class="number">${about.stats.experience}+</span>
                    <span class="label">Years Experience</span>
                </div>
                <div class="about-preview-stat">
                    <span class="number">${about.stats.clients}+</span>
                    <span class="label">Happy Clients</span>
                </div>
                <div class="about-preview-stat">
                    <span class="number">${about.stats.technologies}+</span>
                    <span class="label">Technologies Mastered</span>
                </div>
            </div>
        `;
    }
}

// Open about modal
function openAboutModal() {
    const about = JSON.parse(localStorage.getItem('portfolioAbout')) || defaultAbout;
    
    aboutText1.value = about.text1;
    aboutText2.value = about.text2;
    aboutText3.value = about.text3;
    aboutImage.value = about.image || '';
    statProjects.value = about.stats.projects;
    statExperience.value = about.stats.experience;
    statClients.value = about.stats.clients;
    statTechnologies.value = about.stats.technologies;
    
    aboutModal.classList.add('show');
}

// Close about modal
function closeAboutModal() {
    aboutModal.classList.remove('show');
}

// Save about section
function saveAbout(aboutData) {
    localStorage.setItem('portfolioAbout', JSON.stringify(aboutData));
    loadAbout();
    closeAboutModal();
    showNotification('About section updated successfully!', 'success');
}

// About modal events
if (editAboutBtn) {
    editAboutBtn.addEventListener('click', openAboutModal);
}

if (aboutModalClose) {
    aboutModalClose.addEventListener('click', closeAboutModal);
}

if (aboutCancelBtn) {
    aboutCancelBtn.addEventListener('click', closeAboutModal);
}

if (aboutForm) {
    aboutForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const about = {
            text1: aboutText1.value,
            text2: aboutText2.value,
            text3: aboutText3.value,
            image: aboutImage.value,
            stats: {
                projects: parseInt(statProjects.value),
                experience: parseInt(statExperience.value),
                clients: parseInt(statClients.value),
                technologies: parseInt(statTechnologies.value)
            }
        };
        
        saveAbout(about);
    });
}

// Close about modal on outside click
window.addEventListener('click', (e) => {
    if (e.target === aboutModal) {
        closeAboutModal();
    }
});

// ==================== SKILLS MANAGEMENT ====================

const addSkillBtn = document.getElementById('addSkillBtn');
const skillModal = document.getElementById('skillModal');
const skillModalClose = document.getElementById('skillModalClose');
const skillCancelBtn = document.getElementById('skillCancelBtn');
const skillForm = document.getElementById('skillForm');
const skillsGrid = document.getElementById('skillsGrid');

// Skill form elements
const skillCategoryId = document.getElementById('skillCategoryId');
const skillCategoryName = document.getElementById('skillCategoryName');
const skillList = document.getElementById('skillList');
const skillModalTitle = document.getElementById('skillModalTitle');
const skillSubmitBtnText = document.getElementById('skillSubmitBtnText');

// Default skills
const defaultSkills = [
    {
        id: '1',
        name: 'Frontend Development',
        skills: ['React', 'Vue.js', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS', 'Sass']
    },
    {
        id: '2',
        name: 'Backend Development',
        skills: ['Node.js', 'Python', 'Express', 'Django', 'REST APIs', 'GraphQL', 'MongoDB', 'PostgreSQL']
    },
    {
        id: '3',
        name: 'DevOps & Tools',
        skills: ['Docker', 'AWS', 'Git', 'CI/CD', 'Jenkins', 'Nginx', 'Linux', 'Bash']
    },
    {
        id: '4',
        name: 'Design & UX',
        skills: ['UI/UX Design', 'Figma', 'Adobe XD', 'Responsive Design', 'Accessibility', 'Performance', 'Animation', 'Prototyping']
    }
];

// Load skills
function loadSkills() {
    const skills = JSON.parse(localStorage.getItem('portfolioSkills')) || defaultSkills;
    
    if (skills.length === 0) {
        skillsGrid.innerHTML = `
            <div class="empty-admin-state">
                <div class="empty-admin-icon">🛠️</div>
                <p>No skills yet. Create your first skill category!</p>
                <button class="btn-primary" onclick="openSkillModal()">
                    <i class="fas fa-plus"></i> Add Skill Category
                </button>
            </div>
        `;
        return;
    }
    
    skillsGrid.innerHTML = skills.map(category => `
        <div class="skill-admin-card">
            <h4>${category.name}</h4>
            <div class="skill-admin-list">
                ${category.skills.map(skill => `<span class="skill-admin-tag">${skill}</span>`).join('')}
            </div>
            <div class="skill-admin-actions">
                <button class="btn-edit-item" onclick="editSkillCategory('${category.id}')" style="flex:1">
                    <i class="fas fa-edit"></i> Edit
                </button>
                <button class="btn-delete-item" onclick="deleteSkillCategory('${category.id}')" style="flex:1">
                    <i class="fas fa-trash"></i> Delete
                </button>
            </div>
        </div>
    `).join('');
}

// Open skill modal
function openSkillModal(isEdit = false) {
    skillModal.classList.add('show');
    if (!isEdit) {
        skillModalTitle.innerHTML = '<i class="fas fa-plus-circle"></i> Add Skill Category';
        skillSubmitBtnText.textContent = 'Create Category';
        resetSkillForm();
    }
}

// Close skill modal
function closeSkillModal() {
    skillModal.classList.remove('show');
}

// Reset skill form
function resetSkillForm() {
    skillForm.reset();
    skillCategoryId.value = '';
}

// Edit skill category
function editSkillCategory(id) {
    const skills = JSON.parse(localStorage.getItem('portfolioSkills')) || defaultSkills;
    const category = skills.find(c => c.id === id);
    
    if (category) {
        skillCategoryId.value = category.id;
        skillCategoryName.value = category.name;
        skillList.value = category.skills.join(', ');
        
        skillModalTitle.innerHTML = '<i class="fas fa-edit"></i> Edit Skill Category';
        skillSubmitBtnText.textContent = 'Update Category';
        openSkillModal(true);
    }
}

// Delete skill category
function deleteSkillCategory(id) {
    if (confirm('Are you sure you want to delete this skill category?')) {
        const skills = JSON.parse(localStorage.getItem('portfolioSkills')) || defaultSkills;
        const filtered = skills.filter(c => c.id !== id);
        localStorage.setItem('portfolioSkills', JSON.stringify(filtered));
        loadSkills();
        showNotification('Skill category deleted successfully!', 'success');
    }
}

// Save skill category
function saveSkillCategory(categoryData) {
    const skills = JSON.parse(localStorage.getItem('portfolioSkills')) || defaultSkills;
    const index = skills.findIndex(c => c.id === categoryData.id);
    
    if (index > -1) {
        skills[index] = categoryData;
        showNotification('Skill category updated successfully!', 'success');
    } else {
        skills.push(categoryData);
        showNotification('Skill category created successfully!', 'success');
    }
    
    localStorage.setItem('portfolioSkills', JSON.stringify(skills));
    loadSkills();
    closeSkillModal();
}

// Skill modal events
if (addSkillBtn) {
    addSkillBtn.addEventListener('click', () => openSkillModal());
}

if (skillModalClose) {
    skillModalClose.addEventListener('click', closeSkillModal);
}

if (skillCancelBtn) {
    skillCancelBtn.addEventListener('click', closeSkillModal);
}

if (skillForm) {
    skillForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const category = {
            id: skillCategoryId.value || generateId(),
            name: skillCategoryName.value,
            skills: skillList.value.split(',').map(s => s.trim()).filter(s => s)
        };
        
        saveSkillCategory(category);
    });
}

// Close skill modal on outside click
window.addEventListener('click', (e) => {
    if (e.target === skillModal) {
        closeSkillModal();
    }
});

// ==================== CONTACT MANAGEMENT ====================

const editContactBtn = document.getElementById('editContactBtn');
const contactModal = document.getElementById('contactModal');
const contactModalClose = document.getElementById('contactModalClose');
const contactCancelBtn = document.getElementById('contactCancelBtn');
const contactFormAdmin = document.getElementById('contactFormAdmin');
const contactPreview = document.getElementById('contactPreview');
const messagesList = document.getElementById('messagesList');

// Contact form elements
const contactEmail = document.getElementById('contactEmail');
const contactGithub = document.getElementById('contactGithub');
const contactLinkedin = document.getElementById('contactLinkedin');
const contactTwitter = document.getElementById('contactTwitter');

// Default contact info
const defaultContact = {
    email: 'your@email.com',
    github: 'https://github.com/yourusername',
    linkedin: 'https://linkedin.com/in/yourusername',
    twitter: 'https://twitter.com/yourusername'
};

// Load contact section
function loadContact() {
    const contact = JSON.parse(localStorage.getItem('portfolioContact')) || defaultContact;
    const messages = JSON.parse(localStorage.getItem('portfolioMessages')) || [];
    
    if (contactPreview) {
        contactPreview.innerHTML = `
            <h4><i class="fas fa-address-card"></i> Contact Information</h4>
            <div class="contact-info-item">
                <i class="fas fa-envelope"></i>
                <span><a href="mailto:${contact.email}">${contact.email}</a></span>
            </div>
            ${contact.github ? `
                <div class="contact-info-item">
                    <i class="fab fa-github"></i>
                    <span><a href="${contact.github}" target="_blank">${contact.github}</a></span>
                </div>
            ` : ''}
            ${contact.linkedin ? `
                <div class="contact-info-item">
                    <i class="fab fa-linkedin"></i>
                    <span><a href="${contact.linkedin}" target="_blank">${contact.linkedin}</a></span>
                </div>
            ` : ''}
            ${contact.twitter ? `
                <div class="contact-info-item">
                    <i class="fab fa-twitter"></i>
                    <span><a href="${contact.twitter}" target="_blank">${contact.twitter}</a></span>
                </div>
            ` : ''}
        `;
    }
    
    if (messagesList) {
        if (messages.length === 0) {
            messagesList.innerHTML = `
                <div class="empty-admin-state" style="padding: 30px;">
                    <p>No messages yet.</p>
                </div>
            `;
        } else {
            messagesList.innerHTML = messages.map(msg => `
                <div class="message-card">
                    <div class="message-header">
                        <span class="message-sender">${msg.name} (${msg.email})</span>
                        <span class="message-date">${new Date(msg.date).toLocaleDateString()}</span>
                    </div>
                    <div class="message-body">
                        <strong>Subject:</strong> ${msg.subject}<br><br>
                        ${msg.message}
                    </div>
                    <div class="message-actions">
                        <button class="btn-reply" onclick="replyToMessage('${msg.email}')">
                            <i class="fas fa-reply"></i> Reply
                        </button>
                        <button class="btn-delete-message" onclick="deleteMessage('${msg.id}')">
                            <i class="fas fa-trash"></i> Delete
                        </button>
                    </div>
                </div>
            `).join('');
        }
    }
}

// Open contact modal
function openContactModal() {
    const contact = JSON.parse(localStorage.getItem('portfolioContact')) || defaultContact;
    
    contactEmail.value = contact.email;
    contactGithub.value = contact.github || '';
    contactLinkedin.value = contact.linkedin || '';
    contactTwitter.value = contact.twitter || '';
    
    contactModal.classList.add('show');
}

// Close contact modal
function closeContactModal() {
    contactModal.classList.remove('show');
}

// Reply to message
function replyToMessage(email) {
    window.location.href = `mailto:${email}`;
}

// Delete message
function deleteMessage(id) {
    if (confirm('Are you sure you want to delete this message?')) {
        const messages = JSON.parse(localStorage.getItem('portfolioMessages')) || [];
        const filtered = messages.filter(m => m.id !== id);
        localStorage.setItem('portfolioMessages', JSON.stringify(filtered));
        loadContact();
        showNotification('Message deleted successfully!', 'success');
    }
}

// Save contact info
function saveContact(contactData) {
    localStorage.setItem('portfolioContact', JSON.stringify(contactData));
    loadContact();
    closeContactModal();
    showNotification('Contact information updated successfully!', 'success');
}

// Contact modal events
if (editContactBtn) {
    editContactBtn.addEventListener('click', openContactModal);
}

if (contactModalClose) {
    contactModalClose.addEventListener('click', closeContactModal);
}

if (contactCancelBtn) {
    contactCancelBtn.addEventListener('click', closeContactModal);
}

if (contactFormAdmin) {
    contactFormAdmin.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const contact = {
            email: contactEmail.value,
            github: contactGithub.value,
            linkedin: contactLinkedin.value,
            twitter: contactTwitter.value
        };
        
        saveContact(contact);
    });
}

// Close contact modal on outside click
window.addEventListener('click', (e) => {
    if (e.target === contactModal) {
        closeContactModal();
    }
});

// ==================== INITIALIZE ====================

// Check authentication on page load
checkAuth();

// Load all data on page load (after authentication)
document.addEventListener('DOMContentLoaded', function() {
    // Auth check happens automatically via checkAuth()
});

// Listen for storage changes
window.addEventListener('storage', function() {
    loadHero();
    loadProjects();
    loadWebsites();
    loadAbout();
    loadSkills();
    loadContact();
});

// ==================== SETTINGS / EXPORT-IMPORT ====================

const exportContentBtn = document.getElementById('exportContentBtn');
const importContentBtn = document.getElementById('importContentBtn');
const importFile = document.getElementById('importFile');
const changePasswordBtn = document.getElementById('changePasswordBtn');
const adminPasswordSetting = document.getElementById('adminPasswordSetting');
const saveShortcutBtn = document.getElementById('saveShortcutBtn');
const ctrlKey = document.getElementById('ctrlKey');
const shiftKey = document.getElementById('shiftKey');
const altKey = document.getElementById('altKey');
const shortcutKey = document.getElementById('shortcutKey');
const currentShortcut = document.getElementById('currentShortcut');

// Get current shortcut from localStorage or default
function getKeyboardShortcut() {
    const saved = localStorage.getItem('adminShortcut');
    if (saved) {
        return JSON.parse(saved);
    }
    return { ctrl: true, shift: true, alt: false, key: 'A' };
}

// Save shortcut to localStorage
function saveShortcut() {
    const shortcut = {
        ctrl: ctrlKey?.checked || false,
        shift: shiftKey?.checked || false,
        alt: altKey?.checked || false,
        key: (shortcutKey?.value || 'A').toUpperCase()
    };
    
    localStorage.setItem('adminShortcut', JSON.stringify(shortcut));
    updateShortcutDisplay();
    showNotification('Keyboard shortcut saved! Update content.json for GitHub', 'success');
}

// Update shortcut display
function updateShortcutDisplay() {
    const shortcut = getKeyboardShortcut();
    const parts = [];
    
    if (shortcut.ctrl) parts.push('Ctrl');
    if (shortcut.shift) parts.push('Shift');
    if (shortcut.alt) parts.push('Alt');
    parts.push(shortcut.key);
    
    if (currentShortcut) {
        currentShortcut.textContent = parts.join(' + ');
    }
}

// Change password
function changePassword() {
    const newPassword = adminPasswordSetting?.value;
    if (!newPassword || newPassword.length < 4) {
        showNotification('Password must be at least 4 characters!', 'error');
        return;
    }
    
    localStorage.setItem('adminPassword', newPassword);
    showNotification('Password changed! Remember to update admin.js for GitHub', 'success');
    
    if (adminPasswordSetting) {
        adminPasswordSetting.value = '';
    }
}

// Export all content
function exportContent() {
    const content = {
        hero: JSON.parse(localStorage.getItem('portfolioHero')) || null,
        projects: JSON.parse(localStorage.getItem('portfolioProjects')) || [],
        websites: JSON.parse(localStorage.getItem('portfolioWebsites')) || [],
        about: JSON.parse(localStorage.getItem('portfolioAbout')) || null,
        skills: JSON.parse(localStorage.getItem('portfolioSkills')) || [],
        contact: JSON.parse(localStorage.getItem('portfolioContact')) || null,
        adminPassword: localStorage.getItem('adminPassword') || ADMIN_PASSWORD,
        adminShortcut: localStorage.getItem('adminShortcut'),
        exportedAt: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(content, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `portfolio-content-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showNotification('Content exported successfully!', 'success');
}

// Import content
function importContent(file) {
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const content = JSON.parse(e.target.result);
            
            if (content.hero) localStorage.setItem('portfolioHero', JSON.stringify(content.hero));
            if (content.projects) localStorage.setItem('portfolioProjects', JSON.stringify(content.projects));
            if (content.websites) localStorage.setItem('portfolioWebsites', JSON.stringify(content.websites));
            if (content.about) localStorage.setItem('portfolioAbout', JSON.stringify(content.about));
            if (content.skills) localStorage.setItem('portfolioSkills', JSON.stringify(content.skills));
            if (content.contact) localStorage.setItem('portfolioContact', JSON.stringify(content.contact));
            
            // Reload all sections
            loadHero();
            loadProjects();
            loadWebsites();
            loadAbout();
            loadSkills();
            loadContact();
            
            showNotification('Content imported successfully! Refresh to see changes.', 'success');
        } catch (error) {
            showNotification('Error importing content: Invalid JSON file', 'error');
        }
    };
    reader.readAsText(file);
}

// Load settings page
function loadSettings() {
    // Update shortcut display
    updateShortcutDisplay();
    
    // Load current password (for reference only)
    const currentPassword = localStorage.getItem('adminPassword') || ADMIN_PASSWORD;
    if (adminPasswordSetting) {
        adminPasswordSetting.placeholder = `Current: ${currentPassword}`;
    }
}

// Event listeners
if (exportContentBtn) {
    exportContentBtn.addEventListener('click', exportContent);
}

if (importContentBtn) {
    importContentBtn.addEventListener('click', () => importFile.click());
}

if (importFile) {
    importFile.addEventListener('change', (e) => {
        if (e.target.files && e.target.files[0]) {
            importContent(e.target.files[0]);
        }
    });
}

if (changePasswordBtn) {
    changePasswordBtn.addEventListener('click', changePassword);
}

if (saveShortcutBtn) {
    saveShortcutBtn.addEventListener('click', saveShortcut);
}
