document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("sair").addEventListener("click", function () {
        localStorage.removeItem("token");
        sessionStorage.removeItem("token");
        window.location.href = "templates";
    });
});


document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("initial-btn").addEventListener("click", function () {
        window.location.href = "page_admin";
    });
});

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("create-causes-btn").addEventListener("click", function () {
        window.location.href = "create_causes";
    });
});

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("donations-btn").addEventListener("click", function () {
        window.location.href = "donations_to_admin";
    });
});

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("dashboard-btn").addEventListener("click", function () {
        window.location.href = "dashboard_admin";
    });
});
