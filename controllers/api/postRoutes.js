const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

// Creates new posts
router.post('/', withAuth, async (req, res) => {
  try {
    const myPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.status(200).json(myPost);
  } catch(err) {
    res.status(400).json(err);
  }
});

// Updates posts by id
router.put('/:id', withAuth, async (req, res) => {
  try {
     await Post.update(req.body,{
        where: {
          id: req.params.id,
        }
      });
    res.status(200).end()
  } catch(err) {
    res.status(400).json(err);
  }
});

// Deletes posts by id
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const data = await Post.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!data) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }
    res.status(200).end()
  } catch(err) {
    res.status(500).json(err);
  }
});

module.exports = router;
