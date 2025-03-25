document.addEventListener("DOMContentLoaded", function () {
    const loginButton = document.getElementById("login");
    const dropdown = document.getElementById("dropdown-content");
    const adminLogin = document.getElementById("admin-login");
    const userLogin = document.getElementById("user-login");

    loginButton.addEventListener("click", function (event) {
        event.stopPropagation(); 
        dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
    });

    adminLogin.addEventListener("click", function () {
        window.location.href = "/login_admin";
    });

    userLogin.addEventListener("click", function () {
        window.location.href = "/login_user";
    });

    window.addEventListener("click", function (event) {
        if (!loginButton.contains(event.target) && !dropdown.contains(event.target)) {
            dropdown.style.display = "none";
        }
    });
});

