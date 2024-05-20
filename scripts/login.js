document.getElementById('toggle-password').addEventListener('click', function () {
    const passwordField = document.getElementById('password');
    if (passwordField.type === 'password') {
        passwordField.type = 'text';
        this.textContent = 'Hide';
    } else {
        passwordField.type = 'password';
        this.textContent = 'Show';
    }
});

document.getElementById('login-form').addEventListener('submit', function (event) {
    const emailUsername = document.getElementById('email-username').value;
    const password = document.getElementById('password').value;
    const emailUsernameError = document.getElementById('email-username-error');
    const passwordError = document.getElementById('password-error');

    let valid = true;

    if (!validateEmail(emailUsername) && emailUsername.length < 3) {
        emailUsernameError.textContent = 'Please enter a valid email or username.';
        emailUsernameError.style.display = 'block';
        valid = false;
    } else {
        emailUsernameError.style.display = 'none';
    }

    if (password.length < 6) {
        passwordError.textContent = 'Password must be at least 6 characters long.';
        passwordError.style.display = 'block';
        valid = false;
    } else {
        passwordError.style.display = 'none';
    }

    if (!valid) {
        event.preventDefault();
    }
});

function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\\.,;:\s@"]+\.)+[^<>()[\]\\.,;:\s@"]{2,})$/i;
    return re.test(String(email).toLowerCase());
}
