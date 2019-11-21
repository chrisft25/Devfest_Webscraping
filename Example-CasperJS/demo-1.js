const casper = require('casper').create()

casper.start('http://nodeschoolsm.io/', function() {
  this.echo(this.getTitle())
})

casper.thenOpen('https://gdgsansalvador.dev/', function() {
  this.echo(this.getTitle())
})

casper.thenOpen(
  'https://www.meetup.com/es/GDG-SanSalvador/events/262332298/',
  function() {
    this.echo(this.getTitle())
  }
)

casper.run()

/* Output:-
NodeSchool San Miguel
GDG San Salvador
DevFest San Salvador 2019 | Meetup */