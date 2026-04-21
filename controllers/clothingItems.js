const ClothingItem = require('../models/clothingItem.model');
const { BAD_REQUEST, NOT_FOUND, INTERNAL_SERVER_ERROR } = require('../utils/errors');

// GET - return all clothing items
module.exports.getClothingItems = (req, res) => {
    ClothingItem.find({})
        .then((items) => res.send(items))
        .catch((err) => {
            console.error(err);
            return res
                .status(INTERNAL_SERVER_ERROR)
                .send({ message: 'An error has occurred on the server.' });

        });
};

// POST /items — create a clothing item
module.exports.createClothingItem = (req, res) => {
    const { name, weather, imageUrl } = req.body;
    const owner = req.user._id; //req.user._id is for user auth later in project.

    ClothingItem.create({ name, weather, imageUrl, owner })
        .then((item) => res.send(item))
        .catch((err) => {
            console.error(err);
            if (err.name === "ValidationError") {
                return res.status(BAD_REQUEST).send({ message: "Invalid data" });
            }
            return res
                .status(INTERNAL_SERVER_ERROR)
                .send({ message: "An error has occurred on the server." });
        });
};

// DELETE - delete a clothing item by _id
module.exports.deleteClotingItem = (req, res) => {
    const { itemId } = req.params;

    ClothingItem.findByIdAndDelete(itemId)
        .orFail()
        .then((item) => res.send(item))
        .catch((err) => {
            console.error(err);
            if (err.name === 'DocumentNotFoundError') {
                return res.status(NOT_FOUND)
                    .send({ message: 'item not found' });
            }
            if (err.name === 'CastError') {
                return res.status(BAD_REQUEST)
                    .send({ message: 'Invalid item ID' });
            }
            return res
                .status(INTERNAL_SERVER_ERROR)
                .send({ message: 'An error has occurred on the server.' });
        });
};

// PUT - like an item
module.exports.likeItem = (req, res) => {
    ClothingItem.findByIdAndUpdate(
        req.params.itemId,
        { $addToSet: { likes: req.user._id } }, //req.user._id is for user auth later in project.
        { new: true }
    )
        .orFail()
        .then((item) => res.send(item))
        .catch((err) => {
            console.error(err);
            if (err.name === 'DocumentNotFoundError') {
                return res.status(NOT_FOUND)
                    .send({ message: 'item not found' });
            }
            if (err.name === 'CastError') {
                return res.status(BAD_REQUEST)
                    .send({ message: 'Invalid item ID' });
            }
            return res
                .status(INTERNAL_SERVER_ERROR)
                .send({ message: 'An error has occurred on the server.' });
        });
};

// DELETE - unlike an item
module.exports.likeItem = (req, res) => {
    ClothingItem.findByIdAndUpdate(
        req.params.itemId,
        { $pull: { likes: req.user._id } }, //req.user._id is for user auth later in project.
        { new: true }
    )
        .orFail()
        .then((item) => res.send(item))
        .catch((err) => {
            console.error(err);
            if (err.name === 'DocumentNotFoundError') {
                return res.status(NOT_FOUND)
                    .send({ message: 'item not found' });
            }
            if (err.name === 'CastError') {
                return res.status(BAD_REQUEST)
                    .send({ message: 'Invalid item ID' });
            }
            return res
                .status(INTERNAL_SERVER_ERROR)
                .send({ message: 'An error has occurred on the server.' });
        });
};