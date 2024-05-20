document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('reset-form');
    const emailInput = document.getElementById('email');

    form.addEventListener('submit', function (event) {
        let isValid = true;

        // Email validation
        if (!validateEmail(emailInput.value)) {
            showError('email-error', 'Please enter a valid email address.');
            isValid = false;
        } else {
            hideError('email-error');
        }

        if (!isValid) {
            event.preventDefault();
        }
    });

    function showError(id, message) {
        const errorElement = document.getElementById(id);
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }

    function hideError(id) {
        const errorElement = document.getElementById(id);
        errorElement.style.display = 'none';
    }

    function validateEmail(email) {
        const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return re.test(email);
    }
});
