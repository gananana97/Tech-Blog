const router = require('express').Router();
const { Blog } = require('../../models');

// Route to create a new blog post
router.post('/', async (req, res) => {
  try {
    const newBlog = await Blog.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.status(200).json(newBlog);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Route to update an existing blog post
router.put('/:id', async (req, res) => {
  try {
    const updatedBlog = await Blog.update(req.body, {
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });
    if (!updatedBlog) {
      res.status(404).json({ message: 'No blog found with this id!' });
      return;
    }
    res.status(200).json(updatedBlog);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to delete a blog post
router.delete('/:id', async (req, res) => {
  try {
    const blogData = await Blog.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });
    if (!blogData) {
      res.status(404).json({ message: 'No blog found with this id!' });
      return;
    }
    res.status(200).json(blogData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;