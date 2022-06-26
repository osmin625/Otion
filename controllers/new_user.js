const user = require("../models/user.js");
module.exports = (req, res) => {
  user.create({
      //비동기함수
      user_email: req.body.email,
      password: req.body.password,
    }, (error, user_info) => {
      if (error) {
        console.log("오류: 회원가입에 실패했습니다.");
        console.log(error)
        res.render("register", {isfail:true});
      }
      else if (user_info) {
        console.log("회원가입이 완료되었습니다.");
        res.render("register", { isfail: false });
      }
    })
  //then(()=>{})
  // req.body.password
  //   res.render("register"); // render register.ejs
};
