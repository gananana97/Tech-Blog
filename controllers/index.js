const router = require('express').Router();
const blogRoutes = require('./blogRoutes');
const commentRoutes = require('./commentRoutes');
const userRoutes = require('./userRoutes');
const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');

router.use('/blogs', blogRoutes);
router.use('/comments', commentRoutes);
router.use('/users', userRoutes);
router.use('/', homeRoutes);
router.use('/api', apiRoutes);

module.exports = router;