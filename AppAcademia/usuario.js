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
    e.preventDefault();  
    if (div.classList.contains('ativo')) {
        div.classList.remove('ativo')
        div.classList.add('desativo')
        res.innerHTML = ""
        return
    }

    div.classList.add('ativo')
    div.classList.remove('desativo')

    const imcFormatado = calcular()
    const nivel = getNivelImc(imcFormatado)
    renderTreino(nivel)
    
})

function calcular(){
    
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
    return imcFormatado
}

function getNivelImc(imcFormatado) {
    const imc = Number(imcFormatado)
    if (imc < 18.5) return "abaixo";
    if (imc < 25) return "normal";
    if (imc < 30) return "sobrepeso";
    if (imc < 35) return "obesidade1";
    if (imc < 40) return "obesidade2";
    return "obesidade3";
}

const planosPorImc = {
        abaixo : {
            treino : {
                peitoTriceps: [
                    "Supino Reto - 4 x 8-10",
                    "Supino Inclinado Com Halter - 3 x 8-10",
                    "Crucifixo Máquina - 3 x 10-12",
                    "Tríceps Pulley - 3 x 10-12",
                    "Tríceps Testa - 3 x 8-10",
                    "Mergulho no Banco - 3x até a falha",
                ],
                costaBiceps: [
                    "Puxada Alta - 4 x 8-10",
                    "Remada Curvada - 3 x 8-10",
                    "Remada Baixa - 3 x 10-12",
                    "Rosca Direta - 3 x 8-10",
                    "Rosca Alternada - 3 x 10",
                ],
                pernaCompleto: [
                    "Agachamento Livre - 4 x 8",
                    "Leg Press - 3 x 10",
                    "Cadeira Extensora - 3 x 12",
                    "Mesa Flexora - 3 x 10",
                    "Stiff - 3 x 8-10",
                    "Elevação em Pé - 4 x 12-15",
                ],
                ombroTrapezioAbdomen: [
                    "Desenvolvimento Halter - 4 x 8-10",
                    "Elevação Lateral - 3 x 12",
                    "Elevação Frontal - 3 x 10",
                    "Encolhimento com Halter - 4 x 12",
                    "Abdominal Máquina - 4 x 15",
                ]
            },
            dietaUm: {
                cafe: [
                    "3 Ovos Mexidos",
                    "2 Pães",
                    "Leite Integral ou Café com Leite",
                ],
                almoco: [
                    "Arroz 200g",
                    "Feijão 100g",
                    "Frango Grelhado 200g",
                    "Batata 50g"
                ],
                jantar: [
                    "Macarrão 200g",
                    "Frango Desfiado 150g",
                    "Queijo ou Molho",
                ]
            },
            dietaDois: {
                cafe: [
                    "Vitamina: leite integral + banana + aveia",
                    "2 ovos"
                ],
                almoco: [
                    "Arroz 200g",
                    "Feijão 100g",
                    "Carne vermelha 200g",
                    "Azeite por cima da comida",
                ],
                jantar: [
                    "Arroz ou macarrão 250g",
                    "Carne moída ou frango 180g",
                    "Legumes refogados 30g",
                ]
            },
            dietaTres: {
                cafe: [
                    "2 pães",
                    "Ovos",
                    "Pasta de amendoim",
                    "Leite integral",
                ],
                almoco: [
                    "Arroz 300g",
                    "Feijão 100g",
                    "Frango ou carne 200g",
                    "Batata ou mandioca 30g",
                ],
                jantar: [
                    "Arroz ou macarrão 350g",
                    "Ovos ou carne 200g",
                    "Legumes 30g",
                ]
            }
        },
        normal: {
            treino: {
            peitoTriceps: [
                "Supino Máquina – 4x10",
                "Peck Deck – 3x12",
                "Crucifixo Máquina – 3x12",
                "Tríceps Pulley – 3x10-12",
                "Tríceps Corda – 3x12",
                "Tríceps Banco – 3x até a falha"
            ],

            costaBiceps: [
                "Puxada Frente – 4x10",
                "Remada Baixa – 3x10-12",
                "Remada Unilateral – 3x10",
                "Rosca Scott – 3x10",
                "Rosca Martelo – 3x10"
            ],

            pernaCompleto: [
                "Hack Machine – 4x10",
                "Agachamento Smith – 3x10",
                "Extensora Unilateral – 3x12",
                "Mesa Flexora – 3x10",
                "Stiff Halter – 3x10"
            ],

            ombroTrapezioAbdomen: [
                "Desenvolvimento Máquina – 4x10",
                "Elevação Lateral Halter – 3x12",
                "Elevação Frontal Anilha – 3x10",
                "Encolhimento Halter – 4x12",
                "Abdominal Infra – 4x15"
            ]
            },
            dietaUm: {
                cafe: [
                "2 Ovos Mexidos",
                "1 Pão Integral",
                "Café sem açúcar ou com leite desnatado"
                ],
                almoco: [
                "Arroz 150g",
                "Feijão 100g",
                "Frango Grelhado 180g",
                "Salada à vontade"
                ],
                jantar: [
                "Arroz ou macarrão 150g",
                "Frango ou peixe 150g",
                "Legumes cozidos"
                ]
            },

            dietaDois: {
                cafe: [
                "Vitamina: banana + aveia + leite desnatado",
                "1 ovo"
                ],
                almoco: [
                "Arroz 150g",
                "Feijão 100g",
                "Carne vermelha magra 150g",
                "Salada com azeite"
                ],
                jantar: [
                "Arroz ou macarrão 150g",
                "Carne moída ou frango 150g",
                "Legumes 50g"
                ]
            },

            dietaTres: {
                cafe: [
                "1 pão integral",
                "Ovos",
                "Café ou chá"
                ],
                almoco: [
                "Arroz 180g",
                "Feijão 100g",
                "Frango ou carne 180g",
                "Legumes"
                ],
                jantar: [
                "Arroz ou macarrão 150g",
                "Ovos ou frango 150g",
                "Salada"
                ]
            }
            
        },

        sobrepeso: {
            treino: {
            peitoTriceps: [
                "Supino Inclinado Máquina – 3x12",
                "Crucifixo no Cabo – 3x12",
                "Flexão de Braço – 3x até a falha",
                "Tríceps Pulley Barra – 3x12",
                "Tríceps Coice – 3x12",
                "Tríceps Corda – 3x12"
            ],

            costaBiceps: [
                "Puxada Neutra – 3x12",
                "Remada Máquina – 3x12",
                "Pulldown – 3x15",
                "Rosca no Cabo – 3x12",
                "Rosca Concentrada – 3x10",
                "Obs: Esteira - 30 Minutos"
            ],

            pernaCompleto: [
                "Leg Press 45 – 3x12",
                "Cadeira Extensora – 3x12",
                "Agachamento Caixa – 3x10",
                "Mesa Flexora – 3x12",
                "Ponte de Glúteo – 3x15"
            ],

            ombroTrapezioAbdomen: [
                "Desenvolvimento Halter – 3x12",
                "Elevação Lateral Máquina – 3x15",
                "Elevação Frontal Cabo – 3x12",
                "Encolhimento Máquina – 3x15",
                "Abdominal Máquina – 4x15",
                "Obs: Esteira - 30 Minutos"
            ]
            },
            dietaUm: {
                cafe: [
                "2 Ovos",
                "1 Pão Integral",
                "Café sem açúcar"
                ],
                almoco: [
                "Arroz 120g",
                "Feijão 80g",
                "Frango Grelhado 150g",
                "Salada à vontade"
                ],
                jantar: [
                "Legumes refogados",
                "Frango ou peixe 150g"
                ]
            },

            dietaDois: {
                cafe: [
                "Vitamina: banana + aveia + água",
                "1 ovo"
                ],
                almoco: [
                "Arroz 120g",
                "Feijão 80g",
                "Carne magra 150g",
                "Salada"
                ],
                jantar: [
                "Ovos mexidos",
                "Legumes"
                ]
            },
            
            dietaTres: {
                cafe: [
                "Ovos",
                "Café ou chá"
                ],
                almoco: [
                "Arroz 120g",
                "Feijão 80g",
                "Frango 150g",
                "Salada"
                ],
                jantar: [
                "Sopa de legumes com frango"
                ]
            },
              
        },

        obesidade1: {
            treino: {
            peitoTriceps: [
                "Chest Press – 3x15",
                "Peck Deck – 3x15",
                "Crucifixo Máquina – 3x15",
                "Tríceps Máquina – 3x15",
                "Tríceps Pulley Leve – 3x15",
                "Tríceps Corda – 3x15",
                "Obs: Esteira - 45 Minutos"
            ],

            costaBiceps: [
                "Puxada Frente Máquina – 3x15",
                "Remada Sentada – 3x15",
                "Pullover Máquina – 3x15",
                "Rosca Máquina – 3x15",
                "Rosca Alternada Sentado – 3x12"
            ],

            pernaCompleto: [
                "Leg Press Horizontal – 3x15",
                "Extensora Leve – 3x15",
                "Agachamento Assistido – 3x10",
                "Flexora Deitada – 3x15",
                "Stiff Leve – 3x12",
                "Obs: Esteira - 45 Minutos"
            ],

            ombroTrapezioAbdomen: [
                "Desenvolvimento Máquina – 3x15",
                "Elevação Lateral Leve – 3x15",
                "Elevação Frontal Halter – 3x15",
                "Encolhimento Sentado – 3x15",
                "Abdominal Curto – 3x20"
            ]
            },
            dietaUm: {
                cafe: [
                "2 Ovos",
                "Café sem açúcar"
                ],
                almoco: [
                "Arroz 100g",
                "Feijão 70g",
                "Frango 150g",
                "Salada"
                ],
                jantar: [
                "Legumes",
                "Proteína 150g"
                ]
            },

            dietaDois: {
                cafe: [
                "Vitamina: banana + aveia + água"
                ],
                almoco: [
                "Arroz 100g",
                "Feijão 70g",
                "Carne magra 150g",
                "Salada"
                ],
                jantar: [
                "Ovos",
                "Legumes"
                ]
            },

            dietaTres: {
                cafe: [
                "Ovos",
                "Chá"
                ],
                almoco: [
                "Frango 180g",
                "Legumes",
                "Salada"
                ],
                jantar: [
                "Sopa de legumes"
                ]
            }
            
        },

        obesidade2: {
            treino: {
            peitoTriceps: [
                "Chest Press – 3x15",
                "Peck Deck – 3x15",
                "Crucifixo Sentado – 3x15",
                "Tríceps Máquina – 3x15",
                "Tríceps Pulley – 3x15",
                "Tríceps Corda – 3x15",
                "Obs: Esteira - 1 Hora",
            ],

            costaBiceps: [
                "Puxada Articulada – 3x15",
                "Remada Articulada – 3x15",
                "Pullover – 3x15",
                "Rosca Máquina – 3x15",
                "Rosca no Cabo – 3x15"
            ],

            pernaCompleto: [
                "Leg Press – 3x15",
                "Extensora – 3x15",
                "Agachamento Assistido – 3x10",
                "Flexora Sentada – 3x15",
                "Ponte de Glúteo – 3x15",
                "Obs: Esteira - 1 Hora"
            ],

            ombroTrapezioAbdomen: [
                "Desenvolvimento Articulado – 3x15",
                "Elevação Lateral Máquina – 3x15",
                "Elevação Frontal Máquina – 3x15",
                "Encolhimento Máquina – 3x15",
                "Abdominal Isométrico – 3x30s"
            ]
            },
            dietaUm: {
                cafe: [
                "1 Ovo",
                "Café sem açúcar"
                ],
                almoco: [
                "Arroz 80g",
                "Feijão 50g",
                "Frango 150g",
                "Salada"
                ],
                jantar: [
                "Legumes",
                "Peixe ou frango 120g"
                ]
            },

            dietaDois: {
                cafe: [
                "Vitamina: morango + água"
                ],
                almoco: [
                "Frango 180g",
                "Legumes",
                "Salada"
                ],
                jantar: [
                "Ovos",
                "Legumes"
                ]
            },

            dietaTres: {
                cafe: [
                "Chá"
                ],
                almoco: [
                "Carne magra 180g",
                "Salada"
                ],
                jantar: [
                "Sopa leve de legumes"
                ]
            }
            
        },

        obesidade3: {
            treino: {
            peitoTriceps: [
                "Chest Press Leve – 3x20",
                "Peck Deck Leve – 3x20",
                "Crucifixo Máquina – 3x20",
                "Tríceps Máquina – 3x20",
                "Tríceps Corda – 3x20",
                "Tríceps Pulley – 3x20"
            ],

            costaBiceps: [
                "Puxada Frente – 3x20",
                "Remada Máquina – 3x20",
                "Pulldown – 3x20",
                "Rosca Máquina – 3x20",
                "Rosca Cabo – 3x20",
                "Obs: Esteira - 90 Minutos"
            ],

            pernaCompleto: [
                "Leg Press Leve – 3x20",
                "Extensora Curta – 3x20",
                "Agachamento Assistido – 3x10",
                "Flexora Sentada – 3x20",
                "Ponte – 3x20"
            ],

            ombroTrapezioAbdomen: [
                "Desenvolvimento Máquina – 3x20",
                "Elevação Lateral Leve – 3x20",
                "Elevação Frontal Leve – 3x20",
                "Encolhimento Leve – 3x20",
                "Respiração Diafragmática – 5 min",
                "Obs: Esteira - 90 Minutos"
            ]
            },
            dietaUm: {
                cafe: [
                "Café ou chá sem açúcar"
                ],
                almoco: [
                "Frango 150g",
                "Legumes",
                "Salada"
                ],
                jantar: [
                "Sopa de legumes"
                ]
            },

            dietaDois: {
                cafe: [
                "Chá"
                ],
                almoco: [
                "Peixe 150g",
                "Legumes"
                ],
                jantar: [
                "Legumes cozidos"
                ]
            },

            dietaTres: {
                cafe: [
                "Água ou chá"
                ],
                almoco: [
                "Proteína magra 150g",
                "Salada"
                ],
                jantar: [
                "Caldo de legumes"
                ]
            }
            
  }
 };


