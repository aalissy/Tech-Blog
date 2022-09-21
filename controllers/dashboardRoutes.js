const router = require('express').Router();
const { User, Post } = require('../models');
const withAuth = require('../utils/auth');
const date = new Date();

// Gets all the users posts on the dashboard
router.get('/', withAuth, async (req, res) => {
    try {
        const data = await Post.findAll({
            include: [User],
            where: {
                user_id: req.session.user_id,
            }
        });
        const posts = data.map((post) => post.get({ plain: true }));
        res.render('dashboard', {
            posts,
            logged_in: req.session.logged_in
        });
    } catch(err) {
        res.status(400).json(error);
    }
});

// Allows the user to create a new post from the dashboard
router.get('/new', withAuth, (req, res) => {
    res.render('post');
});

// Allows the user to edit the post by the id
router.get('/edit/:id', withAuth, async (req, res) => {
    try {
        const data = await Post.findByPk(req.params.id)
        const posts = data.get({ plain: true });
        res.render('editPost', {
            posts,
        });
    } catch(err) {
        res.status(500).json(err);
    }
});

module.exports = router;
