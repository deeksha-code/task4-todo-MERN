const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const Item = require('./models/itemModel');

const app = express();
app.use(cors());
app.use(express.json());

const MONGO_URI = "mongodb+srv://deekshashetty736:liQEsHPRTvrM7Lrj@cluster0.ardch.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("Connected to MongoDB");
}).catch((err) => {
  console.error("MongoDB connection error:", err);
});

app.post('/createItem', async (req, res) => {
  try {
    const item = new Item({
      itemName: req.body.title,
    });
    const data = await item.save();
    res.send(data);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

app.get('/getItems', async (req, res) => {
  try {
    const items = await Item.find({});
    res.send(items);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
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
    res.send(updatedItem);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

app.delete('/deleteItem/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedItem = await Item.findByIdAndDelete({ _id: id });
    res.send(deletedItem);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
