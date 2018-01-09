import mongoose from 'mongoose';

const Schema = mongoose.Schema;

// const languagesSchema = new Schema({
//   code: { type: String, required: true, unique: true, index: true },
//   name: { type: String, required: true }
// });

const languagesSchema = new Schema({
  _id: { type: String },
  name: { type: String, required: true }
});

export default mongoose.model('languages', languagesSchema);