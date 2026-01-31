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

const div = document.getElementById('calimc')
const botao = document.getElementById('botao')
const res = document.getElementById('res')

botao.addEventListener('click', ()=> {
    
    const peso = document.getElementById('ipeso').value
    const altura = document.getElementById('ialtura').value
    const imc = peso / (altura * altura)
    res.innerHTML = `Seu IMC é  <br> <span style="font-size: 1.8em; color: #db2525;">${imc.toFixed(1)}</span`

    div.classList.toggle('ativo')
})

