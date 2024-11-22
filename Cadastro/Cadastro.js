
    function validarFormulario(event) {
        event.preventDefault();

        const nome = document.getElementById("name").value;
        const dataNascimento = document.getElementById("date").value;
        const email = document.getElementById("email").value;
        const senha = document.getElementById("password").value;
        const genero = document.getElementById("genero").value;

        // Validação básica
        if (!nome || !dataNascimento || !email || !senha || !genero) {
            alert("Por favor, preencha todos os campos.");
            return;
        }

        // Armazena os dados do usuário no localStorage
        const usuario = {
            nome,
            dataNascimento,
            email,
            senha,
            genero,
        };
        localStorage.setItem("usuario", JSON.stringify(usuario));

        alert("Cadastro realizado com sucesso!");
        window.location.href = "../Login/Login.html"; // Redireciona para o login
    }
