const redis = require('redis')
const redisClient = redis.createClient(process.env.REDIS_PORT)

module.exports = async function (req,res,next){
    try {
        const verifiedId = jwt.verify(token, process.env.TOKEN_SECRET)
        req.userId = verifiedId._id
        next()
    } catch {
        res.status(400).send('Invalid Token')
    }
}