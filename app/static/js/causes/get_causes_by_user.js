document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.box-container');

    if (container) {
        const token = sessionStorage.getItem('access_token');

        fetch('http://localhost:8000/causes/get_causes', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}` 
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (data && data.status === 'success' && Array.isArray(data.causes)) {
                data.causes
                    .filter(cause => cause.status_amount !== "applied") 
                    .forEach(cause => {
                        if (cause && cause.cause_name && cause.description) {
                            const box = document.createElement('div');
                            box.classList.add('box');

                            const imgElement = document.createElement('img');
                            imgElement.alt = ''; 

                            if (cause.image_data) {
                                imgElement.src = `data:image;base64,${cause.image_data}`;
                            } else {
                                imgElement.src = 'caminho/para/imagem-padrao.jpg'; 
                            }

                            box.innerHTML = `
                                <div class="image"></div>

                                <div class="content">
                                    <h1>${cause.cause_name}</h1>
                                    <div class="content-row">
                                        <div class="content-first-column">
                                            <h2>Identificador</h2>
                                            <p>${cause.cause_id}</p>
                                            
                                            <h2>Código de certificação</h2>
                                            <p>${cause.certification_code}</p>
                                        </div>
                                        <div class="content-second-column">
                                            <h2>Montante atual</h2>
                                            <p class="current-amount">+ R$ ${(cause.amount || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                                            <h2>Status do montante</h2>
                                            <h4 class="status-amount">
                                            ${cause.status_amount === "applied" ? "Aplicado" : cause.status_amount === "stored" ? "Armazenado" : cause.status_amount}
                                            </h4>
                                        </div>
                                    </div>
                                    <div class="content-description">
                                        ${cause.description}
                                    </div>
                                    <button class="donate-button" data-cause-id="${cause.cause_id}">Doar</button>
                                </div>
                            `;

                            const imageContainer = box.querySelector('.image');
                            imageContainer.appendChild(imgElement);  

                            const donateButton = box.querySelector('.donate-button');
                            donateButton.addEventListener('click', () => {
                                const causeId = donateButton.getAttribute('data-cause-id');
                                window.location.href = `create_donations?id=${causeId}`; 
                            });

                            container.appendChild(box);
                        } else {
                            console.warn('Causa inválida:', cause);
                        }
                    });
            } else {
                console.error('Formato de resposta inválido:', data);
            }
        })
        .catch(error => {
            console.error('Erro ao buscar causas:', error);
        });
    } else {
        console.error('Elemento .box-container não encontrado.');
    }
});
