// Get the elements by their specific IDs
const hoverSource = document.getElementById('help_hover_nav_pro');
const targetElement1 = document.getElementById('nav_hover');
const targetElement2 = document.getElementById('header_header');


let mouseLeaveTimer;
const delay = 1000; // 1-second delay

// Variable to track if the mouse is currently over the targetElement1
let isMouseOverTarget = false;

// Check if both elements exist before adding listeners
if (hoverSource && targetElement1) {
    // Add event listener for mouse entering the hover source
    hoverSource.addEventListener('mouseenter', function() {
        // Clear any pending mouseleave timer from hoverSource
        clearTimeout(mouseLeaveTimer);
        // Show the target element immediately on hoverSource entry
        targetElement1.style.transform = `translate3d(0, 0, 0)`;
        targetElement1.style.opacity = '100%';
        targetElement2.style.backgroundColor = '#000000';
        targetElement1.style.transition = 'transform 1s cubic-bezier(.645,.045,.355,1) , opacity 1.5s ease';
        targetElement2.style.transition = 'background-color 0.3s ease';
    });

    // Add event listener for mouse leaving the hover source
    hoverSource.addEventListener('mouseleave', function() {
        // Start a timer to hide the target element IF the mouse is not over the target element
        mouseLeaveTimer = setTimeout(function() {
            if (!isMouseOverTarget) {
                targetElement1.style.transform = `translate3d(0, -20%, 0)`;
                targetElement1.style.opacity = '0';
                targetElement2.style.backgroundColor = 'transparent';
                targetElement1.style.transition = 'transform 0.3s cubic-bezier(.645,.045,.355,1) , opacity 0.2s ease';
                targetElement2.style.transition = 'background-color 0.6s ease';
            }
        }, delay);
    });

    // Add event listener for mouse entering the target element
    targetElement1.addEventListener('mouseenter', function() {
        // Set the flag to true as the mouse is now over the target
        isMouseOverTarget = true;
        // Clear the mouseleave timer from hoverSource if it's running,
        // as we don't want to hide the target while the mouse is on it
        clearTimeout(mouseLeaveTimer);
    });

    // Add event listener for mouse leaving the target element
    targetElement1.addEventListener('mouseleave', function() {
        // Set the flag to false as the mouse is no longer over the target
        isMouseOverTarget = false;
        // Now that the mouse has left the target, start the timer to hide it
        // This handles the case where the mouse went from hoverSource to targetElement1
        // and then left targetElement1.
        mouseLeaveTimer = setTimeout(function() {
            // Check again if the mouse is *still* not over the target (should be true here)
            // and also check if the mouse is not over the hoverSource.
            // This prevents the target from hiding if the mouse quickly goes back to hoverSource
             if (!isMouseOverTarget && !hoverSource.matches(':hover')) {
                 targetElement1.style.transform = `translate3d(0, -20%, 0)`;
                 targetElement1.style.opacity = '0';
                 targetElement2.style.backgroundColor = 'transparent';
                 targetElement1.style.transition = 'transform 0.3s cubic-bezier(.645,.045,.355,1) , opacity 0.2s ease';
                 targetElement2.style.transition = 'background-color 0.6s ease';
             }
        }, delay); // Use the same delay or a different one if desired
    });

} else {
    console.error("One or both elements (hoverSource, targetElement1) not found!");
}
















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

    function preventScroll(e){

        e.preventDefault();
        e.stopPropagation();

        return false; 
    }


