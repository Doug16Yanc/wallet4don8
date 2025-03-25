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
                data.causes.forEach(cause => {
                    if (cause && cause.cause_name && cause.description) {
                        const box = document.createElement('div');
                        box.classList.add('box');

                        const imgElement = document.createElement('img');
                        imgElement.alt = '';

                        if (cause.image_data) {
                            imgElement.src = `data:image;base64,${cause.image_data}`;
                        }

                        console.log(cause.image_data);
                        box.innerHTML = `
                            <div class="image">
                            </div>
                            <div class="content">
                                <h1>${cause.cause_name}</h1>
                                <div class="content-row">
                                    <div class="content-first-column">
                                        <h2>Identificador</h2>
                                        <p>${cause.cause_id}</p>
                                        
                                        <h2>Código certificador</h2>
                                        <p>${cause.certification_code}</p>
                                    </div>
                                    <div class="content-second-column">
                                        <h2>Montante atual</h2>
                                        <p class="current-amount">+ ${cause.amount}</p>
                                        <h2>Status do montante</h2>
                                        <h4 class="status-amount">${cause.status_amount}</h4>
                                    </div>
                                </div>
                                <div class="content-description">
                                    ${cause.description}
                                </div>
                                <!-- Botões de atualização e exclusão -->
                                <button class="update-status-button" data-cause-id="${cause.cause_id}">Aplicar valor</button>
                                <button class="delete-cause-button" data-cause-id="${cause.cause_id}">Excluir causa</button>
                            </div>
                        `;

                        const imageContainer = box.querySelector('.image');
                        imageContainer.appendChild(imgElement);

                        const updateStatusButton = box.querySelector('.update-status-button');
                        updateStatusButton.addEventListener('click', () => {
                            const causeId = updateStatusButton.getAttribute('data-cause-id');

                            fetch(`http://localhost:8000/causes/update_cause/${causeId}`, {
                                method: 'PATCH',
                                headers: {
                                    'Authorization': `Bearer ${token}`,
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({
                                    applied_amount: cause.amount 
                                })
                            })
                            .then(response => response.json())
                            .then(updatedCause => {
                                if (updatedCause.status === 'success') {
                                    const statusAmountElement = box.querySelector('.status-amount');
                                    statusAmountElement.textContent = updatedCause.cause.status_amount;
                                } else {
                                    alert('Erro ao aplicar valor.');
                                }
                            })
                            .catch(error => {
                                console.error('Erro ao aplicar valor:', error);
                                alert('Erro ao aplicar valor.');
                            });
                        });

                        const deleteCauseButton = box.querySelector('.delete-cause-button');
                        deleteCauseButton.addEventListener('click', () => {
                            const causeId = deleteCauseButton.getAttribute('data-cause-id');
                            if (confirm('Tem certeza que deseja excluir esta causa?')) {
                                fetch(`http://localhost:8000/causes/cause/${causeId}`, {
                                    method: 'DELETE',
                                    headers: {
                                        'Authorization': `Bearer ${token}`
                                    }
                                })
                                .then(response => {
                                    if (response.ok) {
                                        alert('Causa excluída com sucesso!');
                                        window.location.reload();  
                                    } else {
                                        alert('Erro ao excluir a causa.');
                                    }
                                })
                                .catch(error => {
                                    console.error('Erro ao excluir a causa:', error);
                                    alert('Erro ao excluir a causa.');
                                });
                            }
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
            alert('Erro ao buscar causas. Verifique o console para mais detalhes.');
        });
    } else {
        console.error('Elemento .box-container não encontrado.');
    }
});

/*
function arrayBufferToBase64(buffer) {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
}
*/