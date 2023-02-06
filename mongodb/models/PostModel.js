import mongoose from 'mongoose';

const ModelPost = mongoose.Schema({
  name: { type: String, required: true },
  prompt: { type: String, required: true },
  photo: { type: String, required: true },
});

export default mongoose.model('Post', ModelPost);
