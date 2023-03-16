const Book = require('../models/Book');

exports.list = async (req, res) => {
  try {
    const data = await Book.find().populate('author');
    res.status(200).send(data);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'An Error Occured' });
  }
};

exports.details = async (req, res) => {
  try {
    const data = await Book.findById(req.params._id);
    res.status(200).send(data);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'An Error Occured' });
  }
};

exports.create = async (req, res) => {
  const newData = new Book(req.body);
  try {
    const data = await newData.save();
    res.status(200).send(data);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'An Error Occured' });
  }
};

exports.update = async (req, res) => {
  try {
    const data = await Book.findByIdAndUpdate(req.params._id, req.body);
    res.status(200).send(data);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'An Error Occured' });
  }
};

exports.delete = async (req, res) => {
  try {
    const data = await Book.findByIdAndRemove(req.params._id);
    res.status(200).send(data);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'An Error Occured' });
  }
};
