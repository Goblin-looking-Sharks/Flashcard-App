const mongoose = require('mongoose');
require('dotenv').config();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('connected to Flashcard model'))
  .catch((err) => console.log(err));

const topicSchema = new mongoose.Schema({
  _id: String,
  prompt: Object,
});

const Topic = mongoose.model('Topics', topicSchema);

export default Topic;
