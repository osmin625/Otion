module.exports.render = (req,res) => {
    if(req.session.user_id){
        res.render('main',{req:req})
    }
    else{
        res.render('main',{req:req})
    }
    
    console.log(req.session)
}
