const apiKey = 'SfkqAPebaM4inXbvlFufx3a14WJubDdO'
var stocksButton = document.querySelector('#stocks-button')
var stocksSearch = document.querySelector('#stocks-input')

var stockSymbol = document.querySelector('#stock-symbol')
var stockHigh = document.querySelector('#stock-high')
var stockLow = document.querySelector('#stock-low')
var stockClose = document.querySelector('#stock-close')

var coinName = document.querySelector('#coin-name')
var coinSymbol = document.querySelector('#coin-symbol')
var coinPrice = document.querySelector('#coin-price')
var coinVolume = document.querySelector('#coin-volume')

var coinsButton = document.querySelector('#coins-button')
var coinsSearch = document.querySelector('#coins-input')

var stocksCard = document.querySelector('#stocks-card')
var coinsCard = document.querySelector('#coins-card')



function pageLoad() {

    var lastCoinSave = JSON.parse(localStorage.getItem(coinSave))

    if (lastCoinSave !== null) {
        coinsCard.style.display = 'flex';
        coinName.textContent = lastCoinSave[0]
        coinSymbol.textContent = lastCoinSave[1]
        coinPrice.textContent = lastCoinSave[2]
        coinVolume.textContent = lastCoinSave[3]
    }
    else {
        return;
    }



}

function getUserInput() {
    let coinsSearch = document.querySelector('coins-input');
    getCoins(toString(coinsSearch));
}
coinsSearch.addEventListener('keyup', function (event) {
    if (event.key !== 'Enter') {
        return;
    }
    event.preventDefault();
    getUserInput();
    return (false)
});
coinsButton.addEventListener('click', getUserInput);







function getStocksUserInput() {
    let stocksSearch = document.querySelector('stocks-input');
    getStocks(toString(stocksSearch));
}
stocksSearch.addEventListener('keyup', function (event) {
    if (event.key !== 'Enter') {
        return;
    }
    event.preventDefault();
    getStocksUserInput();
    return (false)
});
stocksButton.addEventListener('click', getStocksUserInput);









function getCoins() {
    var coinsAPI = 'https://api.minerstat.com/v2/coins?list=' + coinsSearch.value

    fetch(coinsAPI)

        .then(response => response.json())
        .then(data => {
            var coinsData = data || [];
            console.log(coinsData);
            return coinsData[0];
        })
        .then(function (coinInfo) {
            console.log('this is what I want to work with', coinInfo)
            if (coinInfo == null) {

                coinsCard.style.display = 'flex';
                coinName.textContent = 'No Coins Found By That Symbol'
                coinSymbol.textContent = ''
                coinPrice.textContent = ''
                coinVolume.textContent = ''
            }
            else {
                coinsCard.style.display = 'flex';
                coinName.textContent = 'Coin Name: ' + coinInfo.name
                coinSymbol.textContent = 'Coin Symbol: ' + coinInfo.coin
                coinPrice.textContent = 'Coin Price: ' + coinInfo.price
                coinVolume.textContent = 'Coin Volume: ' + coinInfo.volume

                var coinSave = [
                    coinName.textContent = 'Coin Name: ' + coinInfo.name,
                    coinSymbol.textContent = 'Coin Symbol: ' + coinInfo.coin,
                    coinPrice.textContent = 'Coin Price: ' + coinInfo.price,
                    coinVolume.textContent = 'Coin Volume: ' + coinInfo.volume,
                ]
                localStorage.setItem("coinSave", JSON.stringify(coinSave))
            }
        }

        );

};




function getStocks() {
    var stocksAPI = 'https://api.polygon.io/v2/aggs/ticker/' + stocksSearch.value + '/prev?adjusted=false&apiKey=' + apiKey

    fetch(stocksAPI)

        .then(response => response.json())
        .then(data => {
            var stocksData = data || [];
            console.log(stocksData);
            return stocksData.results[0];
        })
        .then(function (stockInfo) {
            console.log('this is what I want to work with', stockInfo)
            if (stockInfo == null) {
                stocksCard.style.display = 'flex';
                stockSymbol.textContent = 'No Stocks Found By That Symbol'
                stockHigh.textContent = ''
                stockLow.textContent = ''
                stockClose.textContent = ''
            }
            else {
                stocksCard.style.display = 'flex';
                stockSymbol.textContent = 'Stock Symbol: ' + stockInfo.T
                stockHigh.textContent = 'Stock High: ' + stockInfo.h
                stockLow.textContent = 'Stock Low: ' + stockInfo.l
                stockClose.textContent = 'Stock Close: ' + stockInfo.c

                var stockSave = [
                    stockSymbol.textContent = 'Stock Symbol: ' + stockInfo.T,
                    stockHigh.textContent = 'Stock High: ' + stockInfo.h,
                    stockLow.textContent = 'Stock Low: ' + stockInfo.l,
                    stockClose.textContent = 'Stock Close: ' + stockInfo.c,
                ]
                localStorage.setItem("stockSave", JSON.stringify(stockSave))
            }

        }

        );

};
