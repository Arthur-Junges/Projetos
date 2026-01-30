const botao = document.getElementById('botao')
const input = document.getElementById('input')
const texto = document.getElementById('texto')
botao.addEventListener('click', () =>{
    texto.innerText = input.value
})