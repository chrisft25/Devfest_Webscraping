const options = {
    pageSettings: {
        loadImages:  false,       
        loadPlugins: false
    },
    viewportSize: {
        width: 500,
        height: 500
    }
}
function getName(){
    var price = document.querySelectorAll('span.nav-line-1')
   return Array.prototype.map.call(price, function(e) {
    return e.innerHTML.replace("$","");
});
}

var fs = require('fs');
const casper = require('casper').create(options);
casper.userAgent('Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1)');
casper.options.waitTimeout = 10000;
casper.start('https://www.amazon.com/', function() {
    this.echo("Entrando a Amazon.com");
});

casper.capture("screenshots/amazon1.png")
casper.thenClick("a[data-nav-role='signin']", function(){
    this.echo("Estoy en " + this.getTitle())
    this.sendKeys("input#ap_email","")
});

casper.thenClick("input#continue", function(){
    this.echo('Voy a verificar');
});

casper.thenClick("#signInSubmit", function(){
    this.sendKeys("#ap_password","")
    this.echo('Voy a verificar');
});

casper.thenClick("#signInSubmit", function(){
    // fs.write('text.txt', this.getPageContent(), 'w');
    // this.echo(this.getPageContent())
});

casper.thenClick("#continue", function(){
    this.echo('esperando confirmación')
    this.wait(8000, function(){this.echo('2')});
});

casper.thenOpen('https://www.amazon.com/Bluetooth-MIFA-Earphones-Microphone-Headphones/dp/B07PKR7T1V/',function(){
    this.echo(getTitle())
    console.log(this.evaluate(getName()))
})
// casper.waitForSelector('#twotabsearchtextbox',function success(){
// this.echo('logeado')
// },function fail(){
//     this.echo('error')
// })
// casper.thenClick("input#signInSubmit", function(){

// });

// casper.then(function() {
//     prices= this.evaluate(getPrices)
//     prices.forEach(function(price) {
//         if(price<=10){
//             console.log('Es hora de comprar - '+ price)
//         }
//     });
// });

casper.run();