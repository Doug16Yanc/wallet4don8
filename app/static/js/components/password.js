function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    const toggleIcon = input.nextElementSibling; 
    
    if (input.type === "password") {
        input.type = "text";
        toggleIcon.textContent = "👁️"; 
    } else {
        input.type = "password";  
        toggleIcon.textContent = "🙈";
    }
}