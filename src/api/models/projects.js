import mongoose from 'mongoose';
const Schema = mongoose.Schema;


// const projectSchema = new Schema({
//   title: { type: String, required: true, unique: true, index: true },
//   languages: [{ type: Schema.Types.ObjectId, ref: 'languages' }],
//   data: {
//     datakeys: [{ type: Schema.Types.ObjectId, ref: 'datakeys' }],
//     datavalues: [{ type: Schema.Types.ObjectId, ref: 'datavalues' }]
//   }
// });

const projectSchema = new Schema({
  _id: { type: String }, // project-title
  languages: [{ type: String, ref: 'languages' }],
  datakeys:  [{ type: String, ref: 'datakeys' }],
  // datakeys:  [{ type: Schema.Types.ObjectId, ref: 'datakeys' }],
  datavalues: [{ type: Schema.Types.ObjectId, ref: 'datavalues' }]
}, { usePushEach: true });


export default mongoose.model('projects', projectSchema);