// IDE Layout Navigation Logic
const editorContent = document.querySelector('.editor-content');
const fileLinks = document.querySelectorAll('.file-link');
const sections = document.querySelectorAll('section');
const tabName = document.querySelector('.tab span');
const tabIcon = document.querySelector('.tab i');
const breadcrumbName = document.querySelector('.breadcrumbs span:last-child');

// Sidebar File Navigation
fileLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            // Scroll container to section
            // Calculate offset relative to container
            const containerTop = editorContent.getBoundingClientRect().top;
            const sectionTop = targetSection.getBoundingClientRect().top;
            const scrollAmount = sectionTop - containerTop + editorContent.scrollTop;

            editorContent.scrollTo({
                top: scrollAmount - 20, // 20px padding
                behavior: 'smooth'
            });

            // Update active state
            updateActiveFile(link);
        }
    });
});

function updateActiveFile(activeLink) {
    fileLinks.forEach(l => l.classList.remove('active'));
    activeLink.classList.add('active');

    // Update Tab and Breadcrumbs
    const fileName = activeLink.textContent.trim();
    const iconClass = activeLink.querySelector('i').className;

    if (tabName) tabName.textContent = fileName;
    if (breadcrumbName) breadcrumbName.textContent = fileName;

    // Update Tab Icon
    if (tabIcon) {
        tabIcon.className = iconClass;
    }
}

// ScrollSpy for Editor Content
editorContent.addEventListener('scroll', () => {
    let current = '';
    const containerTop = editorContent.getBoundingClientRect().top;

    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        // Check if section is near the top of the container
        if (sectionTop - containerTop <= 150) {
            current = section.getAttribute('id');
        }
    });

    if (current) {
        const activeLink = document.querySelector(`.file-link[href="#${current}"]`);
        if (activeLink) {
            updateActiveFile(activeLink);
        }
    }
});

// Init
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Typing effect for hero title (optional enhancement)
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';

    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    type();
}

// Initialize on page load
window.addEventListener('load', () => {
    // Add loaded class to body for any CSS transitions
    document.body.classList.add('loaded');

    // Optional: Uncomment to enable typing effect
    // const heroName = document.querySelector('.hero-name');
    // const originalText = heroName.textContent;
    // typeWriter(heroName, originalText, 80);
});

// Project card hover effect enhancement
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// Skill tag animation on hover
document.querySelectorAll('.skill-tag').forEach(tag => {
    tag.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-2px) scale(1.05)';
    });

    tag.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Add ripple effect to buttons
