import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const dataKeysSchema = new Schema({
  value: { type: String }
});

// languagesSchema.set('autoIndex', false);
// languagesSchema.index({ code: 1 });

export default mongoose.model('datakeys', dataKeysSchema);