const router = require('express').Router();
const { Blog, User } = require('../models');

// Render homepage
router.get('/', async (req, res) => {
  try {
    console.log('Homepage route hit');
    const blogData = await Blog.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    const posts = blogData.map((post) => post.get({ plain: true }));
    console.log('Posts:', posts);

    res.render('home', {
      posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.error('Error fetching blog data:', err);
    res.status(500).json(err);
  }
});

// Render single blog post
router.get('/dashboard', async (req, res) => {
  try {
    console.log('Dashboard route hit');
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Blog }],
    });

    const user = userData.get({ plain: true });
    console.log('User:', user);

    res.render('dashboard', {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    console.error('Error fetching user data:', err);
    res.status(500).json(err);
  }
} );

// Render login page
router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }

  res.render('login');
} );


module.exports = router;