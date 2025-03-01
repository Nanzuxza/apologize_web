// DOM Elements
const messageElement = document.getElementById('message');
const loveButton = document.getElementById('loveButton');
const bookCover = document.getElementById('bookCover');
const page1 = document.getElementById('page1');
const page2 = document.getElementById('page2');
const starsContainer = document.getElementById('stars');
const customCursor = document.getElementById('customCursor');
const messageModal = document.getElementById('messageModal');
const modalClose = document.getElementById('modalClose');
const musicControl = document.getElementById('musicControl');
const letter = document.getElementById('letter');

// Romantic messages array
const messages = [
    "Our story begins with you...",
    "Your love is the light that guides me home...",
    "Every moment with you feels like magic...",
    "In your eyes, I found my forever...",
    "With you, every day is Valentine's Day...",
    "You are the missing piece to my puzzle...",
    "My heart beats only for you...",
    "Your smile is my favorite view..."
];

// Initialize 
function init() {
    // Create stars background
    createStars();

    // Show initial message with animation
    setTimeout(() => {
        messageElement.classList.add('visible');
    }, 500);

    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove);
    loveButton.addEventListener('click', sendLove);
    bookCover.addEventListener('click', toggleBook);
    page1.addEventListener('click', flipPage1);
    page2.addEventListener('click', flipPage2);
    modalClose.addEventListener('click', closeModal);
    musicControl.addEventListener('click', toggleMusic);
    letter.addEventListener('click', toggleLetter);

    // Setup photo frame hover interactions
    const photoFrames = document.querySelectorAll('.photo-frame');
    photoFrames.forEach(frame => {
        frame.addEventListener('click', () => showModal());
    });

    // Create periodic heart animations
    setInterval(createRandomHeart, 2000);
}

// Create stars background
function createStars() {
    for (let i = 0; i < 100; i++) {
        const star = document.createElement('div');
        star.classList.add('star');

        // Random position
        const x = Math.random() * 100;
        const y = Math.random() * 100;

        // Random size
        const size = Math.random() * 3;

        // Random twinkle animation delay
        const delay = Math.random() * 5;

        star.style.left = `${x}%`;
        star.style.top = `${y}%`;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.animationDelay = `${delay}s`;

        starsContainer.appendChild(star);
    }
}

// Handle mouse movement
function handleMouseMove(e) {
    // Move custom heart cursor
    customCursor.style.left = `${e.clientX}px`;
    customCursor.style.top = `${e.clientY}px`;
    customCursor.style.opacity = 1;

    // Occasionally create hearts where mouse moves
    if (Math.random() < 0.05) {
        createHeart(e.clientX, e.clientY);
    }
}

// Send love when button is clicked
function sendLove() {
    // Create heart burst
    for (let i = 0; i < 25; i++) {
        setTimeout(() => {
            const x = window.innerWidth / 2 + (Math.random() * 200 - 100);
            const y = window.innerHeight / 2 + (Math.random() * 100);
            createHeart(x, y);
        }, i * 50);
    }

    // Update message
    currentMessageIndex = (currentMessageIndex + 1) % messages.length;
    updateMessage(messages[currentMessageIndex]);

    // Add button animation
    loveButton.classList.add('active');
    setTimeout(() => {
        loveButton.classList.remove('active');
    }, 500);

    // Show modal randomly
    if (Math.random() < 0.3) {
        setTimeout(showModal, 1000);
    }
}

// Create heart element
function createHeart(x, y) {
    const heart = document.createElement('div');
    const size = Math.random() * 30 + 10;

    // Use CSS heart shape
    heart.classList.add('heart');
    heart.style.left = `${x}px`;
    heart.style.top = `${y}px`;
    heart.style.width = `${size}px`;
    heart.style.height = `${size}px`;

    // Apply random animation properties
    const duration = Math.random() * 3 + 3;
    const fadeDelay = Math.random() * 2 + 1;
    heart.style.animation = `float ${duration}s ease-in-out forwards`;

    document.body.appendChild(heart);

    // Remove heart after animation completes
    setTimeout(() => {
        heart.remove();
    }, duration * 1000);
}

// Create random hearts periodically
function createRandomHeart() {
    const x = Math.random() * window.innerWidth;
    const y = Math.innerHeight + 50;
    createHeart(x, y);
}

// Update message with animation
function updateMessage(text) {
    messageElement.classList.remove('visible');

    setTimeout(() => {
        messageElement.textContent = text;
        messageElement.classList.add('visible');
    }, 500);
}

// Toggle book open/close
function toggleBook() {
    bookOpen = !bookOpen;
    bookCover.classList.toggle('open', bookOpen);

    // Reset pages when book is closed
    if (!bookOpen) {
        page1.classList.remove('flipped');
        page2.classList.remove('flipped');
        page1Flipped = false;
        page2Flipped = false;
    }
}

// Flip page 1
function flipPage1() {
    if (bookOpen && !page1Flipped) {
        page1.classList.add('flipped');
        page1Flipped = true;
    }
}

// Flip page 2
function flipPage2() {
    if (bookOpen && page1Flipped && !page2Flipped) {
        page2.classList.add('flipped');
        page2Flipped = true;

        // Show modal after all pages flipped
        setTimeout(showModal, 1000);
    }
}

// Show special message modal
function showModal() {
    messageModal.classList.add('active');
}

// Close modal
function closeModal() {
    messageModal.classList.remove('active');
}

// Toggle letter open/closed
function toggleLetter() {
    letter.classList.toggle('open');
}

// Toggle background music
function toggleMusic() {
    const backgroundMusic = document.getElementById('backgroundMusic');
    let isMusicPlaying = false;

    musicControl.addEventListener('click', () => {
        if (isMusicPlaying) {
            backgroundMusic.pause();
            musicControl.textContent = '♫';
        } else {
            backgroundMusic.play();
            musicControl.textContent = '♪';
        }
        isMusicPlaying = !isMusicPlaying;
    });

    // Hide loading spinner when page is fully loaded
    window.addEventListener('load', () => {
        document.getElementById('loadingSpinner').style.display = 'none';
    });

    // Add heartbeat animation to love button
    loveButton.classList.add('heartbeat');

    // Handle touch events for mobile
    document.addEventListener('touchstart', (e) => {
        const touch = e.touches[0];
        handleMouseMove({ clientX: touch.clientX, clientY: touch.clientY });
    });

    // Show "Tap to Open" hint for mobile users
    if ('ontouchstart' in window) {
        const tapHint = document.createElement('div');
        tapHint.textContent = 'Tap to Open';
        tapHint.style.position = 'fixed';
        tapHint.style.bottom = '20px';
        tapHint.style.left = '50%';
        tapHint.style.transform = 'translateX(-50%)';
        tapHint.style.color = 'white';
        tapHint.style.fontFamily = 'Dancing Script, cursive';
        tapHint.style.fontSize = '1.2rem';
        tapHint.style.zIndex = 1000;
        document.body.appendChild(tapHint);

        setTimeout(() => tapHint.remove(), 5000);
    }

    // Show a random message
    updateMessage(messages[Math.floor(Math.random() * messages.length)]);
}

// Initialize on page load
window.addEventListener('load', init);