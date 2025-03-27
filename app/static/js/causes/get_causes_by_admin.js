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
            console.log("Dados recebidos da API:", data);
            console.log("Imagem", data.causes.image_data);
            
            if (data && data.status === 'success' && Array.isArray(data.causes)) {
                data.causes.forEach(cause => {
                    if (cause && cause.cause_name && cause.description) {
                        console.log("Processando causa:", cause.cause_id); 
                        console.log("Dados da imagem:", cause.image_data ? `Base64 (${cause.image_data.length} chars)` : 'Nenhuma imagem'); 

                        const box = document.createElement('div');
                        box.classList.add('box');

                        let imageHtml = '';
                        if (cause.image_data && cause.image_data.length > 100) {
                            imageHtml = `
                                <div class="image">
                                    <img src="data:image/*;base64,${cause.image_data}" 
                                         alt="${cause.cause_name}"
                                         onerror="this.style.display='none'; console.error('Erro ao carregar imagem')">
                                </div>
                            `;
                        } else {
                            imageHtml = `
                                <div class="image">
                                    <div class="no-image-placeholder">Sem imagem</div>
                                </div>
                            `;
                        }

                        box.innerHTML = `
                            ${imageHtml}
                            <div class="content">
                                <h1>${cause.cause_name}</h1>
                                <div class="content-row">
                                    <div class="content-first-column">
                                        <h2>Identificador</h2>
                                        <p>${cause.cause_id}</p>
                                        
                                        <h2>Código certificador</h2>
                                        <p>${cause.certification_code || 'Não informado'}</p>
                                    </div>
                                    <div class="content-second-column">
                                        <h2>Montante atual</h2>
                                        <p class="current-amount">+ ${cause.amount || 0}</p>
                                        <h2>Status do montante</h2>
                                        ${cause.status_amount === "applied" ? "Aplicado" : 
                                          cause.status_amount === "stored" ? "Armazenado" : 
                                          cause.status_amount || "Não informado"}
                                    </div>
                                </div>
                                <div class="content-description">
                                    ${cause.description}
                                </div>
                                <div class="action-buttons">
                                    <button class="update-status-button" data-cause-id="${cause.cause_id}">Aplicar valor</button>
                                    <button class="delete-cause-button" data-cause-id="${cause.cause_id}">Excluir causa</button>
                                </div>
                            </div>
                        `;

                        const updateStatusButton = box.querySelector('.update-status-button');
                        updateStatusButton.addEventListener('click', () => {
                            const causeId = updateStatusButton.getAttribute('data-cause-id');
                            updateCauseStatus(causeId, cause.amount, token);
                        });

                        const deleteCauseButton = box.querySelector('.delete-cause-button');
                        deleteCauseButton.addEventListener('click', () => {
                            const causeId = deleteCauseButton.getAttribute('data-cause-id');
                            deleteCause(causeId, token);
                        });

                        container.appendChild(box);
                    } else {
                        console.warn('Causa inválida:', cause);
                    }
                });
            } else {
                console.error('Formato de resposta inválido:', data);
                alert('Ocorreu um erro ao carregar as causas. Por favor, tente novamente.');
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

function updateCauseStatus(causeId, amount, token) {
    if (!confirm('Deseja realmente aplicar este valor?')) return;

    fetch(`http://localhost:8000/causes/update_cause/${causeId}`, {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            applied_amount: amount 
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            alert('Valor aplicado com sucesso!');
            window.location.reload();
        } else {
            alert('Erro ao aplicar valor: ' + (data.message || ''));
        }
    })
    .catch(error => {
        console.error('Erro ao aplicar valor:', error);
        alert('Erro ao aplicar valor. Verifique o console para detalhes.');
    });
}

function deleteCause(causeId, token) {
    if (!confirm('Tem certeza que deseja excluir esta causa?')) return;

    fetch(`http://localhost:8000/causes/delete_cause/${causeId}`, {
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
            response.json().then(data => {
                alert('Erro ao excluir a causa: ' + (data.message || ''));
            });
        }
    })
    .catch(error => {
        console.error('Erro ao excluir a causa:', error);
        alert('Erro ao excluir a causa. Verifique o console para detalhes.');
    });
}