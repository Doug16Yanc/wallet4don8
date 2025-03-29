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
            Swal.fire({
                title: "⚠️ Atenção!",
                text: "Identificador de usuário não identificado. Tente novamente!",
                icon: "warning",
                background: "#1E1C1C",
                color: "#ff8c00",
                confirmButtonColor: "#F84C0D"
            });
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
                Swal.fire({
                    title: "✅ Sucesso!",
                    text: "Doação criada com sucesso!",
                    icon: "success",
                    background: "#1E1C1C",
                    color: "#ff8c00",
                    confirmButtonColor: "#F84C0D"
                });
                console.log(result);
            } else {
                const error = await response.json();
                Swal.fire({
                    title: "❌ Erro!",
                    text: "Erro ao criar doação: " + error.detail,
                    icon: "error",
                    background: "#1E1C1C",
                    color: "#ff8c00",
                    confirmButtonColor: "#F84C0D"
                });
                console.error(error);
            }
        } catch (err) {
            Swal.fire({
                title: "❌ Erro inesperado!",
                text: "Um erro inesperado aconteceu.",
                icon: "error",
                background: "#1E1C1C",
                color: "#ff8c00",
                confirmButtonColor: "#F84C0D"
            });
            console.error(err);
        }
    });
});

