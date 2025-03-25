document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('third-form-cause');

    document.getElementById('delete-cause').addEventListener('click', async (event) => {
        event.preventDefault();

        const formData = {
            cause_id: parseInt(document.getElementById('cause_id').value, 10),
        };

        try {
            const response = await fetch(`http://localhost:8000/causes/delete-cause/${formData.cause_id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                const result = await response.json();
                alert('Cause deleted successfully!');
                console.log(result);
            } else {
                const error = await response.json();
                alert('Error deleting cause: ' + error.detail);
                console.error(error);
            }
        } catch (err) {
            alert('An unexpected error occurred.');
            console.error(err);
        }
    });
});