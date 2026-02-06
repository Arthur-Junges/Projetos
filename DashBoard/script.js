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
        console.log(objeto)
    } catch (error) {
        console.log('Erro ao buscar dados:', error.message)
    }
}

chamarApi()
