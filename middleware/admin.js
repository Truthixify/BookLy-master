const auth = require('./auth')

module.exports = function admin(req, res, next) {
  auth(req, res, () => {
    try {
      const admin = req.user.admin
      
      if(admin === false) return res.status(403).send('You do not have permission to do this')
      
      next()
    }catch(ex) {
      res.status(500).send(ex)
    }
  })
  
}