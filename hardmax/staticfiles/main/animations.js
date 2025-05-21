// Custom Cursor
const cursor = document.createElement('div');
cursor.className = 'cursor';
document.body.appendChild(cursor);

const cursorFollower = document.createElement('div');
cursorFollower.className = 'cursor-follower';
document.body.appendChild(cursorFollower);

let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;
let followerX = 0;
let followerY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// Smooth cursor animation
function animateCursor() {
    // Cursor dot
    const dx = mouseX - cursorX;
    const dy = mouseY - cursorY;
    cursorX += dx * 0.3;
    cursorY += dy * 0.3;
    cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;

    // Cursor follower
    const dx2 = mouseX - followerX;
    const dy2 = mouseY - followerY;
    followerX += dx2 * 0.1;
    followerY += dy2 * 0.1;
    cursorFollower.style.transform = `translate(${followerX}px, ${followerY}px)`;

    requestAnimationFrame(animateCursor);
}

animateCursor();

// Cursor interactions
document.querySelectorAll('a, button, .interactive-area').forEach(element => {
    element.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(1.5)';
        cursorFollower.style.transform = 'scale(1.5)';
    });

    element.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
        cursorFollower.style.transform = 'scale(1)';
    });
});

// Loading Animation
document.addEventListener('DOMContentLoaded', () => {
    const loading = document.querySelector('.loading');
    if (loading) {
        setTimeout(() => {
            loading.style.opacity = '0';
            setTimeout(() => {
                loading.style.display = 'none';
            }, 500);
        }, 1000);
    }
});

// Interactive Skull Areas
const skullAreas = [
    { x: 45, y: 35, name: 'maxilla', url: '/maxilla' },
    { x: 55, y: 35, name: 'zygomatic', url: '/zygomatic' },
    { x: 50, y: 60, name: 'chin', url: '/chin' },
    { x: 50, y: 25, name: 'browridge', url: '/browridge' }
];

function createInteractiveAreas() {
    const skullContainer = document.querySelector('.skull-container');
    if (!skullContainer) return;

    skullAreas.forEach(area => {
        const interactiveArea = document.createElement('div');
        interactiveArea.className = 'interactive-area';
        interactiveArea.style.left = `${area.x}%`;
        interactiveArea.style.top = `${area.y}%`;
        interactiveArea.setAttribute('data-name', area.name);
        interactiveArea.setAttribute('data-url', area.url);
        
        interactiveArea.addEventListener('click', () => {
            window.location.href = area.url;
        });

        skullContainer.appendChild(interactiveArea);
    });
}

// Initialize interactive areas
createInteractiveAreas();

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Parallax effect for skull image
const skullImage = document.querySelector('.skull-image');
if (skullImage) {
    document.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        
        const x = (clientX / innerWidth - 0.5) * 20;
        const y = (clientY / innerHeight - 0.5) * 20;
        
        skullImage.style.transform = `translate(${x}px, ${y}px)`;
    });
}

// Form animations
document.querySelectorAll('.form-box input').forEach(input => {
    input.addEventListener('focus', () => {
        input.parentElement.classList.add('focused');
    });

    input.addEventListener('blur', () => {
        if (!input.value) {
            input.parentElement.classList.remove('focused');
        }
    });
});

// Button hover effect
document.querySelectorAll('.form-box button').forEach(button => {
    button.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(2)';
        cursorFollower.style.transform = 'scale(2)';
    });

    button.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
        cursorFollower.style.transform = 'scale(1)';
    });
});

// Parallax Effect for Floating Skulls
document.addEventListener('mousemove', (e) => {
    const skulls = document.querySelectorAll('.floating-skull');
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;

    skulls.forEach((skull, index) => {
        const speed = (index + 1) * 0.1;
        const x = (mouseX - 0.5) * speed * 100;
        const y = (mouseY - 0.5) * speed * 100;
        skull.style.transform = `translate(${x}px, ${y}px) rotate(${x * 0.1}deg)`;
    });
});

// Button Ripple Effect
document.querySelectorAll('.form-box button').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        this.appendChild(ripple);

        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;

        setTimeout(() => ripple.remove(), 600);
    });
});

// Skull SVG Interactions
document.querySelectorAll('.skull-svg').forEach(skull => {
    skull.addEventListener('mouseenter', () => {
        skull.style.filter = 'drop-shadow(0 15px 30px rgba(34,34,59,0.3))';
        skull.style.transform = 'scale(1.02)';
    });

    skull.addEventListener('mouseleave', () => {
        skull.style.filter = 'drop-shadow(0 10px 20px rgba(34,34,59,0.2))';
        skull.style.transform = 'scale(1)';
    });
});

// Bone Interactions
document.querySelectorAll('.bone').forEach(bone => {
    bone.addEventListener('mouseenter', () => {
        bone.style.opacity = '1';
        bone.style.transform = 'scale(1.1)';
        bone.style.filter = 'brightness(1.2)';
    });

    bone.addEventListener('mouseleave', () => {
        bone.style.opacity = '0.7';
        bone.style.transform = 'scale(1)';
        bone.style.filter = 'brightness(1)';
    });
});

// Navbar Scroll Effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
        navbar.classList.remove('scroll-up');
        navbar.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
        navbar.classList.remove('scroll-down');
        navbar.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
});

// Create Floating Skulls
function createFloatingSkulls() {
    const skullSVG = `
        <svg viewBox="0 0 100 100" width="100" height="100">
            <path class="skull-path" d="M50,20 C30,20 20,35 20,50 C20,65 30,80 50,80 C70,80 80,65 80,50 C80,35 70,20 50,20 Z" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="2"/>
            <circle class="eye" cx="35" cy="45" r="5" fill="rgba(255,255,255,0.1)"/>
            <circle class="eye" cx="65" cy="45" r="5" fill="rgba(255,255,255,0.1)"/>
            <path class="nose" d="M45,55 L55,55 L50,65 Z" fill="rgba(255,255,255,0.1)"/>
        </svg>
    `;

    for (let i = 0; i < 3; i++) {
        const skull = document.createElement('div');
        skull.className = 'floating-skull';
        skull.innerHTML = skullSVG;
        document.body.appendChild(skull);
    }
}

// Initialize Floating Skulls
createFloatingSkulls();

// Add shine effect to form boxes
document.querySelectorAll('.form-box').forEach(box => {
    box.addEventListener('mousemove', (e) => {
        const rect = box.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        box.style.setProperty('--x', `${x}px`);
        box.style.setProperty('--y', `${y}px`);
    });
}); 