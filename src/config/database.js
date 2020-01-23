module.exports = {
	'url': 'mongodb://localhost/login'
};

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/fake_pinterest', {
	useNewUrlParser:true,
	useUnifiedTopology: true
}).then(db => console.log(`DB is connected`)
).catch(err => console.error(err));