const email = localStorage.getItem("usuarioLogado")
if (!email) {
    window.location.href = "index.html"
}
import {getUsuarios} from './script.js'
const texto = document.getElementById('texto')
const usuario = getUsuarios
console.log(usuario)

carregarUsuario();{
    texto.innerText = `Seja bem vindo(a) ${usuario.name}`
}
