import mongoose from 'mongoose';

const Schema = mongoose.Schema;

// const dataValuesSchema = new Schema({
//   value: String,
//   key: { type: Schema.Types.ObjectId, ref: 'datakeys' },
//   language: { type: Schema.Types.ObjectId, ref: 'languages' },
//   project: { type: Schema.Types.ObjectId, ref: 'projects' }
// });

const dataValuesSchema = new Schema({
  value: String,  
  key: { type: String, ref: 'datakeys' },
  language: { type: String, ref: 'languages' },
  project: { type: String, ref: 'projects' }
});


export default mongoose.model('datavalues', dataValuesSchema);