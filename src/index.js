const express = require('express');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);

const { strategy } = require('./extensions/passport');
const { sessionSettings, dbSettings, mysqlSessionSettings } = require('./settings/settings');
const UserController = require('./controllers/User');
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(session(sessionSettings(new MySQLStore({ ...dbSettings(), ...mysqlSessionSettings()}))));

/**
 * In Order To Support Login Sessions,
 * Passport Will Serialize and Desorialize User Instances to and from the Session.
 */
passport.serializeUser((user, done) => {
    user ? done(null, user) : done({ errorMessage: 'Произошла ошибка' });
});

passport.deserializeUser(async (user, done) => {
    const [ result ] = await UserController.getOneUser({ id: user.id });

    done(null,  result[0].id ? user : false);
});

/**
 * Add the passport local strategy.
 */
passport.use(strategy());
app.use(passport.initialize());
app.use(passport.session());

// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// }); 

app.use('/user', require('./routes/user/index'));

app.listen(port, () => {
    console.log('Server up');
});