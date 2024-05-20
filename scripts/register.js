document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('register-form');
    const usernameInput = document.getElementById('username');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const togglePasswordButton = document.getElementById('toggle-password');

    form.addEventListener('submit', function (event) {
        let isValid = true;

        // Username validation
        if (usernameInput.value.trim() === '') {
            showError('username-error', 'Username is required.');
            isValid = false;
        } else {
            hideError('username-error');
        }

        // Email validation
        if (!validateEmail(emailInput.value)) {
            showError('email-error', 'Please enter a valid email address.');
            isValid = false;
        } else {
            hideError('email-error');
        }

        // Password validation
        if (!validatePassword(passwordInput.value)) {
            showError('password-error', 'Password must be at least 8 characters long, contain a number and a special character.');
            isValid = false;
        } else {
            hideError('password-error');
        }

        if (!isValid) {
            event.preventDefault();
        }
    });

    togglePasswordButton.addEventListener('click', function () {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        this.textContent = type === 'password' ? 'Show' : 'Hide';
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

    function validatePassword(password) {
        const re = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
        return re.test(password);
    }
});
