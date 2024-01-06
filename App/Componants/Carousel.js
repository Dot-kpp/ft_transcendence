let currentSlide = 0;

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
    showSlide(currentSlide - 1);
}

function nextSlide() {
    showSlide(currentSlide + 1);
}