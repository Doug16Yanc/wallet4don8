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
                alert('As senhas não coincidem. Tente novamente.');
                return; 
            }

            const formData = {
                user_name: document.getElementById('user_name').value,
                user_email: document.getElementById('user_email').value,
                user_password: password,
                is_admin: false
            };
    
            const response = await fetch('http://localhost:8000/users/create_user', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const result = await response.json();
                alert('Usuário ' + result.user.user_name + ' criado com sucesso');
                console.log(result);
                window.location.href = 'login_user';
            } else {
                const error = await response.json();
                alert('Falha ao criar usuário: ' + error.detail);
                console.error('Erro:', error);
            }
        });
    }
});
