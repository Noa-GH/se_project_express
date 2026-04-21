const router = require('express').Router();
const {
    getClothingItems,
    createClothingItem,
    deleteClothingitem,
    likeItem,
    dislikeItem,
} = require('../controllers/users');

router.get('/', getClothingItems);
router.post('/', createClothingItem);
router.delete('/:itemId', deleteClothingitem);
router.put('/itemId/likes', likeItem);
router.delete('/itemId/likes', dislikeItem);

module.exports = router;