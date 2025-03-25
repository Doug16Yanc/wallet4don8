document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("voltar").addEventListener("click", function () {
        window.location.href = "templates";
    });
});

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("reset_password").addEventListener("click", function () {
        window.location.href = "reset_password_admin";
    });
});


document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const isAdminLogin = window.location.pathname.includes('login_admin');

    if (loginForm) {
        loginForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            const formData = {
                user_email: document.getElementById('user_email').value,
                user_password: document.getElementById('user_password').value,
                is_admin: isAdminLogin 
            };

            try {
                const response = await fetch('http://localhost:8000/users/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData),
                });

                const result = await response.json();

                if (response.ok) {
                    if (isAdminLogin && !result.is_admin) {
                        alert('Você não tem permissão de administrador');
                        return;
                    }

                    sessionStorage.setItem('access_token', result.access_token);
                    sessionStorage.setItem('user_id', result.user_id);
                    sessionStorage.setItem('is_admin', result.is_admin);

                    alert(`Bem-vindo(a) ${result.user_name}, seu token é ${result.access_token}`);
                    
                    window.location.href = isAdminLogin ? '/page_admin' : '/page_user';
                } else {
                    alert(result.detail || 'Erro no login');
                }
            } catch (error) {
                console.error('Erro:', error);
                alert('Erro de conexão');
            }
        });
    }
});