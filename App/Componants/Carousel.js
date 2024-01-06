let currentSlide = 0;
let slideInterval;

function startSlideShow() {
    slideInterval = setInterval(nextSlide, 6000); // We can chage the slide time here
}

function stopSlideShow() {
    clearInterval(slideInterval);
}

function showSlide(index) {
    const carouselInner = document.querySelector(".carousel-inner");
    const totalSlides = document.querySelectorAll(".carousel-item").length;

    if (index < 0) {
        index = totalSlides - 1;
    } else if (index >= totalSlides) {
        index = 0;
    }

    currentSlide = index;
    const newTransformValue = -index * 100 + "%";
    carouselInner.style.transform = "translateX(" + newTransformValue + ")";
}

function prevSlide() {
    stopSlideShow();
    showSlide(currentSlide - 1);
    startSlideShow();
}

function nextSlide() {
    stopSlideShow();
    showSlide(currentSlide + 1);
    startSlideShow();
}

startSlideShow();