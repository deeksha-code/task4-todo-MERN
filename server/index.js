const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Item = require('./models/itemModel');

const app = express();
app.use(cors());
app.use(express.json());

const MONGO_URI = "mongodb+srv://deekshashetty736:liQEsHPRTvrM7Lrj@cluster0.ardch.mongodb.net/todo?retryWrites=true&w=majority"; // Added database name

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

app.post('/createItem', async (req, res) => {
  try {
    const item = new Item({
      itemName: req.body.title,
    });
    const data = await item.save();
    res.status(201).json({ success: true, data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error creating item", error });
  }
});

app.get('/getItems', async (req, res) => {
  try {
    const items = await Item.find({});
    if (!items.length) {
      return res.status(404).json({ success: false, message: "No items found" });
    }
    res.json({ success: true, data: items });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Server error occurred while fetching items", error: err });
  }
});

app.put('/updateItem/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedItem = await Item.findByIdAndUpdate(
      { _id: id },
      { itemName: req.body.title },
      { new: true }
    );
    res.json({ success: true, data: updatedItem });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Error updating item", error: err });
  }
});

app.delete('/deleteItem/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedItem = await Item.findByIdAndDelete({ _id: id });
    res.json({ success: true, data: deletedItem });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Error deleting item", error: err });
  }
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
