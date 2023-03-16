const Author = require('../models/Author');

exports.list = async (req, res) => {
  try {
    const data = await Author.find();
    res.status(200).send(data);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'An Error Occured' });
  }
};

exports.details = async (req, res) => {
  try {
    const data = await Author.findById(req.params._id);
    res.status(200).send(data);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'An Error Occured' });
  }
};

exports.create = async (req, res) => {
  const newData = new Author(req.body);
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
    const data = await Author.findByIdAndUpdate(req.params._id, req.body);
    res.status(200).send(data);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'An Error Occured' });
  }
};

exports.delete = async (req, res) => {
  try {
    const data = await Author.findByIdAndRemove(req.params._id);
    res.status(200).send(data);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: 'An Error Occured' });
  }
};
