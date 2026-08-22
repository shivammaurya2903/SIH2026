document.addEventListener('DOMContentLoaded', () => {
    if (Common.isAuthenticated()) {
        Common.redirectByRole();
        return;
    }

    const form = document.querySelector('#registerForm');
    const button = document.querySelector('#registerButton');
    const message = document.querySelector('#registerMessage');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        message.className = 'form-message';
        message.textContent = '';

        const name =
            document.querySelector('#name').value.trim();

        const email =
            document.querySelector('#email').value.trim();

        const phone =
            document.querySelector('#phone').value.trim();

        const role =
            document.querySelector('#role').value;

        const organization =
            document.querySelector('#organization').value.trim();

        const password =
            document.querySelector('#password').value;

        const confirmPassword =
            document.querySelector('#confirmPassword').value;

        if (!name || !email || !password || !confirmPassword) {
            showError('Please fill all required fields.');
            return;
        }

        if (!isValidEmail(email)) {
            showError('Please enter a valid email address.');
            return;
        }

        if (password.length < 8) {
            showError(
                'Password must contain at least 8 characters.'
            );
            return;
        }

        if (password !== confirmPassword) {
            showError('Passwords do not match.');
            return;
        }

        const allowedRoles = [
            'citizen',
            'university',
            'faculty',
            'student',
            'industry'
        ];

        if (!allowedRoles.includes(role)) {
            showError('Invalid registration role.');
            return;
        }

        try {
            Common.showLoading(button);

            button.textContent = 'Creating account...';

            await Auth.register({
                name,
                email,
                phone,
                role,
                organization,
                password
            });

            message.textContent =
                'Account created successfully. Redirecting...';

            message.className =
                'form-message show success';

            setTimeout(() => {
                Common.redirectByRole();
            }, 600);

        } catch (error) {
            showError(
                error.message ||
                'Registration failed. Please try again.'
            );
        } finally {
            Common.hideLoading(button);
            button.textContent = 'Create Account';
        }
    });

    function showError(text) {
        message.textContent = text;
        message.className =
            'form-message show error';
    }

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
});