const express = require('express'); // server
const morgan = require('morgan'); // logs request data
const mongoose = require('mongoose'); // mongoDB object document mapping library
const blogRoutes = require('./routes/blogRoutes'); // blog routes


// instantiate express app
const app = express();

// mongoDB connection string
//dbURI = 'mongodb+srv://netninja:A3mt47t68jGoD8Ya@nodetuts.gze3ktu.mongodb.net/TestDatabase';
const dbURI = process.env.MONGODB_URI;

// mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true } )
mongoose.connect(dbURI)
	.then((result) => { // promise verified
		console.log('connected to mongodb');
		// app.listen(3000); // listen for requests only after connected to db
		module.exports = app; // required for Vercel deployment?  10/20/2025
	})
	.catch((err) => console.log(err)); // catch error


// register view engine
app.set('view engine', 'ejs');
	// set different folder for views
	//app.set('views', 'myviews');


// middleware & static files
app.use(express.static('public')); // folder name for static files to be accessed by anyone
app.use(express.urlencoded( { extended: true } )); // package data for post requests, extended parses objects/arrays
app.use(morgan('dev')); // log request data, could also use 'tiny'


// middleware function template
app.use((req, res, next) => {
	/*
		add any code here
	*/
	next();
});


// get handlers
app.get('/', (req, res) => {
	res.redirect('blogs'); // redirect
});
app.get('/about', (req, res) => {
	res.render('about', { title: "About" } );
});


// blog routes
app.use('/blogs', blogRoutes);


// 404 - get request did not match any get handlers above
app.use((req, res) => {
	res.status(404).render('404', { title: "Page Not Found" } );
});