document.addEventListener("DOMContentLoaded", async function() {
    await generateDonationsChart(); 
    await initMap();  
});

async function fetchDashboardData() {
    try {
        const response = await fetch('http://localhost:8000/causes/get_causes');
        
        if (!response.ok) throw new Error(`Erro HTTP! status: ${response.status}`);
        
        const data = await response.json();
        console.log('Dados recebidos:', data);

        if (!data?.causes || !Array.isArray(data.causes)) {
            throw new Error('Estrutura de dados inválida');
        }

        const totals = calculateTotals(data.causes);
        updateUI(totals); 
        return { ...totals, causes: data.causes };
        
    } catch (error) {
        console.error('Falha ao carregar dados:', error);
        showErrorState();
        return { 
            storedAmount: 0, 
            appliedAmount: 0,
            totalAmount: 0, 
            causes: [] 
        };
    }
}

function calculateTotals(causes) {
    return {
        storedAmount: causes.reduce((total, cause) => {
            if (cause.status_amount === 'stored') {
                return total + (cause.amount || 0); 
            }
            return total;
        }, 0),

        appliedAmount: causes.reduce((total, cause) => {
            if (cause.status_amount === 'applied') {
                return total + (cause.amount || 0); 
            }
            return total;
        }, 0),

        totalAmount: causes.reduce((total, cause) => total + (cause.amount || 0), 0)
    };
}


function updateUI({ totalAmount }) {
    const totalElement = document.getElementById('totalAmount');

    if (totalElement) {
        totalElement.textContent = `R$ ${totalAmount.toLocaleString('pt-BR')}`;
    }
}

async function generateDonationsChart() {
    try {
        const { storedAmount, appliedAmount, totalAmount } = await fetchDashboardData();
        const ctx = document.getElementById('donationsChart')?.getContext('2d');
        
        if (!ctx) return;
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Total de Doações'],
                datasets: [
                    {
                        label: 'Armazenado',
                        data: [storedAmount],
                        backgroundColor: '#F84C0D', 
                        borderColor: '#F84C0D',
                        borderWidth: 2
                    },
                    {
                        label: 'Aplicado',
                        data: [appliedAmount],
                        backgroundColor: '#2ECC71',
                        borderColor: '#2ECC71',
                        borderWidth: 2
                    },
                    {
                        label: 'Total Doado',
                        data: [totalAmount],
                        backgroundColor: '#3498DB', 
                        borderColor: '#3498DB',
                        borderWidth: 2
                    }
                ]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: true,
                        position: 'top',
                        labels : {
                            color : "white",
                            font : {
                                size: 16
                            },
                            padding : 20
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `${context.dataset.label}: R$ ${context.raw.toLocaleString('pt-BR')}`;
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        ticks: {
                            color: 'white',
                            font : {
                                size : 16
                            },
                            padding: 20
                        }
                    },
                    y: {
                        beginAtZero: true,
                        ticks: {
                            color: "white",
                            font : {
                                size : 16
                            },
                            padding: 20,
                            callback: function(value) {
                                return 'R$ ' + value.toLocaleString('pt-BR');
                            }
                        }
                    }
                }
            }
        });
    } catch (error) {
        console.error('Erro ao gerar gráfico:', error);
    }
}

async function initMap() {
    try {
        const map = L.map("map").setView([-15, -55], 4);
        
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: '© OpenStreetMap'
        }).addTo(map);

        const locations = [
            { lat: -23.55052, lng: -46.633308, name: "São Paulo, Brasil" },
            { lat: -22.906847, lng: -43.172896, name: "Rio de Janeiro, Brasil" },
            { lat: -15.794229, lng: -47.929221, name: "Brasília, Brasil" },
            { lat: -12.971374, lng: -38.501305, name: "Salvador, Brasil" },
            { lat: -25.428954, lng: -49.267137, name: "Curitiba, Brasil" },
            { lat: -8.047562, lng: -34.877018, name: "Recife, Brasil" },
            { lat: -19.916681, lng: -43.934493, name: "Belo Horizonte, Brasil" },
            { lat: -3.119028, lng: -60.202309, name: "Manaus, Brasil" }
        ];
        
        locations.forEach(loc => {
            L.marker([loc.lat, loc.lng])
                .addTo(map)
                .bindPopup(`<b>${loc.name}</b>`);
        });
        
    } catch (error) {
        console.error('Erro ao carregar mapa:', error);
    }
}