function renderTreino(nivel) {
    const lpeito = document.getElementById('lpeito')
    const lcostas = document.getElementById('lcostas')
    const lperna = document.getElementById('lperna')
    const lombro = document.getElementById('lombro')
    
    const plano = planosPorImc[nivel]

    lpeito.innerHTML = plano.treino.peitoTriceps
    .map(ex => `<li> <i class="fa-solid fa-circle-check"></i>  ${ex}</li>`).join("")

    lcostas.innerHTML = plano.treino.costaBiceps.map(ex => `<li><i class="fa-solid fa-circle-check"></i>  ${ex}</li>`).join("")

    lperna.innerHTML = plano.treino.pernaCompleto.map(ex => `<li><i class="fa-solid fa-circle-check"></i>  ${ex}</li>`).join("")

    lombro.innerHTML = plano.treino.ombroTrapezioAbdomen.map(ex => `<li><i class="fa-solid fa-circle-check"></i>  ${ex}</li>`).join("") 
}


function salvarDado(){
    const email = localStorage.getItem("usuarioLogado")
    if (!email) {
        alert("Faça Login")
        return
    }

    const usuarios = getUsuarios()
    const usuario = usuarios.find(u => u.email === email)

    usuario.dados.push(novoDado.value)
    salvarUsuarios(usuario)

    novoDado.value = ""
    carregarUsuario()
}

carregarUsuario()


    

