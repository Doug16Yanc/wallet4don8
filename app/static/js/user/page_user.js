document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("logout-action").addEventListener("click", function () {
        localStorage.removeItem("token");
        sessionStorage.removeItem("token");
        window.location.href = "templates";
    });
});

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("initial-btn").addEventListener("click", function () {
        window.location.href = "page_causes";
    });
});

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("donation-btn").addEventListener("click", function () {
        window.location.href = "donations_to_user";
    });
});

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("dashboard-btn").addEventListener("click", function () {
        window.location.href = "dashboard_user";
    });
});

