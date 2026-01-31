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

const botao = document.getElementById('botao')
const res = document.getElementById('res')

botao.addEventListener('click', ()=> {
    const peso = document.getElementById('ipeso')
    const altura = document.getElementById('ialtura')
    const imc = peso / (altura * altura)
    console.log(imc) 
})

