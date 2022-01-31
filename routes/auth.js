const router = require('express').Router()
const bcrypt = require('bcryptjs')
const User = require('../models/user')
const {registerValidation, loginValidation} = require('../validation')

// register new user
router.post('/register', async (req, res) =>{
    // validate data
    const { error } = registerValidation(req.body)
    if (error) return res.status(400).send(error.details[0].message)
    
    // check email does not exist
    const emailExists = await User.findOne({ email: req.body.email })
    if (emailExists) return res.status(400).send("email already exists!")
    
    // hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    })

    try {
        const savedUser = await user.save()
        res.send({ success: true, name: req.body.name, email: req.body.email })
    } catch(err){
        res.status(400).send({ success: false, message: err })
    }
})

// login
router.post('/login', async (req, res) =>{
    // validate data
    const { error } = loginValidation(req.body)
    if (error) return res.status(400).send(error.details[0].message)
    
    // check email is registered
    const user = await User.findOne({ email: req.body.email })
    if (!user) return res.status(400).send("email or password is incorrect!")
    
    // check password
    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if (!validPassword) return res.status(400).send("email or password is incorrect!")

    res.send({ success: true, email: req.body.email })

})

module.exports = router
