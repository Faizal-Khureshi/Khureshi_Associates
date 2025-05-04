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
    const elements = document.querySelectorAll('.helpimg img');

    // If scrolled down 50px or more, stop the interval
    if (scrollPosition >= 50) {
        stopInterval();
        us_container_textholder.forEach(element => {
          element.style.visibility = "";
      });
    } else {
        // If scrolled back up above 50px, start the interval
        startInterval();
        us_container_textholder.forEach(element => {
          element.style.visibility = "";
      });
    }
});
