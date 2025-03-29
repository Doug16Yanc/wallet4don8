function deleteDonation(donationId) {
    Swal.fire({
        title: "🗑️ Confirmar Exclusão",
        text: "Tem certeza que deseja remover seu cadastro? Só poderá acessar novamente com criação de usuário.",
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
            fetch(`http://localhost:8000/users/delete_user${user}`, { method: 'DELETE' })
            .then(response => {
                if (response.status === 204) {
                    Swal.fire({
                        title: "✅ Excluído!",
                        text: "Usuário foi removido com sucesso e seu token expirou.",
                        icon: "success",
                        background: "#1a1a1a",
                        color: "#ff8c00",
                        confirmButtonColor: "#ff8c00"
                    });
                } else {
                    Swal.fire({
                        title: "❌ Erro!",
                        text: "Não foi possível remover o usuário.",
                        icon: "error",
                        background: "#1a1a1a",
                        color: "#ff8c00",
                        confirmButtonColor: "#ff8c00"
                    });
                }
            })
            .catch(error => Swal.fire({
                title: "❌ Erro!",
                text: "Ocorreu um problema ao excluir.",
                icon: "error",
                background: "#1a1a1a",
                color: "#ff8c00",
                confirmButtonColor: "#ff8c00"
            }));
        }
    });
}
