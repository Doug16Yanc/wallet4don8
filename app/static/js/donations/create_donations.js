document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("sair").addEventListener("click", function () {
        window.location.href = "index";
    });
});


document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('donation-form');

     document.getElementById('create-donation').addEventListener('click', async (event) => {
        event.preventDefault();

        const user_id = sessionStorage.getItem('user_id');

        if (!user_id) {
            alert('User id not found, try later again!')
            return;
        }

        const formData = {
            donation_id: parseInt(document.getElementById('donation-id').value, 10),
            address_account: document.getElementById('wallet-address').value.trim(),
            value: parseFloat(document.getElementById('amount').value),
            fk_cause: parseInt(document.getElementById('cause-id').value, 10),
            fk_user: parseInt(sessionStorage.getItem('user_id'), 10)
        };

        try {
            const response = await fetch('http://0.0.0.0:8000/donations/create_donations', {
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
