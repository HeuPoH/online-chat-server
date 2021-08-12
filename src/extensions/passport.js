const LocalStrategy = require('passport-local').Strategy;

const UserController = require('../controllers/User');

function strategy() {
    return new LocalStrategy(
        {
            usernameField: 'nickname',
            passwordField: 'password',
            passReqToCallback: true,
        },
        async (req, nickname, password, done) => {
            const result = await UserController.signIn(req.body);

            return result.errorMessage ?
                done({ errorMessage: result.errorMessage, status: 401 }) :
                done(null, result);
        }
    )
}

module.exports = { strategy };