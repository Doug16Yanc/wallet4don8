document.addEventListener('DOMContentLoaded', () => {
    const userForm = document.getElementById('create-form');

    if (userForm) {
        userForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            const password = document.getElementById('user_password').value;
            const confirmPassword = document.getElementById('confirm_user_password').value;

            if (password.length < 8) {
                Swal.fire({
                    title: "❌ Senha muito curta!",
                    text: "A senha deve ter pelo menos 8 caracteres.",
                    icon: "error",
                    background: "#1E1C1C",
                    color: "#ff8c00",
                    confirmButtonColor: "#F84C0D"
                });
                return;
            }

            if (password !== confirmPassword) {
                Swal.fire({
                    title: "❌ Senhas não coincidem!",
                    text: "As senhas digitadas não são iguais. Tente novamente.",
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
                    headers: { 
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(formData),
                });

                const responseData = await response.json();

                if (response.ok) {
                    Swal.fire({
                        title: "✅ Cadastro realizado!",
                        text: `Bem-vindo(a), ${responseData.user_name}!`,
                        icon: "success",
                        background: "#1E1C1C",
                        color: "#ff8c00",
                        confirmButtonColor: "#F84C0D"
                    }).then(() => {
                        window.location.href = 'login_user';
                    });
                } else {
                    const errorMsg = responseData.detail || "Erro ao criar usuário";
                    throw new Error(errorMsg);
                }
            } catch (error) {
                Swal.fire({
                    title: "❌ Erro no cadastro",
                    text: error.message,
                    icon: "error",
                    background: "#1E1C1C",
                    color: "#ff8c00",
                    confirmButtonColor: "#F84C0D"
                });
            }
        });
    }
});