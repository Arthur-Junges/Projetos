const tela = document.getElementById('tela')

const linkLogin = document.querySelector('#painel #link a')
const linkRegistro = document.querySelector('#paineldois #link a')

linkLogin.addEventListener('click', (e) => {
    e.preventDefault()
    tela.classList.add('login')
})

linkRegistro.addEventListener('click', (e) => {
    e.preventDefault()
    tela.classList.remove('login')
})

//"banco de dados" 

function getUsuarios (){
    return JSON.parse(localStorage.getItem("usuario")) || []
}

function salvarUsuarios (usuarios) {
    localStorage.setItem("usuario", JSON.stringify(usuarios))
}
//Cadastro
function registrar() {
    const nome = regNome.value
    const email = regEmail.value
    const senha = regSenha.value

    const usuarios = getUsuarios()

    const existe = usuarios.find(u => u.email === email)
    if (existe){
        alert("Usuário já existe")
        return
    }

    usuarios.push ({
        nome,
        email,
        senha,
        dados: []
    })

    salvarUsuarios(usuarios)
    alert('Registrado com Sucesso!')
}

const botaodois = document.getElementById('botaodois')
botaodois.addEventListener('click',registrar)

//Login
function login () {
    const nome = loginNome.value
    const email = loginEmail.value
    const senha = loginSenha.value

    const usuarios = getUsuarios()
    const usuario = usuarios.find(u => u.email === email && u.senha === senha)
    if (!usuario){
        alert("Usuário inválido")
        return
    }
    localStorage.setItem("usuarioLogado", email)
    carregarUsuario()

    window.location.href = "usuario.html"
}

const botao = document.getElementById('botao')

botao.addEventListener('click',login)

//logout
function logout() {
    localStorage.removeItem("usuarioLogado")
}

export function carregarUsuario() {
    const email = localStorage.getItem("usuarioLogado")
    if (!email) return

    const usuarios = getUsuarios()
    const usuario = usuarios.find(u => u.email === email)

    
}