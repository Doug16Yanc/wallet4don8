document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("login").addEventListener("click", function () {
        var userType = document.getElementById("user-type").value;
        if (userType === "admin") {
            window.location.href = "/login_admin";  
        } else {
            window.location.href = "/login_user";   
        }
    });
});

document.getElementById("login").addEventListener("click", function() {
    var dropdown = document.getElementById("dropdown-content");
    if (dropdown.style.display === "block") {
        dropdown.style.display = "none";
    } else {
        dropdown.style.display = "block";
    }
});

window.addEventListener("click", function(event) {
    if (!event.target.matches('login')) {
        var dropdown = document.getElementById("dropdown-content");
        if (dropdown.style.display === "block") {
            dropdown.style.display = "none";
        }
    }
});
