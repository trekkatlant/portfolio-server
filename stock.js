const db = require('../db/);

const Stock = db.define('stock', {
	tickerSymbol: {
		type: String,
		required: true;
	},
	price:  	  {
		type: Decimal,
		required: true
	},
	shares:       {
		type: int,
		required: true
	},
	purchaseDate  {
		type: Date,
		required: true
	}
});

module.exports = Stock;