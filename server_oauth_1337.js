//
// https://auth0.com/blog/everything-you-wanted-to-know-about-oauth-2-but-were-too-afraid-to-ask/
//

let express = require('express')
let passport = require('passport')
let Strategy = require('passport-github').Strategy
// let Strategy = require('passport-github2').Strategy // according github, previous version doesn't work with GitHub API v3
let dotenv = require('dotenv').config()

console.log(process.env);
passport.use(new Strategy({
        clientID: process.env.BTC_CLIENT_ID,
        clientSecret: process.env.BTC_CLIENT_SECRET,
        callbackURL: 'http://localhost:1337/callback'
    },
    function(accessToken, refreshToken, profile, cb) {
        return cb(null, profile)
    }))

passport.serializeUser(function(user, cb) {
    cb(null, user)
})

passport.deserializeUser(function(obj, cb) {
    cb(null, obj)
})

let app = express()

app.use(require('cookie-parser')())
app.use(require('body-parser').urlencoded({
    extended: true
}))
app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
}))

app.use(passport.initialize())
app.use(passport.session())

app.set('view engine', 'jade')

app.get('/',
    function(req, res) {
        res.render('hello')
    })

app.get('/login',
    passport.authenticate('github'))

app.get('/callback',
    passport.authenticate('github', {
        failureRedirect: '/login'
    }),
    function(req, res) {
        res.redirect('/profile')
    })

app.get('/profile',
    require('connect-ensure-login').ensureLoggedIn(),
    function(req, res) {
        console.log(req.user)
        res.render('user', {
            user: req.user
        })
    })

app.get('/logout', function(req, res) {
    req.logout()
    res.redirect('/')
})

app.listen(1337)
