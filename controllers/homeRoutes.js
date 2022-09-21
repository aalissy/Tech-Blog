const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

// Gets all users posts
router.get('/', async (req, res) => {
  try {
    const data = await Post.findAll({
      include: [User],
    });
    const posts = data.map((post) => post.get({ plain: true }));
    res.render('homepage', {
      posts,
      logged_in: req.session.logged_in
    });
  } catch(err) {
    res.status(500).json(err);
  }
});

// Gets posts based on their id and allows the user to comment on them
router.get('/post/:id', withAuth, async (req, res) => {
  try {
    const data = await Post.findOne({
      where: { id: req.params.id },
      include: [
        User,
        {
          model: Comment,
          include: [User],
        }
      ]
    });
    const post = data.get({ plain: true });
    res.render('comment', {
      post,
      logged_in: req.session.logged_in
    });
  } catch(err) {
    res.status(500).json(err);
  }
});

// Login route checking if the user is logged in and sending them to the dashboard if they are or sending them to the login page if they aren't
router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }
  res.render('login');
});

// Signup route checking if the user is logged in and sending them to the dashboard if they are or sending them to the signup page if they aren't
router.get('/signup', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }
  res.render('signup');
});

module.exports = router;
