const User = require('../models/users');
const genApiKey = require('../utils/generate-api-key')


const signUp = (req, res, next) {
  const { username, email, password } = req.body
  const apiKey = genApiKey()

  // const newUser = User.create({
  //   username,
  //   email,
  //   password,
  //   apiKey: apiKey
  // })

  res.status(201).json({
    msg: "SUcceaafully registered below is your Api key , keep it safe for auth purpose"
  })
}