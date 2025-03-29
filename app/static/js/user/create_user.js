document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("voltar").addEventListener("click", function () {
        window.location.href = "login_user";
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const userForm = document.getElementById('create-form');

    if (userForm) {
        userForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            const password = document.getElementById('user_password').value;
            const confirmPassword = document.getElementById('confirm_user_password').value;

            if (password !== confirmPassword) {
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
                user_name: document.getElementById('user_name').value,
                user_email: document.getElementById('user_email').value,
                user_password: password,
                is_admin: false
            };
    
            try {
                const response = await fetch('http://localhost:8000/users/create_user', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData),
                });

                if (response.ok) {
                    const result = await response.json();
                    Swal.fire({
                        title: "✅ Usuário criado!",
                        text: `Bem-vindo(a), ${result.user.user_name}!`,
                        icon: "success",
                        background: "#1E1C1C",
                        color: "#ff8c00",
                        confirmButtonColor: "#F84C0D"
                    }).then(() => {
                        window.location.href = 'login_user';
                    });

                } else {
                    const error = await response.json();
                    Swal.fire({
                        title: "❌ Falha ao criar usuário!",
                        text: error.detail || "Erro inesperado. Tente novamente.",
                        icon: "error",
                        background: "#1E1C1C",
                        color: "#ff8c00",
                        confirmButtonColor: "#F84C0D"
                    });
                    console.error('Erro:', error);
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
                console.error('Erro:', error);
            }
        });
    }
});
