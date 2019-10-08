const router = require('express').Router();
const authRoute = require('./auth');
const userRoute = require('./user');

router.use('/auth', authRoute);
router.use('/user', userRoute);

router.use((req, res,next)=>{
    res.send('default route');
});

module.exports = router;