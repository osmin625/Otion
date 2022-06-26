const main_controller = require('./controllers/main_controller');
const analysis_controller = require('./controllers/analysis_controller');
const review_controller = require('./controllers/review_controller');
const find_idpw_controller = require('./controllers/find_idpw_controller');
const register_controller = require('./controllers/register_controller');
const new_user_controller = require('./controllers/new_user')
const login_check_controller = require('./controllers/login')
const logout_controller = require('./controllers/logout')
const save_page_controller = require('./controllers/save_page')
const express = require("express");
const express_session = require('express-session')
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PageSchima = new Schema({
    title: String,
    body: String
})
const app = new express();

mongoose.connect('mongodb+srv://osmin625:osmin625@cluster0.mkmcxir.mongodb.net/test', {useNewUrlParser:true})

app.set('view engine','ejs'); //view engine 으로 ejs 설정해주기
app.use(express.static("assets")); //고정 폴더 asset 추가해주기
app.use(express.urlencoded({ extended: true }));
app.use(express_session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
}))
app.listen(process.env.PORT); //port 설정

app.get('/', main_controller.render)
app.get('/main', main_controller.render)
app.get('/analysis', analysis_controller.render)
app.get('/analysis/:id', analysis_controller.render)
app.get('/review/:id', review_controller.render)
app.get('/review', review_controller.render)
app.get('/register', register_controller.render)
app.post('/register/add', new_user_controller)
app.post('/login_check', login_check_controller)
app.get('/logout', logout_controller)
app.get('/page/save', save_page_controller)