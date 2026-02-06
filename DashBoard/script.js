const URL = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd'
let lista = []

async function chamarApi() {
    try {
        const resp = await fetch(URL)

        if(!resp.ok){
            throw new Error("Erro na requisição");
        }

        const objeto = await resp.json()
        lista = objeto
        //console.log(objeto)
        filtrarPreco(lista)
    } catch (error) {
        console.log('Erro ao buscar dados:', error.message)
    }
}

chamarApi()

function filtrarPreco(coins){
    const top = coins.sort((a,b) => b.market_cap - a.market_cap).slice(0,10)
    mostrarTop(top)
    top.forEach(coin => {
        console.log(coin.name)
    });
   
}

function mostrarTop(listaTop){
    const container = document.querySelector('.top')
    container.innerHTML =''
        listaTop.forEach((coin, index) => {
            const variacao = coin.price_change_percentage_24h
            const classe = variacao >= 0 ? 'verde' : 'vermelho'
            const seta = variacao >= 0 ? '↑' : '↓'
            container.innerHTML += `
             <div class="posicao">

            <div class="linha">

                <!-- ESQUERDA -->
                <div class="info">

                    <span class="rank">${index + 1}</span>

                    <img src="${coin.image}" class="icon">

                    <div class="nome">
                        <p class="nome-coin">${coin.name}</p>
                        <p class="sigla">${coin.symbol.toUpperCase()}</p>
                    </div>

                </div>

                <!-- DIREITA -->
                <div class="preco-box">
                    <p class="preco">$${coin.current_price.toLocaleString()}</p>
                    <p class="${classe}">
                        ${seta} ${variacao.toFixed(2)}%
                    </p>
                </div>

            </div>

        </div>`
            
})
}
