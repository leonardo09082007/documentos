const formLogin = document.getElementById("form-login");
formLogin.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value
    const senha = document.getElementById("senha").value
    const dados = {
        email: email,
        senha: senha
    }
    try {
        const resposta = await fetch("http://127.0.0.1:3000/login" , {
            method: "POST",
            headers: {"Content-Type": "application/json"}, 
            body: JSON.stringify(dados)
        })
        const resultado = await resposta.json()
        if(resultado.erro) {
            throw new Error(resultado.erro)
        } else if (resultado.token) {
            localStorage.setItem("token", resultado.token)
            alert("Login realizado, token: " + resultado.token)
        } else {
            throw new Error("Erro interno na API")
        }

        formLogin.reset()

    } catch (error) {
        alert("Erro ao cadastrar cliente: "+ error)
    }
})
