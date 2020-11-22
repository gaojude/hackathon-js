const {Inventory} = require("../database/login");
const inventoryManager = require("express").Router();

/**
 * /// NOTHING CAN EXECUTE WITHOUT USER_ID
 *
 * LIST:
 *  { [userId] } -> Inventory[]
 *
 * ADD | POST:
 *  { [userId], name, image, quantity } -> returns Inventory
 *  If (name, userId) already exists, then the quantity will be added to the existing doc.
 *
 * UPDATE | PATCH: IF QUANTITY = 0, PLEASE USE DELETE.
 *  { [userId], id, quantity } -> returns Inventory
 *
 * DELETE:
 *  { [userId], id } -> returns Inventory
 */

inventoryManager
    .route("/inventory")
    .all((req, res, next) => {
        if (!req.body.userId) return res.status(401).send()
        next()
    })
    .get((req, res) => {
        const {userId} = req.body;
        Inventory.find({userId}).exec().then(docs => res.send(docs));
    })
    .post((req, res) => {
        const {name, userId, image, quantity} = req.body;
        Inventory.find({userId, name}).exec().then(docs => {
            if (docs.length === 0) {
                new Inventory({userId, name, image, quantity})
                    .save((err, doc) => {
                        if (err) return res.status(400).send(err)
                        res.send(doc)
                    })
            } else {
                const targetDoc = docs[0];
                targetDoc.quantity += quantity
                targetDoc.save((err, doc) => {
                    if (err) return res.status(400).send(err)
                    res.send(doc)
                })
            }
        })
    })
    .delete((req, res) => {
        const {id} = req.body;
        Inventory.findByIdAndDelete(id).then((err, doc) => {
            if (err) return res.status(400).send(err)
            if (doc) return res.send(doc)
            res.status(404).send()
        })
    })
    .patch((req, res) => {
        const {id, quantity} = req.body;
        if (quantity === 0) return res.status(400).send('Please use DELETE for setting quantity to 0.')
        Inventory.findByIdAndUpdate(id, {quantity}, (err, doc) => {
            if (err) return res.status(400).send(err)
            res.send(doc);
        })
    })
module.exports = inventoryManager;