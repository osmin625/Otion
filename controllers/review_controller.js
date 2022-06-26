const page = require('../models/page')

module.exports.render = async (req,res) => {
    /* TO-DO
     * 1. 데이터베이스에서 현재 접속한 유저가 저장한 문서 목록 (제목, 데이터베이스에 저장된 _id) 가져오기
     * 2. 가져온 문서 목록을 ejs를 이용하여 페이지에 표시하기 (문서 제목 + 하이퍼링크 -> 클릭 시 해당 문서 조회 페이지로 이동할 수 있게끔!) 
     * 3. 앞에서 저장한 서식 (img 파일은 어떻게 저장, 볼드체는 어떻게 인식) 그대로 적용해보기?
     */
    if(req.session.user_id){
        if(req.params.id){
            page.findOne({_id: req.params.id, owner: req.session.user_id}, (error, result) => {
                if(result){
                    page.find({owner: req.session.user_id}, (error, page_list) => {
                        res.render('review', {pages: page_list, page_title: result.title, page_id: result._id, page_content: result.contents})
                    })
                }else{
                    page.find({owner: req.session.user_id}, (error, page_list) => {
                        res.render('review', {pages: page_list})
                    })
                }
            })
        }else{
            page.find({owner: req.session.user_id}, (error, page_list) => {
                res.render('review', {pages: page_list})
            })
        }
    }
    else{
        res.redirect('/register')
    }
}