document.querySelectorAll('.btn, .btn-ide').forEach(button => {
    button.addEventListener('click', function (e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');

        this.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add CSS for ripple effect dynamically
const style = document.createElement('style');
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .nav-link.active {
        color: var(--text-primary);
    }
    
    .nav-link.active::after {
        width: 100%;
    }
`;
document.head.appendChild(style);

// Console message for developers
console.log('%c👋 Hello Developer!', 'font-size: 20px; font-weight: bold; color: #667eea;');
console.log('%cPortfolio built with ❤️ by Tadiwanashe Magara', 'font-size: 14px; color: #b4b8d4;');
console.log('%cInterested in working together? Let\'s connect!', 'font-size: 12px; color: #6b7280;');

// Project Modal Functionality
const modal = document.getElementById('projectModal');
const ragProjectCard = document.querySelector('[data-project="rag-pipeline"]');
const modalClose = document.querySelector('.modal-close');

// Open modal when clicking on RAG project card
if (ragProjectCard) {
    ragProjectCard.addEventListener('click', () => {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    });
}

// Close modal when clicking the X button
if (modalClose) {
    modalClose.addEventListener('click', () => {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto'; // Re-enable scrolling
    });
}

// Close modal when clicking outside the modal content
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Red Crescent Certificate Modal Functionality
const redCrescentModal = document.getElementById('redCrescentModal');
const redCrescentItem = document.querySelector('[data-experience="red-crescent"]');
const redCrescentClose = document.querySelector('[data-modal="redCrescentModal"]');

// Open Red Crescent modal when clicking on timeline item
if (redCrescentItem) {
    redCrescentItem.addEventListener('click', () => {
        redCrescentModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
}

// Close Red Crescent modal when clicking the X button
if (redCrescentClose) {
    redCrescentClose.addEventListener('click', () => {
        redCrescentModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
}

// Close Red Crescent modal when clicking outside
if (redCrescentModal) {
    redCrescentModal.addEventListener('click', (e) => {
        if (e.target === redCrescentModal) {
            redCrescentModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
}

// Update Escape key handler to close all modals
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const allModals = document.querySelectorAll('.modal');
        allModals.forEach(m => {
            if (m.classList.contains('active')) {
                m.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }
});

// SCI Committee Modal Functionality
const sciCommitteeModal = document.getElementById('sciCommitteeModal');
const sciCommitteeItem = document.querySelector('[data-experience="sci-committee"]');
const sciCommitteeClose = document.querySelector('[data-modal="sciCommitteeModal"]');

if (sciCommitteeItem) {
    sciCommitteeItem.addEventListener('click', () => {
        sciCommitteeModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
}

if (sciCommitteeClose) {
    sciCommitteeClose.addEventListener('click', () => {
        sciCommitteeModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
}

if (sciCommitteeModal) {
    sciCommitteeModal.addEventListener('click', (e) => {
        if (e.target === sciCommitteeModal) {
            sciCommitteeModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
}

// STEM Carnival Modal Functionality
const stemCarnivalModal = document.getElementById('stemCarnivalModal');
const stemCarnivalItem = document.querySelector('[data-experience="stem-carnival"]');
const stemCarnivalClose = document.querySelector('[data-modal="stemCarnivalModal"]');

if (stemCarnivalItem) {
    stemCarnivalItem.addEventListener('click', () => {
        stemCarnivalModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
}

if (stemCarnivalClose) {
    stemCarnivalClose.addEventListener('click', () => {
        stemCarnivalModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
}

if (stemCarnivalModal) {
    stemCarnivalModal.addEventListener('click', (e) => {
        if (e.target === stemCarnivalModal) {
            stemCarnivalModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
}

// ASEAN Meeting Modal Functionality
const aseanMeetingModal = document.getElementById('aseanMeetingModal');
const aseanMeetingItem = document.querySelector('[data-experience="asean-meeting"]');
const aseanMeetingClose = document.querySelector('[data-modal="aseanMeetingModal"]');

if (aseanMeetingItem) {
    aseanMeetingItem.addEventListener('click', () => {
        aseanMeetingModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
}

if (aseanMeetingClose) {
    aseanMeetingClose.addEventListener('click', () => {
        aseanMeetingModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
}

if (aseanMeetingModal) {
    aseanMeetingModal.addEventListener('click', (e) => {
        if (e.target === aseanMeetingModal) {
            aseanMeetingModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
}

// Young Innovators Challenge Modal Functionality
const youngInnovatorsModal = document.getElementById('youngInnovatorsModal');
const youngInnovatorsItem = document.querySelector('[data-experience="young-innovators"]');
const youngInnovatorsClose = document.querySelector('[data-modal="youngInnovatorsModal"]');

if (youngInnovatorsItem) {
    youngInnovatorsItem.addEventListener('click', () => {
        youngInnovatorsModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
}

if (youngInnovatorsClose) {
    youngInnovatorsClose.addEventListener('click', () => {
        youngInnovatorsModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
}

if (youngInnovatorsModal) {
    youngInnovatorsModal.addEventListener('click', (e) => {
        if (e.target === youngInnovatorsModal) {
            youngInnovatorsModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
}

// Peers Club Modal Functionality
const peersClubModal = document.getElementById('peersClubModal');
const peersClubItem = document.querySelector('[data-experience="peers-club"]');
const peersClubClose = document.querySelector('[data-modal="peersClubModal"]');

if (peersClubItem) {
    peersClubItem.addEventListener('click', () => {
        peersClubModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
}

if (peersClubClose) {
    peersClubClose.addEventListener('click', () => {
        peersClubModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
}

if (peersClubModal) {
    peersClubModal.addEventListener('click', (e) => {
        if (e.target === peersClubModal) {
            peersClubModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
}

// ZISCO Modal Functionality
const ziscoModal = document.getElementById('ziscoModal');
const ziscoItem = document.querySelector('[data-experience="zisco-leadership"]');
const ziscoClose = document.querySelector('[data-modal="ziscoModal"]');

if (ziscoItem) {
    ziscoItem.addEventListener('click', () => {
        ziscoModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
}

if (ziscoClose) {
    ziscoClose.addEventListener('click', () => {
        ziscoModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
}

if (ziscoModal) {
    ziscoModal.addEventListener('click', (e) => {
        if (e.target === ziscoModal) {
            ziscoModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
}

// RideSense Modal Functionality
const rideSenseModal = document.getElementById('ridesenseModal');
const rideSenseItem = document.querySelector('[data-project="ridesense"]');
const rideSenseClose = document.querySelector('[data-modal="ridesenseModal"]');

if (rideSenseItem) {
    rideSenseItem.addEventListener('click', () => {
        rideSenseModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
}

if (rideSenseClose) {
    rideSenseClose.addEventListener('click', () => {
        rideSenseModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
}

if (rideSenseModal) {
    rideSenseModal.addEventListener('click', (e) => {
        if (e.target === rideSenseModal) {
            rideSenseModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
}


// NavSmart Modal Functionality
const navsmartModal = document.getElementById('navsmartModal');
const navsmartItem = document.querySelector('[data-project="navsmart"]');
const navsmartClose = document.querySelector('[data-modal="navsmartModal"]');

if (navsmartItem) {
    navsmartItem.addEventListener('click', () => {
        navsmartModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
}

if (navsmartClose) {
    navsmartClose.addEventListener('click', () => {
        navsmartModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
}

if (navsmartModal) {
    navsmartModal.addEventListener('click', (e) => {
        if (e.target === navsmartModal) {
            navsmartModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
}

// Weather App Modal Functionality
const weatherModal = document.getElementById('weatherModal');
const weatherItem = document.querySelector('[data-project="weather-app"]');
const weatherClose = document.querySelector('[data-modal="weatherModal"]');

if (weatherItem) {
    weatherItem.addEventListener('click', () => {
        weatherModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
}

if (weatherClose) {
    weatherClose.addEventListener('click', () => {
        weatherModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
}

if (weatherModal) {
    weatherModal.addEventListener('click', (e) => {
        if (e.target === weatherModal) {
            weatherModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
}
