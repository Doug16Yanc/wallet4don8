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
    const newValue = prompt("Digite o novo valor da doação:");
    if (!newValue || isNaN(newValue) || newValue <= 0) {
        alert("Por favor, insira um valor válido.");
        return;
    }

    fetch(`http://localhost:8000/donations/update_donation/${donationId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ new_amount: parseFloat(newValue) })
    })
    .then(response => response.json())
    .then(result => {
        alert(result.message);
        document.getElementById(`value-${donationId}`).innerText = newValue; 
    })
    .catch(error => console.error('Erro ao atualizar doação:', error));
}

function deleteDonation(donationId) {
    if (!confirm("Tem certeza que deseja excluir esta doação?")) return;

    fetch(`http://localhost:8000/donations/delete_donation/${donationId}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (response.status === 204) {
          console.log('Doação excluída com sucesso');
        } else {
          return response.json().then(data => {
            console.error('Erro ao excluir doação:', data.message);
          });
        }
      })
      .catch(error => {
        console.error('Erro na requisição:', error);
      });
}
