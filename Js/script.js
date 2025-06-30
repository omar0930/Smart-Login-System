// Signup Page Logic
if (document.getElementById("signupBtn")) {
  document.getElementById("signupBtn").addEventListener("click", function () {
    let name = document.getElementById("signupName").value.trim();
    let email = document.getElementById("signupEmail").value.trim();
    let password = document.getElementById("signupPassword").value.trim();
    let message = document.getElementById("signupMessage");

    // Clear message before each submit
    message.textContent = "";
    message.classList.remove("text-success");
    message.classList.add("text-danger");

    if (name === "" || email === "" || password === "") {
      message.textContent = "Please fill in all fields.";
      return;
    }

    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      message.textContent = "Invalid email format.";
      return;
    }

    if (password.length < 6) {
      message.textContent = "Password must be at least 6 characters.";
      return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];
    let existingUser = users.find((user) => user.email === email);
    if (existingUser) {
      message.textContent = "Email already exists. Please use another one.";
      return;
    }

    users.push({ name, email, password });
    localStorage.setItem("users", JSON.stringify(users));

    message.classList.replace("text-danger", "text-success");
    message.textContent = "Account created successfully! Redirecting...";
    setTimeout(() => {
      window.location.href = "index.html";
    }, 1000);
  });
}

// Login Page Logic
if (document.getElementById("loginBtn")) {
  document.getElementById("loginBtn").addEventListener("click", function () {
    let email = document.getElementById("loginEmail").value.trim();
    let password = document.getElementById("loginPassword").value.trim();
    let message = document.getElementById("loginMessage");

    // Clear message before each submit
    message.textContent = "";
    message.classList.remove("text-success");
    message.classList.add("text-danger");

    if (email === "" || password === "") {
      message.textContent = "Please fill in both email and password.";
      return;
    }

    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      message.textContent = "Invalid email format.";
      return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];
    let foundUser = users.find(
      (user) => user.email === email && user.password === password
    );

    if (foundUser) {
      localStorage.setItem("currentUser", JSON.stringify(foundUser));
      message.classList.replace("text-danger", "text-success");
      message.textContent = "Login successful! Redirecting...";
      setTimeout(() => {
        window.location.href = "homepage.html";
      }, 1000);
    } else {
      message.textContent = "Incorrect email or password.";
    }
  });
}

// Home Page Logic
if (window.location.pathname.includes("homepage.html")) {
  let currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (!currentUser) {
    // User not logged in → redirect to login
    window.location.href = "index.html";
  } else {
    // Show welcome message
    document.getElementById("username").innerText = currentUser.name;

    // Logout button
    document.getElementById("logoutBtn").addEventListener("click", function () {
      localStorage.removeItem("currentUser");
      window.location.href = "index.html";
    });
  }
}
