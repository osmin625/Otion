module.exports.render = (req,res) => {
    if(req.session.user_id){
        res.redirect('/main')
    }
    else{
        res.render('register')
    }
}