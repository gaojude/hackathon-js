const { InventoryItem } = require("../database/models");
const inventoryManager = require("express").Router();

/**
 * /// NOTHING CAN EXECUTE WITHOUT USER_ID
 *
 * LIST:
 *  { [userId] } -> InventoryItem[]
 *
 * ADD | POST:
 *  { [userId], name, image, quantity } -> returns InventoryItem
 *  If (name, userId) already exists, then the quantity will be added to the existing doc.
 *
 * UPDATE | PATCH: IF QUANTITY = 0, PLEASE USE DELETE.
 *  { [userId], id, quantity } -> returns InventoryItem
 *
 * DELETE:
 *  { [userId], id } -> returns InventoryItem
 */

inventoryManager
  .route("/inventory")
  .all((req, res, next) => {
    if (req.params.userId || req.body.userId) return next();
    if (!req.body.userId) return res.status(401).send();
  })
  .get((req, res) => {
    const { userId } = req.params;
    InventoryItem.find({ userId })
      .exec()
      .then((docs) => res.send(docs));
  })
  .post((req, res) => {
    const { name, userId, image, quantity } = req.body;
    InventoryItem.find({ userId, name })
      .exec()
      .then((docs) => {
        if (docs.length === 0) {
          new InventoryItem({ userId, name, image, quantity }).save(
            (err, doc) => {
              if (err) return res.status(400).send(err);
              res.send(doc);
            }
          );
        } else {
          const targetDoc = docs[0];
          targetDoc.quantity += quantity;
          targetDoc.save((err, doc) => {
            if (err) return res.status(400).send(err);
            res.send(doc);
          });
        }
      });
  })
  .delete((req, res) => {
    const { id } = req.body;
    InventoryItem.findByIdAndDelete(id).then((err, doc) => {
      if (err) return res.status(400).send(err);
      if (doc) return res.send(doc);
      res.status(404).send();
    });
  })
  .patch((req, res) => {
    const { id, quantity } = req.body;
    if (quantity === 0)
      return res
        .status(400)
        .send("Please use DELETE for setting quantity to 0.");
    InventoryItem.findByIdAndUpdate(
      id,
      { quantity },
      { new: true },
      (err, doc) => {
        if (err) return res.status(400).send(err);
        res.send(doc);
      }
    );
  });
module.exports = inventoryManager;
