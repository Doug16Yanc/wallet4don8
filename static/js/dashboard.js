document.addEventListener("DOMContentLoaded", function () {
    const ctx = document.getElementById("donationsChart").getContext("2d");
    new Chart(ctx, {
        type: "line",
        data: {
            labels: ["Jan", "Fev", "Mar", "Abr", "Mai"],
            datasets: [{
                label: "Doações ($)",
                data: [10000, 22000, 45000, 80000, 125000],
                borderColor: "#00ffcc",
                borderWidth: 2,
                fill: false,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: { beginAtZero: true }
            }
        }
    });

    const map = L.map("map").setView([10, 0], 2);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

    const locations = [
        { lat: -23.55052, lng: -46.633308, name: "São Paulo, Brasil" },
        { lat: 40.712776, lng: -74.005974, name: "Nova York, EUA" },
        { lat: 51.507351, lng: -0.127758, name: "Londres, Reino Unido" },
        { lat: 19.432608, lng: -99.133209, name: "Cidade do México, México" }
    ];

    locations.forEach(loc => {
        L.marker([loc.lat, loc.lng]).addTo(map)
         .bindPopup(`<b>${loc.name}</b>`);
    });
});
