const email = localStorage.getItem("usuarioLogado")
if (!email) {
    window.location.href = "index.html"
}
import {getUsuarios} from './script.js'

const usuario = getUsuarios
console.log(usuario)

