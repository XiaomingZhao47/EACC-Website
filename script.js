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

function logout() {
    localStorage.removeItem("userId");
    localStorage.removeItem("isLoggedIn");

    const userId = localStorage.getItem("userId");
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    window.location.href = "home.html";
}

function checkLoginStatus() {

    const userId = localStorage.getItem("userId");
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    console.log("User ID:", userId);

    if (isLoggedIn === "true") {
        // redirect to account page if logged
        window.location.href = "account.html";
    } else {
        // redirect to login page if not logged
        window.location.href = "login.html";
    }
}

document.addEventListener("DOMContentLoaded", () => {
    loadUserData();
});

function loadUserData() {
    const userId = localStorage.getItem("userId");
    if (!userId) {
        alert("User not logged in.");
        window.location.href = "login.html";
        return;
    }

    fetch("http://127.0.0.1:5000/api/user", {
        method: "GET",
        headers: {
            "User-ID": userId
        }
    })
        .then(response => {
            if (response.status === 401) {
                alert("User not logged in.");
                window.location.href = "login.html";
                return;
            }
            if (!response.ok) {
                throw new Error("Failed to fetch user data.");
            }
            return response.json();
        })
        .then(data => {
            if (data.error) {
                alert(data.error);
                window.location.href = "login.html";
                return;
            }

            document.getElementById("user-full-name").textContent = data.username || "N/A";
            document.getElementById("user-join-date").textContent = data.join_date || "N/A";
            document.getElementById("user-email").textContent = data.email || "N/A";
            document.getElementById("user-contact-number").textContent = data.contact_number || "N/A";
        })
        .catch(error => {
            console.error("Error:", error);
            alert("An error occurred while loading user data.");
        });
}

// Function to handle section visibility in photos page
function showPhotoSection(sectionId) {
    // For debugging
    console.log('Showing section:', sectionId);

    // Remove active class from all sidebar links
    document.querySelectorAll('.photos-sidebar a').forEach(link => {
        link.classList.remove('active');
    });

    // Add active class to clicked link
    event.target.classList.add('active');

    // Hide all sections first
    document.querySelectorAll('.photos-section').forEach(section => {
        section.style.display = 'none';
    });

    // Show the selected section
    const selectedSection = document.getElementById(sectionId);
    if (selectedSection) {
        selectedSection.style.display = 'block';
        // Force a reflow to ensure images are displayed
        selectedSection.offsetHeight;
    } else {
        console.error('Section not found:', sectionId);
    }
}

// Initialize the page with the first section visible
document.addEventListener('DOMContentLoaded', function() {
    // Show After School section by default
    showPhotoSection('after-school');
    
    // Add click event listeners to all sidebar links
    document.querySelectorAll('.photos-sidebar a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const sectionId = this.getAttribute('onclick').match(/'([^']+)'/)[1];
            showPhotoSection(sectionId);
        });
    });

    // Log when images are loaded or fail to load
    document.querySelectorAll('.photo-image').forEach(img => {
        img.addEventListener('load', () => {
            console.log('Image loaded:', img.src);
        });
        
        img.addEventListener('error', () => {
            console.log('Image failed to load:', img.src);
        });
    });
});
