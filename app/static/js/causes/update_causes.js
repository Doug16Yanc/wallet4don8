document.getElementById('update-cause').addEventListener('click', async (event) => {
    event.preventDefault();

    const cause_id = parseInt(document.getElementById('causeId').value, 10);
    const formData = {
        cause_id: cause_id
    };

    try {
        const response = await fetch(`http://localhost:8000/causes/update_cause/${cause_id}`, {
            method: 'PATCH', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            const result = await response.json();
            alert('Causa atualizada com sucesso!');
            console.log(result);
        } else {
            const error = await response.json();
            alert('Erro ao atualizar causa: ' + error.message);
            console.error(error);
        }
    } catch (err) {
        alert('Um erro inesperado aconteceu.');
        console.error(err);
    }
});

