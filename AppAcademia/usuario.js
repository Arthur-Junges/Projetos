import { getUsuarios } from './script.js'

const email = localStorage.getItem("usuarioLogado")
if (!email) window.location.href = "index.html"

const usuarios = getUsuarios()
const usuario = usuarios.find(u => u.email === email)

if (!usuario) window.location.href = "index.html"

function carregarUsuario() {
    const texto = document.getElementById('texto')
    texto.innerText = `Seja bem vindo(a) ${usuario.nome}`
}
carregarUsuario()

const div = document.getElementById('calimc')
const res = document.getElementById('res')
const form = document.getElementById('formImc')

form.addEventListener('submit', (e) => {
    e.preventDefault(); // 👈 impede reload

    // se já estiver ativo → FECHA
    if (div.classList.contains('ativo')) {
        div.classList.remove('ativo')
        div.classList.add('desativo')
        res.innerHTML = ""
        return
    }

    const peso = Number(document.getElementById('ipeso').value)
    const altura = Number(document.getElementById('ialtura').value)

    const imc = peso / (altura * altura)
    const imcFormatado = imc.toFixed(1)

    let classificacao = ""
    let cor = ""

    if (imc < 18.5) {
        classificacao = "Abaixo do Peso"
        cor = "#db2525"
    } else if (imc < 24.9) {
        classificacao = "Peso Normal"
        cor = "#49de78"
    } else if (imc < 29.9) {
        classificacao = "Sobrepeso"
        cor = "#facc16"
    } else if (imc < 34.9) {
        classificacao = "Obesidade Grau I"
        cor = "#fa913c"
    } else if (imc < 39.9) {
        classificacao = "Obesidade Grau II"
        cor = "#f77272"
    } else {
        classificacao = "Obesidade Grau III"
        cor = "#db2323"
    }

    res.innerHTML = `
        Seu IMC é <br>
        <span style="font-size: 1.8em; color: ${cor};">
            ${imcFormatado} <br>
            ${classificacao}
        </span>
    `

    div.classList.add('ativo')
    div.classList.remove('desativo')
})
