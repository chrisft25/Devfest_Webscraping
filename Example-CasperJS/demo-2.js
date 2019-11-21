const options = {
    pageSettings: {
        loadImages:  false,       
        loadPlugins: false
    }
}

const casper = require('casper').create(options);

var fs = require('fs');

var products = []

function getProducts(){

    var url = document.querySelectorAll('a.a-link-normal')
    var price = document.querySelectorAll('a.a-size-base > span.a-price > span.a-offscreen')
    var productos = []
    for(var i =0; i<price.length;i++){
        productos.push({url: url[i].href, price: price[i].innerHTML})
    }
return productos;
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
    products= this.evaluate(getProducts)
    products.forEach(function(product) {
        console.log(product.url + "-" + product.price)
    });
    fs.write("productos.json", JSON.stringify(products), 'w');
});

casper.run();