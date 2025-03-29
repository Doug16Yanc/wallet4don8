document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('delete-cause').addEventListener('click', async (event) => {
        event.preventDefault();

        const cause_id = parseInt(document.getElementById('cause_id').value, 10);

        if (!cause_id) {
            Swal.fire({
                title: "❌ ID Inválido!",
                text: "O identificador da causa é obrigatório.",
                icon: "error",
                background: "#1E1C1C",
                color: "#ff8c00",
                confirmButtonColor: "#F84C0D"
            });
            return;
        }

        Swal.fire({
            title: "⚠️ Tem certeza?",
            text: "Essa ação não pode ser desfeita!",
            icon: "warning",
            background: "#1E1C1C",
            color: "#ff8c00",
            showCancelButton: true,
            confirmButtonColor: "#F84C0D",
            cancelButtonColor: "#888",
            confirmButtonText: "Sim, deletar!",
            cancelButtonText: "Cancelar"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await fetch(`http://localhost:8000/causes/delete-cause/${cause_id}`, {
                        method: 'DELETE',
                        headers: { 'Content-Type': 'application/json' }
                    });

                    if (response.ok) {
                        Swal.fire({
                            title: "✅ Causa deletada!",
                            text: "A causa foi removida com sucesso.",
                            icon: "success",
                            background: "#1E1C1C",
                            color: "#ff8c00",
                            confirmButtonColor: "#F84C0D"
                        }).then(() => {
                            window.location.reload();
                        });

                        console.log("Causa deletada com sucesso!");
                    } else {
                        const error = await response.json();
                        Swal.fire({
                            title: "❌ Erro ao deletar!",
                            text: error.detail || "Erro inesperado. Tente novamente.",
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
            }
        });
    });
});
