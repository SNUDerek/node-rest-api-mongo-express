const jwt = require('jsonwebtoken')

module.exports = function (req,res,next){
    const token = req.header('auth-token')
    if (!token) return res.status(401).send('Access Denied')
    try {
        const verifiedId = jwt.verify(token, process.env.TOKEN_SECRET)
        req.userId = verifiedId._id
        next()
    } catch {
        res.status(400).send('Invalid Token')
    }
}