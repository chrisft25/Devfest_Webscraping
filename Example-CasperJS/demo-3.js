/*

---------------------------------------

    Comprando un producto en Amazon

---------------------------------------


*/


const options = {
    pageSettings: {
        loadImages:  false,       
        loadPlugins: false
    }
}

const casper = require('casper').create(options);
const env = require('system').env;
const amazon_email = env.AMAZON_EMAIL;
const amazon_passwd = env.AMAZON_PASS;

casper.userAgent('Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1)');

casper.options.waitTimeout = 6000;

casper.start('https://www.amazon.com/', function() {
    this.echo("Entrando a Amazon.com");
});


casper.thenClick("a[data-nav-role='signin']", function(){
    this.echo("Estoy en " + this.getTitle())
    this.sendKeys("input#ap_email",amazon_email)
});

casper.thenClick("input#continue", function(){
    this.echo('Click en Continue');
});

casper.thenClick("#signInSubmit", function(){
    this.sendKeys("#ap_password",amazon_passwd)
    this.echo('Verificar');
});

casper.thenClick("#signInSubmit", function(){
    this.echo("Click en Verificar")
});

casper.thenClick("#continue", function(){
    this.echo('Esperando confirmación')
    this.wait(8000, function(){this.echo('Verificando confirmación')});
});

casper.waitForSelector('#twotabsearchtextbox',function success(){
this.echo('Logeado correctamente')
},function fail(){
    this.echo('Error')
})

//Otro Link https://www.amazon.com/Compatible-iPhone-Clear-Anti-Scratch-Absorption/dp/B07HRJL27Z/

casper.thenOpen('https://www.amazon.com/Bluetooth-MIFA-Earphones-Microphone-Headphones/dp/B07PKR7T1V/',function(){
    this.echo("Estoy en " + this.getTitle())
})

casper.thenClick("#buy-now-button", function(){
console.log("Click en Buy Now")
})

casper.waitForSelector('#siNoCoverage-announce',function success(){
    this.thenClick('#siNoCoverage-announce',function(){
        this.echo("Click en No Thanks")
    })
    
    },function fail(){
        this.echo('No hubo otra ventana emergente')
    })

casper.then(function(){
        this.echo(this.getTitle())
})

casper.thenClick("input.place-your-order-button", function(){
    this.echo('Producto Comprado')
})

casper.run();