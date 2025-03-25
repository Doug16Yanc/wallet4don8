document.addEventListener('DOMContentLoaded', () => {
    const logoutButton = document.getElementById('logout');
    if (logoutButton) {
        logoutButton.addEventListener('click', async () => {
            console.log('Logout button clicked!');

            window.location.href = "/templates";
            try {
                const token = localStorage.getItem("access_token");

                if (token) {
                    await fetch("http://0.0.0.0:8000/users/logout", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`,
                        },
                    });
                }

                localStorage.removeItem("access_token");
                window.location.href = "/templates";

            } catch (error) {
                console.error("Erro para sair:", error);
            }
        });
        } else {
        console.error('Botão de sair não encontrado.');
    }
});