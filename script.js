// Updated modal implementation for script.js
document.addEventListener('DOMContentLoaded', function() {
    const messages = [
        "one of my fav moments <span class='text-love-500 animate-heartbeat inline-block'>❤️</span>",
        "Bazar pertama kita xixixxixi <span class='text-love-500 animate-heartbeat inline-block'>💕</span>",
        "the sunset + keiza = perfection <span class='text-love-500 animate-heartbeat inline-block'>❤️</span>",
        "photobooth pertama kita yg tempatnya kyk oven wkwkwkwkwk <span class='text-love-500 animate-heartbeat inline-block'>🥵</span>",
        "LUCU BANGET????????? <span class='text-love-500 animate-heartbeat inline-block'>😚😚😚</span>",
        "first time meeting my family xixixi <span class='text-love-500 animate-heartbeat inline-block'>❤️</span>",
        "first study datee!!! <span class='text-love-500 animate-heartbeat inline-block'>📖</span>",
        "our second photobooth mwehehehe <span class='text-love-500 animate-heartbeat inline-block'>📸</span>",
        "ultahnya ceceee <span class='text-love-500 animate-heartbeat inline-block'>🎂</span>",
        "WAAAAA PUANASSSSSSSS <span class='text-love-500 animate-heartbeat inline-block'>🥵😵</span>",
        "hiiiii dinginnnnn <span class='text-love-500 animate-heartbeat inline-block'>🥶</span>",
    ];

    const modal = document.getElementById("modal");
    const modalContent = document.getElementById("modal-content");
    const captionText = document.getElementById("caption");
    const closeBtn = document.getElementById("close-modal");
    
    // Lock scroll when modal is open
    function lockScroll() {
        document.body.style.overflow = 'hidden';
    }
    
    // Unlock scroll when modal is closed
    function unlockScroll() {
        document.body.style.overflow = '';
    }

    function openModal(element, index, type) {
        // Show modal
        modal.classList.remove("hidden");
        modal.classList.add("flex");
        
        // Lock body scroll
        lockScroll();
        
        if (type === 'image') {
            modalContent.innerHTML = `<img src="${element.src}" alt="Kenangan ${index + 1}" class="w-full h-auto rounded-lg max-h-[80vh] object-contain">`;
            captionText.innerHTML = messages[index];
        } else if (type === 'video') {
            modalContent.innerHTML = `
                <video controls class="w-full h-auto rounded-lg max-h-[80vh]">
                    <source src="${element.querySelector('source').src}" type="video/mp4">
                    Maaf, browser Anda tidak mendukung tag video.
                </video>
            `;
            captionText.innerHTML = "Video Spesial Kita <span class='text-love-500 animate-heartbeat inline-block'>❤️</span>";
        }
    }

    // Close modal function
    function closeModal() {
        modal.classList.add("hidden");
        modal.classList.remove("flex");
        unlockScroll();
    }

    // Close modal on button click
    closeBtn.addEventListener("click", closeModal);

    // Close modal when clicking outside content
    modal.addEventListener("click", function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Event listener for images
    const galleryImages = document.querySelectorAll('.grid img');
    galleryImages.forEach((img, index) => {
        img.addEventListener('click', function() {
            openModal(this, index, 'image');
        });
    });

    // Event listener for video
    const video = document.querySelector('video');
    if (video) {
        video.addEventListener('click', function() {
            openModal(this, 0, 'video');
        });
    }
    
    // Handle ESC key press to close modal
    document.addEventListener('keydown', function(e) {
        if (e.key === "Escape" && !modal.classList.contains("hidden")) {
            closeModal();
        }
    });

    console.log('Fixed modal JavaScript loaded');
});