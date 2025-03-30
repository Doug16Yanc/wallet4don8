document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.box-container');

    if (container) {
        fetch('http://localhost:8000/donations/get_donations')
            .then(response => {
                if (!response.ok) throw new Error(`Erro: ${response.status}`);
                return response.json();
            })
            .then(donations => {
                console.log('Dados recebidos:', donations);
                
                if (Array.isArray(donations)) {
                    donations.forEach(donation => {
                        if (donation && donation.donation_id && donation.address_account && donation.value && donation.fk_cause) {
                            const box = document.createElement('div');
                            box.className = 'box';

                            box.innerHTML = `
                                <div class="content">
                                    <h1>${donation.address_account}</h1>
                                    <div class="content-row">
                                        <div class="content-first-column">
                                            <h2>Identificador</h2>
                                            <p>${donation.donation_id}</p>
                                        </div>
                                        <div class="content-second-column">
                                            <h2>Valor doado</h2>
                                            <p>${donation.value}</p>
                                        </div>
                                    </div>
                                    <div class="content-description">
                                        <h3>Causa beneficiada</h3>
                                        <p>${donation.fk_cause}</p>
                                    </div>
                                </div>
                            `;
                            container.appendChild(box);
                        } else {
                            console.warn('Doação inválida:', donation);
                        }
                    });
                } else {
                    console.error('Formato de resposta inválido:', donations);
                }
            })
            .catch(error => console.error('Erro ao buscar doações:', error));
    } else {
        console.error('Elemento .box-container não encontrado.');
    }
});