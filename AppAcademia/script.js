document.addEventListener('DOMContentLoaded', () => {

    const tela = document.getElementById('tela')

    const linkLogin = document.querySelector('#painel #link a')
    const linkRegistro = document.querySelector('#paineldois #link a')
    

    if (linkLogin) {
        linkLogin.addEventListener('click', (e) => {
            e.preventDefault()
            tela.classList.add('login')
        })
    }

    if (linkRegistro) {
        linkRegistro.addEventListener('click', (e) => {
            e.preventDefault()
            tela.classList.remove('login')
        })
    }

    const botaodois = document.getElementById('botaodois')
    if (botaodois) {
        botaodois.addEventListener('click', registrar)
    }

    const botao = document.getElementById('botao')
    if (botao) {
        botao.addEventListener('click', login)
    }

})

// "Banco de dados"

export function getUsuarios() {
    return JSON.parse(localStorage.getItem("usuario")) || []
}

function salvarUsuarios(usuarios) {
    localStorage.setItem("usuario", JSON.stringify(usuarios))
}

// Registro

function registrar() {
    const nome = regNome.value
    const email = regEmail.value
    const senha = regSenha.value

    const usuarios = getUsuarios()

    const existe = usuarios.find(u => u.email === email)
    if (existe) {
        alert("Usuário já existe")
        return
    }

    usuarios.push({
        nome,
        email,
        senha,
        dados: []
    })

    salvarUsuarios(usuarios)
    alert('Registrado com Sucesso!')
}

// Login

function login() {
    const email = loginEmail.value
    const senha = loginSenha.value

    const usuarios = getUsuarios()
    const usuario = usuarios.find(u => u.email === email && u.senha === senha)

    if (!usuario) {
        alert("Usuário inválido")
        return
    }

    localStorage.setItem("usuarioLogado", email)
    window.location.href = "usuario.html"
}

// Logout 

function logout() {
    localStorage.removeItem("usuarioLogado")
}

function carregarUsuario() {
    const email = localStorage.getItem("usuarioLogado")
    if (!email) return

    const usuarios = getUsuarios()
    const usuario = usuarios.find(u => u.email === email)
}
