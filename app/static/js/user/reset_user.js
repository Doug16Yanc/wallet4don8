document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("voltar").addEventListener("click", function () {
        window.location.href = "login_user";
    });
});
document.addEventListener('DOMContentLoaded', () => {
    const form_reset = document.getElementById('reset-form');

    form_reset.addEventListener('submit', async (event) => {
        event.preventDefault();

        const user_email = document.getElementById('user_email').value;
        const user_password = document.getElementById('user_password').value;
        const confirm_password = document.getElementById('confirm_user_password').value;

        if (user_password !== confirm_password) {
            Swal.fire({
                title: "❌ Senhas não coincidem!",
                text: "Tente novamente.",
                icon: "error",
                background: "#1E1C1C",
                color: "#ff8c00",
                confirmButtonColor: "#F84C0D"
            });
            return;
        }

        const formData = {
            user_email: user_email,
            user_password: user_password
        };

        try {
            const responseUpdate = await fetch(`http://localhost:8000/users/update_password`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (responseUpdate.ok) {
                Swal.fire({
                    title: "✅ Senha redefinida!",
                    text: "Sua senha foi atualizada com sucesso!",
                    icon: "success",
                    background: "#1E1C1C",
                    color: "#ff8c00",
                    confirmButtonColor: "#F84C0D"
                }).then(() => {
                    window.location.href = 'login_user';
                });

            } else {
                const error = await responseUpdate.json();
                Swal.fire({
                    title: "❌ Falha ao redefinir senha!",
                    text: error.detail || "Erro inesperado. Tente novamente.",
                    icon: "error",
                    background: "#1E1C1C",
                    color: "#ff8c00",
                    confirmButtonColor: "#F84C0D"
                });
                console.error('Error:', error);
            }
        } catch (error) {
            Swal.fire({
                title: "❌ Erro inesperado!",
                text: "Verifique o console para mais detalhes.",
                icon: "error",
                background: "#1E1C1C",
                color: "#ff8c00",
                confirmButtonColor: "#F84C0D"
            });
            console.error('Error:', error);
        }
    });
});
