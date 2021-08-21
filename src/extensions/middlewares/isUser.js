/**
 * Protect route from guests
 * 
 * @param {Object} req 
 * @param {Object} res 
 * @param {function} next 
 */
function isUser(req, res, next) {
    return req.isAuthenticated() ? next() : res.status(401).json({ error: 'Доступ только авторизованным' });
};

module.exports = isUser;