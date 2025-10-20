const Blog = require('../models/blog'); // Blog model


// get index handler
const blog_index = (req, res) => {
	Blog.find()
	.sort( { createdAt: -1 } ) // sort newest to oldest
	.then((result) => { 
		res.render('blogs/index', { title: "All Blogs", blogs: result } );
	})
	.catch((err) => {
		console.log(err);
	});
}


// get individual blog handler
const blog_details = (req, res) => {
	const id = req.params.id; // .id matches the parameter name in route
	//console.log(id);

	Blog.findById(id)
		.then((result) => { // async
			res.render('blogs/details', { blog: result, title: 'Blog Details' } );
		})
		.catch((err) => {
			console.log(err);
			res.status(404).render('404', { title: "Blog Not Found" } );
		})
}


// get create blog form handler
const blog_create_get = (req, res) => {
	res.render('blogs/create', { title: "Create" } );
}


// post data for new blog handler
const blog_create_post = (req, res) => {
	// console.log(req.body); // log form data to console
	const blog = new Blog(req.body); // form data is designed to match Blog model

	blog.save() // asynchronous
		.then((result) => {
			res.redirect('/blogs'); // redirect to page of all blogs
		})
		.catch((err) => {
			console.log(err);
		});
}


// delete blog handler
const blog_delete = (req, res) => {
	const id = req.params.id;
	console.log(id);

	Blog.findByIdAndDelete(id) // async
		.then((result) => {
			res.json( { redirect: '/blogs' } ); // must send JSON response to AJAX fetch API request
		})
		.catch((err) => {
			console.log(err); 
		});
}


module.exports = {
	blog_index,
	blog_details,
	blog_create_get,
	blog_create_post,
	blog_delete
}