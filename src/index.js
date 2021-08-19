const express = require('express');
const app = express();
const expressWs = require('express-ws')(app);
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const port = 3000;

const { Passport } = require('./extensions/passport');
const { Settings } = require('./settings/Settings');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(session(Settings.getSession(MySQLStore)));
Passport.include(app);

app.use('/user', require('./routes/user/index'));
app.use('/chat', require('./routes/chat/index'));

app.listen(port, () => {
    console.log('Server up');
});