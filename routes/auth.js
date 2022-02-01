const router = require('express').Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const {registerValidation, loginValidation} = require('../validation')

// token expiry
const tokenExpiry = process.env.TOKEN_EXPIRY || '1h'

// warning messages; for production, should be less specific
const registerErrorUsernameExists = '(DEBUG) username already exists!'
const registerErrorEmailExists = '(DEBUG) email already exists!'
const loginErrorUsernameNotExists = '(DEBUG) username does not exist!'
const loginErrorPasswordNotCorrect = '(DEBUG) password is incorrect!'

// register new user
router.post('/register', async (req, res) =>{
    // validate data
    const { error } = registerValidation(req.body)
    if (error) return res.status(400).send(error.details[0].message)
    // check email does not exist
    const emailExists = await User.findOne({ email: req.body.email })
    if (emailExists) return res.status(400).send(registerErrorEmailExists)
    // check username does not exist
    const userExists = await User.findOne({ username: req.body.username })
    if (userExists) return res.status(400).send(registerErrorUsernameExists)
    // hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)
    // save user info to mongodb
    const user = new User({
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword
    })
    try {
        const savedUser = await user.save()
        res.status(201).send('success')
    } catch(err){
        res.status(400).send(err)
    }
})

// login with username and password
router.post('/login', async (req, res) =>{
    // validate data
    const { error } = loginValidation(req.body)
    if (error) return res.status(400).send(error.details[0].message)
    // check username is registered
    const user = await User.findOne({ username: req.body.username })
    if (!user) return res.status(400).send(loginErrorUsernameNotExists)
    // check password is correct
    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if (!validPassword) return res.status(400).send(loginErrorPasswordNotCorrect)
    // create and assign token based on user's mongodb id
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET, { expiresIn: tokenExpiry })
    res.header('auth-token', token).send(token)
})

module.exports = router
