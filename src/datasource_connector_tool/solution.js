function Price(json) {
  this.id = Number(json.id)
  this.buy = !isNaN(json.buy) ? Number(json.buy) : -1
  this.sell = !isNaN(json.sell) ? Number(json.sell) : -1
  this.valid_price = this.buy * this.sell !== -1
  this.pair = json.pair
  this.timestamp = json.timestamp
}
Price.prototype.mid = function () {
  if (this.valid_price) return (this.buy + this.sell) / 2
  return NaN
}
Price.prototype.quote = function () {
  return this.pair && this.pair.length > 3 ? this.pair.substring(3) : this.pair
}
function DataSource() {}

DataSource.prototype.parsePrices = function (json) {
  var results = []
  if (json.data && json.data.prices && json.data.prices.length) {
    json.data.prices.forEach((priceJson) => {
      results.push(new Price(priceJson))
    })
  }
  return results
}

DataSource.prototype.getPrices = function () {
  var that = this;
  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest()
    xhr.open('GET', 'https://static.ngnrs.io/test/prices', true)
    xhr.onload = function () {
      if (this.status == 200 && this.readyState == 4) {
        let parseData = JSON.parse(xhr.response)
        resolve(that.parsePrices(parseData))
      }
    }
    xhr.onerror = function () {
      reject({
        status: this.status,
        statusText: xhr.statusText,
      })
    }
    xhr.send()
  })
}

let ds = new DataSource();
ds.getPrices()
    .then(prices => {
        prices.forEach(price => {
            console.log(`Mid price for ${ price.pair } is ${ price.mid() } ${ price.quote() }.`);
        });
    }).catch(error => {
        console.err(error);
    });