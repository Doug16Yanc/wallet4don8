document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("sair").addEventListener("click", function () {
        window.location.href = "index";
    });
});


document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('second-form-donation');

    document.getElementById('delete-donation').addEventListener('click', async (event) => {
        event.preventDefault();

        const formData = {
            donation_id: parseInt(document.getElementById('donation_id').value, 10),
        };

        try {
            const response = await fetch(`http://0.0.0.0:8000/donations/delete-donation/${formData.donation_id}`, {
                method: 'DELETE',
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
                alert('Erro ao deletar doação: ' + error.detail);
                console.error(error);
            }
        } catch (err) {
            alert('Um erro inesperado aconteceu.');
            console.error(err);
        }
    });
});