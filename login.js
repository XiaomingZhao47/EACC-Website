// toggle login and signup forms
function toggleForms() {
    const loginForm = document.getElementById("login-form");
    const signupForm = document.getElementById("signup-form");
    loginForm.style.display = loginForm.style.display === "none" ? "block" : "none";
    signupForm.style.display = signupForm.style.display === "none" ? "block" : "none";
}

// login form submission
async function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    const response = await fetch("http://127.0.0.1:5000/api/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
    });

    const result = await response.json();
    if (result.success) {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userId", result.user_id);
        alert("Login successful!");
        window.location.href = "account.html";
    } else {
        alert(result.message);
    }
}

// signup form submission
async function handleSignup(event) {
    event.preventDefault();
    const name = document.getElementById("signup-name").value;
    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;

    const response = await fetch("http://127.0.0.1:5000/api/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, password })
    });

    const result = await response.json();
    if (result.success) {
        alert("Signup successful! Please log in.");
        toggleForms(); // login form
    } else {
        alert(result.message);
    }
}

