const express = require('express');
const blogController = require('../controllers/blogController');


// instantiate Express router
const router = express.Router();


// routes
router.get('/', blogController.blog_index); // get index
router.get('/create', blogController.blog_create_get); // get create blog form, NEEDS to come before :id route
router.get('/:id', blogController.blog_details); // get individual blog
router.post('/', blogController.blog_create_post); // post new blog details
router.delete('/:id', blogController.blog_delete); // delete blog


// export for use elsewhere in project
module.exports = router;