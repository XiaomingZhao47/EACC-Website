function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.account-section').forEach(section => {
        section.style.display = 'none';
    });
    // Show the selected section
    document.getElementById(sectionId).style.display = 'block';
}

let slideIndex = 0;
showSlides();

function showSlides() {
    let slides = document.getElementsByClassName("slide");
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }
    slideIndex++;
    if (slideIndex > slides.length) { slideIndex = 1; }
    slides[slideIndex - 1].style.display = "block";  
    setTimeout(showSlides, 3000); // Change image every 3 seconds
}

function changeSlide(n) {
    slideIndex += n;
    showSlides();
}