// Wait for the DOM to be fully loaded before running the script
        document.addEventListener('DOMContentLoaded', (event) => {
            // Get the target div element
            const myus_container = document.querySelector('.us_container');
            const my_text1 = document.querySelector('.us_container_text_first1');
            const my_text2 = document.querySelector('.us_container_text_first2');
         

            // Check if the element was found
            if (!myus_container) {
                console.error('Element with ID "us_container" not found.');
                return; // Stop execution if the element is not found
            }

             let isBodyScrollLocked = false;

            function lockBodyScroll() {
                if (!isBodyScrollLocked) {
                    document.body.style.overflowY = 'hidden';
                    isBodyScrollLocked = true;
                    console.log('Body scroll locked.');
                    // Add the horizontal scroll listener when the body scroll is locked
                    myus_container.addEventListener('scroll', handleHorizontalScroll);
                    // Add the mouse wheel listener for horizontal scrolling
                    myus_container.addEventListener('wheel', handleMouseWheelScroll);
                }
            }

            function unlockBodyScroll() {
                if (isBodyScrollLocked) {
                    document.body.style.overflowY = 'auto';
                    isBodyScrollLocked = false;
                    console.log('Body scroll unlocked.');
                    // Remove the horizontal scroll listener when body scroll is unlocked
                    myus_container.removeEventListener('scroll', handleHorizontalScroll);
                     // Remove the mouse wheel listener
                    myus_container.removeEventListener('wheel', handleMouseWheelScroll);
                }
            }

            const options = {
              root: null,
              rootMargin: '0px 0px -110% 0px',
              threshold: 0,
            };

            const observer = new IntersectionObserver(function(entries, observer) {
                entries.forEach(entry => {
                    if (entry.isIntersecting && entry.boundingClientRect.top <= 0) {
                        console.log('The Target Div has reached the top of the screen (using IntersectionObserver)!');
                        my_text1.style.transform = 'translate3d(0 , 0 , 0)';
                        my_text1.style.opacity = '1';
                        my_text1.style.transition = 'transform 1.4s cubic-bezier(.645,.045,.355,1) , opacity 1s ease';
                        my_text2.style.transform = 'translate3d(0 , 0 , 0)';
                        my_text2.style.opacity = '1';
                        my_text2.style.transition = 'transform 2.4s cubic-bezier(.645,.045,.355,1) , opacity 3s ease';
                        
                    } else {
                        console.log('The Target Div is not at the top yet or not intersecting.');
                        my_text1.style.transform = 'translate3d(0 , 30px , 0)';
                        my_text1.style.opacity = '0';
                        my_text1.style.transition = 'transform 0.3s cubic-bezier(.645,.045,.355,1) , opacity 0.2s ease';
                        my_text2.style.transform = 'translate3d(0 , 30px , 0)';
                        my_text2.style.opacity = '0';
                        my_text2.style.transition = 'transform 0.3s cubic-bezier(.645,.045,.355,1) , opacity 0.2s ease';
                        unlockBodyScroll();
                    }
                });
            }, options);

        
            function handleHorizontalScroll() {
            
                const tolerance = 1; // Small tolerance
                if (myus_container.scrollLeft + myus_container.clientWidth >= myus_container.scrollWidth - tolerance) {
                    console.log('Horizontal scroll complete. Unlocking body scroll.');
                    unlockBodyScroll();
                }
            }

            function handleMouseWheelScroll(event) {
                event.preventDefault();

                myus_container.scrollLeft += event.deltaY;
            }

            observer.observe(myus_container);

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


const carousel = document.querySelector('.new_product_carousel');
        const carouselCards = document.querySelectorAll('.new_product_carousel_card');
        const carouselCounter = document.getElementById('carousel_counter');
        let currentIndex = 0;
        const totalImages = carouselCards.length;

        // Function to update the counter text
        function updateCounter() {
            const currentNumber = (currentIndex + 1).toString().padStart(2, '0');
            carouselCounter.textContent = `${currentNumber} / ${totalImages.toString().padStart(2, '0')}`;
        }

        // Function to scroll the carousel
        function scrollCarousel(direction) {
            const cardWidth = carouselCards[0].offsetWidth + 20; 
            let newIndex = currentIndex + direction;

            // Clamp the new index to prevent going out of bounds
            newIndex = Math.max(0, Math.min(newIndex, totalImages - 1));

            const scrollAmount = newIndex * cardWidth;

            carousel.scrollTo({
                left: scrollAmount,
                behavior: 'smooth'
            });

            currentIndex = newIndex;
            updateCounter();
        }

        updateCounter();