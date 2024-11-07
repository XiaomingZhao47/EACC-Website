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

    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (isLoggedIn === "true") {
        // redirect to account page if logged
        window.location.href = "account.html";
    } else {
        // redirect to login page if not logged
        window.location.href = "login.html";
    }
}

document.addEventListener("DOMContentLoaded", async function () {
    const userId = localStorage.getItem("userId"); // Assume userId is stored in localStorage after login

    if (!userId) {
        console.error("User not logged in. Redirecting to login page.");
        window.location.href = "login.html";
        return;
    }

    try {
        const response = await fetch("http://127.0.0.1:5000/api/user", {
            method: "GET",
            headers: {
                "User-ID": userId, // Send user ID in headers
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch user data: ${response.statusText}`);
        }

        const userData = await response.json();

        // Log fetched user data to verify
        console.log("Fetched user data:", userData);

        // Populate user details in the account info section
        document.getElementById("user-full-name").textContent = userData.username;
        document.getElementById("user-join-date").textContent = new Date(userData.join_date).toLocaleDateString();
        document.getElementById("user-email").textContent = userData.email;
        document.getElementById("user-contact-number").textContent = userData.contact_number || "N/A";
    } catch (error) {
        console.error("Error fetching user data:", error);
        alert("Could not load user data. Please try again.");
        window.location.href = "login.html"; // Redirect to login on failure
    }
});

