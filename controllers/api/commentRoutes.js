const router = require('express').Router();
const { Comment, User, Post } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', withAuth, async (req, res) => {
    try {
        const data = await Comment.findAll({
            include: [User],
        });
        const comments = data.map((comment) => comment.get({ plain: true}));
        res.render('comment', {
            comments,
            logged_in: req.session.logged_in
        })
    } catch(err) {
        res.status(500).json(err);
    }
});

router.post('/', withAuth, async (req, res) => {
    try {
        const myComment = await Comment.create({
            ...req.body,
            post_id: req.body.post_id,
            content: req.body.commentContent,
            user_id: req.session.user_id,
        });
        res.json(myComment);
    } catch(err) {
        res.status(400).json(err);
    }
})

module.exports = router;