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
///////////////////////////////


document.addEventListener("DOMContentLoaded", function () {
    const signupBtn = document.getElementById("signup-btn");
        event.preventDefault();
    document.addEventListener("DOMContentLoaded", function () {
        const signupBtn = document.getElementById("signup-btn");
        const loginBtn = document.getElementById("login-btn");

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

                fetch('/registrar', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(userData),
                })
                    .then(response => response.json())
                    .then(data => console.log(data))
                    .catch((error) => {
                        console.error('Error:', error);
                    });

            });
        }

        if (loginBtn) {
            loginBtn.addEventListener("click", function () {
                const username = document.querySelector(".login-form input[type='text']").value;
                const password = document.querySelector(".login-form input[type='password']").value;

                const loginData = {
                    username: username,
                    password: password
                };

                fetch('/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(loginData),
                })
                    .then(response => response.json())
                    .then(data => {
                        if (data.success) {
                            // Login bem-sucedido, redirecione ou exiba uma mensagem de sucesso
                            console.log('Login bem-sucedido:', data.message);
                        } else {
                            // Login falhou, exiba uma mensagem de erro
                            console.error('Login falhou:', data.message);
                        }
                    })
                    .catch((error) => {
                        console.error('Erro:', error);
                    });
            });
        }
    });
});
