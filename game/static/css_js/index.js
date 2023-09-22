const openRegisterLinks = document.querySelectorAll(".open-register");
const openLoginLinks = document.querySelectorAll(".open-login");
const openForgotLinks = document.querySelectorAll(".open-forgot");

const loginForm = document.querySelector(".login-form");
const signUpForm = document.querySelector(".singUp-form"); // Corrigido para ".singUp-form"
const forgotForm = document.querySelector(".forgot-form");

openRegisterLinks.forEach(link => {
    link.addEventListener("click", (event) => {
        event.preventDefault();
        loginForm.style.display = "none";
        signUpForm.style.display = "block";
        forgotForm.style.display = "none";
    });
});

openLoginLinks.forEach(link => {
    link.addEventListener("click", (event) => {
        event.preventDefault();
        signUpForm.style.display = "none";
        loginForm.style.display = "block";
        forgotForm.style.display = "none";
    });
});

openForgotLinks.forEach(link => {
    link.addEventListener("click", (event) => {
        event.preventDefault();
        loginForm.style.display = "none";
        forgotForm.style.display = "block";
        signUpForm.style.display = "none";
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const signupBtn = document.getElementById("signup-btn");

    if (signupBtn) {
        signupBtn.addEventListener("click", function () {
            const username = document.querySelector(".singUp-form input[type='text']").value;
            const password = document.querySelector(".singUp-form input[type='password']").value;
            const confirmPassword = document.querySelector(".singUp-form input[name='confirmPassword']").value;

            if (password !== confirmPassword) {
                alert("As senhas não coincidem");
                return;
            }

            const userData = {
                username: username,
                password: password
            };

            app.post("/registrar", (req, res) => {
                const userData = req.body; // Obtenha os dados do corpo da solicitação POST

                // Execute a inserção no banco de dados usando os dados do usuário
                db.query('INSERT INTO users (username, password) VALUES (?, ?)', [userData.username, userData.password], (err, results) => {
                    if (err) {
                        console.error('Erro ao inserir dados no banco de dados:', err);
                        res.status(500).json({ error: 'Erro ao registrar usuário' });
                        return;
                    }

                    console.log('Dados inseridos com sucesso:', results);
                    res.json({ success: 'Usuário registrado com sucesso' });
                });
            });

        });
    }
});
