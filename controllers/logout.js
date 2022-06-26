const user = require('../models/user')

module.exports = (req, res) =>  {
    if(req.session.user_id)
        req.session.destroy(() => {
            res.redirect("/main")
        })
}