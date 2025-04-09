document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.box-container');
    const userId = sessionStorage.getItem('user_id'); 

    if (!userId) {
        alert('Usuário não identificado! Faça login.');
        return;
    }

    if (container) {
        fetch(`http://localhost:8000/donations/get_donations/${userId}`)
            .then(response => {
                if (!response.ok) throw new Error(`Erro: ${response.status}`);
                return response.json();
            })
            .then(donations => {
                console.log('Doações recebidas:', donations);
                
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
                                            <p id="value-${donation.donation_id}">${donation.value}</p>
                                        </div>
                                    </div>
                                    <div class="content-description">
                                        <h3>Causa beneficiada</h3>
                                        <p>${donation.fk_cause}</p>
                                    </div>
                                    <button class="update-button" data-id="${donation.donation_id}">Atualizar Valor</button>
                                    <button class="delete-button" data-id="${donation.donation_id}">Excluir Doação</button>
                                </div>
                            `;

                            const updateButton = box.querySelector('.update-button');
                            updateButton.addEventListener('click', () => updateDonation(donation.donation_id));

                            const deleteButton = box.querySelector('.delete-button');
                            deleteButton.addEventListener('click', () => deleteDonation(donation.donation_id));

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

function updateDonation(donationId) {
    Swal.fire({
        title: "💰 Atualizar Doação",
        input: "number",
        inputLabel: "Digite o novo valor:",
        inputPlaceholder: "Ex: 0.1",
        inputAttributes: { min: "0", step: "0.01" },
        showCancelButton: true,
        confirmButtonText: "Atualizar",
        cancelButtonText: "Cancelar",
        background: "#1E1C1C",
        color: "#fff",
        confirmButtonColor: "#F84C0D",
        cancelButtonColor: "#666",
        customClass: {
            popup: "custom-swal"
        }
    }).then((result) => {
        if (result.isConfirmed && result.value > 0) {
            fetch(`http://localhost:8000/donations/update_donation/${donationId}`, {
                method: 'PATCH',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${sessionStorage.getItem('access_token')}` 
                },
                body: JSON.stringify({ new_amount: parseFloat(result.value) })
            })
            .then(response => {
                if (!response.ok) { 
                    return response.json().then(err => { 
                        throw new Error(err.detail || "Erro ao atualizar doação"); 
                    });
                }
                return response.json();
            })
            .then(data => {
                Swal.fire({
                    title: "✅ Atualizado!",
                    text: data.message || "Valor atualizado com sucesso!",
                    icon: "success",
                    background: "#1E1C1C",
                    color: "#fff",
                    confirmButtonColor: "#ff8c00"
                });
                document.getElementById(`value-${donationId}`).innerText = `R$ ${parseFloat(result.value).toFixed(2)}`;
            })
            .catch(error => {
                Swal.fire({
                    title: "❌ Erro!",
                    text: error.message || "Não foi possível atualizar a doação.",
                    icon: "error",
                    background: "#1a1a1a",
                    color: "#ff8c00",
                    confirmButtonColor: "#ff8c00"
                });
            });
        }
    });
}

function deleteDonation(donationId) {
    Swal.fire({
        title: "🗑️ Confirmar Exclusão",
        text: "Tem certeza que deseja excluir esta doação? Essa ação não pode ser desfeita.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sim, excluir",
        cancelButtonText: "Cancelar",
        background: "#1E1C1C",
        color: "#fff",
        confirmButtonColor: "#F84C0D",
        cancelButtonColor: "#666"
    }).then((result) => {
        if (result.isConfirmed) {
            fetch(`http://localhost:8000/donations/delete_donation/${donationId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('access_token')}`
                }
            })
            .then(response => {
                if (!response.ok) {
                    return response.json().then(err => {
                        throw new Error(err.detail || "Erro ao excluir doação");
                    });
                }
            })
            .then(data => {
                Swal.fire({
                    title: "✅ Excluído!",
                    text: "A doação foi removida com sucesso.",
                    icon: "success",
                    background: "#1a1a1a",
                    color: "#ff8c00",
                    confirmButtonColor: "#ff8c00",
                }).then(() => {
                    window.location.reload();
                });
            })
            .catch(error => {
                Swal.fire({
                    title: "❌ Erro!",
                    text: error.message || "Ocorreu um problema ao excluir.",
                    icon: "error",
                    background: "#1a1a1a",
                    color: "#ff8c00",
                    confirmButtonColor: "#ff8c00"
                });
            });
        }
    });
}