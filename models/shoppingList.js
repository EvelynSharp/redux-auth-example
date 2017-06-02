const mongoose = require('mongoose');
const Schema = mongoose.Schema;

outer.get('/', (req, res) => {
  ShoppingList.find({ userId: req.user._id}, (err, lists) => {
    res.json(lists);
  });
})

module.exports = mongoose.model( 'ShoppingList', ShoppingList );
