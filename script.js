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

// Payment related functions
function showPaymentForm() {
    const form = document.getElementById('payment-form');
    form.style.display = form.style.display === 'none' ? 'block' : 'none';
}

function handlePaymentSubmit(event) {
    event.preventDefault();
    // Add payment processing logic here
    alert('Payment method added successfully!');
    document.getElementById('payment-form').style.display = 'none';
}

// Add input formatting for payment fields
document.addEventListener('DOMContentLoaded', function () {
    // Format card number input
    const cardInput = document.getElementById('cardNumber');
    if (cardInput) {
        cardInput.addEventListener('input', function (e) {
            let value = e.target.value.replace(/\D/g, '');
            e.target.value = value;
        });
    }

    // Format expiry date input
    const expiryInput = document.getElementById('expiryDate');
    if (expiryInput) {
        expiryInput.addEventListener('input', function (e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length >= 2) {
                value = value.slice(0, 2) + '/' + value.slice(2);
            }
            e.target.value = value;
        });
    }

    // Format CVV input
    const cvvInput = document.getElementById('cvv');
    if (cvvInput) {
        cvvInput.addEventListener('input', function (e) {
            let value = e.target.value.replace(/\D/g, '');
            e.target.value = value;
        });
    }
});

function showContactSection(sectionId) {
    // Remove active class from all sidebar links
    document.querySelectorAll('.contact-sidebar a').forEach(link => {
        link.classList.remove('active');
    });

    // Add active class to clicked link
    event.target.classList.add('active');

    // Hide all sections
    document.querySelectorAll('.contact-section').forEach(section => {
        section.style.display = 'none';
    });

    // Show the selected section
    document.getElementById(sectionId).style.display = 'block';
}

function checkLoginStatus() {
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (isLoggedIn === "true") {
        // redirect to account page if logged
        window.location.href = "account.html";
    } else {
        // redirect to login page if not logged
        window.location.href = "login.html";
    }
}

