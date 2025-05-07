const elements = document.querySelectorAll('.helpimg');
let counter = 0;
let intervalId = null; // Variable to hold the interval ID
const us_container_textholder = document.querySelectorAll('.us_container_textholder');

// Function to change the active and previous elements
function changeActiveElement() {
    // Get the currently active element
    const currentActiveElement = document.querySelector('.bgimg--active');

    // Remove the .bgimg--prev class from all elements
    elements.forEach(element => {
        element.classList.remove('bgimg--prev');
    });

    // If there is a currently active element, remove its active class
    // and add the .bgimg--prev class to it
    if (currentActiveElement) {
        currentActiveElement.classList.remove('bgimg--active');
        currentActiveElement.classList.add('bgimg--prev');
    }

    // Calculate the index of the next element
    counter = (counter + 1) % elements.length;

    // Add the .bgimg--active class to the next element
    elements[counter].classList.add('bgimg--active');
}

// Function to start the interval
function startInterval() {
    // Only start the interval if it's not already running
    if (intervalId === null) {
        intervalId = setInterval(changeActiveElement, 3000);
    }
}

// Function to stop the interval
function stopInterval() {
    // Only stop the interval if it's currently running
    if (intervalId !== null) {
        clearInterval(intervalId);
        intervalId = null; // Reset the intervalId
    }
}

// Initially set the first element as active
elements[0].classList.add('bgimg--active');

// Start the initial interval
startInterval();

// Add a scroll event listener to the window
window.addEventListener('scroll', () => {
    // Get the current scroll position
    const scrollPosition = window.scrollY || document.documentElement.scrollTop;

    // If scrolled down 50px or more, stop the interval
    if (scrollPosition >= 50) {
        // Assuming stopInterval and startInterval are defined elsewhere
        if (typeof stopInterval === 'function') {
            stopInterval();
        }
    } else {
        // If scrolled back up above 50px, start the interval
        if (typeof startInterval === 'function') {
            startInterval();
        }
    }
});



window.addEventListener('scroll', () => {
    // Get the current scroll position
    const scrollPosition = window.scrollY || document.documentElement.scrollTop;
    const us_container_textholder = document.querySelectorAll('.us_container_textholder');

    // Define the scroll range over which the animation occurs (in pixels)
    // Adjust this value to control how much the user needs to scroll for the div to fully appear
    const animationScrollRange = 500; // Example: animation completes after scrolling 500px

    // Calculate the progress of the scroll within the animation range
    // Progress goes from 0 (at start of range) to 1 (at end of range)
    const scrollProgress = Math.min(1, scrollPosition / animationScrollRange);

    // Calculate the translateY percentage
    // Starts at 100% (off-screen) and goes to 0% (fully visible)
    const translateY_percentage = 100 - (scrollProgress * 100);

    // Apply the transform to each selected element
    us_container_textholder.forEach(element => {
        element.style.transform = `translate3d(0, ${translateY_percentage}%, 0)`;
    });
});

// Optional: Set initial position on page load
// This ensures the div is in the correct starting position before any scrolling happens
window.dispatchEvent(new Event('scroll'));

