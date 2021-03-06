import express from 'express'
import User from '../models/User'

const router = express.Router();

router.post('/', (req, res) => {
  const { credentials } = req.body
  // console.log('credentials: ', credentials)
  User
    .findOne({ email: credentials.email })
    .then(user => {
      console.log("isValidPassword: ", user && user.isValidPassword(credentials.password))
      if(user && user.isValidPassword(credentials.password)) {
        res.json({email: credentials.email})
      } else {
        res.status(400).json({ errors: {global: "Invalid Credentials"}})
      }
    })
})

export default router