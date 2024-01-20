const mongoose = require('mongoose');

mongoose
  .connect(
    'mongodb+srv://yanbriann:ULdkHCjbk5bNNDOX@cluster0.5kpesct.mongodb.net/?retryWrites=true&w=majority'
  )
  .then(() => console.log('connected to Flashcard model'))
  .catch((err) => console.log(err));

const topicSchema = new mongoose.Schema({
  _id: String,
  prompt: Object,
});

const Topic = mongoose.model('Topics', topicSchema);

export default Topic;
