document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("voltar").addEventListener("click", function () {
        window.location.href = "page_causes";
    });
});


document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('donation-form');

     document.getElementById('create_donation').addEventListener('click', async (event) => {
        event.preventDefault();
        const urlParams = new URLSearchParams(window.location.search);
        const causeId = urlParams.get('id'); 

        if (causeId) {
            document.getElementById('cause_id').value = causeId;  
        }

        const user_id = sessionStorage.getItem('user_id');

        if (!user_id) {
            alert('Identificador de usuário não identificado. Tente novamente!')
            return;
        }

        const formData = {
            address_account: document.getElementById('wallet_address').value.trim(),
            value: parseFloat(document.getElementById('amount').value),
            fk_cause: causeId,
            fk_user: parseInt(sessionStorage.getItem('user_id'), 10)
        };

        try {
            const response = await fetch('http://0.0.0.0:8000/donations/create_donation', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                const result = await response.json();
                alert('Doação criada com sucesso!');
                console.log(result);
            } else {
                const error = await response.json();
                alert('Erro ao criar doação: ' + error.detail);
                console.error(error);
            }
        } catch (err) {
            alert('Um erro inesperado aconteceu.');
            console.error(err);
        }
    });
});
