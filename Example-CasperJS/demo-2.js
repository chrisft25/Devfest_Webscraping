const options = {
    pageSettings: {
        loadImages:  false,       
        loadPlugins: false
    }
}

const casper = require('casper').create(options);

var prices = []

function getPrices(){
    var price = document.querySelectorAll('span.a-price > span.a-offscreen')
   return Array.prototype.map.call(price, function(e) {
    return e.innerHTML.replace("$","");
});
}

casper.start('https://www.amazon.com/', function() {
    const busqueda= "Pokemon Sword"
    this.echo("Entrando a Amazon.com");
    this.sendKeys("#twotabsearchtextbox",busqueda)
    this.echo("Buscando " + busqueda);
});

casper.thenClick("input[type='submit']", function(){
    this.echo("Estoy en " + this.getTitle())
});

casper.then(function() {
    prices= this.evaluate(getPrices)
    prices.forEach(function(price) {
        if(price<=10){
            console.log('Es hora de comprar - '+ price)
        }
    });
});

casper.run();