import {getUsuarios} from './script.js'

const email = localStorage.getItem("usuarioLogado")
if (!email) {
    window.location.href = "index.html"
}


const usuarios = getUsuarios()
const usuario = usuarios.find(u => u.email === email)

if (!usuario) {
    window.location.href = "index.html"
}

function carregarUsuario() {
    const texto = document.getElementById('texto')
    texto.innerText = `Seja bem vindo(a) ${usuario.nome}`
}
carregarUsuario()

const resres = document.getElementById('resres')
const botao = document.getElementById('botao')
botao.addEventListener('click', () => {

    let peso = Number(document.getElementById('peso').value)
    let altura = Number(document.getElementById('altura').value)
    let imc = peso / (altura * altura)
    imc = imc.toFixed(1)
    
    if(peso > 0 && altura > 0){
        resres.innerText = `Seu Imc é ${imc}`
    } else {
        resres.innerText = 'Digite valores válidos'
    }

})

