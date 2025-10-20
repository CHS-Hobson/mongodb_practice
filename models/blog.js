const mongoose = require('mongoose');
const Schema = mongoose.Schema; // constructor function

// Schema
const blogSchema = new Schema({
		title: { type:String, required:true },
		snippet: { type:String, required:true },
		body: { type:String, required:true }
	}, { timestamps:true }
);

// Model
const Blog = mongoose.model('Blog', blogSchema); // 'Blog' must be singular of pluralized collection in MongoDB

// export for use in project
module.exports = Blog;