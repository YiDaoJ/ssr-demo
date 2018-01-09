import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const dataKeysSchema = new Schema({
  _id: { type: String },
});

// languagesSchema.set('autoIndex', false);
// languagesSchema.index({ code: 1 });

export default mongoose.model('datakeys', dataKeysSchema);