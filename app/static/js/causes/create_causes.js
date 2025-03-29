document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('cause-form');

    form.addEventListener('submit', async (event) => {
        event.preventDefault(); 
        
        const imageInput = document.getElementById('cause_image');
        const file = imageInput.files[0];

        if (!file) {
            Swal.fire({
                title: "❌ Nenhuma imagem selecionada!",
                text: "Por favor, escolha uma imagem para a causa.",
                icon: "error",
                background: "#1E1C1C",
                color: "#ff8c00",
                confirmButtonColor: "#F84C0D"
            });
            return;
        }

        const reader = new FileReader();
        reader.onload = async () => {
            const base64Image = reader.result.split(',')[1];

            const payload = {
                cause_name: document.getElementById('cause_name').value,  
                description: document.getElementById('description').value,
                certification_code: document.getElementById('certification-code').value,
                amount: 0.0,
                status_amount: 'stored', 
                fk_user: parseInt(sessionStorage.getItem('user_id'), 10),
                image_data: base64Image
            };

            try {
                const response = await fetch('http://localhost:8000/causes/create_cause', {
                    method: 'POST', 
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${sessionStorage.getItem('access_token')}` 
                    },
                    body: JSON.stringify(payload), 
                });

                if (response.ok) {
                    const result = await response.json();
                    Swal.fire({
                        title: "✅ Causa criada com sucesso!",
                        text: `A causa "${result.cause_name}" foi cadastrada.`,
                        icon: "success",
                        background: "#1E1C1C",
                        color: "#ff8c00",
                        confirmButtonColor: "#F84C0D"
                    }).then(() => {
                        window.location.href = "page_admin";
                    });

                    console.log(result);
                } else {
                    const error = await response.json();
                    Swal.fire({
                        title: "❌ Erro ao criar causa!",
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
        };

        reader.readAsDataURL(file);
    });
});

