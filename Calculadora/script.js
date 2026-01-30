const display = document.getElementById('display');
const botoes = document.querySelectorAll('.botoes');

//recebe o que é clicado
let expressao = '';
//variavel para a função do parenteses
let parentesesaberto = 0

botoes.forEach(botao => {
    botao.addEventListener('click', () => {
        const valor = botao.dataset.valor;
        tratarEntrada(valor);
    });
});


function tratarEntrada(valor) {
    
    if (!isNaN(valor)) {
        expressao += valor;
    }
    else if (valor === '()'){
        if (parentesesaberto === 0 || expressao.endsWith('(')){
            expressao += '('
            parentesesaberto++
        } else {
            expressao += ')'
            parentesesaberto--
        }
    }
    else if (valor === 'sqrt'){
        expressao = Math.sqrt(expressao)
    }
    else if (valor === 'pow'){
        expressao += '**'
    }
    else if (valor == 'percent'){
        expressao = (expressao / 100)
    }
    else if (valor === 'clear') {
        expressao = '';
    }
    else if (valor === '=') {
        calcular();
        return;
    }
    else {
        expressao += valor;
    }

    display.value = expressao;
}

//eval resolve a conta dentro do parenteses, eval(expressao) = eval("8+2") → 10
function calcular() {
    try {
        expressao = eval(expressao);
        display.value = expressao;
    } catch {
        display.value = 'Erro';
        expressao = '';
    }
}


