const LocalStrategy = require('passport-local').Strategy;
const passport = require('passport');

const UserController = require('../controllers/User');

class Passport {
    static authenticate(req, res, next) {
        passport.authenticate('local', (err, user) => {
            if(err) return res.status(err.status).json(err);
    
            req.logIn(user, (err) => err ? res.status(400).json(err) : res.json(user));
        })(req, res, next);
    }

    static include(app) {
        /**
        * In Order To Support Login Sessions,
        * Passport Will Serialize and Desorialize User Instances to and from the Session.
        */
        this.#serializeData();
        this.#deSerializeData();

        passport.use(this.#getStrategy());
        app.use(passport.initialize());
        app.use(passport.session());
    }

    static #serializeData() {
        passport.serializeUser((user, done) => {
            user ? done(null, user) : done({ error: 'Произошла ошибка' });
        });
    }

    static #deSerializeData() {
        passport.deserializeUser(async (user, done) => {
            const [ result ] = await UserController.getOneUser({ id: user.id });
        
            done(null,  result[0].id ? user : false);
        });
    }

    static #getStrategy() {
        return new LocalStrategy(
            {
                usernameField: 'nickname',
                passwordField: 'password',
                passReqToCallback: true,
            },
            async (req, nickname, password, done) => {
                const result = await UserController.signIn(req.body);
    
                return result.error
                    ? done({ error: result.error, status: 401 })
                    : done(null, result);
            }
        );
    }
}

module.exports = { Passport };