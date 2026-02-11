const URL = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd'
let lista = []
let graficoGlobal

async function chamarApi() {
    try {
        const resp = await fetch(URL)

        if(!resp.ok){
            throw new Error("Erro na requisição");
        }

        const objeto = await resp.json()
        lista = objeto
        
        filtrarPreco(lista)
    } catch (error) {
        console.log('Erro ao buscar dados:', error.message)
    }
}

chamarApi()

const input = document.getElementById('input')

input.addEventListener('input', () =>{
    const valor = input.value.toLowerCase()
    if(valor.length < 2){
    filtrarBusca(valor)
    }else{
        buscarMoeda(valor)
    }
})

function filtrarBusca(valor){
    const container = document.getElementById('sugestoes')
    container.innerHTML = ''

    if(valor.length === 0 ) return

    const filtradas = lista.filter(coin => coin.name.toLowerCase().includes(valor) || coin.symbol.toLowerCase().includes(valor)).slice(0,8)

    filtradas.forEach(coin => {
        container.innerHTML += `
        <div class="item-sugestao" onclick="selecionarMoeda('${coin.id}')">

            <img src="${coin.image}">
            <span> ${coin.name} (${coin.symbol.toUpperCase()}) </span>
        </div>
        `
    })
}

function selecionarMoeda(id){
    document.getElementById('sugestoes').innerHTML =''

    input.value = ''

    toggleGrafico(id,document.querySelector(`[onclick*="${id}"]`))
}

function filtrarPreco(coins){
    const top = coins.sort((a,b) => b.market_cap - a.market_cap).slice(0,10)
    mostrarTop(top)
    top.forEach(coin => {
        console.log(coin.name)
    });
   
}

async function buscarMoeda(termo) {
    if(termo.length < 1) return
    const url = `https://api.coingecko.com/api/v3/search?query=${termo}`
    const resp = await fetch(url)
    const dados = await resp.json()

    mostrarSugestoes(dados.coins)
}

function mostrarSugestoes(moedas){
    const sugestoes = document.getElementById('sugestoes')
    sugestoes.innerHTML = ''

    moedas.slice(0,10).forEach(coin => {
         sugestoes.innerHTML += `
            <div onclick="selecionarMoedaGlobal('${coin.id}')">
                ${coin.name} (${coin.symbol.toUpperCase()})
            </div>
        `
    })
}

function selecionarMoeda(id){

    document.getElementById('sugestoes').innerHTML =''
    input.value = ''

    const elemento =
        document.querySelector(`.posicao[onclick*="${id}"]`)

    if(elemento){
        toggleGrafico(id, elemento)

        elemento.scrollIntoView({
            behavior:'smooth',
            block:'center'
        })
    }else{
        abrirGraficoGlobal(id)
    }
}

async function abrirGraficoGlobal(id){

    const url =
        `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=7`

    const resp = await fetch(url)
    const dados = await resp.json()

    const precos = dados.prices.map(p => p[1])
    const labels = dados.prices.map(p => {
        const data = new Date(p[0])
        return data.toLocaleDateString()
    })

    document.getElementById('titulo-grafico')
        .innerText = `Gráfico — ${id}`

    const ctx =
        document.getElementById('canvas-global')
        .getContext('2d')

    if(graficoGlobal){
        graficoGlobal.destroy()
    }

    new Chart(ctx,{
        type:'line',
        data:{
            labels,
            datasets:[{
                label:'Preço USD',
                data:precos,
                tension:0.2,
                pointRadius:0
            }]
        }
    })
}

function mostrarTop(listaTop){
    const container = document.querySelector('.top')
    container.innerHTML =''
        listaTop.forEach((coin, index) => {
            const variacao = coin.price_change_percentage_24h
            const classe = variacao >= 0 ? 'verde' : 'vermelho'
            const seta = variacao >= 0 ? '↑' : '↓'
            container.innerHTML += `
<div class="posicao" onclick="toggleGrafico('${coin.id}', this)">

    <div class="linha">

        <div class="info">
            <span class="rank">${index + 1}</span>

            <img src="${coin.image}" class="icon">

            <div class="nome">
                <p class="nome-coin">${coin.name}</p>
                <p class="sigla">${coin.symbol.toUpperCase()}</p>
            </div>
        </div>

        <div class="preco-box">
            <p class="preco">$${coin.current_price.toLocaleString()}</p>
            <p class="${classe}">
                ${seta} ${variacao.toFixed(2)}%
            </p>
        </div>

    </div>

    <!-- ÁREA DO GRÁFICO -->
    <div class="grafico-container">
        <canvas id="grafico-${coin.id}"></canvas>
    </div>

</div>`
            
})
}

let grafico

async function carregarGrafico(id) {

    const URL = `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=365`

    try {
        const resp = await fetch(URL)
        const dados = await resp.json()

        const precos = dados.prices

        const labels = precos.map(item => { 
            const data = new Date(item[0])
            return data.toLocaleDateString()
        })

        const valores = precos.map(item => item[1])

        desenharGrafico(labels, valores, id)

    } catch (error) {
        console.log('Erro ao carregar gráfico:', error)
    }
}

function desenharGrafico(labels, valores, id) {

    const ctx = document.getElementById(`grafico-${id}`)

    if (!ctx) return

    if (ctx.chart) {
        ctx.chart.destroy()
    }

    ctx.chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Preço 1 ano',
                data: valores,
                tension: 0.2,
                borderWidth: 2,
                pointRadius: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    ticks: { display: false }
                }
            }
        }
    })
}

async function toggleGrafico(id, elemento){

    const ativo = elemento.classList.contains('ativa')

    document.querySelectorAll('.posicao').forEach(div=>{
        div.classList.remove('ativa')
    })

    if(!ativo){
        elemento.classList.add('ativa')

        
        setTimeout(()=>{
            carregarGrafico(id)
        }, 100)
    }
}