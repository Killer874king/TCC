
    document.addEventListener("DOMContentLoaded", () => {
        const loginButton = document.getElementById("login-button");
        const emailField = document.getElementById("email");
        const passwordField = document.getElementById("password");
        const errorMessage = document.getElementById("error-message");
        const registerButton = document.getElementById("register-button");

        loginButton.addEventListener("click", () => {
            const email = emailField.value;
            const password = passwordField.value;

            // Recupera os dados do usuário do localStorage
            const usuario = JSON.parse(localStorage.getItem("usuario"));

            if (usuario && email === usuario.email && password === usuario.senha) {
                alert(`Bem-vindo, ${usuario.nome}!`);
                window.location.href = "../Carteira/carteira.html"; // Redireciona após login
            } else {
                errorMessage.style.display = "block"; // Mostra o erro e o botão de cadastro
            }
        });

        registerButton.addEventListener("click", () => {
            window.location.href = "../Cadastro/cadastro.html"; // Redireciona para o cadastro
        });
    });
