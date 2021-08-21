/**
 * Protect route from verified users
 * 
 * @param {Object} req 
 * @param {Object} res 
 * @param {function} next 
 */
function isGuest (req, res, next) {
    return !req.isAuthenticated() ? next() : res.status(400).json({ error: 'Вы уже авторизованы' });
};

module.exports = isGuest;
