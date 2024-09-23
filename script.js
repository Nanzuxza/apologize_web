const messages = [
    "one of my fav moments <span class='heart'>❤️</span>",
    "Bazar pertama kita xixixxixi <span class='heart'></span>",
    "the sunset + keiza  = perfection <span class='heart'>❤️</span>",
    "photobooth pertama kita yg tempatnya kyk oven wkwkwkwkwk <span class='heart'>🥵</span>",
    "LUCU BANGET????????? <span class='heart'>😚😚😚</span>",
    "first time meeting my family xixixi <span class='heart'>❤️</span>",
    "first study datee!!! <span class='heart'>📖</span>",
    "our second photobooth mwehehehe <span class='heart'></span>",
    "ultahnya ceceee <span class='heart'>🎂</span>",
    "WAAAAA PUANASSSSSSSS <span class='heart'>🥵😵</span>",
    "hiiiii dinginnnnn <span class='heart'>🥶</span>",
];

const modal = document.getElementById("modal");
const modalContent = document.getElementById("modal-content");
const captionText = document.getElementById("caption");

function openModal(element, index, type) {
    modal.style.display = "block";
    
    if (type === 'image') {
        modalContent.innerHTML = `<img src="${element.src}" alt="Kenangan ${index + 1}" style="width:100%;">`;
        captionText.innerHTML = messages[index];
    } else if (type === 'video') {
        modalContent.innerHTML = `
            <video controls style="width:100%;">
                <source src="${element.querySelector('source').src}" type="video/mp4">
                Maaf, browser Anda tidak mendukung tag video.
            </video>
        `;
        captionText.innerHTML = "Video Spesial Kita <span class='heart'>❤️</span>";
    }
}

// Menutup modal
modal.onclick = function() {
    modal.style.display = "none";
}

document.addEventListener('DOMContentLoaded', function() {
    // Event listener untuk gambar di galeri
    const galleryImages = document.querySelectorAll('.gallery img');
    galleryImages.forEach((img, index) => {
        img.onclick = function() {
            openModal(this, index, 'image');
        }
    });

    // Event listener untuk video
    const video = document.querySelector('.video-container video');
    if (video) {
        video.onclick = function() {
            openModal(this, 0, 'video');
        }
    }
});

console.log('JavaScript loaded'); // Untuk memastikan JavaScript dimuat