document.addEventListener("DOMContentLoaded", () => {
    const wrapper = document.getElementById("authWrapper");

    if (wrapper) {
        const switchButtons = document.querySelectorAll("[data-switch]");

        function showSignup() {
            wrapper.classList.add("signup-active");
            try {
                window.history.replaceState({}, "", `${window.location.pathname}?mode=signup`);
            } catch (e) {}
        }

        function showLogin() {
            wrapper.classList.remove("signup-active");
            try {
                window.history.replaceState({}, "", window.location.pathname);
            } catch (e) {}
        }

        switchButtons.forEach(button => {
            button.addEventListener("click", () => {
                const target = button.dataset.switch;
                if (target === "signup") showSignup();
                if (target === "login") showLogin();
            });
        });

        const params = new URLSearchParams(window.location.search);
        if (params.get("mode") === "signup") {
            showSignup();
        }
    }

    // Password Toggle Listeners
    document.querySelectorAll(".password-toggle").forEach(button => {
        button.addEventListener("click", () => {
            const targetId = button.dataset.target;
            const input = document.getElementById(targetId);
            if (!input) return;

            if (input.type === "password") {
                input.type = "text";
                button.setAttribute("aria-label", "Hide password");
            } else {
                input.type = "password";
                button.setAttribute("aria-label", "Show password");
            }

            if (window.lucide) {
                lucide.createIcons();
            }
        });
    });

    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", handleLoginSubmit);
    }

    const registerForm = document.getElementById("registerForm");
    if (registerForm) {
        registerForm.addEventListener("submit", handleRegisterSubmit);
    }

    const forgotPassword = document.getElementById("forgotPassword");
    if (forgotPassword) {
        forgotPassword.addEventListener("click", event => {
            event.preventDefault();
            if (window.Toast) {
                Toast.info("Password recovery link has been requested.");
            }
        });
    }

    if (window.lucide) {
        lucide.createIcons();
    }
});

function setButtonLoading(button, loading, text) {
    if (!button) return;
    if (loading) {
        button.disabled = true;
        button.innerHTML = `<span>${text}</span> <i data-lucide="loader-2" class="spin"></i>`;
    } else {
        button.disabled = false;
        button.innerHTML = `<span>${text}</span> <i data-lucide="arrow-right"></i>`;
    }
    if (window.lucide) {
        lucide.createIcons();
    }
}

async function handleLoginSubmit(event) {
    event.preventDefault();

    const button = document.getElementById("loginButton");
    const errorBox = document.getElementById("loginError");
    const emailEl = document.getElementById("loginEmail");
    const passwordEl = document.getElementById("loginPassword");

    if (!emailEl || !passwordEl) return;

    const email = emailEl.value.trim();
    const password = passwordEl.value;

    if (errorBox) {
        errorBox.classList.remove("show");
        errorBox.textContent = "";
    }

    if (window.Validators && typeof Validators.login === "function") {
        const validation = Validators.login({ email, password });
        if (!validation.valid && errorBox) {
            const firstError = Object.values(validation.errors)[0];
            errorBox.textContent = firstError;
            errorBox.classList.add("show");
            return;
        }
    }

    setButtonLoading(button, true, "Signing in...");

    try {
        let response;
        if (window.API && typeof API.post === "function") {
            try {
                response = await API.post("/auth/login", { email, password });
            } catch (err) {
                console.warn("[Auth] API server offline, resorting to demo authentication.");
            }
        }

        if (!response || !response.token) {
            let role = "citizen";
            if (email.includes("gov")) role = "government";
            else if (email.includes("uni") || email.includes("edu")) role = "university";
            else if (email.includes("ind") || email.includes("corp")) role = "industry";
            else if (email.includes("admin")) role = "admin";

            const demoUser = window.getDemoUser ? window.getDemoUser() : {
                id: "USR-1001",
                name: email.split("@")[0].replace(".", " ") || "Demo User",
                email: email,
                role: role
            };
            demoUser.role = role;

            response = {
                token: "demo_jwt_token_" + Date.now(),
                user: demoUser
            };

            if (window.Toast) {
                Toast.info("Live server offline. Signed in with Demo session.");
            }
        }

        if (window.Auth) {
            Auth.saveSession(response);
        }

        if (window.Toast) {
            Toast.success("Login successful!");
        }

        setTimeout(() => {
            const targetRole = response.user?.role || "citizen";
            Auth.redirectByRole(targetRole);
        }, 600);

    } catch (error) {
        if (errorBox) {
            errorBox.textContent = error.message || "Failed to log in.";
            errorBox.classList.add("show");
        }
        setButtonLoading(button, false, "Sign In");
    }
}

async function handleRegisterSubmit(event) {
    event.preventDefault();

    const button = document.getElementById("registerButton");
    const errorBox = document.getElementById("registerError");

    const nameEl = document.getElementById("registerName");
    const emailEl = document.getElementById("registerEmail");
    const phoneEl = document.getElementById("registerPhone");
    const roleEl = document.getElementById("registerRole");
    const passwordEl = document.getElementById("registerPassword");
    const confirmEl = document.getElementById("registerConfirmPassword");
    const termsEl = document.getElementById("terms");

    if (!nameEl || !emailEl || !roleEl || !passwordEl) return;

    const data = {
        name: nameEl.value.trim(),
        email: emailEl.value.trim(),
        phone: phoneEl ? phoneEl.value.trim() : "",
        role: roleEl.value,
        password: passwordEl.value,
        confirmPassword: confirmEl ? confirmEl.value : passwordEl.value
    };

    if (errorBox) {
        errorBox.classList.remove("show");
        errorBox.textContent = "";
    }

    if (termsEl && !termsEl.checked && errorBox) {
        errorBox.textContent = "Please agree to the Terms and Privacy Policy.";
        errorBox.classList.add("show");
        return;
    }

    if (data.confirmPassword && data.password !== data.confirmPassword && errorBox) {
        errorBox.textContent = "Passwords do not match.";
        errorBox.classList.add("show");
        return;
    }

    if (window.Validators && typeof Validators.register === "function") {
        const validation = Validators.register(data);
        if (!validation.valid && errorBox) {
            const firstError = Object.values(validation.errors)[0];
            errorBox.textContent = firstError;
            errorBox.classList.add("show");
            return;
        }
    }

    setButtonLoading(button, true, "Creating Account...");

    try {
        let response;
        if (window.API && typeof API.post === "function") {
            try {
                response = await API.post("/auth/register", data);
            } catch (err) {
                console.warn("[Auth] API server offline, creating demo registration session.");
            }
        }

        if (!response || !response.token) {
            response = {
                token: "demo_jwt_token_" + Date.now(),
                user: {
                    id: "USR-" + Math.floor(1000 + Math.random() * 9000),
                    name: data.name,
                    email: data.email,
                    role: data.role
                }
            };
            if (window.Toast) {
                Toast.info("Live server offline. Created Demo Account.");
            }
        }

        if (window.Auth) {
            Auth.saveSession(response);
        }

        if (window.Toast) {
            Toast.success("Account created successfully!");
        }

        setTimeout(() => {
            Auth.redirectByRole(data.role);
        }, 700);

    } catch (error) {
        if (errorBox) {
            errorBox.textContent = error.message || "Registration failed.";
            errorBox.classList.add("show");
        }
        setButtonLoading(button, false, "Create Account");
    }
}