const express = require('express');
const router = express.Router();
const Post = require('../schemas/Post');

// GET all posts, async
router.get('/', async (req, res) => {
    try{
        console.log('GET posts')
        const posts = await Post.find();
        res.json(posts);
    }
    catch(err){
        console.error(err);
        res.json({ message: error });
    };
});

// GET all posts, promise
router.post('/promise', (req, res) => {
    const post = new Post({
        title: req.body.title,
        description: req.body.description
    });
    post.save()
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.json({ message: err });
        });
});

// test sub-routes addressing
router.get('/somepost', (req, res) => {
    res.send('we are at posts/somepost');
});

// POST new post
router.post('/', async (req, res) => {
    const post = new Post({
        title: req.body.title,
        description: req.body.description
    });
    try{
        const savedPost = await post.save();
        res.json(savedPost);
    }
    catch(err){
        console.error(err);
        res.json({message: err});
    }
});

// GET specfic post
router.get('/:postId', async (req, res) => {
    try{
        console.log(`GET post ${req.params.postId}`);
        const result = await Post.findById(req.params.postId);
        res.json(result);
    }
    catch(err){
        res.json({ message: error });
    };
});

// PATCH specific post
router.patch('/:postId', async (req, res) => {
    try{
        console.log(`PATCH post ${req.params.postId}`);
        const updatedPost = await Post.updateOne(
            {_id: req.params.postId}, 
            {$set: req.body}
        );
        res.json(updatedPost);
    }
    catch(err){
        res.json({ message: error });
    };
});

// DELETE specific post
router.delete('/:postId', async (req, res) => {
    try{
        console.log(`DELETE post ${req.params.postId}`);
        const removedPost = await Post.deleteOne({_id: req.params.postId});
        res.json(removedPost);
    }
    catch(err){
        res.json({ message: error });
    };
});

module.exports = router;