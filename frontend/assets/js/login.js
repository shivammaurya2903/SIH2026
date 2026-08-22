document.addEventListener('DOMContentLoaded', () => {
    if (Common.isAuthenticated()) {
        Common.redirectByRole();
        return;
    }

    const form = document.querySelector('#loginForm');
    const button = document.querySelector('#loginButton');
    const message = document.querySelector('#loginMessage');
    const passwordToggle = document.querySelector('#passwordToggle');
    const password = document.querySelector('#password');

    passwordToggle.addEventListener('click', () => {
        const isPassword =
            password.type === 'password';

        password.type = isPassword
            ? 'text'
            : 'password';

        passwordToggle.textContent =
            isPassword ? 'Hide' : 'Show';
    });

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        message.className = 'form-message';
        message.textContent = '';

        const email =
            document.querySelector('#email').value.trim();

        const passwordValue =
            password.value;

        if (!email || !passwordValue) {
            showLoginError('Please enter email and password.');
            return;
        }

        if (!isValidEmail(email)) {
            showLoginError('Please enter a valid email address.');
            return;
        }

        try {
            Common.showLoading(button);

            button.textContent = 'Signing in...';

            await Auth.login(
                email,
                passwordValue
            );

            message.textContent =
                'Login successful. Redirecting...';

            message.className =
                'form-message show success';

            setTimeout(() => {
                Common.redirectByRole();
            }, 500);

        } catch (error) {
            showLoginError(
                error.message ||
                'Unable to login. Please try again.'
            );
        } finally {
            Common.hideLoading(button);

            button.textContent = 'Sign In';
        }
    });

    function showLoginError(text) {
        message.textContent = text;
        message.className =
            'form-message show error';
    }

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
});