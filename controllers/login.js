const user = require('../models/user')

module.exports = (req, res) =>  {
    user.findOne({
        user_email: req.body.user_email,
        password: req.body.password
    }, (error, result) => {
            if(result){
                req.session.user_id = result.user_email
                console.log("로그인 성공")
                res.redirect("/main")
            }else{
                console.log("로그인 실패")
                res.redirect("/main")
            }
        }
    )
}