const router = require('express').Router();
const { Comment } = require('../../models');

// Route to create a new comment
router.post('/', async (req, res) => {
  try {
    const newComment = await Comment.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Route to get all comments for a specific blog post
router.get('/:blog_id', async (req, res) => {
  try {
    const comments = await Comment.findAll({
      where: {
        blog_id: req.params.blog_id,
      },
    });
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to delete a comment
router.delete('/:id', async (req, res) => {
  try {
    const commentData = await Comment.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });
    if (!commentData) {
      res.status(404).json({ message: 'No comment found with this id!' });
      return;
    }
    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;