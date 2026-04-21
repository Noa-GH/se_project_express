const router = require().Router();
const userRouter = require('./users');
const clothingRouter = require('./clohthingItems');

router.use('/users', userRouter);
router.use('/items', clothingRouter);

router.use((req, res) => {
    res.status(404)
        .send({ message: 'Requested resource not found' })
});

module.exports = router;