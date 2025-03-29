document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("voltar").addEventListener("click", function () {
        window.location.href = "templates";
    });

    document.getElementById("reset_password").addEventListener("click", function () {
        window.location.href = "reset_password";
    });

    document.getElementById("create_user").addEventListener("click", function () {
        window.location.href = "create_user";
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');

    if (loginForm) {
        loginForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            const formData = {
                user_email: document.getElementById('user_email').value,
                user_password: document.getElementById('user_password').value
            };

            try {
                const response = await fetch('http://localhost:8000/users/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData),
                });

                const result = await response.json();

                if (response.ok) {
                    sessionStorage.setItem('access_token', result.access_token);
                    sessionStorage.setItem('user_id', result.user_id);

                    Swal.fire({
                        title: `🎉 Bem-vindo(a), ${result.user_name}!`,
                        text: "Login realizado com sucesso!",
                        icon: "success",
                        background: "#1E1C1C",
                        color: "#ff8c00",
                        confirmButtonColor: "#F84C0D"
                    }).then(() => {
                        window.location.href = '/page_causes';
                    });

                } else {
                    Swal.fire({
                        title: "❌ Erro no Login",
                        text: result.detail || "Credenciais inválidas. Verifique seus dados e tente novamente.",
                        icon: "error",
                        background: "#1E1C1C",
                        color: "#ff8c00",
                        confirmButtonColor: "#F84C0D"
                    });
                }
            } catch (error) {
                console.error('Erro:', error);
                Swal.fire({
                    title: "❌ Erro de Conexão",
                    text: "Não foi possível se conectar ao servidor. Tente novamente mais tarde.",
                    icon: "error",
                    background: "#1E1C1C",
                    color: "#ff8c00",
                    confirmButtonColor: "#F84C0D"
                });
            }
        });
    }
});
