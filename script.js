// JavaScript for the Gallery/Carousel
const galleryWrapper = document.querySelector('.gallery-wrapper');
const galleryTrack = document.querySelector('.gallery-track');
const gallerySlides = document.querySelectorAll('.gallery-slide');
const imageCaption = document.querySelector('.image-caption');
const imageCounter = document.querySelector('.image-counter');
const leftButton = document.querySelector('.nav-button.left');
const rightButton = document.querySelector('.nav-button.right');

// Array of image sources and captions (for updating caption and counter)
const galleryItems = [
    { src: 'https://placehold.co/800x600/FF5733/FFFFFF?text=Image+1', caption: 'Image 1 Name' },
    { src: 'https://placehold.co/800x600/33FF57/FFFFFF?text=Image+2', caption: 'Image 2 Name' },
    { src: 'https://placehold.co/800x600/3357FF/FFFFFF?text=Image+3', caption: 'Image 3 Name' },
    { src: 'https://placehold.co/800x600/FFFF33/000000?text=Image+4', caption: 'Image 4 Name' },
    { src: 'https://placehold.co/800x600/FF33FF/FFFFFF?text=Image+5', caption: 'Image 5 Name' },
    { src: 'https://placehold.co/800x600/33FFFF/000000?text=Image+6', caption: 'Image 6 Name' },
    { src: 'https://placehold.co/800x600/5733FF/FFFFFF?text=Image+7', caption: 'Image 7 Name' },
];

let currentIndex = 0;
const totalItems = galleryItems.length;

// Function to update the displayed image, caption, and counter
function updateGallery() {
    // Ensure index wraps around
    if (currentIndex < 0) {
        currentIndex = totalItems - 1;
    } else if (currentIndex >= totalItems) {
        currentIndex = 0;
    }

    // Get the defined slide width and gap from CSS variables
    const slideWidth = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--slide-width'));
    const gapWidth = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--gap-width'));

    // Calculate the translation needed to align the left edge of the current slide
    // with the left edge of the gallery wrapper's content area.
    // The left edge of the current slide relative to the start of the track is:
    // currentIndex * (slideWidth + gapWidth)
    const translation = -currentIndex * (slideWidth + gapWidth);


    galleryTrack.style.transform = `translateX(${translation}px)`;

    // Update caption and counter
    imageCaption.textContent = galleryItems[currentIndex].caption;
    imageCounter.textContent = `${currentIndex + 1}/${totalItems}`;
}

// Event listeners for navigation buttons
leftButton.addEventListener('click', () => {
    currentIndex--;
    updateGallery();
});

rightButton.addEventListener('click', () => {
    currentIndex++;
    updateGallery();
});

// Update carousel on window resize to maintain position
window.addEventListener('resize', updateGallery);

// Initialize the gallery with the first image on load
// Use setTimeout as a fallback to ensure dimensions are calculated correctly
// after the DOM is ready and images potentially loaded.
window.addEventListener('load', updateGallery);
setTimeout(updateGallery, 500);
