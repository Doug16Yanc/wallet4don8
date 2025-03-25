document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('cause-form');

    form.addEventListener('submit', async (event) => {
        event.preventDefault(); 
        
        const imageInput = document.getElementById('cause_image');
        const file = imageInput.files[0];
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
                    alert('Causa criada com sucesso!');
                    window.location.href = "page_admin"
                    console.log(result);
                } else {
                    const error = await response.text();
                    alert('Falha ao criar a causa: ' + error);
                    console.error('Erro:', error);
                }
            } catch (error) {
                alert('Ocorreu um erro. Verifique o console para mais detalhes.');
                console.error('Erro:', error);
            }
        };

        if (file) {
            reader.readAsDataURL(file);  
        } else {
            alert('Por favor, selecione uma imagem.');
        }
    });
});

/*document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('cause-form');

    form.addEventListener('submit', async (event) => {
        event.preventDefault(); 
        
        const imageInput = document.getElementById('cause_image');
        const file = imageInput.files[0];
        const reader = new FileReader();

        reader.onload = async () => {
            const base64Image = reader.result.split(',')[1];

            const payload = {
                cause_name: document.getElementById('cause-name').value,
                description: document.getElementById('description').value,
                certification_code: document.getElementById('certification-code').value,
                amount: 0.0,
                status_amount: 'stored',
                image_data: base64Image,
                fk_user: parseInt(sessionStorage.getItem('user_id'), 10)
            };

            try {
                const response = await fetch('http://localhost:8000/causes/create-cause', {
                    method: 'POST', 
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${sessionStorage.getItem('access_token')}` 
                    },
                    body: JSON.stringify(payload), 
                });

                if (response.ok) {
                    const result = await response.json();
                    alert('Cause created successfully!');
                    console.log(result);
                } else {
                    const error = await response.json();
                    alert('Failed to create the cause: ' + error.detail);
                    console.error('Error:', error);
                }
            } catch (error) {
                alert('An error occurred. Check the console for details.');
                console.error('Error:', error);
            }
        };

        if (file) {
            reader.readAsDataURL(file);  
        } else {
            alert('Please select an image.');
        }
    });
}); */