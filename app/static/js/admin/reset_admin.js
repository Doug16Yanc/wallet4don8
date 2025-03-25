document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("voltar").addEventListener("click", function () {
        window.location.href = "login_admin";
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const form_reset = document.getElementById('reset-form');

    form_reset.addEventListener('submit', async (event) => {
        event.preventDefault();

        const user_email = document.getElementById('user_email').value

        const formData = {
            user_email: user_email,
            user_password: document.getElementById('user_password').value
        }

        try {
            const responseUpdate = await fetch(`http://localhost:8000/users/update_password`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (responseUpdate.ok) {
                const result = await responseUpdate.json();
                alert('Senha atualizada com sucesso!');
                window.location.href = '/login_user'
            } else {
                const error = await responseUpdate.json();
                alert('Falha ao redefinir a senha ' + error.detail);
                console.error('Error:', error);
            }
        } catch (error) {
            alert('Um erro inesperado aconteceu. Verifique o console para mais detalhes');
            console.error('Error:', error);
        }
    });
});