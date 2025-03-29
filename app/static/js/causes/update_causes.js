document.getElementById('update-cause').addEventListener('click', async (event) => {
    event.preventDefault();

    const cause_id = parseInt(document.getElementById('causeId').value, 10);

    if (!cause_id) {
        Swal.fire({
            title: "❌ ID inválido!",
            text: "O identificador da causa é obrigatório.",
            icon: "error",
            background: "#1E1C1C",
            color: "#ff8c00",
            confirmButtonColor: "#F84C0D"
        });
        return;
    }

    const formData = { cause_id: cause_id };

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
            Swal.fire({
                title: "✅ Causa atualizada!",
                text: "As informações foram modificadas com sucesso.",
                icon: "success",
                background: "#1E1C1C",
                color: "#ff8c00",
                confirmButtonColor: "#F84C0D"
            }).then(() => {
                window.location.reload();
            });

            console.log(result);
        } else {
            const error = await response.json();
            Swal.fire({
                title: "❌ Erro ao atualizar!",
                text: error.message || "Erro inesperado. Tente novamente.",
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
            text: "Verifique o console para mais detalhes.",
            icon: "error",
            background: "#1E1C1C",
            color: "#ff8c00",
            confirmButtonColor: "#F84C0D"
        });
        console.error(err);
    }
});

