const page = require('../models/page')

module.exports.render = async (req,res) => {
    if(req.session.user_id){
        if(req.params.id){
            page.findOne({_id: req.params.id, owner: req.session.user_id}, (error, result) => {
                if(result){
                    page.find({owner: req.session.user_id}, (error, page_list) => {
                        res.render('analysis', {pages: page_list, page_title: result.title, page_id: result._id, page_content: result.contents})
                    })
                }else{
                    page.find({owner: req.session.user_id}, (error, page_list) => {
                        res.render('analysis', {pages: page_list})
                    })
                }
            })
        }else{
            page.find({owner: req.session.user_id}, (error, page_list) => {
                res.render('analysis', {pages: page_list})
            })
        }
    }
    else{
        res.redirect('/register')
    }
}