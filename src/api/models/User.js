import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const schema = new mongoose.Schema(
  {
    email: { type: String, required: true, lowercase: true, index: true },
    passwordHash: { type: String, required: true }
  }, { timestamps: true }
)

schema.methods.isValidPassword = function isValidPassword(password) {
  return bcrypt.compareSync(password, this.passwordHash)
}

schema.method.createHashPassword = function createHashPassword(password) {
  this.passwordHash = bcrypt.hashSync(password, 10)
}

export default mongoose.model('User', schema)